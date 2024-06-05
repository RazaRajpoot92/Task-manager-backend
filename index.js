import express from "express"
import tasks from "./src/routes/tasks.js"
import connectDB from "./src/db/connectDB.js"
import { configDotenv } from "dotenv"
import { notFound } from "./src/middlewares/notFound.js"
import { erorrHanlder } from "./src/middlewares/errorHandler.js"

configDotenv()
const app = express()

const PORT = process.env.PORT || 3000
app.use(express.json())

//Task manager API
app.use("/api/v1/tasks",tasks)

app.use(notFound)
app.use(erorrHanlder)


const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        console.log("Database connected")
        app.listen(PORT,console.log(`Server is running on PORT : ${PORT}`))
    }catch(error){
        console.log(error)
    }
}

start()