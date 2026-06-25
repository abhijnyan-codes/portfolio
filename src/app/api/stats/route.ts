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

// 1. The Single GET Route for fetching stats
export async function GET() {
  try {
    if (!process.env.REDIS_URL) {
      return NextResponse.json({ error: 'Missing REDIS_URL' }, { status: 500 });
    }

    const client = await getClient();
    
    // Fetch your individual stats
    const leetcode = await client.get('leetcode');
    const cgpa = await client.get('cgpa');
    
    // Return them in the format the Admin Dashboard expects
    return NextResponse.json({ 
      leetcode: leetcode || "",
      cgpa: cgpa || ""
    });
  } catch (error) {
    console.error("Redis stats fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

// 2. The POST Route for saving updates
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, updates } = body;

    // SECURE YOUR ROUTE
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.REDIS_URL) {
      return NextResponse.json({ error: 'Missing REDIS_URL' }, { status: 500 });
    }

    const client = await getClient();

    // Loop through whatever data you updated and save it
    for (const [key, value] of Object.entries(updates)) {
      await client.set(key, String(value));
    }

    return NextResponse.json({ success: true, updatedKeys: Object.keys(updates) });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}