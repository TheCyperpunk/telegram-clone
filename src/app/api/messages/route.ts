import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { content, conversationId } = await request.json();
    
    const message = await prisma.message.create({
      data: {
        content,
        conversationId,
        senderId: 'currentUserId', // Replace with actual user ID from session
        receiverId: 'receiverId', // Replace with actual receiver ID
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
} 