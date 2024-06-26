const JobType = require('../models/jobTypeModel');
const ErrorResponse = require('../utils/errorResponse');


//    Create   Job   Category

exports.createJobType = async (req, res, next) => {
    try {
        const JobT = await JobType.create({
            jobTypeName: req.body.jobTypeName,            // jobTypeModel.js
            user: req.user.id                  // auth.js sy verify token s aya ( req.user )
        });
        res.status(201).json({
            success: true,
            JobT
        })
    } catch (error) {
        next(error);
    }
}


//    All Jobs   Category

exports.allJobsType = async (req, res, next) => {
    try {
        const JobT = await JobType.find();
        res.status(200).json({
            success: true,
            JobT
        })
    } catch (error) {
        next(error);
    }
}