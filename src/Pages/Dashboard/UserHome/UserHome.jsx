import React from "react";
import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  const { displayName, email, photoURL } = user;
  console.log(user);
  return (
    <div className="w-full mx-10 mt-10 border">
      <div className="shadow-xl card card-side bg-base-100">
        <figure className="w-[50%] border">
          <img src={photoURL} alt="Movie" className="w-full h-full" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{displayName}</h2>
          <p>{email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
