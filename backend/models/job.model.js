import { application } from "express";
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    location: {
        type: Number,
        required: true
    },
    jobType: {
        type: Number,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application'
        }
    ]
}, {timestamps:true})

const Job = mongoose.model('Job' , jobSchema)

export default Job;