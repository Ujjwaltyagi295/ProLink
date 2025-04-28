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
  resourceType: "image" | "raw" | "auto",
  options: Record<string, any> = {}
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      resource_type: resourceType,
      folder: "PROLINK_CONTENT",
      ...options
    };
    
    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
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
    
    appAssert(file, NOT_FOUND, "No file provided");
    
    const cloudinaryUrls: string[] = [];
    
    const isImage = file.mimetype.startsWith("image/");
    const isPdf = file.mimetype === "application/pdf";
    
    appAssert(
      isImage || isPdf,
      UNPROCESSABLE_CONTENT,
      "Only image and PDF files are supported"
    );
    
    try {
      let url: string;
      
      if (isImage) {
        
        const resizedBuffer = await sharp(file.buffer)
          .resize({ width: 800, height: 600 })
          .toBuffer();
        url = await uploadToCloudinarySingle(resizedBuffer, "image");
        cloudinaryUrls.push(url);
      } else {
      
        url = await uploadToCloudinarySingle(file.buffer, "image");
     
        const baseUrl = url.split(/\.[^/.]+$/)[0]; 
        const viewUrl = `${baseUrl}.jpg`;
        
      
        req.body.pdfUrl = url;
        req.body.pdfViewUrl = viewUrl;
        cloudinaryUrls.push(url);
        cloudinaryUrls.push(viewUrl);
      }
      
      req.body.cloudinaryUrls = cloudinaryUrls;
      next();
    } catch (err) {
      throw new Error(`File upload failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
);