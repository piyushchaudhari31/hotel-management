import "./appAdmin.scss";
import {
  Card,
  Input,
  Select,
  InputNumber,
  Upload,
  Button,
  message,
  Table,
  Tag,
  Avatar,
  Modal,
  Dropdown,
} from "antd";
import {
  InboxOutlined,
  PlusOutlined,
  MoreOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  createRoom,
  getRoom,
  deleteRoom,
  updateRoom,
} from "../../../store/thunk/RoomThunks";
import { roomValidationSchema } from "../../../utils/validation/Validation";
import { useEffect, useState } from "react";

const { TextArea } = Input;
const { Dragger } = Upload;

const AppAdmin = () => {
  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const isEditMode = Boolean(editId);

  const rooms = useSelector((state) => state?.room?.room);
  const loading = useSelector((state) => state?.room?.loading);

  useEffect(() => {
    dispatch(getRoom());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      roomNumber: "",
      description: "",
      roomType: "single",
      price: "",
      totalMember: 2,
      status: "available",
      image: null,
    },
    validationSchema: roomValidationSchema,

    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();

      formData.append("roomNumber", values.roomNumber);
      formData.append("description", values.description);
      formData.append("roomType", values.roomType);
      formData.append("price", values.price);
      formData.append("totalMember", values.totalMember);
      formData.append("status", values.status);

      if (values.image) {
        formData.append("image", values.image);
      }

      if (isEditMode) {
        await dispatch(updateRoom({ id: editId, formData }));
      } else {
        await dispatch(createRoom(formData));
      }

      resetForm();
      setEditId(null);
      setOpen(false);
      dispatch(getRoom());
    },
  });

  const showError = (field) =>
    formik.touched[field] && formik.errors[field] ? (
      <span className="error-text">{formik.errors[field]}</span>
    ) : null;

  const handleOpenCreate = () => {
    setEditId(null);

    formik.resetForm({
      values: {
        roomNumber: "",
        description: "",
        roomType: "single",
        price: "",
        totalMember: 2,
        status: "available",
        image: null,
      },
    });

    setOpen(true);
  };

  const handleOpenEdit = (record) => {
    setEditId(record.key);

    formik.setValues({
      roomNumber: record.roomNumber || "",
      description: record.description || "",
      roomType: record.roomType || "single",
      price: record.price || "",
      totalMember: Number(record.totalMember) || 2,
      status: record.status || "available",
      image: null,
    });

    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setEditId(null);
    formik.resetForm();
  };

  const uploadProps = {
    multiple: false,
    maxCount: 1,
    accept: "image/*",

    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");

      if (!isImage) {
        messageApi.error("Only image files are allowed!");
        return Upload.LIST_IGNORE;
      }

      formik.setFieldValue("image", file);
      formik.setFieldTouched("image", true);
      return false;
    },

    onRemove: () => {
      formik.setFieldValue("image", null);
      formik.setFieldTouched("image", true);
    },
  };

  const handleDeleteRoom = async (id) => {
    await dispatch(deleteRoom(id));
    dispatch(getRoom());
  };

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Delete Room",
      icon: <ExclamationCircleFilled style={{ color: "#ff4d4f" }} />,
      content: "Are you sure you want to delete this room?",
      centered: true,
      okText: "Delete",
      cancelText: "Cancel",
      okButtonProps: {
        danger: true,
      },
      onOk() {
        handleDeleteRoom(id);
      },
    });
  };

  const filteredRooms = Array.isArray(rooms)
    ? rooms.filter((room) =>
      room?.roomNumber?.toLowerCase().includes(search.toLowerCase())
    )
    : [];

  const tableData = filteredRooms.map((room) => ({
    key: room._id,
    image: room.roomImage,
    roomNumber: room.roomNumber,
    roomType: room.roomType,
    price: room.price,
    totalMember: room.totalMember,
    status: room.status,
    description: room.description,
  }));

  const columns = [
    {
      title: "Room",
      dataIndex: "image",
      width: 90,
      render: (image) => (
        <Avatar
          shape="square"
          size={60}
          src={`http://localhost:3000/room_img/${image}`}
        />
      ),
    },
    {
      title: "Room No",
      dataIndex: "roomNumber",
    },
    {
      title: "Room Type",
      dataIndex: "roomType",
      render: (type) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => <b>₹{price}</b>,
    },
    {
      title: "Members",
      dataIndex: "totalMember",
      render: (member) => `${member} Members`,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "available" ? "green" : "orange"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
    },
    {
      title: "Action",
      width: 90,
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "edit",
                icon: <EditOutlined />,
                label: "Edit",
                onClick: () => handleOpenEdit(record),
              },
              {
                key: "delete",
                icon: <DeleteOutlined />,
                label: "Delete",
                danger: true,
                onClick: () => showDeleteConfirm(record.key),
              },
            ],
          }}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="room-Detail">
      {contextHolder}

      <Card className="room-table-card">
        <div className="room-header">
          <div>
            <h1>Room List</h1>
            <p>Dashboard • ROOM • LIST</p>
          </div>

          <div className="room-actions">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search room number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="room-search"
            />

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleOpenCreate}
            >
              Create Room
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={tableData}
          loading={loading}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 950 }}
        />
      </Card>

      <Modal
        title={isEditMode ? "Update Room" : "Create Room"}
        open={open}
        onCancel={handleCloseModal}
        footer={null}
        width={820}
        centered
        className="room-modal"
      >
        <div className="create-room-form">
          <div className="field">
            <label>Room Number</label>
            <Input
              name="roomNumber"
              value={formik.values.roomNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter room number"
              status={
                formik.touched.roomNumber && formik.errors.roomNumber
                  ? "error"
                  : ""
              }
            />
            {showError("roomNumber")}
          </div>

          <div className="field">
            <label>Description</label>
            <TextArea
              rows={4}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Room description"
              status={
                formik.touched.description && formik.errors.description
                  ? "error"
                  : ""
              }
            />
            {showError("description")}
          </div>

          <div className="field">
            <label>Room Image</label>

            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag image to upload</p>
              <p className="ant-upload-hint">
                {isEditMode
                  ? "Upload new image only if you want to change it."
                  : "Only one room image is allowed."}
              </p>
            </Dragger>

            {!isEditMode && showError("image")}
          </div>

          <div className="two-field">
            <div className="field">
              <label>Room Type</label>
              <Select
                style={{ width: "100%", height: "55%" }}
                value={formik.values.roomType}
                onBlur={() => formik.setFieldTouched("roomType", true)}
                onChange={(value) => formik.setFieldValue("roomType", value)}
                options={[
                  { value: "single", label: "Single Room" },
                  { value: "double", label: "Double Room" },
                ]}
              />
              {showError("roomType")}
            </div>

            <div className="field">
              <label>Total Members</label>
              <Select
                style={{ width: "100%", height: "55%" }}
                value={formik.values.totalMember}
                onBlur={() => formik.setFieldTouched("totalMember", true)}
                onChange={(value) =>
                  formik.setFieldValue("totalMember", value)
                }
                options={[
                  { value: 2, label: "2 Members" },
                  { value: 4, label: "4 Members" },
                ]}
              />
              {showError("totalMember")}
            </div>
          </div>

          <div className="two-field">
            <div className="field">
              <label>Price</label>
              <InputNumber
                style={{ width: "100%", height: "55%" }}
                value={formik.values.price}
                onBlur={() => formik.setFieldTouched("price", true)}
                onChange={(value) => formik.setFieldValue("price", value)}
                placeholder="Room price"
                status={
                  formik.touched.price && formik.errors.price ? "error" : ""
                }
              />
              {showError("price")}
            </div>

            <div className="field">
              <label>Status</label>
              <Select
                style={{ width: "100%", height: "55%" }}
                value={formik.values.status}
                onBlur={() => formik.setFieldTouched("status", true)}
                onChange={(value) => formik.setFieldValue("status", value)}
                options={[
                  { value: "available", label: "Available" },
                  { value: "maintenance", label: "Maintenance" },
                ]}
              />
              {showError("status")}
            </div>
          </div>

          <Button
            type="primary"
            className="create-btn"
            size="large"
            loading={loading}
            onClick={formik.handleSubmit}
          >
            {isEditMode ? "Update Room" : "Create Room"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AppAdmin;