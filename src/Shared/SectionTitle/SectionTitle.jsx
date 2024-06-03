import React from "react";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="text-center ">
      <h2 className="text-5xl font-bold">{heading}</h2>
      <p className="mt-3 text-xl">{subHeading}</p>
    </div>
  );
};

export default SectionTitle;
