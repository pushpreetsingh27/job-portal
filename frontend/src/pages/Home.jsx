import CategoryCarousel from '@/components/CategoryCarousel'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/shared/Navbar'
import React from 'react'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
    </div>
  )
}

export default Home