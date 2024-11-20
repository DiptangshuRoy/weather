import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Github = () => {
  return (
    <div className='z-20 absolute right-12 top-4 hover:scale-105 transition-all hover:bg-violet-600 hover:shadow-md rounded-2xl p-2 hover:bg-opacity-10'>
      <Link href="https://github.com/DiptangshuRoy" target='_blank' className='flex flex-col items-end'>
        <span className='text-shadow-xl'>Github</span>
        <Image height={70} width={70} src="Github64.svg" alt="Github" />
      </Link>
    </div>
  )
}

export default Github
