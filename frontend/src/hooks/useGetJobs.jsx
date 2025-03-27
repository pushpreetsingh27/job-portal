import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_P0INT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetJobs = () => {

 const dispatch = useDispatch()   
 useEffect(()=>{

    const fetchJobs =  async () =>{
        try {
            const response = await axios.get(`${JOB_API_END_P0INT}/get` , {
                withCredentials : true
            })

            if(response.data.success){
              dispatch(setAllJobs(response.data.jobs))
            }
        } catch (error) {
            
        }
    }

    fetchJobs();


 },[])
}

export default useGetJobs