import CategoryCarousel from '@/components/CategoryCarousel'
import DisplayJobs from '@/components/DisplayJobs'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/shared/Navbar'
import useGetJobs from '@/hooks/useGetJobs'
import React from 'react'

const Home = () => {

  useGetJobs();

  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <DisplayJobs/>
    </div>
  )
}

export default Home