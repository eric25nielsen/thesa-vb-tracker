import { NextRequest, NextResponse } from 'next/server';

const AES_BASE = 'https://results.advancedeventsystems.com/api/event/RGFsbGFzX0FuZ2Vsc19DbGFzc2ljXzIwMjY1';

function isJsonResponse(text: string): boolean {
  const trimmed = text.trim();
  return (trimmed.startsWith('{') || trimmed.startsWith('[')) && !trimmed.includes('<!doctype');
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || '';

  const url = path ? `${AES_BASE}${path}` : AES_BASE;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://results.advancedeventsystems.com/'
      },
      next: { revalidate: 60 }
    });

    const text = await response.text();

    if (response.status === 403) {
      return NextResponse.json({ 
        status: 'error', 
        error: 'Server blocked by AES' 
      });
    }

    if (response.ok) {
      if (isJsonResponse(text)) {
        try {
          const data = JSON.parse(text);
          return NextResponse.json({ status: 'ok', data });
        } catch (e) {
          return NextResponse.json({ status: 'error', error: 'Invalid JSON' });
        }
      } else {
        return NextResponse.json({ status: 'not_published' });
      }
    }

    return NextResponse.json({ 
      status: 'error', 
      error: `HTTP ${response.status}` 
    });

  } catch (error) {
    return NextResponse.json({ 
      status: 'error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}
