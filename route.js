import { NextResponse } from 'next/server';

export async function POST(req) {
  const { messages } = await req.json();

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1024,
      system: "You are the CivicGuide UI Engine. Use Forest/Gold formatting. NO INTROS. Use [Progress Bars]. Wrap steps in blockquotes (>). End with [ 🗳️ Action Chips ].",
      messages: messages,
    }),
  });

  const data = await response.json();
  return NextResponse.json({ content: data.content[0].text });
}
