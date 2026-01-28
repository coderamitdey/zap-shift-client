import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymetSuccess = () => {
  const [searchParams] = useSearchParams();
  const [transactionId, setTransactionId] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <div>
      <h2 className="text-4xl">Payment Successfull</h2>
      <p>Your TransactionId: {paymentInfo.transactionId}</p>
      <p>Your Parcel TrackingId: {paymentInfo.trackingId}</p>
    </div>
  );
};

export default PaymetSuccess;
