import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("sign out Successful.");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout seccessful.",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("error in sign out", error);
      });
  };
  const navlinks = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/surveys"}>Surveys</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard"}>Dashboard</NavLink>
      </li>
      <li>
        <NavLink to={"/pricing"}>Pricing</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-[#007BFF] px-5 md:px-12 lg:px-24 text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-[#007BFF] rounded-box w-52"
          >
            {navlinks}
          </ul>
        </div>
        <a className="text-xl btn btn-ghost">SurveySense</a>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 menu menu-horizontal">{navlinks}</ul>
      </div>
      <div className="mr-4 navbar-end">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <button className="w-[25%] md:w-[20%] lg:w-[20%] hover:cursor-pointer hover:border text-center hover:text-lg font-bold lg:hover:px-4 md:hover:px-4 hover:py-1 hover:rounded-lg hover:animate-pulse">
              Logout
            </button>
          </div>
        ) : (
          // <div className="flex items-center gap-4">
          <>
            <Link
              to={"/login"}
              className="w-[25%] md:w-[20%] lg:w-[20%] hover:cursor-pointer hover:border text-center hover:text-lg font-bold lg:hover:px-4 md:hover:px-4 hover:py-1 hover:rounded-lg hover:animate-pulse"
            >
              Login
            </Link>
            <Link className="w-[30%] md:w-[20%] lg:w-[20%] hover:w-[30%] cursor-pointer hover:border text-center hover:text-lg font-bold lg:hover:px-4 md:hover:px-4 sm:hover:px-0 hover:py-1 hover:rounded-lg hover:animate-pulse">
              Register
            </Link>
            {/* </div>
             */}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
