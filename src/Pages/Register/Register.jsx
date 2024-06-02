import React from "react";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/Firebase.config";
import { Link } from "react-router-dom";

const Register = () => {
  const { createUser } = useAuth();
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, photo, email, password, "register info");
    createUser(email, password)
      .then((result) => {
        console.log(result.user, "created user");
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            console.log("profile updated successfully");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User created seccessfully.",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.log("profile update error", error);
          });
        navigate("/");
      })
      .catch((error) => {
        console.log("register Error", error);
      });
  };
  return (
    <div className="min-h-screen bg-[#007BFF] border">
      <div className="flex-col hero-content lg:flex-row">
        <div className="text-center lg:text-left">
          <img
            src="https://i.ibb.co/ZhgwWQY/4537752-removebg-preview.png"
            alt=""
          />
        </div>
        <div className="w-full md:w-[60%] lg:w-[60%] text-white border shadow-2xl card shrink-0">
          <h1 className="p-3 text-5xl font-bold text-center">
            Register Please!
          </h1>
          <form onSubmit={handleRegister} className=" card-body">
            <div className="form-control">
              <label className="label">
                <span className="font-bold text-white label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name..."
                className="text-black input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Photo URL
                </span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Enter your photo URL..."
                className="text-black input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="font-bold text-white label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email..."
                className="text-black input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Password
                </span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="text-black input input-bordered"
                required
              />
              <label className="label">
                <a
                  href="#"
                  className="font-bold text-white label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className=" form-control">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <p className="text-center">
              Already have an account ?{" "}
              <span className="text-[#0000EE] font-bold hover:underline">
                <Link to={"/login"}>Login Now</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;