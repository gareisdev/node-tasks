const { User } = require("./../models/user.model");
const bcrypt = require("bcryptjs");

const signIn = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({
            data: {
                user,
            },
        });
    } catch (error) {
        console.error(`Something goes wrong: ${error}`);
        res.status(500).json({
            error: "Something goes wrong",
        });
    }
};

const signUp = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            res.status(401).json({
                status: "SignUp Failed",
                message: "Invalid credentials",
            });
        }

        if (!user.isActive) {
            res.status(403).json({
                status: "SignUp Failed",
                message: "The user is not active",
            });
        }

        const isCorrect = await bcrypt.compare(password, user.password);

        if (isCorrect) {
            res.status(200).json({
                status: "SignUp succesfully",
            });
        } else {
            res.status(401).json({
                status: "SignUp Failed",
                message: "Invalid credentials",
            });
        }
    } catch (error) {
        console.error(`Something goes wrong: ${error}`);
        res.status(500).json({
            error: "Something goes wrong",
        });
    }
};

module.exports = {
    signIn,
    signUp,
};
