const userModel = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcrypt')

const cloudinary = require("cloudinary").v2;



cloudinary.config({
    cloud_name: 'dx76klizp',
    api_key: '434245817557721',
    api_secret: 'iyHpuTUIumS1LcrQqn9sWZ2X2UA'
});

class Usercontroller{

    static registerUser = async (req, res) => {
       console.log(req.body)
    console.log(req.files.image)

        const file = req.files.image
        const myCloud = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'userImage'
        })

        const { name, email, password, conPassword } = req.body
        const user = await userModel.findOne({ email: email })
        if (user) {
            res.status(404).json({ status: "failed", message: "ᴛʜɪꜱ ᴇᴍᴀɪʟ ɪꜱ ᴀʟʀᴇᴀᴅʏ ᴇxɪᴛꜱ😓" });
        } else {
            if (name && email && password && conPassword) {
                if (password === conPassword) {
                    try {

                        const hashPassword = await bcrypt.hash(password, 10)
                        const data = new userModel({
                            name: name,
                            email: email,
                            password: hashPassword,

                            image: {
                                public_id: myCloud.public_id,
                                url: myCloud.secure_url,
                            },
                        })
                        await data.save()
                        res
                            .status(201)
                            .json({ status: "success", message: "User Registration Successfully 😃🍻" });
                    } catch (err) {
                        console.log(err)
                    }
                } else {
                    res.status(404).json({ status: "failed", message: "'Password and Confirm Password does not match 😓" });
                }
            } else {
                res.status(404).json({ status: "failed", message: "All Fields are required😓" });
            }
        }
    }

    static loginUser = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email: email });
            if (user != null) {
                const ismatch = await bcrypt.compare(password, user.password);
                // console.log(ismatch)
                if (ismatch) {
                    const token = jwt.sign({ ID: user._id }, process.env.JWT_SECRET_KEY);
                    res.cookie("token", token);
                    res.status(201).json({
                        status: "success",
                        message: "Login Successfully 😃🍻",
                        token,
                        user,
                    });
                } else {
                    res.status(404).json({
                        status: "failed",
                        message: "'Email and Password is not valid😓",
                    });
                }
            } else {
                res
                    .status(404)
                    .json({ status: "failed", message: "you are not registered user😓" });
            }
        } catch (e) {
            console.log(e);
        }
    };

    static getAllUser = async (req, res) => {
        try {
            const data = await userModel.find()
            res.status(200).json({
                data
            })
        } catch (error) {

        }
    }

    static logout = async (req, res) => {

        try {
            res.cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true,
            });

            res.status(200).json({
                success: true,
                message: "Logged Out",
            });
        } catch (error) {
            console.log(error)
        }
    }
    static delete = async (req, res) => {
        try {
            const data = await userModel.findByIdAndDelete(req.params.id)
            res
                .status(200)
                .json({ status: "success", message: " deleted successfully 😃🍻" });
        } catch (err) {
            console.log(err)
        }
    }


    
}
module.exports=Usercontroller