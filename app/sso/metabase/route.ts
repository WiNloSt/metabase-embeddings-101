import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  let id: string = ''
  let exp: number = 0
  const token = request.cookies.get('metabase.TOKEN')
  const response = await fetch(`http://localhost:3000/auth/sso?jwt=${token?.value}&token=true`)
  const responseJson = await response.json()
  if (responseJson) {
    id = responseJson.id
    exp = responseJson.exp
  }

  if (id && exp) {
    return NextResponse.json(
      { id, exp },
      {
        headers: getCorsHeaders(request),
      }
    )
  }

  return new NextResponse(null, {
    status: 500,
    headers: CORS_HEADERS,
  })
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
