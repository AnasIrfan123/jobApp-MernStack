const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');    // jo bh req hit hogig frontend sy log terminal par ayegi wo possible hoa ha morgan ki traf sy
const bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors');
const cookieParser = require('cookie-parser');

// imp errorHandler
const errorHandler = require('./middleware/error')

// import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobTypeRoute = require('./routes/jobsTypeRoutes');
const jobRoute = require('./routes/jobsRoutes');


//database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=>console.log('DB Connected -- >> -- >>  ✔'))
.catch((err)=>console.log(err))

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());            // is use to cookie parser => in order to authenticate 
app.use(cors());

//     ROUTES   ===================================================
app.get('/', (req, res) => {
    res.send('Hello from Node Js')
})

// error middleware
app.use(errorHandler);


// routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', jobTypeRoute);
app.use('/api', jobRoute);
   

// port
const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})

