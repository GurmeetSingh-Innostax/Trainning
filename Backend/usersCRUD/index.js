const express = require("express");
const morgan= require("morgan");
const userRouter = require("./src/routes/users");
//const client =require("./connection");
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}

const PORT = process.env.PORT;


app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
