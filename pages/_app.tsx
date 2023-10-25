import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <div className='py-10 px-12 w-screen h-screen'>
      <Component className='pt-10' {...pageProps} />
      </div>
    </div>
  )
}
