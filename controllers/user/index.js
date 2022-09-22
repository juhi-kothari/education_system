const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwtSecret = "learningmanagementtoken"
const jwt = require('jsonwebtoken');

const userController = {
    login: async (req, res) => {
        const {email , password } = req.body;



        if(! email || ! password) {
            return res.status (400).send({
                status: false,
             message: "All inputs are required",

            });   
        }

        const user = await User.findOne({email});
        const passwordIsCorrect =  await bcrypt.compare(password, user.password);

        if (user && passwordIsCorrect) {
            console.log("condition true");
            const payload = {
                user : {
                    id : user._id
                }
            };
    
            const token = await jwt.sign( payload , jwtSecret , {expiresIn : 240000});

             res.status(200).send({
                status: true,
                message: "Logged in successfully",
                token : token
    
            });

        }
        
             res.status(400).send({
                status: false,
                message: "credentials did not match"
    
            });

        
       
    },

    register: async (req, res) => {

        const { name , email, phone , password } = req.body;
        let pass = password;

        const salt = await bcrypt.genSalt(10);
        pass = await bcrypt.hash(password,salt);

        const user = new User({
            name,
            email,
            phone,
            password : pass
        });
        const result = await user.save();

        const payload = {
            user : {
                id: result._id
            }
        };

        const token = await jwt.sign(payload , jwtSecret , {expiresIn : 240000});

        res.status(200).send({
            status: true,
            message: "registered successfully",
            token
        });
    }
}

module.exports = userController;