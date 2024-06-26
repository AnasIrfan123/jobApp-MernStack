
const express = require('express');
const router = express.Router();

const { createJob, singleJob, updateJob, showJobs } = require('../controllers/jobsController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');



//   jobs   routes

//  /api/job/create
router.post('/job/create', isAuthenticated, /*isAdmin,*/ createJob); // => => ye bh issue create kr raha ha isAdmin par excess denied you must an admin yeh error araha ha 


//  /api/job/id                    => single id sy 1 he  ayegi
router.get('/job/:id', singleJob);


//  /api/job/update/job_id
router.put('/job/update/:job_id', isAuthenticated, isAdmin, updateJob); // isAuthenticated means => protected route
// error access denied you must an admin ye error araaha ha thunder client par 
// is jobportal ki github dekho us sy solve hoga delete me bh yahi issue tha update or ab sub isAdmin sy ho rha ha 
// to github me isadmin wli repo dekho us say solved hoga issue 


//  /api/jobs/show 
router.get('/jobs/show', showJobs); 


 
module.exports = router;
