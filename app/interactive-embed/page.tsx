import jwt from 'jsonwebtoken'

async function getIframeUrl() {
  var METABASE_SITE_URL = 'http://localhost:3000'
  // Change this to match your JWT secret
  var METABASE_JWT_KEY = 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

  var payload = {
    email: 'jwt@metabase.com',
    first_name: 'John',
    last_name: 'Wick',
    exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
  }
  var token = jwt.sign(payload, METABASE_JWT_KEY)

  const iframeUrl = `${METABASE_SITE_URL}/auth/sso?jwt=${token}&return_to=/metabase/dashboard/1?top_nav=false`
  return iframeUrl
}

export default async function InteractiveEmbed() {
  const iframeUrl = await getIframeUrl()

  return (
    <main className="flex h-full flex-col items-center justify-between">
      <iframe
        src={iframeUrl}
        frameBorder={0}
        width="1200"
        height="800"
        allowtransparency="true"></iframe>
    </main>
  )
}
