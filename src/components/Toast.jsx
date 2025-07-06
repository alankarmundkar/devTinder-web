import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToast } from "../utils/globalSlice";

const Toast = () => {
  const toast = useSelector((state) => state.global.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if(toast.show){
      setTimeout(() => {
        dispatch(removeToast());
      }, 3000);
    }
  }, [toast.show]);
  
  return (
    toast.show ? <div className="toast toast-top toast-center">
      <div className={`alert alert-${toast.type}`}>
        <span>{toast.message}</span>
      </div>
    </div>:<></>
  );
};

export default Toast;
