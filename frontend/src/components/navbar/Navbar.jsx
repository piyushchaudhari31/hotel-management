import { NavLink, useNavigate } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { IoClose, IoSettingsOutline, IoMenu } from "react-icons/io5";
import {
  MdOutlineDashboard,
  MdOutlineBookOnline,
  MdLogout,
} from "react-icons/md";
import "../navbar/navbar.scss";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../store/thunk/AuthThunk";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth?.currentUser);

  const profileImage = user?.profileImg
    ? `https://hotel-management-be-75w4.onrender.com/profile_img/${user.profileImg}`
    : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const closeAll = () => {
    setOpenProfile(false);
    setOpenMobileMenu(false);
  };

  const menuItemClick = (path) => {
    navigate(path);
    closeAll();
  };

  const logOutHandler = async () => {
    try {
      await dispatch(logOutUser()).unwrap();
    } catch {
    } finally {
      closeAll();
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={scrolled ? "navbar active" : "navbar"}>
        <div className="logo" onClick={() => menuItemClick("/")}>
          <img src={logo} alt="logo" />
          <h1 className="realnet">REALNET</h1>
        </div>

        <div className="menuList">
          <NavLink to="/" className={({ isActive }) => isActive ? "menu activeMenu" : "menu"}>
            HOME
          </NavLink>

          <NavLink to="/room" className={({ isActive }) => isActive ? "menu activeMenu" : "menu"}>
            ROOMS
          </NavLink>

          <NavLink to="/about-us" className={({ isActive }) => isActive ? "menu activeMenu" : "menu"}>
            ABOUT US
          </NavLink>

          <NavLink to="/contact-us" className={({ isActive }) => isActive ? "menu activeMenu" : "menu"}>
            CONTACT US
          </NavLink>
        </div>

        <div className="right-side">
          {user ? (
            <div className="profile-section">
              <img
                src={profileImage}
                className="profile-img"
                alt="profile"
                onClick={() => setOpenProfile(true)}
              />
            </div>
          ) : (
            <div className="loginInfo" onClick={() => navigate("/login")}>
              <SlCalender className="calender" />
              <button className="reservation">RESERVATION</button>
            </div>
          )}

          <IoMenu
            className="mobile-menu-icon"
            onClick={() => setOpenMobileMenu(true)}
          />
        </div>
      </div>

      {(openProfile || openMobileMenu) && (
        <div className="menu-overlay" onClick={closeAll} />
      )}

      <div className={openMobileMenu ? "mobile-drawer open" : "mobile-drawer"}>
        <IoClose className="close-icon" onClick={closeAll} />

        <div className="mobile-logo">
          <img src={logo} alt="logo" />
          <h2>REALNET</h2>
        </div>

        <div className="mobile-links">
          <button onClick={() => menuItemClick("/")}>HOME</button>
          <button onClick={() => menuItemClick("/room")}>ROOMS</button>
          <button onClick={() => menuItemClick("/about-us")}>ABOUT US</button>
          <button onClick={() => menuItemClick("/contact-us")}>CONTACT US</button>

          {!user && (
            <button className="mobile-reservation" onClick={() => menuItemClick("/login")}>
              RESERVATION / LOGIN
            </button>
          )}


        </div>
      </div>

      <div className={openProfile ? "profile-drawer open" : "profile-drawer"}>
        <IoClose className="close-icon" onClick={() => setOpenProfile(false)} />

        <div className="drawer-user">
          <img
            src={profileImage}
            className="profile-img"
            alt="profile"
            onClick={() => setOpenProfile(true)}
            onError={(e) => {
              e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
            }}
          />
          <h3>{user?.fullName?.firstName || user?.username || "User"}</h3>
          <p>{user?.email || "user@gmail.com"}</p>
        </div>

        <div className="drawer-links">
          {user?.role === "Admin" ? (
            <div className="drawer-link" onClick={() => menuItemClick("/admin-Dashboard")}>
              <MdOutlineDashboard />
              <span>Dashboard</span>
            </div>
          ) : (
            <>
              <div className="drawer-link" onClick={() => menuItemClick("/my-booking")}>
                <MdOutlineBookOnline />
                <span>My Booking</span>
              </div>

              <div className="drawer-link" onClick={() => menuItemClick("/setting")}>
                <IoSettingsOutline />
                <span>Setting</span>
              </div>
            </>
          )}
        </div>

        <button className="drawer-logout" onClick={logOutHandler}>
          <MdLogout />Logout</button>
      </div>
    </>
  );
};

export default Navbar;