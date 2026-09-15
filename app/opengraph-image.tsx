import { ImageResponse } from "next/og";

// Applied automatically as the Open Graph + Twitter preview image for the
// whole site (1200×630). Rendered with the default font so builds stay
// hermetic (no external font fetch).
export const runtime = "nodejs";
export const alt =
  "BOJ Technologies Limited — Technology Solutions Built for Growth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#03102e",
          padding: 72,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -120,
            width: 540,
            height: 540,
            borderRadius: "50%",
            display: "flex",
            background:
              "radial-gradient(closest-side, rgba(0,96,252,0.45), rgba(0,96,252,0))",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -180,
            left: -120,
            width: 540,
            height: 540,
            borderRadius: "50%",
            display: "flex",
            background:
              "radial-gradient(closest-side, rgba(34,200,238,0.32), rgba(34,200,238,0))",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 76,
              height: 76,
              borderRadius: 22,
              color: "white",
              fontSize: 38,
              fontWeight: 800,
              background: "linear-gradient(135deg,#0060fc,#22c8ee)",
            }}
          >
            B
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "white", fontSize: 32, fontWeight: 800 }}>
              BOJ Technologies
            </span>
            <span
              style={{
                color: "#66e1f9",
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: 5,
              }}
            >
              LIMITED
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span
            style={{
              color: "white",
              fontSize: 70,
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 940,
            }}
          >
            Technology Solutions Built for Growth
          </span>
          <span style={{ color: "#9db3d1", fontSize: 28, maxWidth: 840, lineHeight: 1.35 }}>
            Software, web &amp; mobile, POS, networking, Wi-Fi and IT solutions
            for businesses across Kenya.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#6b88b0",
            fontSize: 24,
          }}
        >
          <span>bojtechnologies.com</span>
          <span>•</span>
          <span>Migori, Kenya</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
