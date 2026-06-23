import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ repo: string }> }
) {
  const { repo } = await params;
  const res = await fetch(
    `https://api.github.com/repos/abhijnyan-codes/${repo}/languages`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }
    }
  );
  const data = await res.json();
  return NextResponse.json(data);
}