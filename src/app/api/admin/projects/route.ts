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
    const body = await request.json();
    const { password, project } = body;

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await getClient();

    // 1. Fetch all existing projects
    const list = await client.lRange('portfolio:projects', 0, -1);
    
    // 2. Find if this project already exists
    const existingIndex = list.findIndex((item: string) => {
      try { return JSON.parse(item).id === project.id; } 
      catch (e) { return false; }
    });

    if (existingIndex !== -1) {
      // 3. OVERWRITE EXISTING PROJECT
      await client.lSet('portfolio:projects', existingIndex, JSON.stringify(project));
    } else {
      // 4. ADD NEW PROJECT
      await client.lPush('portfolio:projects', JSON.stringify(project));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Redis deploy error:", error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}