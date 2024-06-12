import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import moment from "moment";
import useRole from "../../Hooks/useRole";

const CheckOutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { role } = useRole();

  const totalCost = 5;
  useEffect(() => {
    if (totalCost > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalCost })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalCost]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const payment = {
          email: user.email,
          price: totalCost,
          transactionId: paymentIntent.id,
          date: moment().format("MM/DD/YYYY"),
          status: "pending",
        };
        const res = await axiosSecure.post("/payments", payment);
        if (res.data?.paymentResult?.insertedId) {
          //   change status
          axiosSecure.get(`/users/${user.email}`).then((res) => {
            if (role == "user") {
              const newRole = "pro-user";
              axiosSecure
                .put(`/users/targetUser/${res.data._id}`, { newRole })
                .then((response) => {
                  if (response.data.modifiedCount > 0) {
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Payment successful.",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                });
            }
          });

          navigate("/");
        }
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="mt-4 btn btn-sm btn-primary"
          type="submit"
          disabled={
            !stripe ||
            !clientSecret ||
            role == "surveyor" ||
            role == "pro-user" ||
            role == "admin"
          }
        >
          Pay
        </button>
        {(role == "surveyor" || role == "pro-user" || role == "admin") && (
          <p className="text-red-600 mt-2">
            You are already {role}.Only user can pay.
          </p>
        )}
        <p className="text-red-600">{error}</p>
        {transactionId && (
          <p className="text-green-600">
            Your transaction Id : {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckOutForm;
