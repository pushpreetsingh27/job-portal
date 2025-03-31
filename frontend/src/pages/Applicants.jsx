import React, { useEffect } from 'react'

// import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { APPLICATION_API_END_P0INT } from '@/utils/constant';
import Navbar from '@/components/shared/Navbar';
import ApplicantsTable from '@/components/ApplicantsTable';
import { setAllApplicants } from '@/redux/applicationSlice';



const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store=>store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_P0INT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
             
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);
    return (
        <div>
            <Navbar/>
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'> Total Applicants - {applicants?.applications?.length}</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants