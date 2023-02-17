const express = require('express');
const app = express();
const dotenv = require('dotenv');
const notFoundMiddleware =  require('./server/middleware/not-found');
const errorMiddleware =  require('./server/middleware/error-handler');
const connectDb = require('./server/database/connection');




//getting port from config.env
dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 9090;

connectDb();
const productRoute = require('./server/routes/productRoute');


//middleware
app.use(express.json());

//routes
app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products',productRoute)

app.use(notFoundMiddleware);
app.use(errorMiddleware);


app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`);
})
