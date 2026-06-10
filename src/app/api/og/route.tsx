import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const WIDTH = 1200;
const HEIGHT = 630;

function clamp(value: string, max: number): string {
  const trimmed = value.trim();
  return trimmed.length > max ? `${trimmed.slice(0, max - 1).trimEnd()}…` : trimmed;
}

export function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = clamp(searchParams.get('title') || 'Exowz', 60);
  const subtitle = clamp(searchParams.get('subtitle') || '', 140);
  const badge = clamp(searchParams.get('badge') || 'Portfolio', 28);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: 64,
          background: 'linear-gradient(135deg, #0b1120 0%, #111827 55%, #1e293b 100%)',
          color: '#f8fafc',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Window chrome */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            borderRadius: 24,
            border: '1px solid rgba(148, 163, 184, 0.25)',
            background: 'rgba(15, 23, 42, 0.6)',
            overflow: 'hidden',
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '20px 28px',
              borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
              background: 'rgba(30, 41, 59, 0.6)',
            }}
          >
            <div style={{ width: 16, height: 16, borderRadius: 999, background: '#ff5f57' }} />
            <div style={{ width: 16, height: 16, borderRadius: 999, background: '#febc2e' }} />
            <div style={{ width: 16, height: 16, borderRadius: 999, background: '#28c840' }} />
            <div style={{ marginLeft: 16, fontSize: 24, color: '#94a3b8' }}>
              {`${title}.window`}
            </div>
          </div>

          {/* Body */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              padding: '48px 56px',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 34,
                color: '#38bdf8',
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginBottom: 24,
              }}
            >
              {badge}
            </div>
            <div style={{ display: 'flex', fontSize: 82, fontWeight: 700, lineHeight: 1.05 }}>
              {title}
            </div>
            {subtitle ? (
              <div
                style={{
                  display: 'flex',
                  fontSize: 38,
                  color: '#cbd5e1',
                  marginTop: 28,
                  lineHeight: 1.3,
                }}
              >
                {subtitle}
              </div>
            ) : null}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 28,
            fontSize: 30,
            color: '#94a3b8',
          }}
        >
          <div style={{ display: 'flex', fontWeight: 600, color: '#f8fafc' }}>Exowz</div>
          <div style={{ display: 'flex' }}>mke-kapoor.com</div>
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT },
  );
}
