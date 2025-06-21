import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';
import sharp from 'sharp';
import { createClient } from '../../../utils/supabase/server';

// Configure AWS SDK for Wasabi
const s3 = new AWS.S3({
  endpoint: process.env.WASABI_ENDPOINT_URL || 'https://s3.wasabisys.com',
  accessKeyId: process.env.WASABI_ACCESS_KEY_ID,
  secretAccessKey: process.env.WASABI_SECRET_ACCESS_KEY,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
  region: 'eu-central-2',
});

interface UploadRequest {
  filename: string;
  filedata: string;
  contentType?: string;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const { filename, filedata, contentType } = body;

    if (!filename || !filedata) {
      return NextResponse.json({ error: 'filename and filedata are required' }, { status: 400 });
    }

    // Get project ID from environment
    const project_id = process.env.PROJECT_ID;
    if (!project_id) {
      return NextResponse.json({ error: 'PROJECT_ID environment variable is not set' }, { status: 500 });
    }

    // Store in project-specific folder with original filename
    const uniqueFilename = `${project_id}/${filename}`;

    // Validate filename
    if (!filename.match(/^[a-zA-Z0-9._-]+$/)) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

    // Check if bucket exists
    try {
      await s3.headBucket({ Bucket: process.env.WASABI_BUCKET_NAME }).promise();
    } catch (err) {
      throw new Error(`Bucket check failed: ${err.message}`);
    }

    // Decode base64 and process image
    const buffer = Buffer.from(filedata, 'base64');
    
    // Resize image to max 1920px on longest edge
    const resizedBuffer = await sharp(buffer)
      .resize(1920, 1920, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .toBuffer();

    // Create WebP version from resized image
    const webpBuffer = await sharp(resizedBuffer)
      .webp({ quality: 60 })
      .toBuffer();

    // Create medium-sized versions from original buffer
    const mediumBuffer = await sharp(buffer)
      .resize(640, 640, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .toBuffer();

    // Create medium WebP version from medium buffer
    const mediumWebpBuffer = await sharp(mediumBuffer)
      .webp({ quality: 60 })
      .toBuffer();

    // Get filename without extension
    const [name, ext] = filename.split('.');
    const webpFilename = `${project_id}/${name}.webp`;
    const mediumOriginalFilename = `${project_id}/${name}-medium.${ext}`;
    const mediumWebpFilename = `${project_id}/${name}-medium.webp`;

    // Upload original image
    const originalParams = {
      Bucket: process.env.WASABI_BUCKET_NAME,
      Key: uniqueFilename,
      Body: resizedBuffer,
      ContentEncoding: 'base64',
      ContentType: contentType || 'application/octet-stream',
      ACL: 'public-read'
    };

    // Upload WebP version
    const webpParams = {
      Bucket: process.env.WASABI_BUCKET_NAME,
      Key: webpFilename,
      Body: webpBuffer,
      ContentEncoding: 'base64',
      ContentType: 'image/webp',
      ACL: 'public-read'
    };

    // Upload medium original
    const mediumOriginalParams = {
      Bucket: process.env.WASABI_BUCKET_NAME,
      Key: mediumOriginalFilename,
      Body: mediumBuffer,
      ContentEncoding: 'base64',
      ContentType: contentType || 'application/octet-stream',
      ACL: 'public-read'
    };

    // Upload medium WebP
    const mediumWebpParams = {
      Bucket: process.env.WASABI_BUCKET_NAME,
      Key: mediumWebpFilename,
      Body: mediumWebpBuffer,
      ContentEncoding: 'base64',
      ContentType: 'image/webp',
      ACL: 'public-read'
    };

    // Upload all versions
    await Promise.all([
      s3.putObject(originalParams).promise(),
      s3.putObject(webpParams).promise(),
      s3.putObject(mediumOriginalParams).promise(),
      s3.putObject(mediumWebpParams).promise()
    ]);

    // Save to Supabase
    const { data: image, error: storageError } = await supabase
      .from('images')
      .insert({
        user_id: user.id,
        filename: filename,
        thumbnail: `https://${process.env.WASABI_BUCKET_NAME}.s3.wasabisys.com/${mediumOriginalFilename}`,
        project_id: project_id
      })
      .select()
      .single();

    if (storageError) {
      throw new Error(`Failed to save image to Supabase: ${storageError.message}`);
    }

    // Get the public URLs
    const originalUrl = `https://${process.env.WASABI_BUCKET_NAME}.s3.wasabisys.com/${uniqueFilename}`;
    const webpUrl = `https://${process.env.WASABI_BUCKET_NAME}.s3.wasabisys.com/${webpFilename}`;
    const mediumOriginalUrl = `https://${process.env.WASABI_BUCKET_NAME}.s3.wasabisys.com/${mediumOriginalFilename}`;
    const mediumWebpUrl = `https://${process.env.WASABI_BUCKET_NAME}.s3.wasabisys.com/${mediumWebpFilename}`;
    
    return NextResponse.json({ 
      message: 'Upload successful',
      originalUrl: originalUrl,
      webpUrl: webpUrl,
      mediumOriginalUrl: mediumOriginalUrl,
      mediumWebpUrl: mediumWebpUrl,
      originalFilename: filename
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ 
      error: errorMessage,
      details: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}