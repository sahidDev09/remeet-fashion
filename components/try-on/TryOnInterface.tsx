"use client";

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

import type { Product } from '@/types/product';

interface TryOnInterfaceProps {
  initialProduct: Product;
  allProducts: Product[];
}

type ProcessingStage = 'idle' | 'uploading' | 'creating' | 'generating' | 'done' | 'error';

const GARMENT_CATEGORY_MAP: Record<string, string> = {
  'Upper Body': 'upper_body',
  'Lower Body': 'lower_body',
  'Full Body': 'full_body',
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const STAGE_MESSAGES: Record<ProcessingStage, string> = {
  idle: '',
  uploading: 'Uploading images to AI engine…',
  creating: 'Creating virtual try-on task…',
  generating: 'AI is generating your look…',
  done: 'Complete!',
  error: 'Something went wrong.',
};

export default function TryOnInterface({ initialProduct }: TryOnInterfaceProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product>(initialProduct);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [processingStage, setProcessingStage] = useState<ProcessingStage>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [generateType, setGenerateType] = useState<string>('Upper Body');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = useCallback((file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (JPG or PNG).');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage('Image is too large. Please upload an image under 10MB.');
      return;
    }

    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
      setResultUrl(null);
      setProcessingStage('idle');
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleTryOn = async () => {
    if (!previewUrl) return;
    setIsProcessing(true);
    setResultUrl(null);
    setErrorMessage(null);
    setProcessingStage('uploading');

    try {
      const garmentCategory = GARMENT_CATEGORY_MAP[generateType] || 'upper_body';

      // Simulate stage transitions for UX feedback
      const stageTimer = setTimeout(() => setProcessingStage('creating'), 4000);
      const stageTimer2 = setTimeout(() => setProcessingStage('generating'), 8000);

      const response = await fetch('/api/try-on', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userImageBase64: previewUrl,
          productImageUrl: selectedProduct.image,
          garmentCategory,
        }),
      });

      clearTimeout(stageTimer);
      clearTimeout(stageTimer2);

      const data = await response.json();

      if (response.ok && data.success) {
        setResultUrl(data.resultUrl);
        setProcessingStage('done');
      } else {
        console.error("Failed to generate try-on:", data.error || data.message);
        setErrorMessage(data.error || "Failed to generate try-on. Please try again.");
        setProcessingStage('error');
      }
    } catch (error) {
      console.error("API call error:", error);
      setErrorMessage("An error occurred communicating with the server. Please try again.");
      setProcessingStage('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = `try-on-${selectedProduct.name.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setResultUrl(null);
    setProcessingStage('idle');
    setErrorMessage(null);
  };

  return (
    <div className="bg-white rounded-[32px] shadow-2xl shadow-black/5 border border-black/5 overflow-hidden flex flex-col lg:flex-row w-full max-w-[1400px] mx-auto min-h-[600px]">

      {/* Panel 1: Product & Options */}
      <div className="w-full lg:w-[25%] p-6 lg:p-8 flex flex-col border-b lg:border-b-0 lg:border-r border-black/5">
        <h2 className="font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#527661]/10 text-[#527661] flex items-center justify-center text-[10px]">1</span>
          Product
        </h2>

        <div className="flex flex-col gap-4">
          <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-black/5 border border-black/5 shadow-sm">
            <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-cover" />
          </div>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest">{selectedProduct.name}</p>
            <p className="text-[10px] text-black/40 font-mono mt-0.5">{selectedProduct.color}</p>
          </div>
        </div>

        <div className="mt-8 flex-grow">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3">Garment Category</h3>
          <div className="flex flex-col gap-2">
            {['Upper Body', 'Lower Body', 'Full Body'].map((type) => (
              <button
                key={type}
                onClick={() => setGenerateType(type)}
                className={`w-full py-3 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest text-left transition-all border ${
                  generateType === type
                    ? 'border-[#527661] bg-[#527661]/10 text-[#527661]'
                    : 'border-transparent bg-black/5 text-black/60 hover:bg-black/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  {type}
                  {generateType === type && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Image Guidelines */}
        <div className="mt-6 p-3 rounded-xl bg-amber-50 border border-amber-200/60">
          <div className="flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 mt-0.5 flex-shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
            <div className="text-[9px] text-amber-800/80 leading-relaxed font-mono">
              <p className="font-bold mb-1 text-[10px] text-amber-900">Photo Tips</p>
              <ul className="space-y-0.5 list-disc list-inside">
                <li>Use a clear full-body photo</li>
                <li>Single person, facing forward</li>
                <li>Standing position only</li>
                <li>No obstructions on face/body</li>
                <li>Min 512×384, max 4096px</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Panel 2: Photo Upload */}
      <div className="w-full lg:w-[35%] p-6 lg:p-8 flex flex-col bg-[#fafafa] border-b lg:border-b-0 lg:border-r border-black/5">
        <h2 className="font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#527661]/10 text-[#527661] flex items-center justify-center text-[10px]">2</span>
          Upload Photo
        </h2>
        <div className="flex-grow flex flex-col items-center justify-center h-full">
          <div
            className={`w-full h-full min-h-[300px] border-2 border-dashed rounded-[20px] flex flex-col items-center justify-center p-6 text-center transition-all duration-300 relative overflow-hidden group ${
              isDragging ? 'border-[#527661] bg-[#527661]/10 scale-[1.02]' : 'border-black/10 bg-white hover:border-[#527661]/30'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {previewUrl ? (
              <>
                <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-white text-black px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg hover:scale-105 transition-transform"
                  >
                    Change Photo
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 mb-3 text-black/20 group-hover:text-[#527661] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
                <p className="font-bold text-xs uppercase tracking-widest mb-1">Drag & Drop</p>
                <p className="text-[10px] text-black/40 font-mono mb-4">Click to browse files</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-black text-white px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#527661] transition-colors"
                >
                  Browse
                </button>
              </>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleFileSelect}
            />
          </div>

          {/* File size error */}
          {errorMessage && processingStage !== 'error' && (
            <div className="mt-3 w-full p-3 rounded-xl bg-red-50 border border-red-200/60 flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mt-0.5 flex-shrink-0"><circle cx="12" cy="12" r="10"/><line x1="15" x2="9" y1="9" y2="15"/><line x1="9" x2="15" y1="9" y2="15"/></svg>
              <p className="text-[10px] text-red-700 font-mono">{errorMessage}</p>
            </div>
          )}
        </div>
      </div>

      {/* Panel 3: Result */}
      <div className="w-full lg:w-[40%] p-6 lg:p-8 flex flex-col bg-white text-black relative overflow-hidden border-l border-black/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#527661] rounded-full blur-[100px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>

        <h2 className="font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2 relative z-10">
          <span className="w-6 h-6 rounded-full bg-[#527661]/10 text-[#527661] flex items-center justify-center text-[10px]">3</span>
          Result
        </h2>

        <div className="flex-grow flex flex-col relative z-10">
          <div className="w-full flex-grow bg-[#fafafa] border border-black/5 rounded-[20px] overflow-hidden relative flex flex-col items-center justify-center min-h-[300px]">
            {!previewUrl ? (
              <div className="px-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 text-black/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="10" cy="12" r="2"/><path d="m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22"/></svg>
                </div>
                <p className="text-black/40 font-mono text-[10px] uppercase tracking-widest">Upload a photo to start</p>
              </div>
            ) : isProcessing ? (
              <div className="flex flex-col items-center justify-center gap-4 px-8">
                {/* Animated spinner */}
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-2 border-black/5 rounded-full"></div>
                  <div className="absolute inset-0 border-2 border-transparent border-t-[#527661] rounded-full animate-spin"></div>
                  <div className="absolute inset-2 border-2 border-transparent border-t-[#527661]/50 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                </div>

                {/* Stage indicator */}
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-[#527661] mb-1 animate-pulse">
                    {STAGE_MESSAGES[processingStage]}
                  </p>
                  <p className="text-[9px] text-black/30 font-mono">This may take up to a minute</p>
                </div>

                {/* Step progress */}
                <div className="flex items-center gap-2 mt-2">
                  {(['uploading', 'creating', 'generating'] as ProcessingStage[]).map((stage, i) => (
                    <React.Fragment key={stage}>
                      <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        processingStage === stage ? 'bg-[#527661] scale-125 animate-pulse' :
                        (['uploading', 'creating', 'generating'].indexOf(processingStage) > i) ? 'bg-[#527661]' :
                        'bg-black/10'
                      }`} />
                      {i < 2 && (
                        <div className={`w-8 h-0.5 rounded-full transition-all duration-500 ${
                          (['uploading', 'creating', 'generating'].indexOf(processingStage) > i) ? 'bg-[#527661]' : 'bg-black/10'
                        }`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ) : processingStage === 'error' ? (
              <div className="flex flex-col items-center justify-center gap-3 px-6">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><circle cx="12" cy="12" r="10"/><line x1="15" x2="9" y1="9" y2="15"/><line x1="9" x2="15" y1="9" y2="15"/></svg>
                </div>
                <p className="text-[10px] text-red-600 font-mono text-center max-w-[250px] leading-relaxed">
                  {errorMessage || 'An unexpected error occurred.'}
                </p>
                <button
                  onClick={handleReset}
                  className="mt-2 text-[9px] uppercase tracking-widest font-bold text-black/50 hover:text-black transition-colors underline underline-offset-4"
                >
                  Try Again
                </button>
              </div>
            ) : resultUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={resultUrl} alt="Try-On Result" className="w-full h-full object-cover absolute inset-0" />
                <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-mono border border-black/10 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#527661] animate-pulse"></span>
                  AI Generated
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 p-6">
                <div className="flex -space-x-3">
                  <div className="w-16 h-20 rounded-lg overflow-hidden relative border border-black/10 z-10 bg-white shadow-xl">
                    <Image src={selectedProduct.image} alt="Product" fill className="object-cover" />
                  </div>
                  <div className="w-16 h-20 rounded-lg overflow-hidden relative border border-black/10 z-0 opacity-50 shadow-xl">
                    <Image src={previewUrl} alt="You" fill className="object-cover" />
                  </div>
                </div>
                <p className="text-[10px] text-black/50 font-mono text-center">Ready to generate <br/><span className="text-[#527661] font-bold">{generateType}</span> try-on</p>
              </div>
            )}
          </div>

          <div className="mt-6">
            {processingStage === 'error' ? (
              <button
                onClick={() => {
                  handleReset();
                  handleTryOn();
                }}
                className="w-full py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#527661] text-white hover:bg-[#527661]/90 shadow-[0_0_15px_rgba(82,118,97,0.3)] flex items-center justify-center gap-2 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
                Retry Generation
              </button>
            ) : !resultUrl ? (
              <button
                onClick={handleTryOn}
                disabled={!previewUrl || isProcessing}
                className={`w-full py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                  !previewUrl
                    ? 'bg-black/5 text-black/30 cursor-not-allowed border border-transparent'
                    : isProcessing
                    ? 'bg-[#527661]/10 text-[#527661] cursor-wait border border-transparent'
                    : 'bg-[#527661] text-white hover:bg-[#527661]/90 shadow-[0_0_15px_rgba(82,118,97,0.3)]'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-3 h-3 border border-[#527661]/30 border-t-[#527661] rounded-full animate-spin"></div>
                    Processing…
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                    Generate {generateType}
                  </>
                )}
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleReset();
                    handleTryOn();
                  }}
                  className="flex-1 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-black/10 hover:bg-black/5 transition-colors flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
                  Regenerate
                </button>
                <button
                  onClick={handleDownload}
                  className="flex-[1.5] py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-black text-white hover:bg-black/80 transition-colors shadow-xl flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  Download
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
