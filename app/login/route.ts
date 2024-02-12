import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

var METABASE_JWT_KEY = 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

export async function GET(request: NextRequest) {
  return new Response('ok', {
    headers: {},
  })
}

export async function POST(request: NextRequest) {
  const { email } = await request.json()
  request.destination
  var payload = {
    email,
    first_name: 'John',
    last_name: 'Wick',
    exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
  }
  var token = jwt.sign(payload, METABASE_JWT_KEY)
  const response = new NextResponse('success', {
    status: 200,
    headers: getCorsHeaders(request),
  })

  response.cookies.set('metabase.TOKEN', token, { httpOnly: true, sameSite: 'lax' })
  return response
}

export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    headers: getCorsHeaders(request),
  })
}

function getCorsHeaders(request: NextRequest): HeadersInit {
  const origin = request.headers.get('ORIGIN')
  return {
    'Access-Control-Allow-Origin': origin ?? '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  }
}
