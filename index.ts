import dotenv from "dotenv";
import express from "express";



dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());



app.listen(port, ()=>{
    console.log(`Server is running in port ${port}`);
});
