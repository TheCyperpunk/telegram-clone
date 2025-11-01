import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { User } from '../src/lib/models/User';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

async function initDB() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Connected to MongoDB successfully');

    // Clear existing users
    console.log('Clearing existing users...');
    await User.deleteMany({});
    console.log('Existing users cleared');

    // Create admin user
    const admin = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'adminpass123',
      role: 'admin'
    });
    console.log('Admin user created:', admin.username);

    // Create test user
    const testUser = await User.create({
      username: 'kiran',
      email: 'kiranpeter999@gmail.com',
      password: '1234qwer',
      role: 'user'
    });
    console.log('Test user created:', testUser.username);

    // Create other test users
    const testUsers = [
      { username: 'user1', email: 'user1@example.com', password: 'password123' },
      { username: 'user2', email: 'user2@example.com', password: 'password123' }
    ];

    for (const userData of testUsers) {
      const user = await User.create(userData);
      console.log('Test user created:', user.username);
    }

    console.log('Database initialization completed');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDB(); 