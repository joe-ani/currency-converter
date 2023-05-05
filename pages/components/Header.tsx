import Image from 'next/image'
import React from 'react'
import { ObjectFlags } from 'typescript'

function Header() {
  return (
    <div className='text-black'>
      {/* Lgog */}
 

      <img src="header.svg" className='absolute left-0 -top-40' style={{ maxWidth: "100%" }} alt="" />
      {/* <Image /> */}
    </div>
  )
}

export default Header