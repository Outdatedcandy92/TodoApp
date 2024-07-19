const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://Outdatedcandy92:j0XuhIndo7i0f2Zd@habit.1r9ziri.mongodb.net/?retryWrites=true&w=majority&appName=Habit").then( ()=>{
    console.log("connected to database");

}).catch((error)=>{
    console.log("Not connected to database", err);
});

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});



//endpoint for creating a habit

const Habit = require('./models/habit');

app.post("/habit", async (req, res) => {
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