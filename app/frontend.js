import React from 'react'

const frontend = () => {
  return (
    <>
      <div className='bg-blue-950'>

        <nav className='bg-purple-400 p-4'>
          <ul className='flex gap-5 font-bold'>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>

        <div>
          <h1>Weather in {weather.location.name}</h1>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
        </div>

      </div>
    </>
  )
}

export default frontend
