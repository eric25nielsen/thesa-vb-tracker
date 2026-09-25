import { NextResponse } from 'next/server';

const AES_BASE_URL = 'https://results.advancedeventsystems.com/api/event/RGFsbGFzX0FuZ2Vsc19DbGFzc2ljXzIwMjY1';

function isJsonResponse(text: string): boolean {
  const trimmed = text.trim();
  return (trimmed.startsWith('{') || trimmed.startsWith('[')) && !trimmed.includes('<!doctype');
}

export async function GET() {
  const endpoints = [
    { name: 'Event Info', url: AES_BASE_URL },
    { name: 'MS Teams', url: `${AES_BASE_URL}/division/-50016/teams` },
    { name: 'JV Teams', url: `${AES_BASE_URL}/division/-50018/teams` },
    { name: 'Var Teams', url: `${AES_BASE_URL}/division/-50019/teams` },
    { name: 'Pool Matches', url: `${AES_BASE_URL}/pool-matches` },
    { name: 'Bracket Matches', url: `${AES_BASE_URL}/bracket-matches` },
    { name: 'MS Pools', url: `${AES_BASE_URL}/division/-50016/pools` },
  ];

  const results = await Promise.all(
    endpoints.map(async (endpoint) => {
      try {
        const response = await fetch(endpoint.url, {
          headers: { 
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://results.advancedeventsystems.com/'
          },
          next: { revalidate: 0 }
        });

        if (response.ok) {
          const text = await response.text();
          const isJson = isJsonResponse(text);
          
          let sampleKeys: string[] = [];
          if (isJson) {
            try {
              const data = JSON.parse(text);
              if (Array.isArray(data)) {
                sampleKeys = data.length > 0 ? Object.keys(data[0]) : ['(empty array)'];
              } else if (typeof data === 'object') {
                sampleKeys = Object.keys(data);
              }
            } catch (e) {
              // ignore
            }
          }

          return {
            name: endpoint.name,
            url: endpoint.url,
            status: response.status,
            responseType: isJson ? 'JSON' : 'HTML',
            working: isJson,
            sampleKeys: sampleKeys.length > 0 ? sampleKeys.slice(0, 10) : undefined,
            dataCount: isJson && text.startsWith('[') ? JSON.parse(text).length : undefined
          };
        } else {
          return {
            name: endpoint.name,
            url: endpoint.url,
            status: response.status,
            responseType: 'Error',
            working: false,
            error: `HTTP ${response.status}`
          };
        }
      } catch (error) {
        return {
          name: endpoint.name,
          url: endpoint.url,
          status: 0,
          responseType: 'Error',
          working: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    })
  );

  const workingEndpoints = results.filter(r => r.working);
  const notPublishedEndpoints = results.filter(r => !r.working && r.responseType === 'HTML');
  const errorEndpoints = results.filter(r => !r.working && r.responseType === 'Error');

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    summary: {
      total: endpoints.length,
      working: workingEndpoints.length,
      notPublished: notPublishedEndpoints.length,
      errors: errorEndpoints.length
    },
    endpoints: results,
    status: workingEndpoints.length > 0 ? 'partial' : notPublishedEndpoints.length === endpoints.length ? 'not_published' : 'error'
  }, {
    headers: {
      'Cache-Control': 'no-store'
    }
  });
}
