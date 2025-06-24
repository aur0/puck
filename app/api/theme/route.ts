import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(request: Request) {
  try {
    const { colorPrimary } = await request.json();
    
    if (!colorPrimary || typeof colorPrimary !== 'string') {
      return NextResponse.json({ error: 'Invalid color value' }, { status: 400 });
    }

    const themePath = path.join(process.cwd(), 'theme.json');
    const theme = { colorPrimary };
    
    await fs.writeFile(themePath, JSON.stringify(theme, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating theme:', error);
    return NextResponse.json({ error: 'Failed to update theme' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const themePath = path.join(process.cwd(), 'theme.json');
    const theme = await fs.readFile(themePath, 'utf-8');
    return NextResponse.json(JSON.parse(theme));
  } catch (error) {
    console.error('Error fetching theme:', error);
    return NextResponse.json({ error: 'Failed to fetch theme' }, { status: 500 });
  }
}