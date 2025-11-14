import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { username, password } = await req.json();
    const user = await User.findOne({ username });

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "Invalid username " },
        { status: 401 }
      );
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60, // 1 hour in seconds
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" }, { status: 400 });
  }
}
