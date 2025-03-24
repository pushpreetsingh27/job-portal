import Job from '@/components/Job'
import Navbar from '@/components/shared/Navbar'
import React from 'react'



const randomJobs = [1,2,3]
const Browse = () => {
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-10'>
            <h2 className='font-bold text-xl my-8'>Showing Results for <span className='text-blue-600'>{randomJobs.length}</span> Jobs </h2>
           <div className='grid grid-cols-3 gap-4'>
            {
                randomJobs.map((item)=>{
                    return(
                        <Job/>
                    )
                })
            }
           </div>
        </div>
    </div>
  )
}

export default Browse