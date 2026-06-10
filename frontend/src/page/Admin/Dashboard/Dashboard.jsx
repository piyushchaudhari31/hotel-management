import "./dashboard.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Empty,Table } from "antd";
import { getAdminDetail } from "../../../store/thunk/AdminThunk";
import { todayChecking } from "../../../store/thunk/BookThunk";
import userImg from "../../../assets/user.png";

const Dashboard = () => {
  const dispatch = useDispatch();

  const admin = useSelector((state) => state?.admin?.adminData);
  const room = useSelector((state) => state?.room?.room || []);
  const todayCheckIns = useSelector((state) => state?.book?.todayCheckIns || []);

  useEffect(() => {
    dispatch(getAdminDetail());
    dispatch(todayChecking());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <div className="top-section">
        <div className="welcome-card">
          <div>
            <h2>Welcome back</h2>
            <h1>Admin</h1>
            <p>Manage rooms, bookings, customers and hotel details easily.</p>
            <button>Go now</button>
          </div>
        </div>

        <div className="featured-card">
          <Carousel autoplay autoplaySpeed={3800}>
            {room.map((data) => (
              <div className="img" key={data._id}>
                <img
                  src={`http://localhost:3000/room_img/${data.roomImage}`}
                  alt="Luxury Room"
                />

                <div className="featured-content">
                  <span>FEATURED ROOM</span>
                  <h3>{data.roomType}</h3>
                  <p>
                    Comfortable rooms with premium service and modern amenities.
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <p>Total Customers</p>
          <h2>{admin?.totalCustomers < 10 ? `0${admin?.totalCustomers || 0}` : admin?.totalCustomers}</h2>
          <div className="bars green">
            <i></i><i></i><i></i><i></i><i></i><i></i>
          </div>
        </div>

        <div className="stat-card">
          <p>Total Rooms</p>
          <h2>{admin?.totalRooms < 10 ? `0${admin?.totalRooms || 0}` : admin?.totalRooms}</h2>
          <div className="bars blue">
            <i></i><i></i><i></i><i></i><i></i><i></i>
          </div>
        </div>

        <div className="stat-card">
          <p>Total Bookings</p>
          <h2>{admin?.totalBookings < 10 ? `0${admin?.totalBookings || 0}` : admin?.totalBookings}</h2>
          <div className="bars orange">
            <i></i><i></i><i></i><i></i><i></i><i></i>
          </div>
        </div>
      </div>

      <div className="today-check-section">
       

        <div className="today-check-section">
          <div className="section-header">
            <h2>Today's Check In</h2>
            <p>Guests scheduled for check-in today</p>
          </div>

          {todayCheckIns.length === 0 ? (
            <div className="empty-card">
              <Empty description="No Check-In Today" />
            </div>
          ) : (
            <Table
              rowKey="_id"
              pagination={{ pageSize: 5 }}
              columns={[
                {
                  title: "Guest",
                  render: (_, record) => (
                    <div className="user-info">
                      <img
                        className="user-image"
                        src={
                          record?.userId?.profileImg
                            ? `http://localhost:3000/profile_img/${record.userId.profileImg}`
                            : userImg
                        }
                        alt=""
                      />

                      <div>
                        <h4>
                          {record?.userId?.firstName ||
                            record?.userId?.fullName?.firstName ||
                            "Guest"}{" "}
                          {record?.userId?.lastName ||
                            record?.userId?.fullName?.lastName ||
                            ""}
                        </h4>

                        <p>{record?.userId?.email}</p>
                      </div>
                    </div>
                  ),
                },

                {
                  title: "Room No",
                  dataIndex: ["roomId", "roomNumber"],
                },

                {
                  title: "Guests",
                  dataIndex: "guestCount",
                },

                {
                  title: "Check In Date",
                  render: (_, record) =>
                    new Date(record.checkInDate).toLocaleDateString("en-IN"),
                },

                {
                  title: "Status",
                  render: (_, record) => (
                    <span className="status-badge">
                      {record.bookingStatus}
                    </span>
                  ),
                },
              ]}
              dataSource={todayCheckIns}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;