import connectDB from "./Db/db.js"
import dotenv, { configDotenv } from 'dotenv'

dotenv.config({
    path: './env'
})

connectDB();