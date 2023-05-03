import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import  Main  from './components/Main'
import About from './components/About'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen bg-white text-black flex-col items-center ">
      <Header/>
      <Main/>
      <About/>
    </main>
  )
}