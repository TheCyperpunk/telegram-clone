import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User } from '@/lib/models/User';
import mongoose from 'mongoose';

export async function GET() {
  try {
    // Check MongoDB connection
    await connectDB();
    const dbState = mongoose.connection.readyState;
    const dbStatusMap: Record<number, string> = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting"
    };
    const dbStatus = dbStatusMap[dbState] || "unknown";

    // Get all users (excluding passwords)
    const users = await User.find({}, { password: 0 });

    return NextResponse.json({
      dbConnection: dbStatus,
      mongodbUri: process.env.MONGODB_URI?.split('@')[1] || 'not set', // Safe display of URI
      usersCount: users.length,
      users: users.map(u => ({ email: u.email, username: u.username }))
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({
      error: 'Failed to check database status',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}