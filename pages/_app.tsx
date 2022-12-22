//this is the entry point of our application
//Next.js uses the App component to initialize pages. You can override it and control the page initialization and:
//Component is the pg being activiated and pageProps is props sent to a pg
//here you might do the following: keep state b/w pg chages or global css

import { AppProps } from "next/app"
import React from "react"

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />
}

export default MyApp
