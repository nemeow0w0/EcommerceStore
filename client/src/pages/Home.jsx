import React from 'react'
import Slideshow from '../components/home/Slideshow'
import Bestselling from '../components/home/Bestselling'
import Newproduct from '../components/home/Newproduct'

const Home = () => {
  return (
    <div>
      <Slideshow />

      <p
      className='text-center text-4xl mt-4 font-bold text-sky-950'
      >Best selling products</p>
      <Bestselling />
      <p
      className='text-center text-4xl mt-4 font-bold text-sky-950'
      >New Product</p>
      <Newproduct />
    </div>
  )
}

export default Home
