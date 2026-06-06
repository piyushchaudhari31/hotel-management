const express = require('express')
const { createRoom, getALLRoom, deleteRoombyId, updateRoom, roomIsAvailable, getRoomById } = require('../controllers/room.controller')

const authMiddleware = require('../middleware/auth.middleware')

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/assets/room_img/')
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${path.basename(file.originalname, ext)}-${Date.now()}${ext}`;
        cb(null, uniqueName);
    }
})

const upload = multer({ storage: storage })


const router = express.Router()

router.post('/createRoom', authMiddleware ,upload.single('image'), createRoom)

router.get('/getAllRoom', getALLRoom)

router.delete('/deleteRoom/:id', deleteRoombyId)

router.put('/updateRoom/:id', upload.single('image'), updateRoom)

router.post('/roomIsAvailable',authMiddleware,roomIsAvailable)

router.get('/getRoomById/:id',authMiddleware,getRoomById)

module.exports = router