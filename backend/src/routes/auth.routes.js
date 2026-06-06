// const { validationRegister, loginRegister } = require('../validation/auth.validation')

const express = require('express')
const { userRegister, userLogin, userLogOut, forgetPassword, uploadImage, getAllDetail, myInfo, changePassword } = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')

const multer = require('multer')
const path = require('path')
const { adminDashboard } = require('../controllers/admin.controller')

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/assets/Profile_img')
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${path.basename(file.originalname, ext)}-${Date.now()}${ext}`;
        cb(null, uniqueName);
    }
})

const upload = multer({ storage: storage })


router.post('/register', userRegister)

router.post('/login', userLogin)

router.post('/logOut', userLogOut)

router.post('/forgotPassword', forgetPassword)

router.post('/upload', authMiddleware, upload.single('image'), uploadImage)

router.get('/getAllDetail', getAllDetail)


router.get('/AdminDashoard', authMiddleware, adminDashboard)

router.get('/myInfo',authMiddleware,myInfo)

router.put("/changePassword",authMiddleware,changePassword);

module.exports = router 