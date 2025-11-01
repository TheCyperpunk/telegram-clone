import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

interface TokenPayload {
  userId: string;
  role: string;
}

export async function verifyAuth(token: string): Promise<TokenPayload> {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export function getServerSession() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  
  if (!token) return null;
  
  try {
    return verifyAuth(token.value);
  } catch {
    return null;
  }
} 