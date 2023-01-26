import { useAppContext } from "../../Context/AppContext";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();

  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken = jwtDecode(token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    if (expirationDate < new Date()) {
      // token has expired
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
