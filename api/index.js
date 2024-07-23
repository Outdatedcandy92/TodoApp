const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("dblink").then( ()=>{
    console.log("connected to database");

}).catch((error)=>{
    console.log("Not connected to database", err);
});

app.listen(3000, () => {
    console.log('Server running on {port}');
});



//endpoint for creating a habit

const Habit = require("./models/habit");

app.post("/habits", async (req, res) => {
    try {

        const {title, color, repeat, reminder} = req.body;

        const newHabit = new Habit({
            title,
            color,
            repeat,
            reminder
        });


        const savedHabit = await newHabit.save();
        res.status(200).json(savedHabit);
        

    } catch (error) {
        res.status(500).json({error: "error"});
        
    }
})
