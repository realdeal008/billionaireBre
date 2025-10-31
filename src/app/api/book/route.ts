import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json();

    console.log('Booking data received:', bookingData);

    // Forward to the Rust backend
    const backendUrl = process.env.NODE_ENV === 'production'
      ? 'https://booking-backend-realdeal008s-projects.vercel.app/book'  // Updated with actual Vercel URL
      : 'http://localhost:8000/book';  // For local development

    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({ error: 'Backend booking failed' }));
      return NextResponse.json(errorData, { status: backendResponse.status });
    }

    const result = await backendResponse.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    );
  }
}
