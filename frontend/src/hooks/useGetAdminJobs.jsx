import { setAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_P0INT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAdminJobs = () => {

 const dispatch = useDispatch()   
 useEffect(()=>{

    const fetchAdminJobs =  async () =>{
        try {
            const response = await axios.get(`${JOB_API_END_P0INT}/getadminjobs` , {
                withCredentials : true
            })

            if(response.data.success){
                console.log("Admin Jobs are - ", response.data);
                
              dispatch(setAdminJobs(response.data.jobs))
            }
        } catch (error) {
            
        }
    }

    fetchAdminJobs();


 },[])
}

export default useGetAdminJobs