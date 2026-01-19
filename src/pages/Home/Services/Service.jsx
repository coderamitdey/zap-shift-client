import React from "react";
import serviceImg from "../../../assets/service.png";

const Service = () => {
  return (
    <div className="bg-secondary rounded-2xl p-5 mb-3">
      <div>
        <h1 className="font-bold text-3xl text-white text-center">
          Our Services
        </h1>
        <p className="text-gray-300 text-center">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
        <div className="card card-border shadow-md bg-base-200 p-3">
          <div className="bg-pink-100 h-15 w-15 rounded-full mx-auto">
            <img className="h-10 w-10 mx-auto pt-2" src={serviceImg} alt="" />
          </div>
          <h3 className="text-secondary font-bold text-xl text-center">
            Express & Standard Delivery
          </h3>
          <p className="text-center text-gray-500">
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi.Express delivery available in Dhaka within 4–6
            hours from pick-up to drop-off.
          </p>
        </div>
        <div className=" card card-border shadow-md bg-primary p-3">
          <div className="bg-pink-100 h-15 w-15 rounded-full mx-auto">
            <img className="h-10 w-10 mx-auto pt-2" src={serviceImg} alt="" />
          </div>

          <h3 className="text-secondary font-bold text-xl text-center">
            Nationwide Delivery
          </h3>
          <p className="text-center text-gray-500">
            We deliver parcels nationwide with home delivery in every district,
            ensuring your products reach customers within 48–72 hours.
          </p>
        </div>
        <div className=" card card-border shadow-md bg-base-200 p-3">
          <div className="bg-pink-100 h-15 w-15 rounded-full mx-auto">
            <img className="h-10 w-10 mx-auto pt-2" src={serviceImg} alt="" />
          </div>
          <h3 className="text-secondary font-bold text-xl text-center">
            Fulfillment Solution
          </h3>
          <p className="text-center text-gray-500">
            We also offer customized service with inventory management support,
            online order processing, packaging, and after sales support.
          </p>
        </div>

        <div className=" card card-border shadow-md bg-base-200 p-3">
          <div className="bg-pink-100 h-15 w-15 rounded-full mx-auto">
            <img className="h-10 w-10 mx-auto pt-2" src={serviceImg} alt="" />
          </div>
          <h3 className="text-secondary font-bold text-xl text-center">
            Cash on Home Delivery
          </h3>
          <p className="text-center text-gray-500">
            100% cash on delivery anywhere in Bangladesh with guaranteed safety
            of your product.
          </p>
        </div>
        <div className=" card card-body bg-base-200 shadow-md p-3">
          <div className="bg-pink-100 h-15 w-15 rounded-full mx-auto">
            <img className="h-10 w-10 mx-auto pt-2" src={serviceImg} alt="" />
          </div>
          <h3 className="text-secondary font-bold text-xl text-center">
            Corporate Service / Contract In Logistics
          </h3>
          <p className="text-center text-gray-500">
            Customized corporate services which includes warehouse and inventory
            management support.
          </p>
        </div>
        <div className=" card card-border shadow-md bg-base-200 p-3">
          <div className="bg-pink-100 h-15 w-15 rounded-full mx-auto">
            <img className="h-10 w-10 mx-auto pt-2" src={serviceImg} alt="" />
          </div>
          <h3 className="text-secondary font-bold text-xl text-center">
            Parcel Return
          </h3>
          <p className="text-center text-gray-500">
            Through our reverse logistics facility we allow end customers to
            return or exchange their products with online business merchants.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Service;
