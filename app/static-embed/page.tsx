import { Frame } from './Frame'
import jwt from 'jsonwebtoken'

async function getIframeUrl() {
  const METABASE_SITE_URL = 'http://localhost:3000'
  const METABASE_SECRET_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

  const payload = {
    resource: { dashboard: 1 },
    params: {},
    exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
  }
  const token = jwt.sign(payload, METABASE_SECRET_KEY)

  const iframeUrl =
    METABASE_SITE_URL +
    '/embed/dashboard/' +
    token +
    '#theme=night&background=false&bordered=true&titled=true&downloads=true'
  return iframeUrl
}

export default async function StaticEmbed() {
  const iframeUrl = await getIframeUrl()

  return (
    <>
      <main className="flex h-full flex-col items-center justify-between pt-6">
        <div className="border-2 border-red-400 w-[800px]">
          <Frame iframeUrl={iframeUrl} />
        </div>
      </main>
    </>
  )
}
