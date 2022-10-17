import React from 'react'
import { useEffect } from 'react';
 

const Alert = ({type ,msg ,removeAlert,list}) => {
   useEffect(() => {
     const timeout = setTimeout(() => {
       removeAlert();
     }, 3000);
     return () => clearTimeout(timeout);
   }, [list]);
 
  return (
    <div className="mt-5  flex justify-center items-center">
      <div className="flex">
        <p className={`alert alert-${type}`}>
          <span className="mx-2">{msg}</span>
        </p>
      </div>
    </div>
  );
}

export default Alert