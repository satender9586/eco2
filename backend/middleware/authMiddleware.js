const JWT = require("jsonwebtoken")
const userModels = require("../models/userModels")


// protect route

const requireSingIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decode

        next()
    } catch (error) {
        console.log(error)
    }
}

// admin access

const isAdmin = async (req, res, next) => {
    try {
        const user = await userModels.findById(req.user._id)
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "Unauthorize Access"
            })
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            error,
            message: "Error in Admin middleware"
        });

    }
}


module.exports = { requireSingIn, isAdmin }