const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        const username = encodeURIComponent(process.env.DB_USER);
        const password = encodeURIComponent(process.env.DB_PASSWORD);
        const cluster = process.env.DB_HOST;
        const dbName = process.env.DB_NAME;

        const uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;

        await mongoose.connect(uri);
        console.log('MongoDB connected Successfully!');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};


module.exports = connectDB;