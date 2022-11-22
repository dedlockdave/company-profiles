import "../styles/global.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { AppProps } from "next/app"
/* eslint-disable no-undef */
import { useRouter } from "next/router"

import { SessionProvider } from "next-auth/react"
import "react-toastify/dist/ReactToastify.css"

import ErrorBoundary from "../components/errboundary"

import Notification from "../components/Notification"

import LayoutV4 from "../components/layoutV4/Layout"
import Index from "../components/layoutV4/Index"
import { LayoutProvider } from "../contexts/LayoutContext"
import { UserProvider } from "../contexts/UserContext"
import { ThemeProvider } from "@emotion/react"
import { createTheme } from "@mui/material/styles"

export default function App({ Component, pageProps }: AppProps) {
    const theme = createTheme({
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
    let { asPath } = useRouter()

    let Layout = LayoutV4
    // if (asPath == "/") {
    //     Layout = Index
    // } else {
    //     Layout = LayoutV4
    // }

    return (
        <>
            <ThemeProvider {...{theme}}>
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
            </ThemeProvider>
        </>
    )
}

declare module '@mui/material/styles' {
    interface Theme {
      status: {
        danger: React.CSSProperties['color'];
      };
    }
  
    interface Palette {
      neutral: Palette['primary'];
    }
    interface PaletteOptions {
      neutral: PaletteOptions['primary'];
    }
  
    interface PaletteColor {
      darker?: string;
    }
    interface SimplePaletteColorOptions {
      darker?: string;
    }
    interface ThemeOptions {
      status: {
        danger: React.CSSProperties['color'];
      };
    }
  }
  