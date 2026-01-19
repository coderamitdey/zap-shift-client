import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import { IoArrowForwardCircleSharp } from "react-icons/io5";

const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true}>
      <div className="relative">
        <img src={bannerImg1} />

        <div className="absolute bottom-1/15 left-1/5 -translate-x-1/2 -translate-y-1/2 flex items-center">
          <button className="btn rounded-full btn-info">
            Track Your Parcel
          </button>
          <div className="text-5xl -rotate-45">
            <IoArrowForwardCircleSharp />
          </div>
          <button className="btn text-black rounded-full btn-outline btn-accent">
            Book a Delivery
          </button>
        </div>
      </div>
      <div>
        <img src={bannerImg2} />
      </div>
      <div>
        <img src={bannerImg3} />
      </div>
    </Carousel>
  );
};

export default Banner;
