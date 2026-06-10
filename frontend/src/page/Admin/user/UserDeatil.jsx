import "./userDetail.scss";
import { Table, Input, Tag, Avatar, Tabs } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import userImg from '../../../assets/user.png'
import { getAllCustomerDetail } from "../../../store/thunk/CustomerThunk";

const UserDeatil = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const customers = useSelector((state) => state?.customer?.customers);

  

  useEffect(() => {
    dispatch(getAllCustomerDetail());
  }, [dispatch]);


  const filteredCustomers = Array.isArray(customers) ? customers.filter((item) => {
      const fullName = `${item.firstName || ""} ${item.lastName || ""}` 

        const matchSearch = fullName.toLowerCase().includes(search.toLowerCase());

        const matchStatus = activeTab === "all" ? true : item.status?.toLowerCase() === activeTab;

        return matchSearch && matchStatus;
      })
    : [];

  // ---------------- Table Data ----------------

  const tableData = filteredCustomers.map((item) => ({
    key: item._id,
    fullName: typeof item.fullName === "object" ? `${item.fullName.firstName || ""} ${ item.fullName.lastName || ""}` : item.fullName,
    email: item.email,
    phoneNumber: item.phoneNumber,
    gender: item.gender,
    address: item.address,
    image: item?.userId?.profileImg,
    status: item.status,
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
                ? `https://hotel-management-be-75w4.onrender.com/profile_img/${record.image}`
                : `${userImg}`
            }
          />

          <div>
            <h4>{record.fullName}</h4>
            <p>{record.email}</p>
          </div>
        </div>
      ),
    },

    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },

    {
      title: "Gender",
      dataIndex: "gender",
    },

    {
      title: "Address",
      dataIndex: "address",
    },

    {
      title: "Status",
      dataIndex: "status",

      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <div className="user-list">

      <div className="user-header">
        <div>
          <h1>Customer List</h1>
          <p>Dashboard • Customer • List</p>
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
              key: "active",
              label: "Active",
            },
            {
              key: "inactive",
              label: "Inactive",
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

export default UserDeatil;