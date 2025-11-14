import dbConnect from '@/lib/mongodb'
import Course from '@/models/Course'
import { NextResponse, NextRequest } from 'next/server';


export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    const { slug } = params;
    await dbConnect();
    const course = await Course.findOne({ slug });
    return NextResponse.json(course, { status: 200 });
}
