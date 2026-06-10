import "./setting.scss";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { FaIdCard, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCustomerDetail, updateCustomer } from "../../../store/thunk/CustomerThunk";
import { changePassword } from "../../../store/thunk/AuthThunk";
import { settingCustomerValidation } from "../../../utils/validation/Validation";



const Setting = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.customer.customer);

    const [activeTab, setActiveTab] = useState("general");
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const [showPass, setShowPass] = useState({
        old: false,
        new: false,
        confirm: false,
    });

    useEffect(() => {
        dispatch(getCustomerDetail());
    }, [dispatch]);

    const { values, handleChange, handleBlur, submitForm, isSubmitting, touched, errors } = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullName: `${user?.firstName || ""} ${user?.lastName || ""}`,
            email: user?.email || "",
            phone: user?.phoneNumber || "",
            gender: user?.gender || "",
            address: user?.address || "",
            idProofNumber: user?.idProofNumber || "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: settingCustomerValidation,
        onSubmit: async (values) => {
            const data = {
                phoneNumber: values.phone,
                gender: values.gender,
                address: values.address,
                idProofNumber: values.idProofNumber,
                image: selectedImage,
            };

            const updatedUser = await dispatch(updateCustomer(data));

            if (updatedUser) {
                setSelectedImage(null);
                setPreviewImage(null);
            }
        },
    });

    const imageUrl = previewImage
        ? previewImage
        : user?.profileImg
            ? `http://localhost:3000/profile_img/${user.profileImg}`
            : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300";

    const imageChangeHandler = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSelectedImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="settingPage">
            <h1>Account</h1>

            <div className="breadcrumb">
                Dashboard <span>•</span> User <span>•</span> Account
            </div>

            <div className="settingTabs">
                <button type="button" className={activeTab === "general" ? "active" : ""} onClick={() => setActiveTab("general")}>
                    <FaIdCard /> General
                </button>

                <button type="button" className={activeTab === "security" ? "active" : ""} onClick={() => setActiveTab("security")}>
                    <FaLock /> Security
                </button>
            </div>

            {activeTab === "general" && (
                <div className="generalLayout">
                    <div className="profileCard">
                        <div className="avatarBox">
                            <img src={imageUrl} alt="Profile" />

                            <label>
                                Change Image
                                <input type="file" accept="image/*" onChange={imageChangeHandler} />
                            </label>
                        </div>

                        <button type="button" className="deleteBtn">Delete user</button>
                    </div>

                    <div className="formCard">
                        <div className="gridForm">
                            <div className="inputBox">
                                <label>Name</label>
                                <input name="fullName" value={values.fullName} disabled />
                            </div>

                            <div className="inputBox">
                                <label>Email address</label>
                                <input name="email" value={values.email} disabled />
                            </div>

                            <div className="inputBox">
                                <label>Phone number</label>
                                <input
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.phone && errors.phone && (
                                    <p className="error">{errors.phone}</p>
                                )}
                            </div>

                            <div className="inputBox">
                                <label>Gender</label>
                                <select
                                    name="gender"
                                    value={values.gender}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>

                                {touched.gender && errors.gender && (
                                    <p className="error">{errors.gender}</p>
                                )}
                            </div>

                            <div className="inputBox">
                                <label>Address</label>
                                <input
                                    name="address"
                                    value={values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.address && errors.address && (
                                    <p className="error">{errors.address}</p>
                                )}
                            </div>

                            <div className="inputBox">
                                <label>ID Proof Number</label>
                                <input
                                    name="idProofNumber"
                                    value={values.idProofNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.idProofNumber && errors.idProofNumber && (
                                    <p className="error">{errors.idProofNumber}</p>
                                )}
                            </div>
                        </div>

                        <div className="saveArea">
                            <button type="button" onClick={() => submitForm()} disabled={isSubmitting}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "security" && (
                <div className="securityCard">
                    <div className="passwordBox">
                        <input
                            type={showPass.old ? "text" : "password"}
                            name="oldPassword"
                            placeholder="Old password"
                            value={values.oldPassword}
                            onChange={handleChange}
                        />

                        <span
                            onClick={() =>
                                setShowPass({ ...showPass, old: !showPass.old })
                            }
                        >
                            {showPass.old ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <div className="passwordBox">
                        <input
                            type={showPass.new ? "text" : "password"}
                            name="newPassword"
                            placeholder="New password"
                            value={values.newPassword}
                            onChange={handleChange}
                        />

                        <span
                            onClick={() =>
                                setShowPass({ ...showPass, new: !showPass.new })
                            }
                        >
                            {showPass.new ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <small>Password must be minimum 6+</small>

                    <div className="passwordBox">
                        <input type={showPass.confirm ? "text" : "password"} name="confirmPassword"
                            placeholder="Confirm new password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                        />

                        <span onClick={() => setShowPass({ ...showPass, confirm: !showPass.confirm, })}
                        >
                            {showPass.confirm ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <div className="saveArea">
                        <button type="button"
                            onClick={async () => {
                                const res = await dispatch(changePassword({ oldPassword: values.oldPassword, newPassword: values.newPassword }));
                                if (changePassword.fulfilled.match(res)) {
                                    navigate("/");
                                }
                            }}
                        >Save changes</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Setting;