const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URL}`);
        console.log(` \n MongoDB connected !! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error Connecting Database!!", error);
        process.exit(1)
    }
};

export { connectDB }