const express = require("express");
const port = 8080;
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
