import React, { useEffect, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const PlanList = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const email = JSON.parse(localStorage.getItem("user")).email;
  // console.log(email);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // console.log(plans);
  useEffect(() => {
    fetch("https://twitter-project-1-zzal.onrender.com/api/plans/plans", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.plan) {
          setPlans(data.plan);
        }
        if (data.error) {
          console.log(data.error);
        }
      });
  }, []);

  const handleSelectPlan = async (planId) => {
    const response = await fetch(
      "https://twitter-project-1-zzal.onrender.com/api/payments/subscribe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ planId, email }),
      }
    );
    const session = await response.json();
    // console.log(session);
    window.location.href = session.session_url;
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center plans-background p-4 sm:p-8 md:p-12 lg:p-16 bg-slate-800">
      <div className="flex flex-col items-center mb-8 relative w-full">
        <ArrowBackIcon
          className="absolute top-4 left-4 text-white cursor-pointer"
          style={{ fontSize: "40px" }}
          onClick={() => {
            navigate("/");
          }}
        />
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4">
          Subscription Plans
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className={`backdrop-blur-lg p-5 rounded-2xl ${
              selectedPlan && selectedPlan !== plan._id ? "blur-sm" : ""
            }`}
          >
            <h2 className="text-white text-xl sm:text-2xl text-center font-bold">
              {plan.name}
            </h2>
            <p className="text-white font-bold text-lg sm:text-xl">
              Duration: <span className="text-yellow-500">{plan.duration}</span>
            </p>
            <p className="text-white font-bold text-lg sm:text-xl">
              Price: <span className="text-green-600">${plan.price}</span>
            </p>
            <div>
              <p className="text-lg sm:text-xl text-white font-bold">
                Features:
              </p>
              <ul className="list-disc list-inside text-white space-y-2">
                {plan.features.map((f, index) => (
                  <li className="text-lime-500 text-lg sm:text-xl" key={index}>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <h1 className="text-lg sm:text-xl text-white font-bold mt-4">
              Description
            </h1>
            <div className="text-white text-sm sm:text-base">
              <p>
                1. Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book
              </p>
              <p>
                2. Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book
              </p>
              <p>
                3. Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book
              </p>
            </div>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold w-full"
              onClick={() => handleSelectPlan(plan._id)}
            >
              Subscribe
              {/* {selectedPlan === plan._id ? "Hide" : "Subscribe"} */}
            </button>
            {/* {selectedPlan === plan._id && <CheckoutForm planId={plan._id} />} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanList;
