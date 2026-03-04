const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/bro_reminder")

const User = require("./models/User");
const Goal = require("./models/Goal");
const Task = require("./models/Task");

app.post("/signup", async (req,res)=>{
    const user = new User(req.body)
    await user.save()
    res.json(user)
})

app.post("/goal", async(req,res)=>{
    const goal = new Goal(req.body)
    await goal.save()
    res.json(goal)
})

app.post("/task", async(req,res)=>{
    const task = new Task(req.body)
    await task.save()
    res.json(task)
})

app.get("/tasks/:userId", async(req,res)=>{
    const tasks = await Task.find({userId:req.params.userId})
    res.json(tasks)
})

app.listen(5000,()=>{
    console.log("Server running on port 5000")
})