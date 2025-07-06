import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import axios from "../utils/axios";
import { endPoints } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import { addToast } from "../utils/globalSlice";

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userData = useSelector((state)=>state.user.userData)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if(Object.keys(userData).length > 0 ){
          return
        }
        const { data } = await axios.get(endPoints.getProfile);
        console.log(data,'dataa')
        dispatch(addUser(data));
      } catch (error) {
        console.log(error, "fetchUser failed");
        if(error.code === "ERR_NETWORK"){
          console.log("error.code",error.code);
          dispatch(addToast({
            show: true,
            message: "Please check your internet connection and try again",
            type: "info",
          }));
        }
        if(error.status == 401){
          navigate('/login')
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
