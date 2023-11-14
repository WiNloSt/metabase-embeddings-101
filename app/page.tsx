import jwt from 'jsonwebtoken'
// import Image from 'next/image'

async function getIframeUrl() {
  const METABASE_SITE_URL = 'http://localhost:3000'
  // Change this to your Metabase embedding secret from your instance
  const METABASE_SECRET_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx'

  const payload = {
    resource: { dashboard: 24 },
    params: {},
    exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
  }
  const token = jwt.sign(payload, METABASE_SECRET_KEY)

  return METABASE_SITE_URL + '/embed/dashboard/' + token + '#bordered=true&titled=true'
}

export default async function Home() {
  const iframeUrl = await getIframeUrl()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <iframe src={iframeUrl} frameBorder={0} width="800" height="600" allowTransparency></iframe>
    </main>
  )
}
