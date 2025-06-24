import { NextResponse } from 'next/server';
import fs from 'fs';

export async function POST(request: Request) {
  try {
    const { colorPrimary } = await request.json();
    
    if (!colorPrimary || typeof colorPrimary !== 'string') {
      return NextResponse.json({ error: 'Invalid color value' }, { status: 400 });
    }

    const themeData = {
      colorPrimary
    };

    const themePath = 'theme.json';
    
    // Create file if it doesn't exist
    if (!fs.existsSync(themePath)) {
      fs.writeFileSync(themePath, JSON.stringify(themeData, null, 2));
    } else {
      // Read existing data and update
      const existingData = JSON.parse(fs.readFileSync(themePath, 'utf-8'));
      const updatedData = { ...existingData, ...themeData };
      fs.writeFileSync(themePath, JSON.stringify(updatedData, null, 2));
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating theme:', error);
    return NextResponse.json({ error: 'Failed to update theme' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const themePath = 'theme.json';
    
    // Return default theme if file doesn't exist
    if (!fs.existsSync(themePath)) {
      return NextResponse.json({ colorPrimary: '#000000' });
    }

    const theme = JSON.parse(fs.readFileSync(themePath, 'utf-8'));
    return NextResponse.json(theme);
  } catch (error) {
    console.error('Error fetching theme:', error);
    return NextResponse.json({ error: 'Failed to fetch theme' }, { status: 500 });
  }
}