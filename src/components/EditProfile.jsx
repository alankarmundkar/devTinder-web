import React, { useState } from "react";
import { endPoints } from "../utils/constant";
import axiosInstance from "../utils/axios";
import { addToast } from "../utils/globalSlice";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  console.log(user, "user");
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "Male");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setphotoUrl] = useState(user.photoUrl || "");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleEditProfile = async () => {
    console.log(firstName, lastName, age, gender, about, photoUrl);
    try {
      const { data } = await axiosInstance.patch(endPoints.editProfile, {
        firstName,
        lastName,
        age,
        gender,
        about,
        photoUrl,
      });
      console.log(data, "data");
      dispatch(
        addToast({
          show: true,
          message: "Profile updated successfully",
          type: "success",
        })
      );
      dispatch(addUser(data.data));
      navigate("/");
    } catch (error) {
      console.log(error, "error");
      setError(error.response.data.message);
    }
  };
  console.log(firstName, lastName, age, gender, about, photoUrl, "user11");
  console.log(error, "error");

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-100 w-96">
        <div className="card-body">
          <h2 className="card-title">Edit Profile</h2>
          <div>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">First Name</legend>
              <input
                value={firstName}
                type="text"
                className="input"
                placeholder=""
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                value={lastName}
                type="text"
                className="input"
                placeholder=""
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Age</legend>
              <input
                value={age}
                type="text"
                className="input"
                placeholder=""
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Gender</legend>
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">
                  {gender}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <li>
                    <a onClick={() => setGender("Male")}>Male</a>
                  </li>
                  <li>
                    <a onClick={() => setGender("Female")}>Female</a>
                  </li>
                </ul>
              </div>
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">About</legend>
              <input
                value={about}
                type="text"
                className="input"
                placeholder=""
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Profile Picture</legend>
              <input
                value={photoUrl}
                type="text"
                className="input"
                placeholder=""
                onChange={(e) => {
                  setphotoUrl(e.target.value);
                }}
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-5">
            <button className="btn btn-primary" onClick={handleEditProfile}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
