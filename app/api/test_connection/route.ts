import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/mongodb";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export async function GET(){
    try{
        await connectToDatabase();
        const users = await User.find();
        return NextResponse.json(users)
    } catch (error){
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Failed to fetch users', details: error.message }, { status: 500 });
          } else {
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
          }
    }
}