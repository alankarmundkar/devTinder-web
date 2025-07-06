import React from 'react'
import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';

const Profile = () => {
  const user = useSelector((state) => state.user.userData);
  return (
    <div>
      <EditProfile key={user._id} user={user} />
    </div>
  )
}

export default Profile