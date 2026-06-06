import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard, MdPeople, MdBookOnline, MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import "../sidebar/sidebar.scss";
import { logOutUser } from "../../store/thunk/AuthThunk";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await dispatch(logOutUser());
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>REALNET</h2>
        <p>Admin Panel</p>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/admin-Dashboard" end>
          <MdDashboard />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin-Dashboard/user">
          <MdPeople />
          <span>Users</span>
        </NavLink>

        <NavLink to="/admin-Dashboard/booking">
          <MdBookOnline />
          <span>Booking</span>
        </NavLink>

        <NavLink to="/admin-Dashboard/detail">
          <MdBookOnline />
          <span>Room</span>
        </NavLink>
      </nav>

      <button className="logout-btn" onClick={logoutHandler}>
        <MdLogout />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;