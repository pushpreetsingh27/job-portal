import React from 'react'
import { useSelector } from 'react-redux'
import OpeningJobCard from './OpeningJobCard'


const DisplayJobs = () => {
const {allJobs} = useSelector(store => store.job)

  return (
    <div className='max-w-7xl mx-auto my-20'>
<h2 className='text-4xl font-bold text-blue-500'>Job Opening</h2>
<div className="grid grid-cols-3 gap-4 my-5">
   {
        allJobs.length > 0 ? allJobs.slice(0,6).map((job)=> <OpeningJobCard key = {job._id} job = {job}/>) : <p>No Job Found</p>
    }
    </div>
    </div>
  )
}

export default DisplayJobs