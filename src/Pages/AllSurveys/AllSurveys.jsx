import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const AllSurveys = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("descending");
  const {
    data: surveys = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-serveys", category, sort],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/surveys/all/${category}?sortType=${sort}`
      );
      return res.data;
    },
  });
  console.log("sorting", sort);
  return (
    <div className="mx-5 mt-10 md:mx-12 lg:mx-20">
      <SectionTitle
        heading={"All Surveys"}
        subHeading={"Check and vote"}
      ></SectionTitle>
      <div className="flex justify-end gap-0">
        {/* sort dropdown */}
        <div className="flex items-center justify-end">
          <h3 className="text-base ">Sort :</h3>
          <div className="mr-20 lg:mr-10 dropdown">
            <div tabIndex={0} role="button" className="m-1 w-fit btn">
              {sort.toUpperCase()}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1]  menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={() => setSort("ascending")}>Ascending</button>
              </li>
              <li>
                <button onClick={() => setSort("descending")}>
                  Descending
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* category dropdown */}
        <div className="flex items-center justify-end">
          <h3 className="text-base ">Category :</h3>
          <div className="mr-20 lg:mr-10 dropdown">
            <div tabIndex={0} role="button" className="m-1 w-fit btn">
              {category.toUpperCase()}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1]  menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={() => setCategory("all")}>All</button>
              </li>
              <li>
                <button onClick={() => setCategory("demographics")}>
                  Demographics
                </button>
              </li>
              <li>
                <button onClick={() => setCategory("behavioral")}>
                  Behavioral
                </button>
              </li>
              <li>
                <button onClick={() => setCategory("psychographics")}>
                  Psychographics
                </button>
              </li>
              <li>
                <button onClick={() => setCategory("product")}>Product</button>
              </li>
              <li>
                <button onClick={() => setCategory("customer-satisfaction")}>
                  Customer Satisfaction
                </button>
              </li>
              <li>
                <button onClick={() => setCategory("market-research")}>
                  Market Research
                </button>
              </li>
              <li>
                <button onClick={() => setCategory("employee-feedback")}>
                  Employee Feedback
                </button>
              </li>
              <li>
                <button onClick={() => setCategory("event-feedback")}>
                  Event Feedback
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {isLoading ? (
        <span className="text-center loading loading-spinner loading-lg"></span>
      ) : isError ? (
        <div className="flex items-center justify-center w-full h-20 mt-10 border rounded-lg">
          Something went wrong.
        </div>
      ) : surveys.length == 0 ? (
        <div className="flex items-center justify-center w-full h-20 mt-10 border rounded-lg">
          No survey found of this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2 lg:grid-cols-3">
          {surveys.map((survey, index) => (
            <div className="card bg-[#205188] text-primary-content">
              <div className="card-body">
                <h2 className="card-title">{survey.surveyName}</h2>
                <p>{survey.description}</p>
                <p>Total Votes : {survey.response}</p>
                <div className="justify-end card-actions">
                  <Link to={user ? `/surveys/vote/${survey._id}` : "/login"}>
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
