const bookingModel = require("../models/booking.model");
const roomModel = require("../models/room.models")
let path = require('path')
let fs = require('fs')

async function createRoom(req, res) {
    let uploadedPath;

    try {
        const { role } = req.user;

        if (role !== "Admin") {
            if (req.file) fs.unlinkSync(req.file.path);

            return res.status(403).json({
                message: "Only Admin Can Change",
            });
        }

        const { roomNumber, roomType, price, description, status, totalMember } =
            req.body;
        const image = req.file;

        const roomImgPath = image.filename;
        if (!image) {
            return res.status(400).json({
                message: "Room image is required",
            });
        }

        const isExistRoomNumber = await roomModel.findOne({ roomNumber });

        if (isExistRoomNumber) {
            fs.unlinkSync(uploadedPath);

            return res.status(400).json({
                message: "Room Number Already Exists",
            });
        }

        const room = await roomModel.create({
            roomNumber,
            price,
            description,
            roomType,
            roomImage: roomImgPath,
            status,
            totalMember,
        });

        return res.status(201).json({
            message: "Room Created Successfully",
            room,
        });
    } catch (error) {
        if (uploadedPath && fs.existsSync(uploadedPath)) {
            fs.unlinkSync(uploadedPath);
        }

        return res.status(500).json({
            message: error.message,
        });
    }
}

async function getALLRoom(req, res) {
    try {

        const room = await roomModel.find()

        res.status(200).json({
            room
        })
    } catch (error) {
        console.log(error.message);


    }

}

async function deleteRoombyId(req, res) {
    try {
        const { role } = req.user
        if (role !== 'Admin') {
            return res.status(400).json({
                message: "Only Admin Can Changes",
            })
        }
        const { id } = req.params
        const room = await roomModel.findByIdAndDelete(id)
        res.status(200).json({
            message: "Deleted Sucessfully"
        })
    } catch (error) {
        console.log(error.message);


    }
}

async function updateRoom(req, res) {
  try {
    const { role } = req.user;

    if (role !== "Admin") {
      return res.status(403).json({
        message: "Only Admin Can Changes",
      });
    }

    const { id } = req.params;
    const { roomNumber, roomType, price, description, status, totalMember } = req.body;

    const existingRoom = await roomModel.findOne({
      roomNumber,
      _id: { $ne: id },
    });

    if (existingRoom) {
      return res.status(400).json({
        message: "Already Exist RoomNumber",
      });
    }

    const updateData = {};

    if (roomNumber) updateData.roomNumber = roomNumber;
    if (roomType) updateData.roomType = roomType;
    if (price) updateData.price = price;
    if (description) updateData.description = description;
    if (status) updateData.status = status;
    if (totalMember) updateData.totalMember = totalMember;

    if (req.file) {
      updateData.roomImage = req.file.filename;
    }

    const room = await roomModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return res.status(200).json({
      message: "Update Successfully",
      room,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function roomIsAvailable(req, res) {
    try {
        const { checkInDate, checkOutDate, guestCount } = req.body;

        if (!checkInDate || !checkOutDate || !guestCount) {
            return res.status(400).json({
                message: "checkInDate, checkOutDate and guestCount are required",
            });
        }

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const guest = Number(guestCount) % 4

        if (checkIn >= checkOut) {
            return res.status(400).json({
                message: "Invalid Date",
            });
        }

        const bookedRoomIds = await bookingModel.distinct("roomId", {
            bookingStatus: { $in: ["confirmed", "checkedIn"] },
            checkInDate: { $lt: checkOut },
            checkOutDate: { $gt: checkIn },
        });

        const roomDetail = await roomModel.find({
            status: "available",
            totalMember: { $gte: guest },
            _id: { $nin: bookedRoomIds },
        });

        
        const rooms = roomDetail.filter(data=>data.totalMember >= guest)        

        

        res.status(200).json({
            message: "rooms fetched successfully",
            rooms,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

async function getRoomById(req,res){
    try {
        const {id} = req.params
        
        const room = await roomModel.findById(id)

        res.status(200).json({
            room
        })
    } catch (error) {
        console.log("room===",error.message);
        
        
    }

}


module.exports = {
    createRoom,
    getALLRoom,
    deleteRoombyId,
    updateRoom,
    roomIsAvailable,
    getRoomById
}