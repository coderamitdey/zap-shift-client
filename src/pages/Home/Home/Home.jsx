import React from "react";
import Banner from "../Banner/Banner";
import Work from "../Works/Work";
import Service from "../Services/Service";
import Brands from "../Brands/Brands";
import Reviews from "../Reviews/Reviews";
import ServiceTwo from "../Services/ServiceTwo";

const reviewsPromise = fetch("/public/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Work></Work>
      <Service></Service>
      <div className="my-10">
        <h1 className="text-center font-bold text-orange-500 text-3xl my-10">Meet Our Partners</h1>
        <Brands></Brands>
      </div>
      <ServiceTwo></ServiceTwo>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
    </div>
  );
};

export default Home;
