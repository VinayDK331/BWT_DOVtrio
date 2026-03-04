const express = require("express")
const router = express.Router()

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/User")

const JWT_SECRET = "bro_reminder_secret"


// ===============================
// SIGNUP
// ===============================

router.post("/signup", async (req, res) => {

try {

const { name, email, password } = req.body

if (!name || !email || !password) {
return res.status(400).json({ message: "All fields required" })
}

const existingUser = await User.findOne({ email })

if (existingUser) {
return res.status(400).json({ message: "User already exists" })
}

const hashedPassword = await bcrypt.hash(password, 10)

const user = new User({
name,
email,
password: hashedPassword
})

await user.save()

const token = jwt.sign(
{ userId: user._id },
JWT_SECRET,
{ expiresIn: "7d" }
)

res.json({
message: "Signup successful",
token,
user
})

} catch (err) {

console.error(err)
res.status(500).json({ message: "Server error" })

}

})



// ===============================
// LOGIN
// ===============================

router.post("/login", async (req, res) => {

try {

const { email, password } = req.body

const user = await User.findOne({ email })

if (!user) {
return res.status(404).json({ message: "User not found" })
}

const validPassword = await bcrypt.compare(password, user.password)

if (!validPassword) {
return res.status(401).json({ message: "Invalid password" })
}

const token = jwt.sign(
{ userId: user._id },
JWT_SECRET,
{ expiresIn: "7d" }
)

res.json({
message: "Login successful",
token,
user
})

} catch (err) {

console.error(err)
res.status(500).json({ message: "Server error" })

}

})



// ===============================
// GET PROFILE
// ===============================

router.get("/profile/:id", async (req, res) => {

try {

const user = await User.findById(req.params.id)

if (!user) {
return res.status(404).json({ message: "User not found" })
}

res.json(user)

} catch (err) {

res.status(500).json({ message: "Server error" })

}

})


module.exports = router