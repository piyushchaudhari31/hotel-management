import "./booking.scss";

import { Table, Input, Tag, Avatar, Tabs, Button, Empty, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import userImg from "../../../assets/user.png";
import {
  getAllBooking,
  checkInBooking,
  checkOutBooking,
  cancelBooking,
  todayChecking,
} from "../../../store/thunk/BookThunk";
import { getAllCustomerDetail } from "../../../store/thunk/CustomerThunk";

const Booking = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const booking = useSelector((state) => state?.book?.booking);
  const todayCheckIns = useSelector((state) => state?.book?.todayCheckIns);
  const loading = useSelector((state) => state?.book?.loading);

  useEffect(() => {
    dispatch(getAllBooking());
    dispatch(getAllCustomerDetail());
  }, [dispatch]);

  const bookingList = Array.isArray(booking) ? booking : [];
  const todayList = Array.isArray(todayCheckIns) ? todayCheckIns : [];

  const isTodayTab = activeTab === "today-checkIn";
  const currentList = isTodayTab ? todayList : bookingList;

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getBookingStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "green";
      case "cancelled":
        return "red";
      case "checkedIn":
        return "blue";
      case "checkedOut":
        return "purple";
      default:
        return "orange";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "green";
      case "pending":
        return "orange";
      case "failed":
        return "red";
      default:
        return "default";
    }
  };

  const refreshData = () => {
    if (isTodayTab) {
      dispatch(todayChecking());
    } else {
      dispatch(getAllBooking());
    }
  };

  const confirmAction = ({ title, content, okText, danger, onOk }) => {
    Modal.confirm({
      title,
      content,
      centered: true,
      okText,
      cancelText: "Cancel",
      okButtonProps: {
        danger,
      },
      onOk,
    });
  };

  const handleCheckIn = (record) => {
    confirmAction({
      title: "Confirm Check-In",
      content: `Are you sure you want to check in ${record.customerName}?`,
      okText: "Check In",
      danger: false,
      onOk: async () => {
        await dispatch(checkInBooking(record.key));
        refreshData();
      },
    });
  };

  const handleCheckOut = (record) => {
    confirmAction({
      title: "Confirm Check-Out",
      content: `Are you sure you want to check out ${record.customerName}?`,
      okText: "Check Out",
      danger: false,
      onOk: async () => {
        await dispatch(checkOutBooking(record.key));
        refreshData();
      },
    });
  };

  const handleCancel = (record) => {
    confirmAction({
      title: "Cancel Booking",
      content: `Are you sure you want to cancel ${record.customerName}'s booking?`,
      okText: "Cancel Booking",
      danger: true,
      onOk: async () => {
        await dispatch(cancelBooking(record.key));
        refreshData();
      },
    });
  };

  const handleTabChange = (value) => {
    setActiveTab(value);

    if (value === "today-checkIn") {
      dispatch(todayChecking());
    } else {
      dispatch(getAllBooking());
    }
  };

  const filteredBookings = currentList.filter((item) => {
    const user = item?.userId || item?.userID;
    const room = item?.roomId || item?.roomID;

    const fullName = `${user?.firstName || ""} ${user?.lastName || ""} ${
      user?.fullName || ""
    }`;

    const email = user?.email || "";
    const roomNumber = String(room?.roomNumber || "");
    const roomType = room?.roomType || "";
    const searchValue = search.toLowerCase();

    const matchSearch =
      fullName.toLowerCase().includes(searchValue) ||
      email.toLowerCase().includes(searchValue) ||
      roomNumber.toLowerCase().includes(searchValue) ||
      roomType.toLowerCase().includes(searchValue);

    const matchStatus =
      activeTab === "all" || isTodayTab
        ? true
        : item?.bookingStatus?.toLowerCase() === activeTab.toLowerCase();

    return matchSearch && matchStatus;
  });

  const tableData = filteredBookings.map((item) => {
    const user = item?.userId || item?.userID;
    const room = item?.roomId || item?.roomID;

    return {
      key: item?._id,
      customerName:
        user?.fullName ||
        `${user?.firstName || ""} ${user?.lastName || ""}` ||
        "N/A",
      email: user?.email || "N/A",
      image: user?.profileImg,
      guestCount: item?.guestCount || 0,
      roomNumber: room?.roomNumber || "N/A",
      roomType: room?.roomType || "N/A",
      roomPrice: room?.price || 0,
      totalAmount: item?.totalAmount || 0,
      paymentStatus: item?.paymentStatus || "pending",
      bookingStatus: item?.bookingStatus || "pending",
      checkInDate: item?.checkInDate,
      checkOutDate: item?.checkOutDate,
    };
  });

  const columns = [
    {
      title: "Customer",
      dataIndex: "customerName",
      width: 260,
      render: (_, record) => (
        <div className="user-info">
          <Avatar
            size={45}
            src={
              record.image
                ? `https://hotel-management-be-75w4.onrender.com/profile_img/${record.image}`
                : userImg
            }
          />

          <div>
            <h4>{record.customerName}</h4>
            <p>{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Room No",
      dataIndex: "roomNumber",
    },
    {
      title: "Room Type",
      dataIndex: "roomType",
    },
    {
      title: "Guests",
      dataIndex: "guestCount",
    },
    {
      title: "Check In",
      dataIndex: "checkInDate",
      render: (date) => formatDate(date),
    },
    {
      title: "Check Out",
      dataIndex: "checkOutDate",
      render: (date) => formatDate(date),
    },
    {
      title: "Room Price",
      dataIndex: "roomPrice",
      render: (price) => `₹${price}`,
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      render: (amount) => <b>₹{amount}</b>,
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      render: (status) => (
        <Tag color={getPaymentStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: "Booking Status",
      dataIndex: "bookingStatus",
      render: (status) => (
        <Tag color={getBookingStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      width: 220,
      fixed: "right",
      render: (_, record) => {
        if (record.bookingStatus === "confirmed") {
          return (
            <div className="booking-actions">
              <Button
                type="primary"
                size="small"
                onClick={() => handleCheckIn(record)}
              >
                Check In
              </Button>

              <Button danger size="small" onClick={() => handleCancel(record)}>
                Cancel
              </Button>
            </div>
          );
        }

        if (record.bookingStatus === "checkedIn") {
          return (
            <Button
              size="small"
              className="checkout-btn"
              onClick={() => handleCheckOut(record)}
            >
              Check Out
            </Button>
          );
        }

        if (record.bookingStatus === "cancelled") {
          return <Tag color="red">Cancelled</Tag>;
        }

        if (record.bookingStatus === "checkedOut") {
          return <Tag color="green">Completed</Tag>;
        }

        return <Tag color="default">No Action</Tag>;
      },
    },
  ];

  return (
    <div className="user-list">
      <div className="user-header">
        <div>
          <h1>{isTodayTab ? "Today Check-In List" : "Booking List"}</h1>
          <p>
            Dashboard • Booking • {isTodayTab ? "Today Check-In" : "List"}
          </p>
        </div>
      </div>

      <div className="user-card">
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          items={[
            {
              key: "all",
              label: `All (${bookingList.length})`,
            },
            {
              key: "confirmed",
              label: "Confirmed",
            },
            {
              key: "cancelled",
              label: "Cancelled",
            },
            {
              key: "checkedIn",
              label: "Checked In",
            },
            {
              key: "checkedOut",
              label: "Checked Out",
            },
            {
              key: "today-checkIn",
              label: "Today Check-In",
            },
          ]}
        />

        <Input
          prefix={<SearchOutlined />}
          placeholder="Search by customer, email, room number or room type..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Table
          columns={columns}
          dataSource={tableData}
          loading={loading}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 1300 }}
          locale={{
            emptyText: isTodayTab ? (
              <Empty description="No today check-in data found" />
            ) : (
              <Empty description="No booking data found" />
            ),
          }}
        />
      </div>
    </div>
  );
};

export default Booking;