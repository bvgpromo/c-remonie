import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text') || '';
    
    // Fetch settings to get dynamic WhatsApp number
    let settings = await prisma.settings.findFirst();
    
    // Default fallback if settings aren't initialized yet
    const whatsappNumber = settings?.whatsapp || "50940000000";
    
    // Construct the wa.me URL
    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
    
    // Redirect the user
    return NextResponse.redirect(waUrl);
  } catch (error) {
    console.error('Error redirecting to WhatsApp:', error);
    // Fallback to default in case of DB error
    return NextResponse.redirect(`https://wa.me/50940000000`);
  }
}
