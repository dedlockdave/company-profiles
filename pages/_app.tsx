import "../styles/global.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import Script from "next/script"
// import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
// import { useEffect, useState, createContext } from "react"
// import { useRouter } from "next/router"
// import {supabase} from '../utils/supabase'
// import Index from "../components/layoutV4/Index"

import { Session } from "@supabase/auth-helpers-react"
import { ThemeProvider } from "@emotion/react"
import { createTheme, TypeText } from "@mui/material/styles"
import { AppProps } from "next/app"

/* eslint-disable no-undef */

import { LayoutProvider } from "../contexts/LayoutContext"
import { UserProvider } from "../contexts/UserContext"
import { SessionProvider } from "../contexts/SessionContext"

import ErrorBoundary from "../components/errboundary"

import LayoutV4 from "../components/layoutV4/Layout"
import { CommitmentsProvider } from "../contexts/CommitmentsContext"

export default function App({
    Component,
    pageProps,
}: AppProps<{
    initialSession: Session
}>) {
    let Layout = LayoutV4
    // if (asPath == "/") {
    //     Layout = Index
    // } else {
    //     Layout = LayoutV4
    // }

    return (
        <>
            <SessionProvider>
                <ThemeProvider {...{ theme }}>
                    <UserProvider>
                        <CommitmentsProvider>
                            <LayoutProvider>
                                <ErrorBoundary>
                                    <Layout>
                                        <Component {...pageProps} />
                                    </Layout>
                                </ErrorBoundary>
                            </LayoutProvider>
                        </CommitmentsProvider>
                    </UserProvider>
                </ThemeProvider>
            </SessionProvider>
            <Script id="scriptmeupfuk" strategy="lazyOnload">
                {`
                                    window.fbAsyncInit = function() {
                                      FB.init({
                                        appId      : '{your-app-id}',
                                        cookie     : true,
                                        xfbml      : true,
                                        version    : '{api-version}'
                                      });
                                        
                                      FB.AppEvents.logPageView();   
                                        
                                    };
                                  
                                    (function(d, s, id){
                                       var js, fjs = d.getElementsByTagName(s)[0];
                                       if (d.getElementById(id)) {return;}
                                       js = d.createElement(s); js.id = id;
                                       js.src = "https://connect.facebook.net/en_US/sdk.js";
                                       fjs.parentNode.insertBefore(js, fjs);
                                     }(document, 'script', 'facebook-jssdk'));
                                `}
            </Script>
        </>
    )
}

declare module "@mui/material/styles" {
    interface Theme {
        status: {
            danger: React.CSSProperties["color"]
        }
    }

    interface Palette {
        neutral: Palette["primary"]
    }
    interface PaletteOptions {
        neutral: PaletteOptions["primary"]
    }

    interface PaletteColor {
        darker?: string
    }
    interface SimplePaletteColorOptions {
        darker?: string
    }
    interface ThemeOptions {
        status: {
            danger: React.CSSProperties["color"]
        }
    }
}

const theme = createTheme({
    // typography: {
    //     allVariants: {
    //         color:
    //     }
    // },
    status: {
        danger: "#e53e3e",
    },
    palette: {
        primary: {
            main: "#24C196",
            darker: "#053e85",
        },
        neutral: {
            main: "#64748B",
            contrastText: "#fff",
        },
    },
})
