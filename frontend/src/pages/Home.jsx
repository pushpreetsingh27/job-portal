import CategoryCarousel from '@/components/CategoryCarousel'
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
        <CategoryCarousel/>
        <DisplayJobs/>
    </div>
  )
}

export default Home