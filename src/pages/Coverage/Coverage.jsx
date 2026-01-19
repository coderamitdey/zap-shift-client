import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.810331, 90.412521];
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  //   console.log(serviceCenters);

  const handleSearch = () => {
    const location = inputRef.current.value;
    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase()),
    );
    if (district) {
      const coOrdinate = [district.latitude, district.longitude];

      //   documentation important line
      mapRef.current.flyTo(coOrdinate, 13);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-3xl my-5">
        We are available in 64 districts
      </h2>
      {/* search */}
      <div>
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            name="location"
            className="grow"
            placeholder="Search"
            ref={inputRef}
          />
          <button onClick={handleSearch} className="btn btn-accent -mr-3">
            Search
          </button>
        </label>
      </div>

      {/* map */}

      <div className="w-full h-150 my-8">
        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          className="h-150"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong> <br /> Service Area:{" "}
                {center.covered_area.join(",")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
