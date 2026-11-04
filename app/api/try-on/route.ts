import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'https://yce-api-01.makeupar.com';
const FILE_ENDPOINT = '/s2s/v2.0/file/cloth-v3';
const TASK_ENDPOINT = '/s2s/v2.0/task/cloth-v3';

const POLL_INTERVAL_MS = 3000;
const MAX_POLL_ATTEMPTS = 60; // ~3 minutes max

interface FileUploadResponse {
  status: number;
  data: {
    files: Array<{
      content_type: string;
      file_name: string;
      file_id: string;
      requests: Array<{
        method: string;
        url: string;
        headers: Record<string, string>;
      }>;
    }>;
  };
}

interface TaskCreateResponse {
  status: number;
  data: {
    task_id: string;
  };
}

interface TaskStatusResponse {
  status: number;
  data: {
    error: string | null;
    results: {
      url: string;
    } | null;
    task_status: string;
  };
}

/**
 * Step 1 & 2: Register a file with YouCam File API and upload the binary
 */
async function uploadImageToYouCam(
  imageBuffer: Buffer,
  fileName: string,
  contentType: string,
  apiKey: string,
): Promise<string> {
  const fileSize = imageBuffer.length;

  // Register the file with the File API
  const fileResponse = await fetch(`${BASE_URL}${FILE_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      files: [
        {
          content_type: contentType,
          file_name: fileName,
          file_size: fileSize,
        },
      ],
    }),
  });

  if (!fileResponse.ok) {
    const errorText = await fileResponse.text();
    throw new Error(`File API registration failed (${fileResponse.status}): ${errorText}`);
  }

  const fileData: FileUploadResponse = await fileResponse.json();

  if (!fileData.data?.files?.[0]) {
    throw new Error('File API returned no file data');
  }

  const fileInfo = fileData.data.files[0];
  const fileId = fileInfo.file_id;
  const uploadRequest = fileInfo.requests[0];

  if (!uploadRequest?.url) {
    throw new Error('File API did not return an upload URL');
  }

  // Upload the actual binary to the presigned S3 URL
  const uploadResponse = await fetch(uploadRequest.url, {
    method: uploadRequest.method || 'PUT',
    headers: {
      'Content-Type': contentType,
      'Content-Length': String(fileSize),
    },
    body: new Uint8Array(imageBuffer),
  });

  if (!uploadResponse.ok) {
    const errorText = await uploadResponse.text();
    throw new Error(`S3 upload failed (${uploadResponse.status}): ${errorText}`);
  }

  return fileId;
}

/**
 * Step 3: Create the try-on task
 */
async function createTryOnTask(
  srcFileId: string,
  refFileId: string,
  garmentCategory: string,
  apiKey: string,
): Promise<string> {
  const response = await fetch(`${BASE_URL}${TASK_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      src_file_id: srcFileId,
      ref_file_id: refFileId,
      garment_category: garmentCategory,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Task creation failed (${response.status}): ${errorText}`);
  }

  const data: TaskCreateResponse = await response.json();

  if (!data.data?.task_id) {
    throw new Error('Task API did not return a task_id');
  }

  return data.data.task_id;
}

/**
 * Step 4: Poll for the task result
 */
async function pollTaskResult(
  taskId: string,
  apiKey: string,
): Promise<{ resultUrl: string }> {
  for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));

    const response = await fetch(`${BASE_URL}${TASK_ENDPOINT}/${encodeURIComponent(taskId)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Task poll failed (${response.status}): ${errorText}`);
    }

    const data: TaskStatusResponse = await response.json();
    const status = data.data?.task_status;

    if (status === 'success') {
      const resultUrl = data.data?.results?.url;
      if (!resultUrl) {
        throw new Error('Task succeeded but no result URL was returned');
      }
      return { resultUrl };
    }

    if (status === 'error') {
      const errorCode = data.data?.error || 'unknown_error';
      throw new Error(`AI task failed: ${errorCode}`);
    }

    // Otherwise it's still processing — continue polling
    console.log(`[Try-On] Polling attempt ${attempt + 1}/${MAX_POLL_ATTEMPTS}, status: ${status}`);
  }

  throw new Error('Task timed out after maximum polling attempts');
}

/**
 * Helper: resolve a product image to a Buffer
 * Handles both local paths (e.g. /assets/tshirt1.jpg) and external URLs
 */
async function resolveProductImage(
  productImageUrl: string,
): Promise<{ buffer: Buffer; contentType: string; fileName: string }> {
  // Check if it's a local path (starts with /)
  if (productImageUrl.startsWith('/')) {
    const localPath = path.join(process.cwd(), 'public', productImageUrl);
    if (!fs.existsSync(localPath)) {
      throw new Error(`Product image not found: ${productImageUrl}`);
    }
    const buffer = fs.readFileSync(localPath);
    const ext = path.extname(productImageUrl).toLowerCase().replace('.', '');
    const contentType = ext === 'png' ? 'image/png' : 'image/jpg';
    const fileName = path.basename(productImageUrl);
    return { buffer, contentType, fileName };
  }

  // External URL — fetch it
  const response = await fetch(productImageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch product image: ${response.status}`);
  }
  const arrayBuf = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuf);
  const contentType = response.headers.get('content-type') || 'image/jpg';
  const urlPath = new URL(productImageUrl).pathname;
  const fileName = path.basename(urlPath) || 'product.jpg';
  return { buffer, contentType, fileName };
}

