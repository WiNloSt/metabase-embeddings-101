import jwt from 'jsonwebtoken'
import { Frame } from '../../static-embed/Frame'
import type { PageProps } from '@/.next/types/app/page'
import { useEffect } from 'react'

async function getIframeUrl() {
  // var METABASE_SITE_URL = 'http://localhost:3054'
  // localhost
  var METABASE_SITE_URL = 'http://localhost:3000'
  // Change this to match your JWT secret
  var METABASE_JWT_KEY = '0000000000000000000000000000000000000000000000000000000000000000'

  var payload = {
    email: 'jwt@metabase.com',
    first_name: 'John',
    last_name: 'Wick',
    exp: Math.round(Date.now() / 1000) + 10, // 10 minute expiration
  }
  var token = jwt.sign(payload, METABASE_JWT_KEY)

  // const iframeUrl = `${METABASE_SITE_URL}`
  const iframeUrl = `${METABASE_SITE_URL}/auth/sso?jwt=${token}&return_to=/dashboard/1`
  // const iframeUrl = `${METABASE_SITE_URL}/auth/sso?return_to=/dashboard/1`
  console.log('iframeUrl', iframeUrl)
  return iframeUrl
}

export default async function InteractiveEmbed({ params: { slug }, searchParams }: PageProps) {
  const path = slug ? slug.join('/') : ''
  const iframeUrl =
    (await getIframeUrl()) +
    `${path}?${encodeURIComponent(new URLSearchParams(searchParams).toString())}#theme=night`
  // const iframeUrl = await getIframeUrl()

  return (
    <main className="flex h-full flex-col items-center justify-between bg-white">
      {/* <script src="http://localhost:3000/app/iframeResizer.js"></script> */}
      <Frame iframeUrl={iframeUrl} />
    </main>
  )
}
