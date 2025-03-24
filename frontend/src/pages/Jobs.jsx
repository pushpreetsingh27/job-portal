import FilterCard from '@/components/FilterCard'
import Job from '@/components/Job'
import Navbar from '@/components/shared/Navbar'
import React from 'react'

const Jobs = () => {
    const jobArr = [1,2,3,4,5,6]
  return (
    <div>
        <Navbar/>
        <div className="max-w-7xl mx-auto mt-5">
            <div className="flex gap-5">
                <div className="w-20%">
                    <FilterCard/>
                </div>
                {
                    jobArr.length <= 0 ? <span>Job Not found</span> :(
                        <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                            <div className="grid grid-cols-3 gap-4">
                                {
                                    jobArr.map((item ,i)=>(
                                        <div>
                                            <Job/>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Jobs