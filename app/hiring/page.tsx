"use client";

import { motion } from "framer-motion";

export default function HiringPage() {
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

          <div style={{ opacity: 0.9 }}>
            <strong>What to send</strong>
            <ul style={{ margin: "8px 0 0 18px" }}>
              <li>Short intro (who you are, location, availability)</li>
              <li>Portfolio link (GitHub, ArtStation, personal site, etc.)</li>
              <li>Resume/CV link (optional)</li>
            </ul>
          </div>

          <div style={{ opacity: 0.9 }}>
            <strong>Where to send</strong>
            <p style={{ margin: "8px 0 0" }}>Email: <a href="mailto:meemosmagic@gmail.com" style={{ color: "#4ecdc4" }}>meemosmagic@gmail.com</a></p>
            <p style={{ margin: "4px 0 0", opacity: 0.8 }}>Subject: “Application — [Role] — [Your Name]”</p>
          </div>

          <div style={{ opacity: 0.9, marginTop: 8 }}>
            <h2 style={{ margin: "18px 0 8px", fontSize: 24 }}>Assistant Level Designer</h2>
            <h3 style={{ margin: "10px 0 6px", fontSize: 18, opacity: 0.9 }}>Responsibilities</h3>
            <ul style={{ margin: "6px 0 0 18px" }}>
              <li>Build and polish levels from blockout to ship-quality inside Unity.</li>
              <li>Compose scenes with strong readability, lighting, and player guidance.</li>
              <li>Optimize scenes for performance (draw calls, LODs, lightmaps, occlusion).</li>
              <li>Collaborate with art/engineering to integrate assets, materials, and FX.</li>
              <li>Maintain clean scene hierarchies, prefabs, and naming conventions.</li>
              <li>Use version control (Git) and follow review/checklist processes.</li>
            </ul>
            <h3 style={{ margin: "14px 0 6px", fontSize: 18, opacity: 0.9 }}>Requirements</h3>
            <ul style={{ margin: "6px 0 0 18px" }}>
              <li><strong>Proficiency in Blender</strong> for hard-surface/organic modeling, UV unwrapping, baking.</li>
              <li><strong>Working knowledge of Unity</strong>: scenes, prefabs, lighting, materials, post-processing.</li>
              <li><strong>Mastery in texturing</strong> (hand-painted and/or PBR), trim sheets, atlases, UV layout.</li>
              <li>Real-time optimization: topology, polycount, lightmap UVs, LODs, batching fundamentals.</li>
              <li>Level design fundamentals: layout, pacing, landmarks, navigation, player experience.</li>
              <li>Basic understanding of rigging/animation pipelines and import settings.</li>
              <li>Nice-to-have: Substance Painter/Designer, Photoshop, Marmoset Toolbag.</li>
              <li>Clear communication, ownership mindset, and attention to detail.</li>
            </ul>
          </div>

          <div style={{ opacity: 0.9, marginTop: 8 }}>
            <h2 style={{ margin: "18px 0 8px", fontSize: 24 }}>Sr Marketing</h2>
            <h3 style={{ margin: "10px 0 6px", fontSize: 18, opacity: 0.9 }}>Responsibilities</h3>
            <ul style={{ margin: "6px 0 0 18px" }}>
              <li>Own GTM plans, campaign strategy, and growth experiments end-to-end.</li>
              <li>Drive content calendars and social channels (X/Twitter, Telegram, etc.).</li>
              <li>Lead creator/KOL partnerships, PR, collabs, and community initiatives.</li>
              <li>Manage paid performance (where applicable) and track ROI with analytics.</li>
              <li>Define KPIs/OKRs, build dashboards, and report insights to the team.</li>
            </ul>
            <h3 style={{ margin: "14px 0 6px", fontSize: 18, opacity: 0.9 }}>Requirements</h3>
            <ul style={{ margin: "6px 0 0 18px" }}>
              <li>5+ years in growth/brand/marketing (web3/gaming a strong plus), or equivalent impact.</li>
              <li>Proven track record: case studies showing user growth or monetization wins.</li>
              <li>Deep knowledge of X/Twitter and Telegram growth loops; community-building chops.</li>
              <li>Hands-on with paid acquisition (X Ads/Meta/Reddit), tracking, and attribution.</li>
              <li>Excellent copywriting, narrative, and creative brief writing; strong visual taste.</li>
              <li>Comfort with GA4/Mixpanel (or similar), UTM discipline, and cohort analysis.</li>
              <li>Familiarity with crypto/web3 culture and compliance basics; trend-aware.</li>
              <li>Superb communication; comfortable working async with a fast-moving team.</li>
            </ul>
          </div>
          </div>
      </motion.section>
    </main>
  );
}


