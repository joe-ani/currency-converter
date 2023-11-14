import Main from '@/components/Main';
import Image from 'next/image';

export default function Home() {



  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      {/* Header */}
      <Image
        layout="fill"
        objectFit="cover"
        className='mt-[-10%] z-[-10 absolute'
        src="/assets/Header.svg"
        alt="Header"
      />

      {/* logo */}
      <Image
        width={100}
        height={100}
        src="/assets/Logo.svg"
        alt=''
        className='z-10 absolute left-[5%] top-[0%] w-[240px]'
      />

      <Main  />

      {/* Footer */}
      <div className='bg-[#246DD6] w-[100%] h-[30px] fixed bottom-0 shadow-lg'/>
    </div>
  );
}
