import { NextApiRequest, NextApiResponse } from 'next'

export async function GET() {
  const res = await fetch('http://127.0.0.1:8000/api/newsfeed', {})
  const data = await res.json()

  return data
}
