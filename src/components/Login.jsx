import { useState } from "react";
import axios from "../utils/axios";
import { endPoints } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [emailId,setEmailId] = useState("alankar@gmail.com")
  const [password,setPassword] = useState("Alankar@123")
  const [error,setError] = useState("")


  const handleLogin = async () => {
    try {
      const {data:{data,message}} = await axios.post(endPoints.login,{
      emailId: emailId.trim(),
      password: password.trim()
    })
    if(message==="Login Successfull!"){
       dispatch(addUser(data))
       navigate("/")
    }
    } catch (error) {
      setError(error.response.data)
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-100 w-96">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div>
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
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-5">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
          <div className="card-actions justify-center m-5">
            <p className="text-sm cursor-pointer">New user? <Link to="/signup">Signup</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
