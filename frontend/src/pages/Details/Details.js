import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";

const Details = () => {
  const [data, setData] = useState({});
  const [toggleIndex, setToggleIndex] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }
    fetch("http://localhost:5000/api/auth/access-logs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [token]);

  const handle_Ip_Address = (index) => {
    setToggleIndex(toggleIndex === index ? null : index);
  };

  return (
    <div
      className="flex flex-col items-center p-7 pt-8 w-full bg-black text-white min-h-screen "
      style={{ scrollbarWidth: "none" }}
    >
      <h1 className="text-2xl font-bold mb-3">Your Details</h1>
      <HomeIcon
        style={{ fontSize: "3rem" }}
        className="text-white absolute left-[8%] cursor-pointer hover:bg-slate-300 rounded-full"
        onClick={() => (window.location.href = "/")}
      />
      <div className="mt-6">
        <div className="text-center">
          <h1 className="text-xl font-bold">
            Name :{" "}
            <span className="text-green-500">
              {data.user?.name || "Loading..."}
            </span>
          </h1>
          <h2 className="text-xl font-bold">
            Email :{" "}
            <span className="text-green-500">
              {data.user?.email || "Loading"}
            </span>{" "}
          </h2>
        </div>

        <div className="border border-white w-max p-3 rounded-lg">
          <h1 className="text-xl font-bold text-start w-full border-b border-white">
            Access Timings :-
          </h1>
          <div className="flex space-x-3">
            <p className="text-xl font-bold">
              Start :{" "}
              <span className="text-green-600">
                {data.user?.accessControl?.timeBased?.start || "Loading..."} AM
              </span>{" "}
            </p>
            <p className="text-xl font-bold">
              End :{" "}
              <span className="text-red-600">
                {data.user?.accessControl?.timeBased?.end || "Loading..."} PM
              </span>{" "}
            </p>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-medium">Login History</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-5 h-full ">
            {data.user?.loginHistory?.map((data, index) => (
              <div key={index} className="shadow-2xl border p-3 rounded-2xl">
                <p className="text-start font-bold flex justify-between">
                  Browser Name :{" "}
                  <span className="font-normal ">
                    {data.browser || "Loading..."}
                  </span>
                </p>
                <p className="text-start font-bold flex justify-between">
                  Time Stamp :{" "}
                  <span className="font-normal ">
                    {data.time || "Loading..."}
                  </span>
                </p>
                <p className="text-start font-bold flex justify-between">
                  Device Name :{" "}
                  <span className="font-normal ">
                    {data.device || "Loading..."}
                  </span>
                </p>
                <p className="text-start font-bold flex justify-between">
                  Operating System Name :{" "}
                  <span className="font-normal ">
                    {data.os || "Loading..."}
                  </span>
                </p>
                <p className="text-start font-bold flex justify-between">
                  Date :{" "}
                  <span className="font-normal ">
                    {data.dayOfMonth || "Loading..."} /{" "}
                    {data.monthOfYear || "Loading"} / {data.day}
                  </span>
                </p>
                <button
                  className="bg-white text-black pt-1 pb-1 pl-2 pr-2 font-bold rounded"
                  onClick={() => handle_Ip_Address(index)}
                >
                  {toggleIndex === index ? "Hide Ip" : "Show Ip"}
                </button>
                {toggleIndex === index && (
                  <p className="text-start font-bold flex justify-between">
                    Ip Address :{" "}
                    <span className="font-normal ">
                      {data.ipAddress || "Loading..."}
                    </span>
                  </p>
                )}
              </div>
            )) || "Loading ..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
