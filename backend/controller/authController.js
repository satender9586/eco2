const { hashPassword, comparePassword } = require("../helpers/authHelper")
const userModels = require("../models/userModels")
const JWT = require("jsonwebtoken")
const dotenv = require('dotenv');

// New Use Registraion api
const userRegister = async (req, res) => {
    try {
        const { name, email, phone, password, address } = req.body
        if (!name) {
            return res.send({ error: "Name is Required" })
        }
        if (!email) {
            return res.send({ error: "email is Required" })
        }
        if (!phone) {
            return res.send({ phone: "Name is Required" })
        }
        if (!password) {
            return res.send({ error: "password is Required" })
        }
        if (!address) {
            return res.send({ error: "address is Required" })
        }

        const existingUser = await userModels.findOne({ email });

        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Error in Registration Email is Already registerd",

            })
        }

        const hashedPassword = await hashPassword(password)

        const user = await new userModels({ name, email, phone, address, password: hashedPassword }).save()
        res.status(201).send({
            success: true,
            message: "user create succesfully",
            user
        })



    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Ërror in registration",
            error
        })
    }
}



// login user

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            });
        }

        const user = await userModels.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            });
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid password"
            });
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        });
    } catch (error) {
        console.error(error);  // Consider using a logging library for better log management
        res.status(500).send({
            success: false,
            message: "Error in login",
            error: "Internal Server Error"  // You might want to provide a more generic message here
        });
    }
};

// test controller

const testController = async (req, res) => {
    res.status(200).send({ message: "protected route" })
}



module.exports = { userRegister, userLogin, testController }