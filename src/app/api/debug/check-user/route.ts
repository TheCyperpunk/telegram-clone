import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User } from '@/lib/models/User';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter is required' });
    }

    const user = await User.findOne({ email }, { password: 0 });
    if (!user) {
      return NextResponse.json({ message: 'User not found' });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({ error: 'Failed to check user' });
  }
} 