/**
 * Helper: convert base64 data URL to Buffer with metadata
 */
function parseBase64Image(dataUrl: string): { buffer: Buffer; contentType: string; fileName: string } {
  const match = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!match) {
    throw new Error('Invalid base64 image data URL');
  }
  const contentType = match[1];
  const base64Data = match[2];
  const buffer = Buffer.from(base64Data, 'base64');
  const ext = contentType.split('/')[1] || 'jpg';
  const fileName = `user_photo_${Date.now()}.${ext}`;
  return { buffer, contentType, fileName };
}

// Map user-friendly error codes to human-readable messages
const ERROR_MESSAGES: Record<string, string> = {
  'error_pose': 'Could not detect your pose. Please upload a clear, full-body standing photo facing forward.',
  'error_invalid_ref': 'The garment image could not be processed. Please try a different product.',
  'error_invalid_src': 'Your photo must show your full body (not just lower body or feet).',
  'error_apply_region_mismatch': 'The garment type does not match the visible body area in your photo. Try a different garment category.',
  'error_nsfw_content_detected': 'The content was flagged as inappropriate. Please use a suitable photo.',
  'error_editing_failed': 'The try-on generation did not produce a visible change. Try a different photo or garment.',
  'exceed_max_filesize': 'One of the images exceeds the maximum allowed size (10MB or 4096px on the longest side).',
  'error_below_min_image_size': 'One of the images is too small. The longest side must be at least 128 pixels.',
  'error_download_image': 'The system could not download one of the images. Please try again.',
  'invalid_parameter': 'Invalid parameters were sent. Please check your garment category selection.',
};

function getUserFriendlyError(errorCode: string): string {
  // Check if the error message contains a known error code
  for (const [code, message] of Object.entries(ERROR_MESSAGES)) {
    if (errorCode.includes(code)) {
      return message;
    }
  }
  return `An unexpected error occurred: ${errorCode}`;
}


export async function POST(req: Request) {
  try {
    const { userImageBase64, productImageUrl, garmentCategory } = await req.json();

    const YOUCAM_API_KEY = process.env.YOUCAM_API_KEY;

    if (!YOUCAM_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'YouCam API key is not configured on the server.' },
        { status: 500 },
      );
    }

    if (!userImageBase64 || !productImageUrl || !garmentCategory) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: userImageBase64, productImageUrl, garmentCategory' },
        { status: 400 },
      );
    }

    console.log(`[Try-On] Starting virtual try-on — garment: ${garmentCategory}`);

    // 1. Parse and upload user image
    console.log('[Try-On] Step 1: Uploading user image...');
    const userImage = parseBase64Image(userImageBase64);
    const userFileId = await uploadImageToYouCam(
      userImage.buffer,
      userImage.fileName,
      userImage.contentType,
      YOUCAM_API_KEY,
    );
    console.log(`[Try-On] User image uploaded, file_id: ${userFileId.substring(0, 20)}...`);

    // 2. Resolve and upload product/garment image
    console.log('[Try-On] Step 2: Uploading product image...');
    const productImage = await resolveProductImage(productImageUrl);
    const refFileId = await uploadImageToYouCam(
      productImage.buffer,
      productImage.fileName,
      productImage.contentType,
      YOUCAM_API_KEY,
    );
    console.log(`[Try-On] Product image uploaded, file_id: ${refFileId.substring(0, 20)}...`);

    // 3. Create the try-on task
    console.log('[Try-On] Step 3: Creating try-on task...');
    const taskId = await createTryOnTask(userFileId, refFileId, garmentCategory, YOUCAM_API_KEY);
    console.log(`[Try-On] Task created, task_id: ${taskId.substring(0, 20)}...`);

    // 4. Poll for the result
    console.log('[Try-On] Step 4: Polling for result...');
    const { resultUrl } = await pollTaskResult(taskId, YOUCAM_API_KEY);
    console.log('[Try-On] ✓ Result received successfully');

    return NextResponse.json({
      success: true,
      resultUrl,
      taskId,
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[Try-On] Error:', errorMessage);

    return NextResponse.json(
      {
        success: false,
        error: getUserFriendlyError(errorMessage),
        errorCode: errorMessage,
      },
      { status: 500 },
    );
  }
}

/**
 * GET: Check status of an existing try-on task
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get('taskId');
    const YOUCAM_API_KEY = process.env.YOUCAM_API_KEY;

    if (!YOUCAM_API_KEY) {
      return NextResponse.json({ success: false, error: 'API key not configured' }, { status: 500 });
    }

    if (!taskId) {
      return NextResponse.json({ success: false, error: 'taskId is required' }, { status: 400 });
    }

    const response = await fetch(`${BASE_URL}${TASK_ENDPOINT}/${encodeURIComponent(taskId)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${YOUCAM_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ success: false, error: errorText }, { status: response.status });
    }

    const data: TaskStatusResponse = await response.json();
    const status = data.data?.task_status;
    const resultUrl = data.data?.results?.url;
    const error = data.data?.error;

    return NextResponse.json({
      success: true,
      status,
      resultUrl,
      error: error ? getUserFriendlyError(error) : null,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
