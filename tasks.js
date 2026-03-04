const express = require("express")
const router = express.Router()

const Task = require("../models/Task")



// ============================
// CREATE TASK
// ============================

router.post("/create", async (req, res) => {

try {

const {
title,
goalId,
deadline,
duration,
priority,
userId
} = req.body

const task = new Task({

title,
goalId,
deadline,
duration,
priority,
userId,
completed: false

})

await task.save()

res.json({
message: "Task created",
task
})

} catch (err) {

console.error(err)
res.status(500).json({ message: "Server error" })

}

})



// ============================
// GET USER TASKS
// ============================

router.get("/:userId", async (req, res) => {

try {

const tasks = await Task.find({ userId: req.params.userId })

res.json(tasks)

} catch (err) {

res.status(500).json({ message: "Server error" })

}

})



// ============================
// COMPLETE TASK
// ============================

router.put("/complete/:id", async (req, res) => {

try {

const task = await Task.findById(req.params.id)

if (!task) {
return res.status(404).json({ message: "Task not found" })
}

task.completed = true

await task.save()

res.json({
message: "Task completed",
task
})

} catch (err) {

res.status(500).json({ message: "Server error" })

}

})



// ============================
// DELETE TASK
// ============================

router.delete("/:id", async (req, res) => {

try {

await Task.findByIdAndDelete(req.params.id)

res.json({
message: "Task deleted"
})

} catch (err) {

res.status(500).json({ message: "Server error" })

}

})


module.exports = router