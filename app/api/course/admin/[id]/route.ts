import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';
import verifyToken from '@/middlewares/verifyToken';
import adminOnly from '@/middlewares/adminOnly';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    // Verify the token
    const tokenVerification = await verifyToken(req);
    if (!tokenVerification.ok) {
        return tokenVerification; // Return the NextResponse directly
    }

    // Check if the user is an admin
    const adminCheck = await adminOnly(req);
    if (!adminCheck.ok) {
        return adminCheck; // Return the NextResponse directly
    }

    try {
        await dbConnect();
        const { id } = params;

        if (!id) {
            return NextResponse.json({ success: false, message: 'Course ID is required' }, { status: 400 });
        }

        const deletedCourse = await Course.findByIdAndDelete(id);
        if (!deletedCourse) {
            return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: deletedCourse }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, message: 'Something went wrong.', error: error.message }, { status: 500 });
        }
        return NextResponse.json({ success: false, message: 'An unknown error occurred.' }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    // Verify the token
    const tokenVerification = await verifyToken(req);
    if (!tokenVerification.ok) {
        return tokenVerification; // Return the NextResponse directly
    }

    // Check if the user is an admin
    const adminCheck = await adminOnly(req);
    if (!adminCheck.ok) {
        return adminCheck; // Return the NextResponse directly
    }

    try {
        await dbConnect();
        const { id } = params;

        if (!id) {
            return NextResponse.json({ success: false, message: 'Course ID is required' }, { status: 400 });
        }

        const body = await req.json();
        const updatedCourse = await Course.findByIdAndUpdate(id, body, { new: true });
        if (!updatedCourse) {
            return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedCourse }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, message: 'Something went wrong.', error: error.message }, { status: 500 });
        }
        return NextResponse.json({ success: false, message: 'An unknown error occurred.' }, { status: 500 });
    }
}
