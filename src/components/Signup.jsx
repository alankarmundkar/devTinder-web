import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { endPoints } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addToast } from '../utils/globalSlice';
import { addUser } from '../utils/userSlice';
import axiosInstance from '../utils/axios';


const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState('Male');
 

  const handleSignup = async () => {
    try {
      setLoading(true);
      const {data,status} = await axiosInstance.post(endPoints.signup, {firstName, lastName, emailId, password, gender});
      dispatch(addToast({
        show: true,
        message: data.message,
        type: 'success'
      }))
      setLoading(false);
      if(status === 200){
        dispatch(addUser(data.data));
        return navigate('/profile');
      }
    } catch (error) {
      setError(error.response.data);
    }
  }
  if(loading){
    return <span class="loading loading-spinner loading-md"></span>
  }
  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-100 w-96">
        <div className="card-body">
          <h2 className="card-title">Signup</h2>
          <div>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">First Name</legend>
              <input
                value={firstName}
                type="text"
                className="input" 
                placeholder="" 
                onChange={(e)=>{setFirstName(e.target.value)}}
              />
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                value={lastName}
                type="text"
                className="input" 
                placeholder="" 
                onChange={(e)=>{setLastName(e.target.value)}}
              />
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                value={emailId}
                type="text"
                className="input" 
                placeholder="" 
                onChange={(e)=>{setEmailId(e.target.value)}}
              />
            </fieldset>
             <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Password</legend>
              <input 
                value={password}
                type="text" 
                className="input" 
                placeholder="" 
                onChange={(e)=>{setPassword(e.target.value)}}
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
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-5">
            <button className="btn btn-primary" onClick={handleSignup}>Signup</button>
          </div>
          <div className="card-actions justify-center m-5">
            <p className="text-sm">Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup