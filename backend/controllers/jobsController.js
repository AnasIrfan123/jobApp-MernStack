const Job = require('../models/jobModel');
const ErrorResponse = require('../utils/errorResponse');


//              Create   Job ------------------------------------

exports.createJob = async (req, res, next) => {
    try {
        const job = await Job.create({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            location: req.body.location,
            jobType: req.body.jobType,      
            user: req.user.id 
        });
        res.status(201).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
    }
}


//         Single   Job ------------------------------------

exports.singleJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
    }
}


//         Update job by id. ------------------------------------

exports.updateJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, {new: true}).populate('jobType', 'jobTypeName').populate('user', 'firstName lastName') // this request.params.job_id update new job (job type id & jobType name )
        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
    }
}



// ------------------------------------------------------------------------------------------------------------
//         Update job by id. ------------------------------------

exports.showJobs = async (req, res, next) => {

    // enable search
    const keyword = req.query.keyword ? {         // searching me he error ha  pagination
        title: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

     // enable pagination
     const pageSize = 5;
     const page = Number(req.query.pageNumber) || 1;
    //  const count = await Job.find({}).estimatedDocumentCount();
    const count = await Job.find({ ...keyword }).countDocuments();

    try {
        const jobs = await Job.find( ...keyword ).skip(pageSize * (page - 1)).limit(pageSize)
        res.status(200).json({
            success: true,
            jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count
        })
    } catch (error) {
        next(error);
    }
}

