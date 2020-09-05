const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var path = require('path');


require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ extended: false }));

// Connect Database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Define Routes
app.use("/api/responses", require("./routes/api/survey"));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '/frontend/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
})
