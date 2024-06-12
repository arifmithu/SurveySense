import React, { useState } from "react";
import ReactTextTransition, { presets } from "react-text-transition";
import Marquee from "react-fast-marquee";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_pk);
const Pricing = () => {
  const [showCardOpitons, setShowCardOptions] = useState(false);

  return (
    <div className="min-h-screen bg-[#205188] border">
      <div className="w-full pt-5 text-center">
        <h1 className="text-2xl font-bold text-white md:text-3xl lg:text-5xl">
          Be A Pro
        </h1>

        {`Get extra facilities with pro`.split(" ").map((txt, i) => (
          <ReactTextTransition
            key={i}
            delay={i * 200}
            className="mr-2 text-lg font-bold text-slate-300"
            inline
          >
            {txt}
          </ReactTextTransition>
        ))}
      </div>
      <div className="mt-6 text-xl text-red-400">
        <Marquee>
          <span className="mr-4">
            Get pro status with 50% discounts for a month.
          </span>{" "}
          <span className="mr-4">
            {" "}
            You will get more rewards using pro status.
          </span>
        </Marquee>
      </div>
      <div className="flex items-center justify-center w-full mt-12">
        <div className="px-5 rounded-lg py-3 w-[50%] lg:w-[30%] text-center shadow-2xl shadow-white text-slate-300">
          <h1 className="text-xl font-bold">Amenities</h1>
          <div className="flex items-center gap-2">
            <TiTick />
            <p>Unlimited Comments</p>
          </div>
          <div className="flex items-center gap-2">
            <TiTick />
            <p>Communication with admins</p>
          </div>
          <div className="flex items-center gap-2">
            <TiTick />
            <p>Monthly shoutout in the website</p>
          </div>
          <div className="flex items-center gap-2">
            <TiTick />
            <p>Monthly meeting for connections</p>
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowCardOptions(!showCardOpitons)}
              className="btn"
            >
              Buy Pro for{" "}
              <span className="text-red-400 font-bold text-lg">5$</span>
            </button>
          </div>
        </div>
      </div>
      {showCardOpitons && (
        <div className="w-[50%] text-center bg-white py-5 px-8 rounded-lg mb-20 mx-auto mt-10">
          <Elements stripe={stripePromise}>
            <CheckOutForm />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default Pricing;
