//this is the entry point of our application
//Component is the pg being activiated and pageProps is props sent to a pg
//here you might do the following: keep state b/w pg chages or global css

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
