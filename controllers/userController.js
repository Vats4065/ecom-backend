const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


exports.signup = async (req, res) => {
    const { email, password, name, address, phone, role } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (user) return res.status(400).json({ msg: 'User already exists' })

        const newUser = new userModel({ email, password, name, address, phone, role })
        const salt = await bcrypt.genSalt(10)
        newUser.password = await bcrypt.hash(password, salt)
        await newUser.save()

        res.status(201).json({ msg: 'User registered successfully' })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}



exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (!user) return res.status(400).json({ msg: 'User not found' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.cookie('jwt', token).send();
        return res.json({ token })


    } catch (error) {
        return res.status(500).json({ msg: error })

    }
}

exports.getUserProfile = async (req, res) => {

    try {
        const user = await userModel.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

exports.updateUserProfile = async (req, res) => {
    const { name, address, phone, email } = req.body

    try {
        const user = await userModel.findByIdAndUpdate(req.user.id, { name, address, phone, email }, { new: true })
        res.json(user)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.user.id)
        res.json({ msg: 'User deleted successfully' })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const user = await userModel.find()
        if (!user) return res.status(404).json({ msg: "User not found" })
        res.json(user)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

exports.refreshToken = async (req, res) => {
    const token = req.cookies.jwt

    try {
        if (!token) return res.status(401).json({ msg: 'Token is required' })

        const payload = jwt.verify(token, process.env.JWT_SECRET)
        if (!payload) return res.status(401).json({ msg: 'Token is invalid' })

        const newToken = jwt.sign({ id: payload.id, role: payload.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
        const user = await userModel.findById(payload.id)
        if (!user) return res.status(404).json({ msg: 'User not found' })

        return res.json({ token: newToken })

    } catch (error) {
        return res.status(500).json({ msg: error.message })

    }
}

exports.logout = async (req, res) => {
    res.clearCookie('jwt', { path: '/' });
    res.json({ msg: 'User logged out successfully' });
}