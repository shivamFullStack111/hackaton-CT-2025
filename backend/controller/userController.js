const User = require('../schemas/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // user exist check
        const exist = await User.findOne({ email })
        if (exist) return res.status(400).json({ success: false, message: "User already exists" })

        // password hash
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ name, email, password: hashedPassword })
        await newUser.save()

        // token create
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES || "7d" }
        )

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

// Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ success: false, message: "User not found" })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" })

        // token create
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES || "7d" }
        )

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password") // password hide
        res.json({ success: true, users })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

// get users by ids
const getUsersByIds = async (req, res) => {
    const { userIds } = req.body; // array of userIds

    const users = await User.find({
        _id: {
            $in: userIds
        }
    }).select('-password');

    return res.json({ success: true, users });

}

// Update user name
const updateUserName = async (req, res) => {
    try {
        const { userId, newName } = req.body

        const user = await User.findByIdAndUpdate(
            userId,
            { name: newName },
            { new: true }
        )

        if (!user) return res.status(404).json({ success: false, message: "User not found" })

        res.json({ success: true, message: "Name updated successfully", user })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

module.exports = { registerUser, loginUser, getAllUsers, updateUserName, getUsersByIds }
