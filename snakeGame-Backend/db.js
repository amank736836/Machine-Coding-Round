const mongoose = require("mongoose");

const connectToDatabase = async () => {
    const database = process.env.DATABASE_URL;
    
    try {
        await mongoose.connect(database);
        console.log("Connected to the database");
    } catch (err) {
        console.log("Error connecting to the database", err);
        process.exit(1);
    }
};

module.exports = connectToDatabase;