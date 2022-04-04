require("dotenv").config();
const mongoose = require("mongoose");

const dbConnect = () => {
    const mongoURI = process.env.MONGODB_URL;
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Database Connection Established...!");
    }).catch((err) => {
        console.log("Error: Database connection can not be established...!", err);
    })
}

module.exports = dbConnect