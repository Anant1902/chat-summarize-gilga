import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '@/components/Navbar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <NavBar />
      <div className='py-10 px-12 w-screen h-screen'>
      <Component {...pageProps} />
      </div>
    </div>
  )
}
