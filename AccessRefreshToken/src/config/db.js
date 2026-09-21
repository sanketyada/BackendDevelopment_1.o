import mongoose from "mongoose"
import config from "./config.js"

async function ConnectDB() {
    try {
        const connection = await mongoose.connect(`${config.MONGO_URI}/access-token`)
        console.log("Connected to Database.")
    } catch (error) {
        console.log(error.message)
    }
}
export default ConnectDB;