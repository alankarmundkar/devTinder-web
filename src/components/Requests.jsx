import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axios';
import { endPoints } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addToast } from '../utils/globalSlice';

const Requests = () => {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const { data } = await axiosInstance.get(endPoints.requests); 
      setRequests(data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    } 
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleReview = async (type,id) => {
    try {
      const {data} = await axiosInstance.post(`${endPoints.reviewRequest}/${type}/${id}`)
      dispatch(addToast({
        show: true,
        message: data.message,
        type: 'success'
      }))
      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;   
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if(requests.length === 0){  
    return <div>No requests found</div>;
  }
  console.log(requests, "requests");
  return (
    <div>
      <h1 className="text-2xl text-center font-bold">Requests</h1>
      <div className="flex flex-wrap flex-col items-center m-10 gap-4">
      {requests?.map((request) => {
        const {firstName, about, photoUrl ,_id} = request.fromUserId;
        return (
        <div key={_id} className= "flex justify-between items-center m-4 p-3 shadow-xl w-2/3  gap-2">
            <img src={photoUrl} alt={firstName} className="w-24 h-24 rounded-full" />
            <div className="card-body">
            <h2 className="card-title">{firstName}</h2>
            <p>{about}</p>
            </div>
            <div className="flex  gap-2">
              <button className="btn btn-secondary" onClick={()=>handleReview('rejected',request._id)}>Reject</button>
              <button className="btn btn-primary" onClick={()=>handleReview('accepted',request._id)}>Accept</button>
            </div>
        </div>
          
      )})}
    </div>
    </div>
  )
}

export default Requests