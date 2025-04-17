import dotenv from "dotenv";
import multer, { Multer } from 'multer';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import sharp from 'sharp';
import catchErrors from "../../utils/catchErrors";
import appAssert from "../../utils/appAssert";
import { NOT_FOUND, UNPROCESSABLE_CONTENT } from "../../constants/http";
import { Request, Response } from "express";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "../../constants/env";

dotenv.config();

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME, 
  api_key: CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_API_SECRET,
});
interface CloudinaryFile extends Express.Multer.File {
  buffer: Buffer;
}

const storage = multer.memoryStorage();
export const upload: Multer = multer({ storage });

const uploadToCloudinarySingle = (buffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: 'PROLINK_CONTENT',
      },
      (err, result) => {
        if (err || !result) {
          reject(`Cloudinary upload error: ${err?.message || 'Unknown error'}`);
        } else {
          resolve(result.secure_url);
        }
      }
    );
    uploadStream.end(buffer);
  });
};export const uploadToCloudinary = catchErrors(
  async (req, res, next) => {
    const file = req.file as CloudinaryFile;

    // Assert that the file exists
    appAssert(file, NOT_FOUND, 'No file provided');

    const cloudinaryUrls: string[] = [];

    // Resize and upload the single file to Cloudinary
    const resizedBuffer = await sharp(file.buffer)
      .resize({ width: 800, height: 600 })
      .toBuffer();

    const url = await uploadToCloudinarySingle(resizedBuffer).catch((err) => {
      // Handle the error
      appAssert(true, UNPROCESSABLE_CONTENT, err);
    });

    cloudinaryUrls.push(url as string);

    req.body.cloudinaryUrls = cloudinaryUrls;
    next(); 
  }
);
