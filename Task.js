const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({

title: {
type: String,
required: true
},

goalId: {
type: mongoose.Schema.Types.ObjectId,
ref: "Goal",
required: true
},

deadline: {
type: String
},

duration: {
type: Number,
default: 30
},

priority: {
type: String,
enum: ["low","medium","high"],
default: "medium"
},

completed: {
type: Boolean,
default: false
},

userId: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true
},

createdAt: {
type: Date,
default: Date.now
}

})

module.exports = mongoose.model("Task", TaskSchema)