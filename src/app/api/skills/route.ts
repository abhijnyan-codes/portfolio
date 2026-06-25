import { createClient } from 'redis';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

let redisClient: any = null;

async function getClient() {
  if (!redisClient) {
    redisClient = createClient({ url: process.env.REDIS_URL });
    redisClient.on('error', (err: any) => console.error('Redis Error:', err));
    await redisClient.connect();
  }
  return redisClient;
}

export async function GET() {
  try {
    const client = await getClient();
    const skillsData = await client.get('portfolio:skills');

    if (!skillsData) {
      // Default placeholder if the database is empty
      return NextResponse.json({ frontend: [], backend: [], tools: [] });
    }

    return NextResponse.json(JSON.parse(skillsData));
  } catch (error) {
    console.error("Redis skills fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}