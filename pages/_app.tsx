import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import initAuth from '../initAuth' // the module you created above

initAuth()

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
