import React, { useRef, useState } from "react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Testimonials = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: testimonials = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await axiosPublic.get("/testimonials");
      return res.data;
    },
  });
  return (
    <div className="mx-5 mb-5 md:mx-12 md:mb-8 lg:mb-20 lg:mx-20">
      <div className="text-center mb-14">
        <h1 className="text-xl font-bold md:text-3xl lg:text-5xl">
          Testimonials
        </h1>
        <h3 className="mt-2 w-[50%] mx-auto text-lg italic md:text-xl lg:text-2xl">
          Our users express their feedback with us oftenly.Check what our users
          say about us.
        </h3>
      </div>
      <div className="relative h-full">
        {isLoading ? (
          <span className="loading loading-spinner loading-lg"></span>
        ) : isError ? (
          <div className="flex items-center justify-center w-full h-24 font-bold border rounded-lg">
            Something went wrong
          </div>
        ) : (
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            navigation={true}
            slidesPerView={"2"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[EffectCoverflow, Navigation, Pagination]}
            className="w-[100%] py-12 mySwiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide
                key={index}
                className="bg-center bg-cover w-[50%] h-[150px]"
              >
                <div className="w-[100%] h-[250px] mx-auto shadow-xl card card-side bg-base-100">
                  <figure className="w-full h-full">
                    <img
                      src={testimonial.image}
                      alt="Movie"
                      className="w-full h-full"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{testimonial.name}</h2>
                    <div className="relative font-bold">
                      <span className="text-3xl">&quot;</span>
                      {testimonial.review}
                      <p className="mt-5 font-medium">
                        Rating : {testimonial.rating}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
