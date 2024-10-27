//api dcoumentation
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from 'swagger-jsdoc'
//imports packages
import dotenv from 'dotenv'
import express from 'express'
import colors from 'colors'
import cors from 'cors'
import morgan from 'morgan'
import 'express-async-errors'
//security packages
import helmet from 'helmet' 
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'


//files  imports
import testRoutes from './routes/testRoutes.js'
import connectDB from './config/mongodb.js'
//route imports 
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import jobsRoutes from './routes/jobsRoutes.js'

//dot env config 

dotenv.config()

//mongo db connection 
connectDB()
// swagger api config
//swagger api options
const options={
    definition:{  openapi:"3.0.0",
        info:{
            title:"Job Portal Application",
            description:'Node ExpressJs Job Portal Application'
        },
        servers:[
            {
                url:"http://localhost:8080"
            }
        ]
    },
    apis:['./routes/*.js']
};
const spec=swaggerDoc(options)
  
//rest object 
const app=express()
//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
//secures data in header
app.use(helmet()) 
app.use(xss())
app.use(mongoSanitize())


//route
app.use('/api/v1/test',testRoutes)
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/job',jobsRoutes)
//homeroute root 
app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(spec))
//validation middleware
app.use(errorMiddleware)
//port
const PORT=process.env.PORT || 8080
//listen 
app.listen(PORT,()=>{
    console.log(`Node Server Running In ${process.env.DEV_MODE} Mode on port no ${PORT}`.bgCyan.white)
})