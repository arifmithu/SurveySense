import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
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
          "Log Out"
        ) : (
          // <div className="flex items-center gap-4">
          <>
            <span className="w-[20%] hover:cursor-pointer hover:border text-center hover:text-lg font-bold hover:px-4 hover:py-1 hover:rounded-lg hover:animate-pulse">
              Login
            </span>
            <span className="w-[20%] hover:w-[30%] hover:cursor-pointer hover:border text-center hover:text-lg font-bold hover:px-4 hover:py-1 hover:rounded-lg hover:animate-pulse">
              Register
            </span>
            {/* </div>
             */}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
