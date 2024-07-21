const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const models = require("../db/Models")


const authenticateJWT = async (req, res, next) => {
    try {
        if (!req.header('Authorization')) {
            return res.status(500).json({
                message: "Please login first!"
            });
        }
        const token = req.header('Authorization').split(' ')[1];


        let extractedData = jwt.verify(token, process.env.JWT_SECRET || "Avengers");

        // Verify userId
        const findUser = await models.User.findOne({
            where: {
                user_id: extractedData.dataValues.user_id
            }
        });
        if (!findUser) {
            return res.status(404).json({
                message: "Invalid User Logged In!"
            });
        }
        req.user = extractedData.dataValues;
        next();
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { userName, password } = req.body;
        const user = await models.User.findOne({
            where: { user_name: userName }
        });

        if (!user) {
            return res.status(404).json({
                message: "No user found with this userName."
            });
        }
        let userPassword = user.password;

        let isPasswordCorrect = await bcrypt.compare(password, userPassword);

        const token = jwt.sign(
            { ...user, }, process.env.JWT_SECRET || "Avengers",
            {
                expiresIn: "1h"
            }
        );

        if (isPasswordCorrect) {
            return res.status(200).json({
                message: "You have been logged in successfully!",
                accessToken: token
            });
        }

        return res.status(400).json({
            message: "Login Failed: Invalid Credentials!"
        });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res) => {
    try {
        if (!req.header('Authorization')) {
            return res.status(500).json({
                message: "Please login first!"
            });
        }
        const token = req.header('Authorization').split(' ')[1];

    } catch (error) {
        next(error)
    }
}

module.exports = {
    authenticateJWT,
    login,
};
