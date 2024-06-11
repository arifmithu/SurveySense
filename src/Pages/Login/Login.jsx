import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaArrowRightArrowLeft, FaGoogle } from "react-icons/fa6";
import { GrGoogle } from "react-icons/gr";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook } from "react-icons/im";
import { updateEmail, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/Firebase.config";

const Login = () => {
  const { login, facebookLogin, googleLogin } = useAuth();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password, "login");
    if (password.length < 6) {
      setLoginError("Password should be at least 6 characters or longer");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setLoginError("Password should have atleast one upper case letter.");
      return;
    } else if (!/[a-z]/.test(password)) {
      setLoginError("Password should have atleast one lower case letter.");
      return;
    } else if (!/[0-9]/.test(password)) {
      setLoginError("Password should have atleast one number.");
      return;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setLoginError("Password should have at least one special character.");
      return;
    } else {
      setLoginError(""); // Clear any previous errors
      // Proceed with login
      console.log("Password is valid");
    }
    login(email, password)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login seccessful.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log("login Error", error);
      });
  };
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login seccessful.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log("google login error", error);
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Something went wrong. Try again.",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const handleFacebookLogin = () => {
    facebookLogin()
      .then((result) => {
        console.log("before update email calling");
        updateEmail(auth.currentUser, result.user.providerData[0]?.email)
          .then(() =>
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Login seccessful.",
              showConfirmButton: false,
              timer: 1500,
            })
          )
          .catch((error) => console.log("error in updating profile"));
        navigate("/");
      })
      .catch((error) => {
        console.log("facebook login error", error);
      });
  };
  return (
    <div className="min-h-screen hero bg-[#007BFF]">
      <div className="flex-col hero-content lg:flex-row">
        <div className="text-center lg:text-left">
          <img
            src="https://i.ibb.co/ZhgwWQY/4537752-removebg-preview.png"
            alt=""
          />
        </div>
        <div className="w-full max-w-sm text-white shadow-2xl card shrink-0">
          <h1 className="p-3 text-5xl font-bold text-center">Login now!</h1>
          <form onSubmit={handleLogin} className=" card-body">
            <div className="form-control">
              <label className="label">
                <span className="font-bold text-white label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
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
                placeholder="password"
                className="text-black input input-bordered"
                required
              />
              {loginError && <p className="text-white">{loginError}</p>}
              <label className="label">
                <a
                  href="#"
                  className="font-bold text-white label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <button type="submit" className="font-bold btn btn-primary">
                Login
              </button>
            </div>
            <p className="text-center">
              New here ?{" "}
              <span className="text-[#0000EE] font-bold hover:underline">
                <Link to={"/register"}>Register</Link>
              </span>
            </p>
            <div className="mx-auto text-center">
              <p className="underline">Continue With</p>
              <div className="flex gap-2 mt-4">
                <FcGoogle
                  onClick={handleGoogleLogin}
                  className="p-1 text-5xl rounded-full cursor-pointer bg-slate-50"
                ></FcGoogle>
                <ImFacebook
                  onClick={handleFacebookLogin}
                  className="p-1 text-5xl text-black rounded-full cursor-pointer bg-slate-50"
                ></ImFacebook>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
