import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allJobs: [],
    singleJob : null,
    allAdminJobs : []
}

const jobSlice = createSlice({
    name : 'job',
    initialState,
    reducers :{
        setAllJobs : (state , action) =>{
            state.allJobs = action.payload
        },
        setSingleJob : (state , action) =>{
            state.singleJob = action.payload
        },
        setAdminJobs : (state , action) =>{
            state.allAdminJobs = action.payload
        }
    }
})

export const {setAllJobs, setSingleJob, setAdminJobs} = jobSlice.actions
export default jobSlice.reducer