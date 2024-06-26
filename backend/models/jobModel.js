const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema;

const jobSchema = new mongoose.Schema({

    title:{
        type: String,
        trim: true,
        required: [true, 'Title is required'],
        maxlength: 32,
    },

    description:{
        type: String,
        trim: true,
        required: [true, 'Description is required'],
    },

    salary:{
        type: String,
        trim: true,
        required: [true, 'Salary is required'],
    },

    location:{
        type: String,
    },
    available: {
        type: Boolean,
        default: true
    },
    jobType: {
        type: ObjectId,    // is objID user me ayegi
        ref: 'JobType',
        required: true
    },
    user: {
        type: ObjectId,    // is objID user me ayegi
        ref: 'User',
        required: true
    },

    
}, {timestamps: true})

module.exports = mongoose.model('Job', jobSchema);