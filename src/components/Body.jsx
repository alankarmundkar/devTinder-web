import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import axios from "../utils/axios";
import { endPoints } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import { addToast } from "../utils/globalSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.user.userData);

  // Check if current route is public (login/signup)
  const isPublicRoute = location.pathname === '/login' || location.pathname === '/signup';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Don't fetch user data if we're on public routes
        if (isPublicRoute) {
          return;
        }

        // Don't fetch if user data already exists
        if (Object.keys(userData).length > 0) {
          return;
        }

        const { data } = await axios.get(endPoints.getProfile);
        console.log(data, 'dataa');
        dispatch(addUser(data));
      } catch (error) {
        console.log(error, "fetchUser failed");
        if (error.code === "ERR_NETWORK") {
          console.log("error.code", error.code);
          dispatch(addToast({
            show: true,
            message: "Please check your internet connection and try again",
            type: "info",
          }));
        }
        if (error.response && error.response.status === 401) {
          // Only redirect if not already on login page
          if (!isPublicRoute) {
            navigate('/login');
          }
        }
      }
    };
    fetchUser();
  }, [isPublicRoute, userData, dispatch, navigate]);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
