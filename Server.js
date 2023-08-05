// DEPENDENCIES
require("dotenv").config();
const {PORT = 4100, DATABASE_URL} = process.env;
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

// DATABASE CONNECTION
mongoose.connect(DATABASE_URL);

mongoose.connection
    .on("open", () => console.log("You are connected to Mongoose"))
    .on("close", () => console.log("You are disconnected from Mongoose"))
    .on("error", (error) => console.log(error));

// MODELS
const CheeseSchema = new mongoose.Schema({
    name: String,
    CountryOfOrigin: String,
    image: String
});

const Cheese = mongoose.model("Cheese", CheeseSchema);

// MIDDLEWARE
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
    res.send("Hello cheese app");
});
// Index
app.get("/cheese", async (req, res) => {
    try{
        res.json(await Cheese.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});
// Create
app.post("/cheese", async (req, res) => {
    try{
        res.json(await Cheese.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});
// Update
app.put("/cheese/:id", async (req, res) => {
    try{
        res.json(await Cheese.findByIdAndUpdate(req.params.id, re.body, {new: true})
        );
    } catch (error) {
        res.status(400).json(error);
    }
});
// Delete
app.delete("/cheese/:id", async (req, res) => {
    try {
        res.json(await Cheese.findByIdAndRemove(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});

// LISTENER
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));