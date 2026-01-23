import React from "react";
import liveImg from "../../../assets/live-tracking.png";
import deliveryImg from "../../../assets/safe-delivery.png";

const ServiceTwo = () => {
  return (
    <div>
      <div className="flex gap-5 my-3 bg-gray-200 p-5 rounded-2xl transition-all duration-300 ease-out hover:scale-[1.02]">
        <div className="h-20 w-20">
          <img src={liveImg} alt="" />
        </div>

        {/* middle dash */}

        <div className="border-l border-dashed my-6"></div>

        <div>
          <h1 className="font-bold text-xl mb-2">Live Parcel Tracking</h1>
          <p className="text-gray-600">
            Stay updated in real-time with our live parcel tracking feature.
            From pick-up to delivery, monitor your shipment's journey and get
            instant status updates for complete peace of mind.
          </p>
        </div>
      </div>

      <div className="flex gap-5 my-3 bg-gray-200 p-5 rounded-2xl transition-all duration-300 ease-out hover:scale-[1.02]">
        <div className="h-20 w-20">
          <img src={deliveryImg} alt="" />
        </div>

        {/* middle dash */}

        <div className="border-l border-dashed my-6"></div>
        <div>
          <h1 className="font-bold text-xl mb-2">100% Safe Delivery</h1>
          <p className="text-gray-600">
            We ensure your parcels are handled with the utmost care and
            delivered securely to their destination. Our reliable process
            guarantees safe and damage-free delivery every time.
          </p>
        </div>
      </div>

      <div className="flex gap-5 my-3 bg-gray-200 p-5 rounded-2xl transition-all duration-300 ease-out hover:scale-[1.02]">
        <div className="h-20 w-20">
          <img src={deliveryImg} alt="" />
        </div>

        {/* middle dash */}

        <div className="border-l border-dashed my-6"></div>
        <div>
          <h1 className="font-bold text-xl mb-2">24/7 Call Center Support</h1>
          <p className="text-gray-600">
            Our dedicated support team is available around the clock to assist
            you with any questions, updates, or delivery concerns—anytime you
            need us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceTwo;
