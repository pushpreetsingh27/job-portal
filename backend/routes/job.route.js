import express from 'express';

import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getJobById, getJobPostedByAdmin, getJobs, postJob } from '../controllers/job.controller.js';

const router = express.Router();

router.post("/post" , isAuthenticated , postJob);
router.get("/get" , isAuthenticated , getJobs);
router.get("/getadminjobs" , isAuthenticated , getJobPostedByAdmin);
router.get("/get/:id" , isAuthenticated , getJobById);

export default router;
