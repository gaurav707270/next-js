"use client";

import React, { useState } from 'react'

export default function Home() {

  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1)
  }

  const decrease = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  const multipling = () => {
    setCount(count * 2)
  }

  const dividing = () => {
    setCount(count / 2)
  }


  return (
    <div style={{}}>
      <h1 className='flex justify-center mt-5 text-5xl'> Counter App</h1>

      <div className='h-99  flex justify-center items-center flex-col'>
        <p className='text-4xl flex justify-center '> {count}</p>
        <div className='flex mt-5'>
          <button onClick={increase} style={{ width: 100, height: 30 }} className='bg-blue-600 m-2 rounded-2xl text-3xl'>+1</button>
          <button onClick={decrease} style={{ width: 100, h: 30 }} className='bg-orange-700 m-2 rounded-2xl text-3xl'>-1</button>
          <button onClick={multipling} style={{ width: 100, h: 30 }} className='bg-cyan-950 m-2 rounded-2xl text-3xl'>*2</button>
          <button onClick={dividing} style={{ width: 100, h: 30 }} className='bg-fuchsia-800 m-2 rounded-2xl text-3xl'>/2</button>
        </div>
      </div>
    </div>
  )
}
