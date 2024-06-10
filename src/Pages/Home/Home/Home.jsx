import React from "react";
import Navbar from "../../../Shared/Navbar/Navbar";
import Banner from "../Banner/Banner";
import TopSurveys from "../TopSurveys/TopSurveys";
import LatestSurveys from "../LatestSurveys/LatestSurveys";
import HowWorks from "../HowWorks/HowWorks";
import Faq from "../Faq/Faq";
import Footer from "../../../Shared/Footer/Footer";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div className="z-0">
      <Banner></Banner>
      <TopSurveys></TopSurveys>
      <LatestSurveys></LatestSurveys>
      <HowWorks></HowWorks>
      <Faq></Faq>
      <Testimonials></Testimonials>
      <Footer></Footer>
    </div>
  );
};

export default Home;
