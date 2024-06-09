import React from "react";

const Faq = () => {
  return (
    <div className="mx-5 mb-5 md:mx-12 md:mb-8 lg:mb-20 lg:mx-20">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold md:text-3xl lg:text-5xl">
          Common Questions(FAQs)
        </h1>
        <h3 className="mt-2 w-[50%] mx-auto text-lg italic md:text-xl lg:text-2xl">
          Here are some questions those are frequently asked by visitors. Check
          the answers.
        </h3>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="text-xl font-medium collapse-title">
          How long does it take to complete a survey?
        </div>
        <div className="collapse-content">
          <p>
            Our surveys are generally takes less than 3 minutes. Sometimes when
            a special survey helds , then it can take 5 minutes. But we never
            survey which takes more than 5 minutes. So it's easy and time
            saving.
          </p>
        </div>
      </div>
      <div className="mt-5 collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="text-xl font-medium collapse-title">
          Is my personal information safe?
        </div>
        <div className="collapse-content">
          <p>
            Your all information those we collects with your permission , we
            never share those informations with any other persons or companies.
            We keep your information 100% safe. So feel safe and secure here.{" "}
          </p>
        </div>
      </div>
      <div className="mt-5 collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="text-xl font-medium collapse-title">
          How can i earn rewards ?
        </div>
        <div className="collapse-content">
          <p>
            Sometimes we post paid surveys. If you participate in those surveys
            , you will receive some points. After gaining a certain amounts of
            points, you can request for reward with those points.
          </p>
        </div>
      </div>
      <div className="mt-5 collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="text-xl font-medium collapse-title">
          How do I redeem my rewards ?
        </div>
        <div className="collapse-content">
          <p>
            Upon completing a survey, you will earn points or rewards. These can
            be redeemed for various incentives such as gift cards, cash, or
            other perks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Faq;
