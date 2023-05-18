import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code') // get github code

  const registerResponse = await api.post('/register', {
    code,
  })

  const { token } = registerResponse.data
  const redirectURL = new URL('/', req.url) // redirect user to route root
  const cookieExpiresInSeconds = 60 * 60 * 24 * 30 // to expires in 30 days
  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds};`,
    },
  })
}
