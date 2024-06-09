import React from "react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { TypeAnimation } from "react-type-animation";

const HowWorks = () => {
  return (
    <div className="mx-5 mt-4 mb-5 md:mx-12 lg:mx-20 md:mt-8 lg:mt-16 md:mb-8 lg:mb-12">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold md:text-3xl lg:text-5xl">
          How we works ?
        </h1>
        <h3 className="mt-2 w-[50%] mx-auto text-lg italic md:text-xl lg:text-2xl">
          Your opinions shape the future! Participating in our surveys is simple
          and rewarding.
        </h3>
      </div>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        loop={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className="text-white h-[70vh] flex flex-col rounded-lg items-center justify-center bg-[#215288]"
            style={{
              backgroundImage:
                'url("https://i.ibb.co/Th8FjtT/Ol-Relaxing.png")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left",
            }}
          >
            <h4 className="mb-5 ml-[30%] text-base md:text-lg lg:text-3xl">
              Step 1 : Register or Login
            </h4>
            <div className="ml-[30%] w-[50%]">
              <TypeAnimation
                sequence={[
                  "Sign up for free or log in if you already have an account.",
                  3000,
                  "This allows us to tailor surveys",
                  3000,
                  "to your preferences and track your rewards.",
                  3000,
                ]}
                style={{ fontSize: "2em" }}
                speed={10}
                repeat={Infinity}
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="text-white h-[70vh] flex flex-col rounded-lg items-center justify-center bg-[#215288]"
            style={{
              backgroundImage:
                'url("https://i.ibb.co/xC5yGxv/undraw-profile-image-re-ic2f-removebg-preview.png")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left",
            }}
          >
            <h4 className="mb-5 ml-[30%] text-base md:text-lg lg:text-3xl">
              Step 2 : Fill Out Your Profile
            </h4>
            <div className="ml-[30%] w-[50%]">
              <TypeAnimation
                sequence={[
                  "Complete your profile with basic information.",
                  3000,
                  "This helps us match you with surveys that are relevant",
                  3000,
                  "to your interests and demographics.",
                  3000,
                ]}
                style={{ fontSize: "2em" }}
                speed={10}
                repeat={Infinity}
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="text-white h-[70vh] flex flex-col rounded-lg items-center justify-center bg-[#215288]"
            style={{
              backgroundImage:
                'url("https://i.ibb.co/ky6YY2z/undraw-Circuit-board-re-1b79-removebg-preview.png")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left",
              backgroundSize: "contain",
            }}
          >
            <h4 className="mb-5 ml-[30%] text-base md:text-lg lg:text-3xl">
              Step 3 : Browse Available Surveys
            </h4>
            <div className="ml-[30%]">
              <TypeAnimation
                sequence={[
                  "Browse the list of available surveys on Surveys page.",
                  3000,
                  "Each survey will display the estimated time",
                  3000,
                  "to complete and the rewards offered.",
                  3000,
                ]}
                style={{ fontSize: "2em" }}
                speed={10}
                repeat={Infinity}
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="text-white h-[70vh] flex flex-col rounded-lg items-center justify-center bg-[#215288]"
            style={{
              backgroundImage:
                'url("https://i.ibb.co/BNdv9n4/undraw-Notes-re-pxhw-removebg-preview.png")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left",
              backgroundSize: "contain",
            }}
          >
            <h4 className="mb-5 ml-[30%] text-base md:text-lg lg:text-3xl">
              Step 4 : Participate in Surveys
            </h4>
            <div className="ml-[40%] w-[50%]">
              <TypeAnimation
                sequence={[
                  "Click on a survey to start.",
                  3000,
                  "Answer the questions honestly and thoughtfully.",
                  3000,
                  "Your feedback is valuable and",
                  3000,
                  "helps shape products, services, and policies.",
                  3000,
                ]}
                style={{ fontSize: "2em" }}
                speed={10}
                repeat={Infinity}
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="text-white h-[70vh] flex flex-col rounded-lg items-center justify-center bg-[#215288]"
            style={{
              backgroundImage:
                'url("https://i.ibb.co/v4jC47y/undraw-Gifts-0ceh-removebg-preview.png")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left",
              backgroundSize: "contain",
            }}
          >
            <h4 className="mb-5 ml-[30%] font-bold text-base md:text-lg lg:text-3xl">
              Step 5 : Earn Rewards
            </h4>
            <div className="ml-[40%] w-[50%]">
              <TypeAnimation
                sequence={[
                  "Upon completing a survey, you will earn points or rewards.",
                  3000,
                  " These can be redeemed for various incentives ",
                  3000,
                  "such as gift cards, cash, or other perks.",
                  3000,
                ]}
                style={{ fontSize: "2em" }}
                speed={10}
                repeat={Infinity}
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="text-white h-[70vh] flex flex-col rounded-lg items-center justify-center bg-[#215288]"
            style={{
              backgroundImage:
                'url("https://i.ibb.co/j5nLM6j/undraw-In-progress-re-m1l6-removebg-preview.png")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left",
              backgroundSize: "contain",
            }}
          >
            <h4 className="mb-5 ml-[30%] font-bold text-base md:text-lg lg:text-3xl">
              Step 6 : Track Your Progress
            </h4>
            <div className="ml-[40%] w-[50%]">
              <TypeAnimation
                sequence={[
                  "Track your completed surveys and rewards ",
                  3000,
                  " through your account dashboard. ",
                  3000,
                  "Stay updated on new survey opportunities and your earning progress.",
                  3000,
                ]}
                style={{ fontSize: "2em" }}
                speed={10}
                repeat={Infinity}
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HowWorks;
