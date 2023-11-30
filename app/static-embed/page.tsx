import jwt from 'jsonwebtoken'

async function getIframeUrl() {
  var METABASE_SITE_URL = 'http://localhost:3000'
  // Change this to your Metabase embedding secret from your instance
  var METABASE_SECRET_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx'

  var payload = {
    resource: { dashboard: 28 },
    params: {
      category_2: ['Doohickey'],
      category_3: ['Gizmo', 'Gadget'],
    },
    exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
  }
  var token = jwt.sign(payload, METABASE_SECRET_KEY)

  var iframeUrl = METABASE_SITE_URL + '/embed/dashboard/' + token + '#bordered=true&titled=true'
  return iframeUrl
}

export default async function StaticEmbed() {
  const iframeUrl = await getIframeUrl()

  return (
    <main className="flex h-full flex-col items-center justify-between pt-6">
      <iframe
        src={iframeUrl}
        frameBorder={0}
        width="1200"
        height="800"
        allowtransparency="true"></iframe>
    </main>
  )
}
