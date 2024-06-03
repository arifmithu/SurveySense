import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const Response = () => {
  const survey = useLoaderData();
  console.log(survey, "having survey");
  return (
    <div className="shadow-xl card w-96 bg-base-100">
      <div className="card-body">
        <h2 className="card-title">{survey.title}</h2>
        <p>Total Response : {survey.response}</p>
        <div className="justify-end card-actions">
          <Link to={`/dashboard/details/${survey._id}`}>
            <button className="btn btn-primary">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Response;
