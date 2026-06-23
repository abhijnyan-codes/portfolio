import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(
    'https://api.github.com/search/issues?q=author:abhijnyan-codes+type:pr+is:merged',
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