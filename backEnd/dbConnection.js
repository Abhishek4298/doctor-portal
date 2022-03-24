const mongoose = require("mongoose");

const dbConnect = () => {
    const mongoURI = `mongodb+srv://instagramUsername:instagramPassword@cluster0.7uz5e.mongodb.net/instgramDatabase?retryWrites=true&w=majority`;
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