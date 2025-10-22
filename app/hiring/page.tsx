"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type ApplicationPayload = {
  fullName: string;
  email: string;
  location: string;
  role: "Assistant Level Designer" | "Sr Marketing";
  portfolioUrl?: string;
  resumeUrl?: string;
  coverLetter?: string;
  portfolioFile?: File | null;
};

export default function HiringPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<null | string>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload: ApplicationPayload = {
      fullName: String(formData.get("fullName") || ""),
      email: String(formData.get("email") || ""),
      location: String(formData.get("location") || ""),
      role: (String(formData.get("role") || "") as ApplicationPayload["role"]),
      portfolioUrl: String(formData.get("portfolioUrl") || ""),
      resumeUrl: String(formData.get("resumeUrl") || ""),
      coverLetter: String(formData.get("coverLetter") || ""),
      portfolioFile: (formData.get("portfolioFile") as File | null) || null,
    };

    try {
      // Send as multipart/form-data so file can be uploaded
      const multipart = new FormData();
      multipart.set("fullName", payload.fullName);
      multipart.set("email", payload.email);
      multipart.set("location", payload.location);
      multipart.set("role", payload.role);
      if (payload.portfolioUrl) multipart.set("portfolioUrl", payload.portfolioUrl);
      if (payload.resumeUrl) multipart.set("resumeUrl", payload.resumeUrl);
      if (payload.coverLetter) multipart.set("coverLetter", payload.coverLetter);
      if (payload.portfolioFile) multipart.set("portfolioFile", payload.portfolioFile);

      const response = await fetch("/api/apply", {
        method: "POST",
        body: multipart,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Submission failed");
      }
      setSubmitSuccess("Application submitted successfully. We'll be in touch soon.");
      (event.currentTarget as HTMLFormElement).reset();
    } catch (error: any) {
      setErrorMessage(error?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 1.5rem",
        color: "#ffffff",
      }}
    >
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%",
          maxWidth: 860,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16,
          padding: "2rem",
          backdropFilter: "blur(10px)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 36, lineHeight: 1.2 }}>We’re Hiring</h1>
        <p style={{ marginTop: 12, opacity: 0.85 }}>
          Remote-friendly. Preference for candidates located in California, USA.
        </p>

        <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
          <div style={{ opacity: 0.9 }}>
            <strong>Open roles</strong>
            <ul style={{ margin: "8px 0 0 18px" }}>
              <li>Assistant Level Designer</li>
              <li>Sr Marketing</li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ marginTop: 24, display: "grid", gap: 16 }}>
          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="Jane Doe"
              style={{
                padding: "0.8rem 1rem",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(0,0,0,0.25)",
                color: "#fff",
                outline: "none",
              }}
            />
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="jane@example.com"
              style={{
                padding: "0.8rem 1rem",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(0,0,0,0.25)",
                color: "#fff",
                outline: "none",
              }}
            />
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="location">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              required
              placeholder="City, State, Country"
              style={{
                padding: "0.8rem 1rem",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(0,0,0,0.25)",
                color: "#fff",
                outline: "none",
              }}
            />
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              Remote is OK. Preference for California, USA.
            </div>
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              required
              style={{
                padding: "0.8rem 1rem",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(0,0,0,0.25)",
                color: "#fff",
                outline: "none",
              }}
              defaultValue="Assistant Level Designer"
            >
              <option value="Assistant Level Designer">Assistant Level Designer</option>
              <option value="Sr Marketing">Sr Marketing</option>
            </select>
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="portfolioUrl">Portfolio URL (optional)</label>
            <input
              id="portfolioUrl"
              name="portfolioUrl"
              type="url"
              placeholder="https://..."
              style={{
                padding: "0.8rem 1rem",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(0,0,0,0.25)",
                color: "#fff",
                outline: "none",
              }}
            />
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="portfolioFile">Portfolio File (optional)</label>
            <input
              id="portfolioFile"
              name="portfolioFile"
              type="file"
              accept=".pdf,.zip,.rar,.7z,image/*"
              style={{
                padding: "0.6rem 0.8rem",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(0,0,0,0.25)",
                color: "#fff",
                outline: "none",
              }}
            />
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              Accepts PDF, images, or a compressed archive.
            </div>
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="resumeUrl">Resume URL (optional)</label>
            <input
              id="resumeUrl"
              name="resumeUrl"
              type="url"
              placeholder="Link to resume PDF"
              style={{
                padding: "0.8rem 1rem",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(0,0,0,0.25)",
                color: "#fff",
                outline: "none",
              }}
            />
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="coverLetter">Cover letter (optional)</label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              rows={5}
              placeholder="Tell us why you’re a great fit..."
              style={{
                padding: "0.8rem 1rem",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(0,0,0,0.25)",
                color: "#fff",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>

          {submitSuccess && (
            <div style={{ color: "#4ecdc4", fontSize: 14 }}>{submitSuccess}</div>
          )}
          {errorMessage && (
            <div style={{ color: "#ff6b6b", fontSize: 14 }}>{errorMessage}</div>
          )}

          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: "0.9rem 1.6rem",
                borderRadius: 999,
                border: "none",
                background: isSubmitting
                  ? "linear-gradient(135deg,#88dcd6,#7fbfe0)"
                  : "linear-gradient(135deg,#4ecdc4,#44a3d5)",
                color: "#fff",
                fontWeight: 700,
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit application"}
            </button>
          </div>
        </form>
      </motion.section>
    </main>
  );
}


