import { createClient } from 'redis';
import { NextResponse } from 'next/server';

let redisClient: any = null;

async function getClient() {
  if (!redisClient) {
    redisClient = createClient({ url: process.env.REDIS_URL });
    redisClient.on('error', (err: any) => console.error('Redis Error:', err));
    await redisClient.connect();
  }
  return redisClient;
}

export async function POST(request: Request) {
  try {
    const { password, skills } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await getClient();
    // Overwrite the existing skills object in the database
    await client.set('portfolio:skills', JSON.stringify(skills));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Redis skills deploy error:", error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}