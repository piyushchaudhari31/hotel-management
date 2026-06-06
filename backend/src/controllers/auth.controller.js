const authModel = require("../models/auth.models")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function userRegister(req, res) {
    try {
        const { email, password, firstName,lastName, role } = req.body
        const isExistEmail = await authModel.findOne({ email })
        if (isExistEmail) {
            return res.status(401).json({
                message: "Already Exist Email"
            })
        }
        const user = await authModel.create({
            firstName,
            lastName,
            email,
            role,
            password: await bcrypt.hash(password, 10)
        })

        res.status(200).json({
            message: "Register Successfully",
            user
        })
    } catch (error) {
        console.log(error);
    }
}

async function userLogin(req, res) {
    try {
        const { email, password } = req.body
        const isUser = await authModel.findOne({ email })
        if (!isUser) {
            return res.status(401).json({
                message: "Invalid email"
            })
        }
        const isPassword = await bcrypt.compare(password, isUser.password)
        if (!isPassword) {
            return res.status(401).json({
                message: "Invalid Password"
            })
        }

        let token = jwt.sign({
            userId: isUser._id,
            email: isUser._id,
        }, process.env.jWT_secret, { expiresIn: '1d' })

        res.cookie('token', token)
        res.status(202).json({
            message: "Login Successfully",
            token,
            user: {
                firstName: isUser.firstName,
                lastName: isUser.lastName,
                email: isUser.email,
                role: isUser.role,
                profileImg: isUser.profileImg
            }
        })
    } catch (error) {
        console.log(error.message);


    }

}

async function userLogOut(req, res) {
    res.clearCookie('token')
    return res.status(200).json({
        message: "Log-out Successfully"
    })
}

async function forgetPassword(req, res) {
    try {
        const { email, newPassword } = req.body
        const isUser = await authModel.findOne({ email })

        if (!isUser) {
            return res.status(401).json({
                message: "Invalid email"
            })
        }

        isUser.password = await bcrypt.hash(newPassword, 10)
        isUser.save()

        res.status(200).json({
            message: "Reset password Successfully"
        })
    } catch (error) {
        console.log(error.message);


    }
}

async function uploadImage(req, res) {
    try {
        const image = req.file

        const id = req.user._id

        const user = await authModel.findById(id)

        user.profileImg = image.path
        user.save()

        res.status(200).json({
            message: "Profile Image Update"
        })


    } catch (error) {
        console.log(error.message);


    }
}

async function getAllDetail(req, res) {

    try {
        const user = await authModel.find()

        res.status(200).json({
            message: {
                user
            }
        })
    } catch (error) {
        console.log(error.message);


    }
}

async function myInfo(req, res) {
    const user = req.user

    return res.status(200).json({
        user
    })

}

async function changePassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;

    const userId = req.user._id;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await authModel.findById(userId);

    const isMatch = await bcrypt.compare(oldPassword,user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Old password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}


module.exports = { userRegister, userLogin, userLogOut, forgetPassword, uploadImage, getAllDetail, myInfo,changePassword }