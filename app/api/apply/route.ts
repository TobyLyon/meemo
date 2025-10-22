import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export const runtime = "nodejs";

type ApplicationPayload = {
  fullName: string;
  email: string;
  location: string;
  role: "Assistant Level Designer" | "Sr Marketing";
  portfolioUrl?: string;
  resumeUrl?: string;
  coverLetter?: string;
};

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const fullName = String(form.get("fullName") || "");
    const email = String(form.get("email") || "");
    const location = String(form.get("location") || "");
    const role = String(form.get("role") || "");
    const portfolioUrl = String(form.get("portfolioUrl") || "");
    const resumeUrl = String(form.get("resumeUrl") || "");
    const coverLetter = String(form.get("coverLetter") || "");
    const portfolioFile = form.get("portfolioFile") as File | null;

    if (!fullName || !email || !location || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Minimal validation
    const emailValid = /.+@.+\..+/.test(String(email));
    if (!emailValid) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Build email content
    const subject = `New Application: ${role} - ${fullName}`;
    const textBody = `A new application has been submitted.\n\nName: ${fullName}\nEmail: ${email}\nLocation: ${location}\nRole: ${role}\nPortfolio URL: ${portfolioUrl || "(none)"}\nResume URL: ${resumeUrl || "(none)"}\n\nCover Letter:\n${coverLetter || "(none)"}\n`;

    // Transport: configure via environment variables for security
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Boolean(process.env.SMTP_SECURE === "true"),
      auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      } : undefined,
    });

    const attachments: Array<{ filename: string; content: Buffer; contentType?: string; }> = [];
    if (portfolioFile && typeof portfolioFile.arrayBuffer === "function") {
      const bytes = await portfolioFile.arrayBuffer();
      attachments.push({
        filename: portfolioFile.name || "portfolio",
        content: Buffer.from(bytes),
        contentType: portfolioFile.type || undefined,
      });
    }

    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER || "no-reply@meemo.local",
      to: "meemomagic@gmail.com",
      replyTo: email,
      subject,
      text: textBody,
      attachments,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to process application" },
      { status: 500 }
    );
  }
}


