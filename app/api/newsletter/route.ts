import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { NewsletterModel } from '@/models/Newsletter';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Upsert to avoid duplicate email errors
    const subscriber = await NewsletterModel.findOneAndUpdate(
      { email: email.trim().toLowerCase() },
      { email: email.trim().toLowerCase(), source: 'homepage' },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to reMeet drops!',
      subscriberId: subscriber._id,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Database error';
    console.error('Newsletter error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

