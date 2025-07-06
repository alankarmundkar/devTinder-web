import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { endPoints } from "../utils/constant";
import { removeUser } from "../utils/userSlice";
import Toast from "./Toast";
import { removeFeed } from "../utils/feedSlice";
import { resetGlobal } from "../utils/globalSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post(endPoints.logout);
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(resetGlobal());
      
      return navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <Toast />
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          DevTinder🧑‍💻
        </Link>
      </div>
      <div className="flex gap-2">
        {Object.keys(user).length > 0 && (
          <div className="dropdown dropdown-end mx-5 flex gap-1.5">
            <p>Welcome,{user.firstName}</p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link className="justify-between" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="justify-between" to="/connections">
                  Connections
                </Link>
              </li>
              <li>
                <Link className="justify-between" to="/requests">
                  Requests
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
