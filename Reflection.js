const mongoose = require("mongoose")

const ReflectionSchema = new mongoose.Schema({

userId: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true
},

text: {
type: String,
required: true
},

sentiment: {
type: String,
enum: ["positive","neutral","negative"],
default: "neutral"
},

score: {
type: Number,
default: 0
},

date: {
type: Date,
default: Date.now
}

})

module.exports = mongoose.model("Reflection", ReflectionSchema)