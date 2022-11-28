const express = require("express");
const app = express();
const mongoose = require("mongoose");

var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// MongoDB connection
mongoose.connect("mongodb+srv://admin:password!@maincluster.rhuxyqf.mongodb.net/dongsudeploy?retryWrites=true&w=majority", {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log("+ DongSu Deployed DB Connected"))
    .catch(err => console.log("Error : " + err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("+ DB Server running"));

var cors = require('cors');
app.use(cors());

const restApiGeneral = require("./api/restAPI");

app.use('/api', restApiGeneral);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`+ API port running on ${PORT}`)
 });
