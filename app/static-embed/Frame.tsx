'use client'

import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'

type FrameProps =
  | {
      iframeUrl?: string
      doc: string
    }
  | {
      iframeUrl: string
      doc?: string
    }

export function Frame({ iframeUrl, doc }: FrameProps) {
  // const iframeRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const callback = (event: any) => {
      const metabaseEvent = event.data.metabase
      if (metabaseEvent) {
        console.log({ metabaseEvent })
      }
      if (metabaseEvent) {
        if (
          metabaseEvent.type === 'location' &&
          !metabaseEvent.location.pathname.startsWith('/dashboard/')
        ) {
          setHeight(0)
        }
        if (metabaseEvent.type === 'frame') {
          // console.log({ frameEvent: metabaseEvent })
          setHeight(metabaseEvent.frame.height)
        }
      }
    }
    window.addEventListener('message', callback)
    return () => {
      window.removeEventListener('message', callback)
    }
  }, [])
  return (
    <>
      <Script src="http://localhost:3000/app/iframeResizer.js"></Script>
      <iframe
        // ref={iframeRef}
        src={iframeUrl}
        srcDoc={doc}
        frameBorder={0}
        // height="500"
        // style={{ maxWidth: 1200, width: '100%' }}
        style={{ height: 800, width: 1200 }}
        // onLoad="iFrameResize({}, this)"
        // onload="test"
        onLoad={function (e) {
          // console.log({ this: this })
          console.log('Resizing iframe')
          window.iFrameResize({}, e.target)
        }}
        // allowtransparency="true"
      ></iframe>
    </>
  )
}
