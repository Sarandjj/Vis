const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();

const connectDb = require("./config/dbConnection");
// Connect to MongoDB
connectDb();


// Middleware to parse JSON
app.use(express.json());
const Port = process.env.PORT || 3000;
// Use quotes routes
app.use("/api/quotes", require('./routes/quotes_routes'));

app.listen(Port,"0.0.0.0", () => {
    console.log(`Server is running on port ${Port}`);
});
