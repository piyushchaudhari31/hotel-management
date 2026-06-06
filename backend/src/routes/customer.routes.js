const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const { customerDetail, getCustomerDetail, updateCustomer, getAllCustomer } = require('../controllers/customer.controller')
const multer = require('multer')
const path = require('path')

const router = express()

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


router.post('/customerDetail', authMiddleware, customerDetail)

router.get('/customerDetail',authMiddleware,getCustomerDetail)
router.get('/getAllCustomer',authMiddleware,getAllCustomer)


router.put('/updateCustomer',authMiddleware,upload.single('image'),updateCustomer)

module.exports = router