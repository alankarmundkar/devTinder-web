import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import { endPoints } from "../utils/constant";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const { data } = await axiosInstance.get(endPoints.connections);
        setConnections(data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchConnections();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if(connections.length === 0){
    return <div>No connections found</div>;
  }
  console.log(connections, "connections");
  return (
    <>
    <h1 className="text-2xl text-center font-bold">Connections</h1>
    <div className="flex flex-wrap flex-col items-center m-10 gap-4">
      {connections?.map((connection) => {
        const {firstName, about, photoUrl} = connection;
        return (
        <div key={connection._id} className= "flex shadow-xl w-1/2 lex gap-2">
            <img src={photoUrl} alt={firstName} className="w-24 h-24 rounded-full" />
            <div className="card-body">
            <h2 className="card-title">{firstName}</h2>
            <p>{about}</p>
            </div>
        </div>
      )})}
    </div>
    </>
  );
};

export default Connections;
