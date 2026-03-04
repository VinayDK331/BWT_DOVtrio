const express = require("express")
const router = express.Router()

const Goal = require("../models/Goal")



// ============================
// CREATE GOAL
// ============================

router.post("/create", async (req, res) => {

try {

const { title, category, deadline, priority, notes, userId } = req.body

if (!title || !deadline || !userId) {
return res.status(400).json({ message: "Required fields missing" })
}

const goal = new Goal({
title,
category,
deadline,
priority,
notes,
userId
})

await goal.save()

res.json({
message: "Goal created successfully",
goal
})

} catch (err) {

console.error(err)
res.status(500).json({ message: "Server error" })

}

})



// ============================
// GET USER GOALS
// ============================

router.get("/:userId", async (req, res) => {

try {

const goals = await Goal.find({ userId: req.params.userId })

res.json(goals)

} catch (err) {

res.status(500).json({ message: "Server error" })

}

})



// ============================
// DELETE GOAL
// ============================

router.delete("/:id", async (req, res) => {

try {

await Goal.findByIdAndDelete(req.params.id)

res.json({
message: "Goal deleted"
})

} catch (err) {

res.status(500).json({ message: "Server error" })

}

})



// ============================
// UPDATE GOAL
// ============================

router.put("/:id", async (req, res) => {

try {

const goal = await Goal.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true }
)

res.json(goal)

} catch (err) {

res.status(500).json({ message: "Server error" })

}

})


module.exports = router