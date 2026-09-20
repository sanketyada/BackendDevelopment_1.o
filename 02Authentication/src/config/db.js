import mongoose from "mongoose"

export async function ConnectDB() {
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URI}/Auth`)
        console.log("Connect To Db!")
    } catch (error) {
        console.log(error.message)
    }

}