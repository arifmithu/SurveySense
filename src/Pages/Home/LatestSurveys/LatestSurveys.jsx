import React from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const LatestSurveys = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: surveys = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-serveys"],
    queryFn: async () => {
      const res = await axiosPublic.get("/surveys");
      return res.data;
    },
  });
  return (
    <div className="z-0 mx-5 mt-16 md:mx-12 lg:mx-20">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold md:text-3xl lg:text-5xl">
          Latest Surveys
        </h1>
        <h3 className="mt-2 text-lg italic md:text-xl lg:text-2xl">
          Most recently created surveys
        </h3>
      </div>
      {isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : isError ? (
        <div>Something went wrong</div>
      ) : (
        <div className="z-0 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...surveys]
            .reverse()
            .slice(0, 6)
            .map((survey, index) => (
              <div
                key={index}
                className="z-0 bg-blue-500 shadow-xl text-slate-300 card image-full"
              >
                {/* <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
              </figure> */}
                <div className="card-body">
                  <h2 className="card-title">{survey.surveyName}</h2>
                  <div>
                    <p>Category : {survey.category}</p>
                    <p>Total Response : {survey.response}</p>
                    <p>Total Comments : {survey.feedback.length}</p>
                    <p>Created at: {survey.created}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default LatestSurveys;
