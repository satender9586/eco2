const mongoose = require("mongoose")

const connectdb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDB Database: ${connect.connection.host}`);
    } catch (error) {
        console.error(`Error in MongoDB connection: ${error}`);
    }
};

module.exports = connectdb