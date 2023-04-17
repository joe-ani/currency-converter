import Image from 'next/image'
import { Inter } from 'next/font/google'
import Homne from './components/Home'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen bg-white flex-colp-24">
      {/* Header */}
      {/* LOGO */}
      {/* Header */}
      {/* Main Section */}
      {/* Functionlalities */}
      {/* Main Section */}
      {/* About Developer */}
      <h1 className='text-black' >Currency Converter 💱</h1>
      <Homne />
    </main>
  )
}
