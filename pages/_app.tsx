import "../styles/global.css"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AppProps } from 'next/app';
/* eslint-disable no-undef */
import { useRouter } from "next/router"


import { SessionProvider } from "next-auth/react"
import "react-toastify/dist/ReactToastify.css"


import ErrorBoundary from "../components/errboundary"

import Notification from "../components/Notification"

import LayoutV4 from "../components/layoutV4/Layout"
import Index from "../components/layoutV4/Index"
import {LayoutProvider} from "../contexts/LayoutContext"
import {UserProvider} from "../contexts/UserContext"


// import dynamic from 'next/dynamic';
// import LayoutWrapper from '../components/layout/Layout';
// import {
//   ConnectionProvider,
//   WalletProvider,
// } from '@solana/wallet-adapter-react';

export default function App({ Component, pageProps }: AppProps) {
    let { asPath } = useRouter()

    let Layout = LayoutV4
    // if (asPath == "/") {
    //     Layout = Index
    // } else {
    //     Layout = LayoutV4
    // }

    return (
        <>
            <UserProvider>
                <LayoutProvider>
                    <Notification />
                            <SessionProvider session={pageProps.session}>
                                <ErrorBoundary>
                                    <Layout>
                                        <Component {...pageProps} />
                                    </Layout>
                                </ErrorBoundary>
                            </SessionProvider>
                </LayoutProvider>
            </UserProvider>
        </>
    )
}

{
    /* <Script 
strategy="lazyOnload"
src="https://www.googletagmanager.com/gtag/js?id=UA-186334938-1">
</Script>
<Script strategy="lazyOnload">
{`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-186334938-1');`}
</Script> */
}

// useEffect(() => {
//   const handleRouteChange = (url) => {
//     if (typeof window !== 'undefined' && window.gtag) {
//       window.gtag.pageview(url)
//     }

//   }
//   router.events.on('routeChangeComplete', handleRouteChange)
//   return () => {
//     router.events.off('routeChangeComplete', handleRouteChange)
//   }
// }, [router.events])
