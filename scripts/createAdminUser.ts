import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

async function createAdminUser() {
  try {
    await dbConnect();
    
    // Check if admin user exists
    const adminUser = await User.findOne({ username: "admin" });
    
    if (!adminUser) {
      // Create admin user if it doesn't exist
      await User.create({
        username: "admin",
        email: "admin@stardeliteacademy.com",
        password: "adminpassword123",
        role: "admin"
      });
      console.log("Admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }
    
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
}

createAdminUser(); 