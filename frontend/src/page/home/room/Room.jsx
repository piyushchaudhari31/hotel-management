import "../room/room.scss";
import { ArrowDownOutlined } from "@ant-design/icons";
import { DatePicker, InputNumber, Button, Spin, Empty } from "antd";
import { MdOutlineBedroomParent } from "react-icons/md";
import { RiErrorWarningFill, RiSofaLine } from "react-icons/ri";
import { TbBath } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { Image } from 'antd'

import { RoomValidation } from "../../../utils/validation/Validation";
import { checkAvailableRoom, getRoom, getRoomById } from "../../../store/thunk/RoomThunks";
import { getCustomerDetail, updateCustomer } from "../../../store/thunk/CustomerThunk";

const { RangePicker } = DatePicker;

const Room = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { room, loading } = useSelector((state) => state.room);
  const user = useSelector((state) => state?.customer.customer);

  useEffect(() => {
    dispatch(getCustomerDetail());
  }, [dispatch]);






  const [dateValue, setDateValue] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [roomId, setRoomId] = useState(null)

  const [openForm, setOpenForm] = useState(false)

  const [dates, setDates] = useState({
    checkInDate: "",
    checkOutDate: "",
  });

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

    dispatch(getRoom());
  };

  const checkAvailability = async () => {
    if (!user) {
      toast("Login First");
      return;
    }

    await dispatch(
      checkAvailableRoom({
        checkInDate: dates.checkInDate,
        checkOutDate: dates.checkOutDate,
        guestCount,
      })
    );
    setGuestCount(1);
  };



  const bookRoom = (id) => {
    if (!user) {
      toast("Login First", {
        icon: "🔐",
        style: {
          background: "#000",
          color: "#fff",
          borderRadius: "5px",
        },
      });
      return;
    }
    setRoomId(id)

  };



  const { values, handleChange, handleBlur, submitForm, touched, errors } = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: `${user?.firstName || ""} ${user?.lastName || ""}`,
      email: user?.email || "",
      phone: user?.phoneNumber || "",
      address: user?.address || "",
      idProofNumber: user?.idProofNumber || "",

    },

    validationSchema: RoomValidation,
    onSubmit: async (values) => {
      const data = {
        fullName: values.fullName,
        phoneNumber: values.phone,
        address: values.address,
        idProofNumber: values.idProofNumber,
      };

      const updatedUser = await dispatch(updateCustomer(data));

      if (updatedUser) {
        dispatch(getRoomById(roomId))
        navigate(`/room/${roomId}`)
      }

    },
  });

  return (
    <div className="room">
      <section className="section1">
        <div className="title">
          <p className="smallTitle">EXQUISITE AND LUXURIOUS</p>
          <h1 className="mainTitle">Room and suites</h1>
          <p>
            <ArrowDownOutlined />
          </p>
        </div>
      </section>

      <section className="section2">
        <div className="title-description">
          <p>REALNET COLLECTION</p>
          <h1>Indulge in luxury and sophistication</h1>
        </div>

        <div className="description">
          <p>
            Offering over 500 spacious, it's perfect for both business and leisure travelers. Enjoy premium facilities, including a apa,fitness center, and fine dinning. Our friendly, attentive staff provides personalized service, ensuring every stay is seamless and unforgettable. with stunning city views and an inviting atmosphere, realnet luxury hotel offers the ideal escape for relaxtion and indulgence,delivering an exceptional hospitality experience in every detail
          </p>
        </div>
      </section>

      <div className="feature">
        <p>
          <MdOutlineBedroomParent />
          Over 500 luxurious rooms & Suites
        </p>

        <p>
          <RiSofaLine />
          Spacious , modern ,elegant spaces
        </p>

        <p>
          <TbBath />
          Top-notch amenities and comforts
        </p>

        <p>
          <SlCalender />
          flexible booking for convenience
        </p>
      </div>

      <div className="booking-filter">
        <RangePicker
          className="date-picker"
          format="YYYY-MM-DD"
          value={dateValue}
          placement="bottomLeft"
          getPopupContainer={(trigger) => trigger.parentElement}
          onChange={handleDateChange}
          disabledDate={(current) =>
            current && current < dayjs().startOf("day")
          }
        />

        <InputNumber min={1} max={10} value={guestCount}
          onChange={(value) => setGuestCount(value)}
          className="guest-input" placeholder="Guests" />

        <Button type="primary" className="check-btn" onClick={checkAvailability} >
          Check Availability
        </Button>
      </div>

      <section className="card">

        {loading ? (
          <div className="room-loading">
            <Spin size="large" />
          </div>
        ) : room.length > 0 ? (
          room.map((data) => (
            <div className="card-detail" key={data._id}>
              <div className="img-section">
                <Image
                  preview={false}
                  src={`https://hotel-management-be-75w4.onrender.com/room_img/${data.roomImage}`}
                  alt={data.roomType}
                  className="room-image"
                />


                <h3>
                  From: <span>₹{data.price}</span>/perNight
                </h3>
              </div>

              <div className="room-information">
                <p className="status">{data.status}</p>

                <h1 className="Title">{data.roomType} Bed Room</h1>

                <p className="desc">{data.description.slice(0, 250)}</p>

                <div className="member-section">
                  <h4>Member:- {data.totalMember}</h4>
                </div>

                <Button onClick={() => {
                  bookRoom(data._id)
                  if (user) {
                    return setOpenForm(true)
                  }
                }
                }>Book Room</Button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-room">
            <Empty description="No rooms available for selected dates" />
          </div>
        )}
        {openForm && (
          <section className="form">
            <div className="form-page">
              <h1>Quick Update</h1>
              <div className="warning">
                <RiErrorWarningFill />
                <p>Accounting is Waiting for conformation</p>
              </div>
              <div className="name-field">
                <input type="text" placeholder="fullName" name="fullName" value={values.fullName} disabled />
                <input type="email" name="email" id="email" placeholder="Email" value={values.email} disabled />
              </div>
              <div className="number-field">
                <div className="number-form-field">
                  <input name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} />
                  {touched.phone && errors.phone ? (<p className="error">{errors.phone}</p>) : null}
                </div>
                <input  type="text" placeholder="state" onChange={handleChange} onBlur={handleBlur} />
              </div>
              <div className="Address">
                <input type="text" placeholder="Address" name="address" onChange={handleChange} onBlur={handleBlur} value={values.address} />
                {touched.address && errors.address ? (<p className="error">{errors.address}</p>) : null}
              </div>
              <div className="city-field">
                <div className="city-form-field">
                  <input name="idProofNumber" value={values.idProofNumber} onChange={handleChange} onBlur={handleBlur} />
                  {touched.idProofNumber && errors.idProofNumber ? (<p className="error">{errors.idProofNumber}</p>) : null}

                </div>
                <input type="number" placeholder="zip Code" onChange={handleChange} onBlur={handleBlur} />
              </div>

              <div className="btn-info">
                <button className="cancel-btn" onClick={() => { setOpenForm(false) }}>Cancel</button>
                <button className="update-btn" onClick={submitForm}>Confirm</button>
              </div>

            </div>

          </section>
        )}

      </section>


    </div>
  );
};

export default Room;