const UserModel = require("../models/user.model");
const { signInToken } = require("../utils/auth");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({ status: 400, message: "All fields are required", data: null });
    }

    try {
        const UserExist = await UserModel.findOne({ email });
        if (UserExist) {
            return res.status(400).send({ status: 400, message: "User already exists", data: null });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const User = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });

        if (!User) {
            return res.status(400).send({ status: 400, message: "User not created", data: null });
        }

        const token = signInToken(User._id);

        return res.status(201).send({ status: 201, message: "User created successfully", data: User, token });
    } catch (error) {
        return res.status(500).send({ status: 500, message: error.message, data: null });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ status: 400, message: "All fields are required", data: null });
    }

    try {
        const User = await UserModel.findOne({ email });
        if (!User) {
            return res.status(400).send({ status: 400, message: "User not found", data: null });
        }

        const isMatch = await bcrypt.compare(password, User.password);
        if (!isMatch) {
            return res.status(400).send({ status: 400, message: "Invalid credentials", data: null });
        }

        const token = signInToken(User._id);
        return res.status(200).send({ status: 200, message: "User logged in successfully", data: User, token });
    } catch (error) {
        return res.status(500).send({ status: 500, message: error.message, data: null });
    }
};

module.exports = {
    register,
    login,
};
