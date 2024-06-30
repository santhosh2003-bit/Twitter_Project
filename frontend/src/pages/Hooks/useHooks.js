import { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import auth from "../../firebase.init";

const useHooks = () => {
  const [loggedUser, setLoggedUser] = useState({});
  // const [user] = useAuthState(auth);
  // const email = user?.email;
  // console.log(user);
  const email = JSON.parse(localStorage.getItem("user")).email;
  // console.log(email);
  useEffect(() => {
    fetch(
      "https://twitter-project-1-zzal.onrender.com/api/auth/get-user-data",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.user);
        setLoggedUser(data.user);
      });
  }, [email]);
  return [loggedUser, setLoggedUser];
};

export default useHooks;
