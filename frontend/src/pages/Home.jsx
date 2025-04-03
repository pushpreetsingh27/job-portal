import HowItWorks from '@/components/HowItWorks'
import CategoryCarousel from '@/components/HowItWorks'
import DisplayJobs from '@/components/DisplayJobs'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/shared/Navbar'
import useGetJobs from '@/hooks/useGetJobs'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const {user} = useSelector(store => store.auth)
  const navigate = useNavigate()

  useGetJobs();

  useEffect(()=>{
    if(user?.role === 'recruiter'){
      navigate("/admin/companies")
    }
  },[])

  return (
    <div>
        <Navbar/>
        <HeroSection/>
        {/* <CategoryCarousel/> */}
        <HowItWorks/>
        <DisplayJobs/>
    </div>
  )
}

export default Home