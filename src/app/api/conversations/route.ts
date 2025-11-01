import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Conversation } from '@/lib/models';
import { getServerSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    await connectDB();
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const conversations = await Conversation.find({
      participants: session.userId
    })
    .populate('participants', 'username avatar isOnline')
    .populate('lastMessage')
    .sort({ updatedAt: -1 });

    return NextResponse.json(conversations);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch conversations' },
      { status: 500 }
    );
  }
} 