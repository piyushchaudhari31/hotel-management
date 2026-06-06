import "./getRoomById.scss";
import { DatePicker, InputNumber, Button } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
const { RangePicker } = DatePicker;
import checkmark from '../../../assets/tick.png'
import toast from "react-hot-toast";
import { getRoom, getRoomById } from "../../../store/thunk/RoomThunks";
import { createCheckoutSession } from "../../../store/thunk/paymentThunk";

const GetRoomById = () => {

  const [dateValue, setDateValue] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const { id } = useParams()
  const [dates, setDates] = useState({ checkInDate: "", checkOutDate: "" });

  const dispatch = useDispatch()
  const room = useSelector((state) => state?.room.roomById)

  console.log(room);


  const [book, setBook] = useState(false)





  useEffect(() => {
    if (id) {
      dispatch(getRoomById(id))
    }
  }, [id, dispatch])

  const navigate = useNavigate()


  const handleDateChange = (value) => {
    setDateValue(value);

    if (value) {
      setDates({
        checkInDate: value[0].format("YYYY-MM-DD"),
        checkOutDate: value[1].format("YYYY-MM-DD"),
      });
    } else {
      setDates({
        checkInDate: "",
        checkOutDate: "",
      });
    }
  };

  const bookRoomHandler = async (id) => {
    if (!dates.checkInDate || !dates.checkOutDate) {
      toast.error("Please select check-in and check-out date");
      return;
    }

    const data = {
      roomId: id,
      checkInDate: dates.checkInDate,
      checkOutDate: dates.checkOutDate,
      guestCount,
    };

    await dispatch(createCheckoutSession(data));
  };


  return (
    <div className="room-detail-page">


      <div className="room-detail-wrapper">
        <div className="booking-form-card">
          <h2>Book Your Stay</h2>
          <p>Select your date and guest count</p>

          <div className="form-group">
            <label>Check-in & Check-out Date</label>
            <RangePicker
              className="date-picker"
              value={dateValue}
              format="YYYY-MM-DD"
              onChange={handleDateChange}
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
            />
          </div>

          <div className="form-group">
            <label>Guest Count</label>
            <InputNumber min={1} max={3} value={guestCount} onChange={(value) => setGuestCount(value)}
              className="guest-input"
            />
          </div>

          <div className="price-box">
            <span>Price Per Night</span>
            <h3>₹{room?.price}</h3>
          </div>

          <Button type="primary" className="book-btn" onClick={() => { bookRoomHandler(room?._id) }}> Confirm Booking </Button>
        </div>

        <div className="room-info-card">
          <div className="room-image">
            <img
              src={`https://hotel-management-be-75w4.onrender.com/room_img/${room?.roomImage}`}
              alt={"double"}
            />

            <span className={`room-status ${"active"}`}>
              {room?.status}
            </span>
          </div>

          <div className="room-content">
            <h1>{"double"} Room</h1>

            <div className="room-meta">
              <span>Room No: {room?.roomNumber}</span>
              <span>Guests: {room?.totalMember}</span>
              <span>₹{room?.price}/night</span>
            </div>

            <p>{room?.description.slice(0, 200)}</p>


          </div>
        </div>
      </div>

      {book && (
        <div className="booking-card">
          <img src={checkmark} alt="" />
          <div className="booking-Info">

            <h1>Awesome!</h1>
            <p>Your Booking has been confirmed Check your email for detials</p>
            <button onClick={() => {
              setBook(false)
              navigate('/my-booking')
            }}>My Bookings</button>
          </div>

        </div>
      )}

    </div>
  );
};

export default GetRoomById;
