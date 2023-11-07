require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
mongoose.connect('mongodb://localhost:27017/award-kuda')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user",userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => console.log("Listening on port 3000..."));
