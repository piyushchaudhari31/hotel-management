import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAuth = ({ children }) => {
  const user = useSelector((state) => state.auth.currentUser);
    
  
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAuth;

