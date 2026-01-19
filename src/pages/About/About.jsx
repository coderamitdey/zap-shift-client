import React, { useState } from "react";

const About = () => {
  const [activeTab, setActiveTab] = useState("Story");
  const tabData = {
    Story: `ZapShift began with a simple observation: the "last mile" of delivery was the most broken part of the supply chain. Founded in 2022, we started with a small fleet of three vehicles and a custom-built tracking algorithm. Today, we’ve grown into a tech-driven logistics powerhouse, helping thousands of businesses and individuals move packages across the country with total transparency. We didn't just want to move boxes; we wanted to move trust.`,

    Mission: `Our mission is to democratize high-speed logistics. We believe that whether you are a small Etsy seller or a large corporation, you deserve access to real-time tracking, fair pricing, and "zap-fast" delivery speeds. We are committed to reducing the carbon footprint of delivery by optimizing routes through AI and transitioning to an eco-friendly electric fleet by 2030.`,

    Success: `Success for us is measured in seconds saved and smiles earned. To date, ZapShift has successfully delivered over 1.2 million packages with a 99.8% on-time rate. We have been recognized as the "Logistics Tech Startup of the Year" and currently maintain a 4.9-star rating across all major review platforms. Our greatest success, however, is the 5,000+ small businesses that rely on us daily to grow their own dreams.`,

    "Team & Others": `The magic behind the "Zap" isn't just code—it's people. Our team consists of world-class software engineers, veteran logistics coordinators, and a dedicated customer support squad available 24/7. Beyond our core team, we partner with local independent couriers, providing them with fair wages and the best delivery tech in the industry to ensure they succeed alongside us.`,
  };
  return (
    <div>
      <div className="my-15">
        <h1 className="font-bold text-3xl text-secondary">About Us</h1>
        <p className="font-semibold text-gray-500 mt-5">
          Fast and reliable parcel delivery with real-time tracking and best
          rates. From personal packages to business shipments — we deliver on
          time every time.
        </p>
      </div>

      <div>
        <div role="tablist" className="tabs tabs-lift">
          <div role="tablist" className="tabs tabs-lift">
            <a
              role="tab"
              className={`tab ${activeTab === "Story" ? "bg-success text-white font-bold" : ""}`}
              onClick={() => setActiveTab("Story")}
            >
              Story
            </a>

            <a
              role="tab"
              className={`tab ${activeTab === "Mission" ? "bg-success text-white font-bold" : ""}`}
              onClick={() => setActiveTab("Mission")}
            >
              Mission
            </a>

            <a
              role="tab"
              className={`tab ${activeTab === "Success" ? "bg-success text-white font-bold" : ""}`}
              onClick={() => setActiveTab("Success")}
            >
              Success
            </a>

            <a
              role="tab"
              className={`tab ${activeTab === "Team & Others" ? "bg-success text-white font-bold" : ""}`}
              onClick={() => setActiveTab("Team & Others")}
            >
              Team & Others
            </a>
          </div>

          <div className="text-gray-500 font-semibold p-5 mb-15">{tabData[activeTab]}</div>
        </div>
      </div>
    </div>
  );
};

export default About;
