import Job from '@/components/Job'
import Navbar from '@/components/shared/Navbar'
import useGetJobs from '@/hooks/useGetJobs'
import { setSearchedQuery } from '@/redux/jobSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'




const Browse = () => {
    useGetJobs()
    const {allJobs} = useSelector(store => store.job)
    const dispatch = useDispatch()
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-10'>
            <h2 className='font-bold text-xl my-8'>Showing Results for <span className='text-blue-600'>{allJobs.length}</span> Jobs </h2>
           <div className='grid grid-cols-3 gap-4'>
            {
                allJobs.map((item)=>{
                    return(
                        <Job  key={item._id} job={item}/>
                    )
                })
            }
           </div>
        </div>
    </div>
  )
}

export default Browse