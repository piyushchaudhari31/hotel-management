import "./dashboard.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'antd';
import { getAdminDetail } from "../../../store/thunk/AuthThunk";


const Dashboard = () => {


  const dispatch = useDispatch()

  const admin = useSelector((state) => state.user.Admin)

  const room = useSelector((state) => state.room.room)




  useEffect(() => {
    dispatch(getAdminDetail())
  }, [])


  return (
    <div className="dashboard">
      <div className="top-section">
        <div className="welcome-card">
          <div>
            <h2>Welcome back 👋</h2>
            <h1>Admin</h1>
            <p>Manage rooms, bookings, customers and hotel details easily.</p>
            <button>Go now</button>
          </div>
        </div>

        <div className="featured-card">
          <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={3800}>
            {room.map((data) => {
              return (

                <div className="img">
                  <img src={`http://localhost:3000/room_img/${data.roomImage}`} alt="Luxury Room" />

                  <div className="featured-content">
                    <span>FEATURED ROOM</span>
                    <h3>Luxury Hotel Room Experience</h3>
                    <p>Comfortable rooms with premium service and modern amenities.</p>
                  </div>
                </div>

              )
            })}

          </Carousel>
        </div>

      </div>

      <div className="stats-section">
        <div className="stat-card">
          <p>Total Customers</p>
          <h2>{admin.totalCustomers > 10 ? <div>{admin.totalCustomers}</div> : <div>0{admin.totalCustomers}</div>}</h2>


          <div className="bars green">
            <i></i><i></i><i></i><i></i><i></i><i></i>
          </div>
        </div>

        <div className="stat-card">
          <p>Total Rooms</p>
          <h2>{admin.totalRooms > 10 ? <div>{admin.totalRooms}</div> : <div>0{admin.totalRooms}</div>}</h2>

          <div className="bars blue">
            <i></i><i></i><i></i><i></i><i></i><i></i>
          </div>
        </div>

        <div className="stat-card">
          <p>Total Bookings</p>
          <h2>{admin.totalBookings > 10 ? <div>{admin.totalBookings}</div> : <div>0{admin.totalBookings}</div>}</h2>

          <div className="bars orange">
            <i></i><i></i><i></i><i></i><i></i><i></i>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default Dashboard;