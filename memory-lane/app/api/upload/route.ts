import { google } from "googleapis";
import { NextResponse } from "next/server";
import { Readable } from "stream";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // 🔥 Get fields from form
    const name = formData.get("name") as string;
    const roll = formData.get("roll") as string;
    const email = formData.get("email") as string;
    const event = formData.get("event") as string;
    const file = formData.get("file") as File;

    // ✅ Validation
    if (!name || !roll || !email || !file) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields",
      });
    }

    // 🔥 Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert buffer → stream
    const stream = Readable.from(buffer);

    // 🔥 Google Auth (FIXED)
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const drive = google.drive({
      version: "v3",
      auth,
    });

    // 🔥 Upload file to YOUR folder (IMPORTANT)
    const response = await drive.files.create({
      requestBody: {
        name: `${name}_${roll}_${file.name}`,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!], // ✅ MUST BE SET
      },
      media: {
        mimeType: file.type,
        body: stream,
      },
    });

    return NextResponse.json({
      success: true,
      fileId: response.data.id,
    });

  } catch (error: any) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json({
      success: false,
      error: error.message || "Upload failed",
    });
  }
}
