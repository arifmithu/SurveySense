import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password, "login");
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
                <span className="text-white label-text">Email</span>
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
                <span className="text-white label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="text-black input input-bordered"
                required
              />
              <label className="label">
                <a
                  href="#"
                  className="text-white label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="mt-6 form-control">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
