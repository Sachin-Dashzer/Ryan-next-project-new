import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import os from 'os';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const tempFilePath = path.join(os.tmpdir(), file.name);
  await writeFile(tempFilePath, buffer);

  try {
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: 'uploads',
    });

    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    return NextResponse.json({
      error: 'Cloudinary upload failed',
      details: err.message,
    }, { status: 500 });
  }
}
