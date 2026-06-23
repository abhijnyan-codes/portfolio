import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(
    'https://api.github.com/users/abhijnyan-codes/repos?per_page=100',
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