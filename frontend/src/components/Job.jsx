import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { FaRegBookmark } from "react-icons/fa";
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';


const Job = ({job}) => {
const navigate = useNavigate()

const postedAt = (mongoDate) =>{
    const createdAt = new Date(mongoDate);
    const current = new Date();
    const diffTime = current - createdAt ;
    return Math.floor(diffTime/(1000*24*60*60))

}

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 ">
        <div className="flex items-center justify-between">
            <p className='text-gray-400'>{postedAt(job?.createdAt)=== 0  ? "Today" : `${postedAt(job?.createdAt)} days ago`}</p>
            <Button variant = "outline" className = "rounded-full" size = "icon"><FaRegBookmark /></Button>
        </div>
        <div className='flex items-center gap-2 my-2'>
            <Button variant = "outline" className = "rounded-full" size = "icon">
                <Avatar>
                    <AvatarImage className = "object-contain" src ={job?.company?.logo}/>
                </Avatar>
            </Button>
            <div>
                <h2 className='font-bold' >{job?.company?.name}</h2>
                <p className='font-semibold text-gray-400'>India</p>
            </div>

        </div>
        <div>
            <h3 className='font-bold text-lg my-2'>{job?.title}</h3>
            <p className='text-sm text-gray-500'>{job?.description}</p>
        </div>
        <div className="flex items-center gap-2 mt-4">
        <Badge className={'text-blue-700 font-bold'} variant="ghost">Position - {job?.position}</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost"> {job?.salary} LPA</Badge>
        </div>
        <div className='flex items-center gap-4 mt-4'>
                <Button  onClick = {() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button className="bg-[#428be5]">Save For Later</Button>
            </div>
    </div>
  )
}

export default Job