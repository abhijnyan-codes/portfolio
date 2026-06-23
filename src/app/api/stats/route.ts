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
    if (!process.env.REDIS_URL) {
      return NextResponse.json({ error: 'Missing REDIS_URL' });
    }

    const client = await getClient();
    
    // Fetch all your stats at once
    const leetcode = await client.get('leetcode_count');
    const cgpa = await client.get('cgpa');
    const projects = await client.get('projects_count');
    
    return NextResponse.json({ 
      leetcode: leetcode ? Number(leetcode) : 0,
      cgpa: cgpa ? Number(cgpa) : 0,
      projects: projects ? Number(projects) : 0
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, updates } = body;

    // SECURE YOUR ROUTE
    if (password !== "hunter2") {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.REDIS_URL) {
      return NextResponse.json({ error: 'Missing REDIS_URL' }, { status: 500 });
    }

    const client = await getClient();

    // Loop through whatever data you "ticked" and update only those keys!
    for (const [key, value] of Object.entries(updates)) {
      await client.set(key, String(value));
    }

    return NextResponse.json({ success: true, updatedKeys: Object.keys(updates) });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}