import Sidebar from "../../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import '../adminLayout/adminlayout.scss'

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;