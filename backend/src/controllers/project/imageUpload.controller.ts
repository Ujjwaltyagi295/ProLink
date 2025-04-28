import dotenv from "dotenv";
import multer, { Multer } from "multer";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";
import catchErrors from "../../utils/catchErrors";
import appAssert from "../../utils/appAssert";
import { NOT_FOUND, UNPROCESSABLE_CONTENT } from "../../constants/http";
import { Request, Response, NextFunction } from "express";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../../constants/env";

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

const uploadToCloudinarySingle = (
  buffer: Buffer,
  resourceType: "image" | "raw"
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType,
        folder: "PROLINK_CONTENT",
      },
      (err, result) => {
        if (err || !result) {
          reject(
            `Cloudinary upload error: ${err?.message || "Unknown error"}`
          );
        } else {
          resolve(result.secure_url);
        }
      }
    );
    uploadStream.end(buffer);
  });
};

export const uploadToCloudinary = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file as CloudinaryFile;

    // Assert that the file exists
    appAssert(file, NOT_FOUND, "No file provided");

    const cloudinaryUrls: string[] = [];

    // Detect file type
    const isImage = file.mimetype.startsWith("image/");
    const isPdf = file.mimetype === "application/pdf";

    appAssert(
      isImage || isPdf,
      UNPROCESSABLE_CONTENT,
      "Only image and PDF files are supported"
    );

    let url: string;

    try {
      if (isImage) {
        // Resize and upload the image
        const resizedBuffer = await sharp(file.buffer)
          .resize({ width: 800, height: 600 })
          .toBuffer();

        url = await uploadToCloudinarySingle(resizedBuffer, "image");
      } else {
        // Upload PDF directly
        url = await uploadToCloudinarySingle(file.buffer, "raw");
      }

      cloudinaryUrls.push(url);
      req.body.cloudinaryUrls = cloudinaryUrls;
      next();
    } catch (err) {
      throw new Error(`File upload failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
);
