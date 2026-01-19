import React from "react";
import Banner from "../Banner/Banner";
import Work from "../Works/Work";
import Service from "../Services/Service";
import Brands from "../Brands/Brands";
import Reviews from "../Reviews/Reviews";

const reviewsPromise = fetch("/public/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Work></Work>
      <Service></Service>
      <div className="m-10">
        <Brands></Brands>
      </div>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
    </div>
  );
};

export default Home;
