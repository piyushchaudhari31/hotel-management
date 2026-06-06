import './booking.scss'

import { Table, Input, Tag, Avatar, Tabs } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import userImg from '../../../assets/user.png'
import { getAllBooking } from '../../../store/thunk/BookThunk';
import { getAllCustomerDetail } from '../../../store/thunk/CustomerThunk';

const Booking = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const customers = useSelector((state) => state.customer.customer);
  const booking = useSelector((state) => state.booking.booking.bookings)
  
  console.log(booking);
  
  useEffect(() => {
    dispatch(getAllBooking());
    dispatch(getAllCustomerDetail())
  }, [dispatch]);

  


  const filteredCustomers = Array.isArray(booking) ? booking.filter((item) => {
      const fullName = typeof item.userId.fullName === "object" ? `${item.userId.fullName.firstName || ""} ${item.userId.fullName.lastName || ""}` : item.userId.fullName;

        const matchSearch = fullName.toLowerCase().includes(search.toLowerCase());

        const matchStatus = activeTab === "all" ? true : item.bookingStatus?.toLowerCase() === activeTab;

        return matchSearch && matchStatus;
      })
    : [];


  // ---------------- Table Data ----------------

  const tableData = filteredCustomers.map((item) => ({
    
    key: item._id,
    fullName: typeof item?.userId?.fullName === "object" ? `${item?.userId?.fullName?.firstName || ""} ${ item?.userId?.fullName?.lastName || ""}` : item?.userId?.fullName,
    email: item?.userId?.email,
    guestCount: item?.guestCount,
    roomNumber: item?.roomId?.roomNumber,
    price: `₹${item?.totalAmount}`,
    image: item?.userId?.profileImg,
    status: item?.bookingStatus,
  }));
  

  

  // ---------------- Columns ----------------

  const columns = [
    {
      title: "Customer",
      dataIndex: "fullName",

      render: (_, record) => (
        <div className="user-info">
          <Avatar
            size={45}
            src={
              record.image
                ? `http://localhost:3000/profile_img/${record.image}`
                : `${userImg}`
            }
          />

          <div>
            <h4>{record.userId?.fullName}</h4>
            <p>{record.userId?.email}</p>
          </div>
        </div>
      ),
    },

    {
      title: "guestCount",
      dataIndex: "guestCount",
    },

    {
      title: "roomNumber",
      dataIndex: "roomNumber",
    },

    {
      title: "price",
      dataIndex: "price",
    },

    {
      title: "Status",
      dataIndex: "status",

      render: (status) => (
        <Tag color={status === "confirmed" ? "green" : "red"}>
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <div className="user-list">

      <div className="user-header">
        <div>
          <h1>Booking List</h1>
          <p>Dashboard • Booking • List</p>
        </div>
      </div>

      <div className="user-card">

        {/* ---------------- Tabs ---------------- */}

        <Tabs
          defaultActiveKey="all"
          onChange={(value) => setActiveTab(value)}
          items={[
            {
              key: "all",
              label: `All (${customers?.length || 0})`,
            },
            {
              key: "confirmed",
              label: "confirmed",
            },
            {
              key: "cancelled",
              label: "cancelled",
            },
            {
              key: "checkedIn",
              label: "checkedIn",
            },
            {
              key: "checkedOut",
              label: "checkedOut",
            },
          ]}
        />

        {/* ---------------- Search ---------------- */}

        <Input prefix={<SearchOutlined />} placeholder="Search customer..." className="search-input" value={search} onChange={(e) => setSearch(e.target.value)}/>

        {/* ---------------- Table ---------------- */}

        <Table columns={columns} dataSource={tableData} pagination={{ pageSize: 5 }}/>

      </div>
    </div>
  );
};

export default Booking;