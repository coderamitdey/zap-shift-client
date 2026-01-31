import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FcAcceptDatabase } from "react-icons/fc";
import { CiSquareRemove } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = (status, rider) => {
    const updateInfo = { status: status, email: rider.riderEmail };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider status is set to ${status}`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  const handleApproval = (rider) => {
    updateRiderStatus("approved", rider);
  };

  const handleRejection = (rider) => {
    updateRiderStatus("rejected", rider);
  };

  return (
    <div>
      <h2 className="font-bold text-2xl">
        Riders Pending for Approval: {riders.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.riderName}</td>
                <td>{rider.riderEmail}</td>
                <td>{rider.yourDistrict}</td>

                <td>
                  <p
                    className={`${rider.status === "approved" ? "text-green-600 font-bold" : "text-red-500"} `}
                  >
                    {rider.status}
                  </p>
                </td>
                <td>
                  <button
                    onClick={() => handleApproval(rider)}
                    className="btn"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleApproval(rider)}
                    className="btn ml-2 btn-accent"
                  >
                    <FcAcceptDatabase />
                  </button>
                  <button
                    onClick={() => handleRejection(rider)}
                    className="btn btn-secondary mx-2"
                  >
                    <CiSquareRemove />
                  </button>
                  <button className="btn btn-warning">
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
