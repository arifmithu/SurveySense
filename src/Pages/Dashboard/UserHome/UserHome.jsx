import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";

const UserHome = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const { displayName, email, photoURL } = user;
  return (
    <div className="w-[50%] mx-auto mt-10 border">
      <div className="shadow-xl card card-side bg-base-100">
        <figure className="w-[50%] border">
          <img src={photoURL} alt="Movie" className="w-full h-full" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{displayName}</h2>
          <div>
            <p>Email: {email}</p>
            <p>Status: {role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
