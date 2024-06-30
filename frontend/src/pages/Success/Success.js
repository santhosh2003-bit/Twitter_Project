import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    handleSuccess();
  }, [navigate, token]);

  const handleSuccess = async () => {
    try {
      const response = await fetch(
        "https://twitter-project-1-zzal.onrender.com/api/payments/getsession",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      // console.log(data);

      if (data.message === "success") {
        setMessage("Success");
      } else {
        alert(data.message);
        navigate("/plans");
      }
    } catch (error) {
      alert("Error: " + error.message);
      navigate("/plans");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border p-4 flex flex-col justify-center min-w-52 shadow-2xl rounded">
        <h1 className="text-3xl font-bold text-center mb-7">
          {message || "Loading..."}
        </h1>
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 text-2xl font-bold text-white pt-1 pb-1 pl-2 pr-2 rounded-xl text-center mt-9"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Success;
