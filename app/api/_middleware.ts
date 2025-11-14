import { NextRequest, NextResponse } from 'next/server';
import helmet from 'helmet';

export function middleware(req: NextRequest): NextResponse {
  const res = {} as any; 
  helmet()(req as any, res as any, () => {}); 
  const response = NextResponse.next();
  Object.entries(res.headers || {}).forEach(([key, value]) => {
    response.headers.set(key, value as string);
  });

  return response;
}
