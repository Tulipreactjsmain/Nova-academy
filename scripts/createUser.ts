import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function createUser(username: string, email: string, password: string, role: 'user' | 'admin' = 'user') {
  try {
    // Connect to MongoDB
    // const connectionString = process.env.NODE_ENV === "development" ? "mongodb://localhost:27017/stardelite-academy" : process.env.MONGODB_URI as string;
    // await mongoose.connect("mongodb://localhost:27017/stardelite-academy");
    const connectionString = process.env.MONGODB_URI as string;
    await mongoose.connect(connectionString);
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      console.error('User with this email or username already exists');
      process.exit(1);
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      role
    });

    await user.save();
    console.log('User created successfully!');
    console.log({
      username: user.username,
      email: user.email,
      role: user.role
    });

  } catch (error) {
    console.error('Error creating user:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

// Get command line arguments
const args = process.argv.slice(2);
if (args.length < 3) {
  console.error('Usage: ts-node createUser.ts <username> <email> <password> [role]');
  process.exit(1);
}

const [username, email, password, role] = args;
createUser(username, email, password, role as 'user' | 'admin'); 

// ts-node createUser.ts emeka08 emeka@gmail.com emeka123456789 admin