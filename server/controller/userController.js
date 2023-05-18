const UserModal = require('../model/userSchema')
const { hash, compare } = require('bcrypt')
const jwt = require('jsonwebtoken')

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
    userSignup: async (req, res) =>{
        try {
            const existUser = await UserModal.findOne({ email: req.body.email })
            if (existUser) {
                res.status(200).json({status:"failed"})
            } else {
                let userDetails = req.body
                userDetails.password = await hash(userDetails.password, 10)
                await UserModal.create(userDetails)
                const user = await UserModal.findOne({ email: userDetails.email })
                const userId = user._id
                const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 })
                res.status(200).json({token: token,status:"success"})
            }
        } catch (error) {
            console.log(error)
        }
    },
    userLogin: async (req, res) =>{
        try {
            const user = await UserModal.findOne({ email: req.body.email })
            if (user) {
                const isMatch = await compare(req.body.password, user.password)
                if (isMatch) {
                    const userId = user._id
                    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 })
                    res.status(200).json({ token: token, status: "success" })
                } else {
                    res.status(200).json({ passwordErr: true, status: "failed", message: "Your Password is Incorrect" })
                }
            } else {
                res.status(200).json({ emailErr: true, status: "failed", message: "Your Email is Incorrect" })
            }
        } catch (error) {
            console.log(error)
        }
    },
    getUserDetails: async (req, res) =>{
        try {
            let userDetails = await UserModal.findById(req.userId)
            if (userDetails) {
                res.status(200).json({status:'success', auth:true, userData:userDetails})
            } else {
                res.status(200).json({status:'failed', auth:false})
            }
        } catch (error) {
            console.log(error)
        }
    },
}