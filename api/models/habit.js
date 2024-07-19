const moongooes = require('mongoose');

const habitScheme = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    },
    repeat:{
        type: String,
        enum["daily", "weekly"],
        default: "daily",
    },
    reminder:{
        type: Boolean,
        default: false
    },
    completed:{
        type: Object,
        default:{}
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
    
});

const Habit = mongoose.model('Habit', habitScheme);

module.exports = Habit;