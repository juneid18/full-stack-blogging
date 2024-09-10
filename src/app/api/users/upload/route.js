import { NextResponse } from "next/server";
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
});

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({
        folder: "uploads",
        quality: "80", // Automatically adjusts quality
        fetch_format: "webp",
        dpr: "2.0",
      }, (error, result) => {
        if (error) {
          return reject(new Error("Cloudinary upload failed: " + error.message));
        }
        resolve(result);
      }).end(buffer);
    });

    return NextResponse.json({
      success: true,
      name: result.original_filename || 'File',
      url: result.secure_url || 'No URL provided',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message });
  }
};
