import React from "react";
import bookingImg from "../../../assets/bookingIcon.png";

const Work = () => {
  return (
    <div className="">
      <div>
        <h1 className="font-bold text-center text-3xl">How it Works</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3 mb-3">
        <div className="card card-border shadow-md p-3">
          <img className="h-15 w-15" src={bookingImg} alt="" />
          <h3 className="font-semibold text-secondary">Booking Pick & Drop</h3>
          <p className="text-gray-500">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
        <div className="card card-border shadow-md p-3">
          <img className="h-15 w-15" src={bookingImg} alt="" />
          <h3 className="font-semibold text-secondary">Cash On Delivery</h3>
          <p className="text-gray-500">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
        <div className="card card-border shadow-md p-3">
          <img className="h-15 w-15" src={bookingImg} alt="" />
          <h3 className="font-semibold text-secondary">Delivery Hub</h3>
          <p className="text-gray-500">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
        <div className="card card-border shadow-md p-3">
          <img className="h-15 w-15" src={bookingImg} alt="" />
          <h3 className="font-semibold text-secondary">
            Booking SME & Corporate
          </h3>
          <p className="text-gray-500">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Work;
