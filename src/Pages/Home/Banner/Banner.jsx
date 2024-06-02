import React from "react";
import "../../../index.css";

const Banner = () => {
  return (
    <div
      className="min-h-screen bg-[#007BFF] hero"
      style={{
        backgroundImage: "url(https://i.ibb.co/88njScp/large-triangles-1.png)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="text-center hero-content text-neutral-content">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mt-5 mb-5 text-3xl font-bold md:text-5xl lg:text-7xl">
            Welcome to SurveySense
          </h1>
          <p className="mb-5 text-lg md:text-xl lg:text-2xl">
            Gather insights, make decisions, and improve your services through
            our comprehensive surveys.
          </p>
          <button className="btn bg-[#FFA500] hover:bg-[#FFB84D] font-bold">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
