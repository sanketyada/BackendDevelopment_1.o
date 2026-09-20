import dotenv from 'dotenv';
dotenv.config();
import app from "./app/app.js";
import { ConnectDB } from './config/db.js';
await ConnectDB()
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server is Running at http://localhost:${PORT} `)
})