import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    watch,
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  // set use kora hoi same jinish duplicate na korar jonno
  const regions = [...new Set(regionsDuplicate)];
  const yourRegion = watch("yourRegion");

  // region er modde district khoja
  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleRiderApplication = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Your application has been submitted. We will reach you within 72 hours",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  return (
    <div className="my-5">
      <h2 className="text-secondary font-bold text-3xl">Be a Rider</h2>
      <p className="text-gray-500 mt-3">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>
      <form className="text-xs" onSubmit={handleSubmit(handleRiderApplication)}>
        {/* parcel info: name and weight */}

        {/* sender details */}
        <div className="mt-4">
          <h3 className="mb-3 font-bold text-xl">Tell us about yourself</h3>
          {/* name */}
          <fieldset className="fieldset">
            <label className="label text-black font-semibold">Your Name</label>
            <input
              required={true}
              defaultValue={user?.displayName}
              type="text"
              {...register("riderName")}
              className="input w-full"
              placeholder="Your Name"
            />
          </fieldset>

          {/* license no */}
          <fieldset className="fieldset">
            <label className="label text-black font-semibold">
              Driving License Number
            </label>
            <input
              required={true}
              type="number"
              {...register("licenseNo")}
              className="input w-full"
              placeholder="Driving License Number"
            />
          </fieldset>

          {/* email */}
          <fieldset className="fieldset">
            <label className="label text-black font-semibold">Your Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              {...register("riderEmail")}
              required={true}
              className="input w-full"
              placeholder="Your Email"
            />
          </fieldset>

          {/*  dynamic region */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Your Region</legend>
            <select
              required={true}
              {...register("yourRegion")}
              defaultValue="Pick a region"
              className="select text-gray-500 w-full"
            >
              <option>Pick a Region</option>

              {regions.map((r, index) => (
                <option key={index} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </fieldset>

          {/*  dynamic district based on region */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Your District</legend>
            <select
              required={true}
              {...register("yourDistrict")}
              defaultValue="Pick a district"
              className="select text-gray-500 w-full"
            >
              <option>Pick a District</option>

              {districtsByRegion(yourRegion).map((r, index) => (
                <option key={index} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </fieldset>

          {/* Nid no */}
          <fieldset className="fieldset">
            <label className="label text-black font-semibold">NID No</label>
            <input
              required={true}
              type="number"
              {...register("nidNo")}
              className="input w-full"
              placeholder="NID No"
            />
          </fieldset>

          {/* phone no */}
          <fieldset className="fieldset">
            <label className="label text-black font-semibold">Phone No</label>
            <input
              required={true}
              type="number"
              {...register("yourPhoneNo")}
              className="input w-full"
              placeholder="Phone No"
            />
          </fieldset>
          {/* phone no */}
          <fieldset className="fieldset">
            <label className="label text-black font-semibold">
              Bike Brand Model and Year
            </label>
            <input
              required={true}
              type="text"
              {...register("brandName")}
              className="input w-full"
              placeholder="Bike Brand Model and Year"
            />
          </fieldset>

          {/* bike reg no */}
          <fieldset className="fieldset">
            <label className="label text-black font-semibold">
              Bike Registration Number
            </label>
            <input
              required={true}
              type="number"
              {...register("bikeRegNo")}
              className="input w-full"
              placeholder="Bike Registration Number"
            />
          </fieldset>

          {/* pickup */}
          <fieldset className="fieldset">
            <label className="label text-black font-semibold">
              Tell Us More About Yourself
            </label>
            <input
              type="text"
              {...register("tellYourself")}
              className="input w-full"
              placeholder="Tell Us More About Yourself"
            />
          </fieldset>
        </div>

        {/* submission btn */}
        <button className="btn btn-primary text-black mt-3 w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Rider;
