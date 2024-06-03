import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const AllSurveys = () => {
  const axiosPublic = useAxiosPublic();
  const { data: surveys = [], isLoading } = useQuery({
    queryKey: ["all-serveys"],
    queryFn: async () => {
      const res = await axiosPublic.get("/surveys");
      return res.data;
    },
  });
  return (
    <div className="mx-5 mt-10 md:mx-12 lg:mx-20">
      <SectionTitle
        heading={"All Surveys"}
        subHeading={"Check and vote"}
      ></SectionTitle>
      {isLoading ? (
        <span className="text-center loading loading-spinner loading-lg"></span>
      ) : (
        <div className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2 lg:grid-cols-3">
          {surveys.map((survey, index) => (
            <div className="card bg-primary text-primary-content">
              <div className="card-body">
                <h2 className="card-title">{survey.surveyName}</h2>
                <p>{survey.description}</p>
                <div className="justify-end card-actions">
                  <Link to={`/surveys/vote/${survey._id}`}>
                    <button className="btn">Vote Now</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSurveys;
