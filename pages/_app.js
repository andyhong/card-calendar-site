import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    Fathom.load("NEHIWDNL", {
      includedDomains: ["tempest.cards"]
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
