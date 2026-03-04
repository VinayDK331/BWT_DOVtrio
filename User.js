const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

name: {
type: String,
required: true
},

email: {
type: String,
required: true,
unique: true
},

password: {
type: String,
required: true
},

motivation: {
type: String,
default: ""
},

preferredStudyTime: {
type: String,
default: ""
},

studyDays: {
type: [String],
default: []
},

streak: {
type: Number,
default: 0
},

executionScore: {
type: Number,
default: 0
},

totalTasksCompleted: {
type: Number,
default: 0
},

createdAt: {
type: Date,
default: Date.now
}

})

module.exports = mongoose.model("User", UserSchema)