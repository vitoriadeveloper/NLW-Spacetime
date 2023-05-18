import { ReactNode } from 'react'
import './globals.css'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamJuree,
} from 'next/font/google'
import { Copyright } from '@/components/Copyright'
import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { SignIn } from '@/components/SignIn'
import { cookies } from 'next/headers'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamJuree = BaiJamJuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula do tempo construída com React, Next.js, TailwindCSS e Typescript',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticate = cookies().has('token')
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamJuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2">
          {/* left */}
          <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-starts.svg)] bg-cover px-28 py-16">
            {/* blur */}
            <div
              className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2  
        translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full"
            ></div>
            {/* stripes */}
            <div className="absolute bottom-0 right-2 top-0 w-2  bg-stripes"></div>
            {isAuthenticate ? <Profile /> : <SignIn />}
            <Hero />
            <Copyright />
          </div>
          {/* rigth */}
          <div className="flex flex-col bg-[url(../assets/bg-starts.svg)] bg-cover p-16">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
