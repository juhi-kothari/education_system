const User = require('../../models/User');

const userController = {
    login: async (req, res) => {
        res.status(200).send({
            status: true,
            message: "Logged in successfully",
        });
    },

    register: async (req, res) => {

        const { name , email, phone , password } = req.body;

        const user = new User({
            name,
            email,
            phone,
            password
        });
        const result = await user.save();

        res.status(200).send({
            status: true,
            message: "registered successfully",
            result : result
        });
    }
}

module.exports = userController;