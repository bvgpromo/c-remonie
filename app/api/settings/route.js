import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    let settings = await prisma.settings.findFirst();
    
    // If no settings exist yet, create default settings
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          id: 1,
        }
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    
    // Ensure settings exist first
    let settings = await prisma.settings.findFirst();
    if (!settings) {
      await prisma.settings.create({ data: { id: 1 } });
    }

    const updatedSettings = await prisma.settings.update({
      where: { id: 1 },
      data: {
        address: data.address,
        phone1: data.phone1,
        phone2: data.phone2,
        whatsapp: data.whatsapp,
        email: data.email,
      },
    });

    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
