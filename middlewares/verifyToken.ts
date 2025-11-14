import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export default async function verifyToken(req: NextRequest): Promise<NextResponse> {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        console.error("JWT_SECRET is not defined");
        return NextResponse.json({ success: false, message: "Server configuration error" }, { status: 500 });
    }

    let token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json({ success: false, message: "Access Denied" }, { status: 403 });
    }

    try {
        const encoder = new TextEncoder();
        const { payload } = await jwtVerify(token, encoder.encode(JWT_SECRET));
        
        const response = NextResponse.next();
        response.headers.set('x-user', JSON.stringify(payload));

        return response;
    } catch (error) {
        console.error("Token verification failed:", error);
        return NextResponse.json({ success: false, message: "Invalid Token" }, { status: 401 });
    }
}
