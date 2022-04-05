const express = require("express");
const port = 8080;
const cors = require("cors");
const app = express();
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
