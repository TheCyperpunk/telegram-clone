import mongoose from 'mongoose';
import { User } from '../src/lib/models/User';
import dotenv from 'dotenv';

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    const adminUser = await User.findOne({ role: 'admin' });
    
    if (adminUser) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const admin = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'adminpassword123', // Change this!
      role: 'admin'
    });

    console.log('Admin user created:', admin.username);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin(); 