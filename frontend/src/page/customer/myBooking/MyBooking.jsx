import { useEffect, useState } from "react";
import "./myBooking.scss";
import { useDispatch, useSelector } from "react-redux";
import { Empty, Image } from "antd";

import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'antd';
import { cancelBooking, getMyBooking } from "../../../store/thunk/CustomerThunk";




const MyBooking = () => {
  const [status] = useState(true);

  const [modal2Open, setModal2Open] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const dispatch = useDispatch();
  const data = useSelector((state) => state?.customer?.myBookings);

  

  const navigate = useNavigate()

  const formatDate = (d) => {
    if (!d) return "";
    return d.split("T")[0].split("-").reverse().join("/");
  };

  const cancelBookingHandler = async (id) => {
    await dispatch(cancelBooking(id));
  };

  useEffect(() => {
    dispatch(getMyBooking());
  }, [dispatch]);

  return (
    <div className="Booking-page">
      <h1 className="mybooking">My Booking :-</h1>

      <div className="booking">
        {data?.length > 0 ? (
          data.map((booking) => (
            <div className="booking-card" key={booking._id}>
              <div className="header">

                <Image className="img" src={`https://hotel-management-be-75w4.onrender.com/room_img/${booking?.roomId?.roomImage}`}
                  alt="room-img"></Image>
              </div>

              <div className="room-detail">
                <div className="room-information">
                  <h1 className="title">
                    {booking?.roomId?.roomType} Room
                  </h1>

                  <h3 className="price">
                    Price :- ₹{booking.totalAmount}
                  </h3>

                  <div className="info">
                    <h4>Guest : {booking.guestCount}</h4>
                    <h4>Room Number :- {booking?.roomId?.roomNumber}</h4>
                  </div>

                  <div className="date">
                    <p>Check-in-date : {formatDate(booking?.checkInDate)}</p>
                    <p>Check-out-date : {formatDate(booking?.checkOutDate)}</p>
                  </div>
                </div>

                <hr className="line" />

                <div className="btn-info">
                  {status ? (
                    <button className={`status ${booking?.bookingStatus === 'confirmed' ? `active` : `noActive`}`}>
                      {booking?.bookingStatus}
                    </button>
                  ) : (
                    <button className="status">CheckOut</button>
                  )}



                  <Button
                    className={
                      booking.bookingStatus === "cancelled"
                        ? "cancelBtn notActive"
                        : "cancelBtn"
                    }
                    type="primary"
                    disabled={booking.bookingStatus === "cancelled"}
                    onClick={() => {
                      if (booking.bookingStatus === "cancelled") return;

                      setSelectedBookingId(booking._id);
                      setModal2Open(true);
                    }}
                  >
                    Cancel Booking
                  </Button>
                  {modal2Open && (<Modal
                    title="Booking Cancel"
                    centered
                    className="cancel-modal"
                    open={modal2Open}
                    onOk={() => {
                      setModal2Open(false)
                      cancelBookingHandler(selectedBookingId)
                      navigate('/room')
                    }}
                    onCancel={() => setModal2Open(false)}

                  >
                    <p>Are you Sure to cancel Booking</p>
                  </Modal>)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data">
            <Empty description="No bookings found" />
          </div>
        )}


      </div>






    </div>
  );
};

export default MyBooking;