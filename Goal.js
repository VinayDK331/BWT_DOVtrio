const mongoose = require("mongoose")

const GoalSchema = new mongoose.Schema({

title: {
type: String,
required: true
},

category: {
type: String,
default: "general"
},

deadline: {
type: String,
required: true
},

priority: {
type: String,
enum: ["low","medium","high"],
default: "medium"
},

notes: {
type: String,
default: ""
},

progress: {
type: Number,
default: 0
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

module.exports = mongoose.model("Goal", GoalSchema)