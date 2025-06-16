import axios from "axios";
import React, { useState } from "react";
import { endPoints } from "../utils";

const Login = () => {

  const [emailId,setEmailId] = useState('')

  const [password,setPassword] = useState("")

  const handleLogin = async () => {
    const {data} = await axios.post(endPoints.login,{
      emailId,
      password
    },{withCredentials: true})
    console.log(data,'data')
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
          <div className="card-actions justify-center m-5">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
