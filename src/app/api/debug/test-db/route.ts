import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User } from '@/lib/models/User';

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}, { password: 0 });
    
    return NextResponse.json({
      status: 'connected',
      userCount: users.length,
      users: users.map(u => ({ 
        username: u.username,
        email: u.email,
        role: u.role 
      }))
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 