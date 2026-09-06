import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo/config";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") || SITE_NAME).slice(0, 140);
  const tag = searchParams.get("tag")?.slice(0, 40);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#faf7f1",
          backgroundImage:
            "linear-gradient(135deg, #faf7f1 0%, #f3ede1 55%, #e4ddce 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: "#1f3a2c",
              display: "flex",
            }}
          />
          <span style={{ fontSize: 28, fontWeight: 700, color: "#1f3a2c" }}>
            {SITE_NAME}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 980 }}>
          {tag ? (
            <span
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: "#4a6b52",
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {tag}
            </span>
          ) : null}
          <span
            style={{
              fontSize: 58,
              lineHeight: 1.15,
              fontWeight: 700,
              color: "#23281f",
            }}
          >
            {title}
          </span>
        </div>

        <span style={{ fontSize: 22, color: "#52584a" }}>manatureai.com</span>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
