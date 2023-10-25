import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '@/components/Navbar' 
import Link from 'next/link'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      {/* <NavBar /> */}
      <div className='py-10 px-12 w-screen h-screen'>
      <Component className='pt-10' {...pageProps} />
      </div>
    </div>
  )
}
