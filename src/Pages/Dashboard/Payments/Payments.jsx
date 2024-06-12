import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Payments = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: payments = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });
  let total;
  if (!isLoading) {
    total = payments.reduce((prev, item) => prev + item.price, 0);
  }
  return (
    <div>
      <div className="text-end text-lg italic">
        <p>
          Total payments: $<span className="font-bold">{total}</span>
        </p>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-20 mt-10 border rounded-lg">
          <span className="text-center loading loading-spinner loading-lg"></span>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center w-full h-20 mt-10 border rounded-lg">
          Something went wrong.
        </div>
      ) : payments.length == 0 ? (
        <div className="flex items-center justify-center w-full h-20 mt-10 border rounded-lg">
          No survey found of this category.
        </div>
      ) : (
        <div className="h-auto mt-5 w-full overflow-x-auto overflow-y-auto rounded-lg">
          <table className="table w-full">
            {/* head */}
            <thead className="bg-[#007BFF] text-white font-bold text-xl rounded-lg">
              <tr className="w-full">
                <th>#</th>
                <th>User Email</th>
                <th>Date</th>
                <th>Transaction Id</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {[...payments].reverse().map((payment, index) => (
                <tr className="">
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="font-bold">{payment.email}</div>
                    </div>
                  </td>
                  <td>
                    <p>{payment.date}</p>
                  </td>
                  <td>{payment.transactionId}</td>
                  <td>{payment.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Payments;
