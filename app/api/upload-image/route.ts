import { NextResponse } from 'next/server';
import { createClient } from '../../../utils/supabase/server';
import sharp from 'sharp';

export async function POST(req: Request) {
  if (!process.env.NEXT_PUBLIC_IMGBB_KEY)
    return NextResponse.json({ error: 'Missing ImgBB key' }, { status: 500 });

  const formData = await req.formData();
  const file = formData.get('image');

  if (!(file instanceof File))
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const originalBuffer = Buffer.from(arrayBuffer);

  // Resize original image to have max 1280px on longest edge
  const resizedBuffer = await sharp(originalBuffer)
    .resize(1920, 1920, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .toBuffer();

  // Convert resized image to WebP with quality 50
  const webpBuffer = await sharp(resizedBuffer).webp({ quality: 80 }).toBuffer();

  const uploadToImgBB = async (buffer: Buffer, name: string) => {
    const base64 = buffer.toString('base64');
    const res = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        key: process.env.NEXT_PUBLIC_IMGBB_KEY!,
        image: base64,
        name,
      }),
    });
    return res.json();
  };

  const [originalRes, webpRes] = await Promise.all([
    uploadToImgBB(resizedBuffer, 'original'),
    uploadToImgBB(webpBuffer, 'webp'),
  ]);

  const original = originalRes.data;
  const webp = webpRes.data;

  if (!original?.url || !webp?.url) {
    return NextResponse.json({ error: 'Failed to upload images to ImgBB' }, { status: 500 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('images')
    .insert({
      user_id: user.id,
      original_url: original.url,
      original_medium_url: original.medium?.url,
      original_thumbnail_url: original.thumb?.url,
      webp_url: webp.url,
      webp_medium_url: webp.medium?.url,
      webp_thumbnail_url: webp.thumb?.url,
    })
    .select();

  if (error || !data?.length) {
    return NextResponse.json({ error: error?.message || 'Failed to save image' }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    imageUrls: {
      original_url: original.url,
      original_medium_url: original.medium?.url,
      original_thumbnail_url: original.thumb?.url,
      webp_url: webp.url,
      webp_medium_url: webp.medium?.url,
      webp_thumbnail_url: webp.thumb?.url,
    },
    supabaseRecord: data[0],
  });
}
