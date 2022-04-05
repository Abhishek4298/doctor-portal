const express = require("express");
const port = 8080;
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const session = require('express-session');
const passport = require('passport');
const router = require("./routes/index");
const dbConnect = require('./dbConnection')

// connection with database
dbConnect();

app.use(cors());
app.use(express.json());
// router
app.use("/", router);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
