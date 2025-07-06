import React from "react";
import axiosInstance from "../utils/axios";
import { endPoints } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addToast } from "../utils/globalSlice";

const UserCard = (props) => {

  const {firstName,photoUrl,about,age ,gender, _id} = props.data
  const dispatch = useDispatch();

  const handleSendRequest = async (type) => {
    try {
      const {data} = await axiosInstance.post( `${type === 'interested' ? endPoints.sendRequest : endPoints.ignoreRequest}/${_id}`)
      console.log(data);
      dispatch(addToast({
        show: true,
        message: data.message,
        type: 'success'
      }))
      props.handleGetNextUser();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={photoUrl}
          alt="profile-pic"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName}</h2>
        {age && <p>{age+ ", "+ gender}</p>}
        <p>
          {about}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={()=>handleSendRequest('ignore')}>Ignore</button>
          <button className="btn btn-secondary" onClick={()=>handleSendRequest('interested')}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
