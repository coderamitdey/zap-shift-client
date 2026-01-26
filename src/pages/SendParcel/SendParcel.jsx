import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
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
  console.log(regions);

  // region er modde district khoja
  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const handleSendParcel = (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }

    console.log("Total Cost:", cost);
    data.cost = cost;

    // confirmation AFTER cost
    Swal.fire({
      title: "Are you sure?",
      html: `<p>Total Cost: <b>৳${cost}</b></p>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm & Send",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // save the parcel info to the database
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after saving parcel", res.data);
        });

        // console.log("Parcel sent!", data, cost);
        // Swal.fire(
        //   "Success!",
        //   `Parcel sent successfully. Cost: ৳${cost}`,
        //   "success",
        // );
      }
    });
  };

  return (
    <div>
      <h2 className="font-bold text-3xl my-4">Send a Parcel</h2>

      <form className="text-xs my-5" onSubmit={handleSubmit(handleSendParcel)}>
        {/* parcel type */}
        <div>
          <label className="label mr-3">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>

          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio"
            />
            Non-Document
          </label>
        </div>

        {/* parcel info: name and weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
          <fieldset className="fieldset">
            <label className="label text-black font-semibold">
              Parcel Name
            </label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label text-black font-semibold">
              Parcel Weight (Kg)
            </label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>

        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* sender details */}
          <div className="mt-4">
            <h3 className="mb-3 font-bold text-xl">Sender Details</h3>
            {/* name */}
            <fieldset className="fieldset">
              <label className="label text-black font-semibold">
                Sender Name
              </label>
              <input
                required={true}
                defaultValue={user?.displayName}
                type="text"
                {...register("senderName")}
                className="input w-full"
                placeholder="Sender Name"
              />
            </fieldset>

            {/* email */}
            <fieldset className="fieldset">
              <label className="label text-black font-semibold">
                Sender Email
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                {...register("senderEmail")}
                required={true}
                className="input w-full"
                placeholder="Sender Email"
              />
            </fieldset>
            {/* address */}
            <fieldset className="fieldset">
              <label className="label text-black font-semibold">
                Sender Address
              </label>
              <input
                required={true}
                type="text"
                {...register("senderAddress")}
                className="input w-full"
                placeholder="Sender Address"
              />
            </fieldset>
            {/* phone no */}
            <fieldset className="fieldset">
              <label className="label text-black font-semibold">
                Sender Phone No
              </label>
              <input
                required={true}
                type="number"
                {...register("senderPhoneNo")}
                className="input w-full"
                placeholder="Sender Phone No"
              />
            </fieldset>

            {/* sender dynamic region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Region</legend>
              <select
                required={true}
                {...register("senderRegion")}
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

            {/* sender dynamic district based on region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender District</legend>
              <select
                required={true}
                {...register("senderDistrict")}
                defaultValue="Pick a district"
                className="select text-gray-500 w-full"
              >
                <option>Pick a District</option>

                {districtsByRegion(senderRegion).map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* pickup */}
            <fieldset className="fieldset">
              <label className="label text-black font-semibold">
                Pickup Instruction
              </label>
              <input
                type="text"
                {...register("pickupInstruction")}
                className="input w-full"
                placeholder="Pickup Instruction"
              />
            </fieldset>
          </div>

          {/* receiver details */}
          <div className="mt-4">
            <h3 className="mb-3 font-bold text-xl">Receiver Details</h3>
            {/* name */}
            <fieldset className="fieldset">
              <label className="label text-black font-semibold">
                Receiver Name
              </label>
              <input
                required={true}
                type="text"
                {...register("receiverName")}
                className="input w-full"
                placeholder="Receiver Name"
              />
            </fieldset>
            {/* email */}
            <fieldset className="fieldset">
              <label className="label text-black font-semibold">
                Receiver Email
              </label>
              <input
                type="email"
                {...register("receiverEmail")}
                required={true}
                className="input w-full"
                placeholder="Receiver Email"
              />
            </fieldset>
            {/* address */}
            <fieldset className="fieldset">
              <label className="label text-black font-semibold">
                Receiver Address
              </label>
              <input
                required={true}
                type="text"
                {...register("receiverAddress")}
                className="input w-full"
                placeholder="Receiver Address"
              />
            </fieldset>
            {/* phone no */}
            <fieldset className="fieldset">
              <label className="label text-black font-semibold">
                Receiver Phone No
              </label>
              <input
                required={true}
                type="number"
                {...register("receiverPhoneNo")}
                className="input w-full"
                placeholder="Receiver Phone No"
              />
            </fieldset>

            {/* receiver dynamic region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver Region</legend>
              <select
                required={true}
                {...register("receiverRegion")}
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

            {/* receiver dynamic district based on region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver District</legend>
              <select
                required={true}
                {...register("receiverDistrict")}
                defaultValue="Pick a district"
                className="select text-gray-500 w-full"
              >
                <option>Pick a District</option>

                {districtsByRegion(receiverRegion).map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* pickup */}
            <fieldset className="fieldset">
              <label className="label text-black font-semibold">
                Delivery Instruction
              </label>
              <input
                type="text"
                {...register("deliveryInstruction")}
                className="input w-full"
                placeholder="Delivery Instruction"
              />
            </fieldset>
          </div>
        </div>
        {/* submission btn */}
        <button className="btn btn-success mt-3 w-full">Send Parcel</button>
      </form>
    </div>
  );
};

export default SendParcel;
