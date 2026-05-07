import { Router } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

// ⚠️ Update these two imports to match your actual Drizzle setup!
import { db } from "@workspace/db"; 
import { reactions } from "@workspace/db/schema"; 

const router = Router();

// Configure multer to keep the file in memory temporarily while we upload it
const upload = multer({ storage: multer.memoryStorage() });

router.post("/save-reaction", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No video file provided" });
    }

    // 1. Upload the video stream directly to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          resource_type: "video", 
          folder: "ve_birthday_reactions" // It will create this folder in your Cloudinary!
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      
      uploadStream.end(req.file.buffer);
    });

    const videoUrl = (uploadResult as any).secure_url;

    // 2. Save the URL to PostgreSQL using Drizzle
    // ⚠️ Update the column names below to match what you named them in your schema!
    await db.insert(reactions).values({
      videoUrl: videoUrl,
      timestamp: req.body.timestamp || new Date().toISOString(),
    });

    return res.status(200).json({ success: true, url: videoUrl });

  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Failed to process video" });
  }
});

export default router;