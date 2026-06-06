import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedUser = ({ children }) => {

  const { data: user, loading } = useSelector(
    (state) => state.user
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "Admin") {
    return <Navigate to="/admin-Dashboard" replace />;
  }

  return children;
};

export default ProtectedUser;