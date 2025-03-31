import Job from "../models/job.model.js";

export const postJob = async (req, res) =>{
    try {
    
  const {title , description , requirements , salary , location , jobType , position , experience , companyId} = req.body;
  const userId = req.id;
  if(!title || !description || !requirements || !salary || !location || !jobType || !position || !experience || !companyId){
    return res.status(400).json({message: "Please fill in all fields."})
  }

  const job = await Job.create({
    title,
    description,
    requirements : requirements.split(","),
    salary : Number(salary),
    location,
    jobType,
    position,
    experience,
    company : companyId,
    createdBy : userId
  })

  return res.status(201).json({
    message: "Job posted successfully",
    success:true,
    job,
    })
    } catch (error) {
        console.log("Error in postJob controller" , error);
        
    }
}

export const getJobs = async (req, res) =>{
    try {
        const keyword = req.query.keyword || "";

        const query = {
            $or:[
                {title : {$regex : keyword , $options: "i"}},
                {description : {$regex : keyword , $options : "i"}}
            ]
        }
        const jobs = await Job.find(query).populate({
            path : "company",
        }).sort({createdAt : -1})
        return res.status(200).json({
            message: "Jobs fetched successfully",
            success:true,
            jobs
            })
    }
    catch(error){
        console.log("Error in getJobs controller" , error);
    }

}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
        });
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success:false
                })
        }
        return res.status(200).json({
            message: "Job fetched successfully",
            success:true,
            job
            })

    } catch (error) {
        console.log("Error in getJobById controller" , error);
        
    }
}

 export const getJobPostedByAdmin = async (req, res) =>{
    try {
      const adminId = req.id  
      const jobs = await Job.find({ createdBy : adminId }).populate({
        path: "company",
      })
      if(!jobs){
        return res.status(404).json({
            message: "No jobs posted by admin",
            success :false
            })
      }
      return res.status(200).json({
        message: "Jobs posted by admin fetched successfully",
        success:true,
        jobs
      })
    } catch (error) {
       console.log("Error in getJobPostedByAdmin controller" , error);
        
    }
}