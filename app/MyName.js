import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const MyName = () => {
  return (
    <div className='flex flex-col justify-center items-center w-screen absolute'>
      <div className='flex justify-center'>
        <footer className="flex justify-center bottom-0 mb-1 bg-orange-400 bg-opacity-15 md:px-8 py-1 rounded-full text-shadow-xl max-md:bg-transparent">
          Made with love by❤️Diptangshu Roy
        </footer>
      </div>

        <div className='flex flex-col justify-center items-center gap-1 text-sm md:hidden'>
          <Link href="https://github.com/DiptangshuRoy" target='_blank'>
            <Image src="Github64.svg" height={32} width={32} />
          </Link>
          <span>Github</span>
        </div>
    </div>
  )
}

export default MyName
