import dotenv from 'dotenv';
dotenv.config();

import app from "./app/app.js";
import ConnectDB from './config/db.js';
import config from './config/config.js';
await ConnectDB()
const PORT = config.PORT || 3000


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})