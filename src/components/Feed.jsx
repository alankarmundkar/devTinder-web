import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import { endPoints } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed.feed);
  const [page, setPage] = useState(1);
  const [feedIndex, setFeedIndex] = useState(0);
  
  const getFeed = async () => {
    try {
      if (feed.length) return;
      const { data } = await axiosInstance.get(endPoints.feed);
      console.log(data);
      dispatch(addFeed(data.data));
    } catch (error) {
      console.log(error, "error");
    }
  };


  const handleGetNextUser = () => {
    setFeedIndex((prev)=>prev + 1);
    if(feedIndex === feed.length - 1){
      getFeed(page+1)
      setPage(page+1)
    }
  }
 
  useEffect(() => {
    getFeed();
  }, []);

  if(feed?.length === 0){
    return <div>No more users found</div>
  }
  return (
    <div className="flex flex-col mt-10 items-center gap-2">
       {feed && feed[feedIndex]?._id && <UserCard key={feed[feedIndex]?._id} data={feed[feedIndex]} handleGetNextUser={handleGetNextUser} />}
    </div>
  );
};

export default Feed;
