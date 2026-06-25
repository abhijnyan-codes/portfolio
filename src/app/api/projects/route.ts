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
      return NextResponse.json({ error: 'Missing REDIS_URL' }, { status: 500 });
    }

    const client = await getClient();
    
    // Fetch the list using node-redis syntax (lRange)
    const projectsData = await client.lRange('portfolio:projects', 0, -1);

    if (!projectsData || projectsData.length === 0) {
      return NextResponse.json([]); // Return empty array if no projects exist yet
    }

    // Parse the JSON strings back into objects
    const parsedProjects = projectsData.map((project: string) => {
      try {
        return JSON.parse(project);
      } catch (e) {
        console.error("Skipping corrupted project data:", project);
        return null;
      }
    }).filter(Boolean);

    return NextResponse.json(parsedProjects);
  } catch (error) {
    console.error("Critical Redis fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}