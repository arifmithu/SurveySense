import React from "react";
import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

const ReportSurvey = () => {
  const survey = useLoaderData();
  return (
    <div className="mx-5 md:mx-12 lg:mx-20">
      <SectionTitle
        heading={"Report"}
        subHeading={"Tell use in details about this survey"}
      ></SectionTitle>
      <div>
        <p>Survey Name: {survey.surveyName}</p>
        <p>Survey Id: {survey._id}</p>
      </div>
      <textarea
        placeholder="Bio"
        className="textarea textarea-bordered textarea-lg w-full max-w-xs"
      ></textarea>
    </div>
  );
};

export default ReportSurvey;
