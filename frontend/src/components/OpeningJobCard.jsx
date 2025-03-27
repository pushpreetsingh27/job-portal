import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { FaRegBookmark } from "react-icons/fa";
import { Badge } from './ui/badge';


const OpeningJobCard = ({job}) => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 ">
        {/* <div className="flex items-center justify-between">
            <p className='text-gray-400'>2 days ago</p>
            <Button variant = "outline" className = "rounded-full" size = "icon"><FaRegBookmark /></Button>
        </div> */}
        <div className='flex items-center gap-2 my-2'>
            {/* <Button variant = "outline" className = "rounded-full" size = "icon">
                <Avatar>
                    <AvatarImage className = "object-contain" src = "https://logos-world.net/wp-content/uploads/2020/06/Instagram-Logo.png"/>
                </Avatar>
            </Button> */}
            <div>
                <h2 className='font-bold' >{job.company.name}</h2>
                <p className='font-semibold text-gray-400'>India</p>
            </div>

        </div>
        <div>
            <h3 className='font-bold text-lg my-2'>{job.title}</h3>
            <p className='text-sm text-gray-500'>{job.description}</p>
        </div>
        <div className="flex items-center gap-2 mt-4">
        <Badge className={'text-blue-700 font-bold'} variant="ghost">Position - {job.position}</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost"> 10 LPA</Badge>
        </div>
    </div>
  )
}







export default OpeningJobCard