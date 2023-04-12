import React, { useEffect, useState } from "react";
import "./Authentification.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAuth } from "../../Redux/authSlice";

function Authentification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = localStorage.getItem("token");

  const [registerUser, setRegisterUser] = useState({
    email: "",
    password: "",
  });
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const apiResponse = await axios.post(
        "http://localhost:3200/register",
        registerUser
      );
      if (apiResponse.status === 200) {
        toast("User Registered ✅");
      } else {
        console.log(apiResponse);
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //-------------------- LogIn-----------------------------

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const apiResponse = await axios.post(
        "http://localhost:3200/login",
        loginUser
      );

      if (apiResponse.status === 200) {
       await dispatch(fetchAuth(apiResponse.data))
       localStorage.setItem("token",apiResponse.data.token)
        navigate("/dashboard")
      } else {
        console.log(apiResponse);
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth) {
      navigate("/dashboard");
    }
   
  }, [auth,navigate]);

  return (
    <div className="authBody">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form className="">
            <label for="chk" aria-hidden="true">
              Register
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required=""
              onChange={(e) =>
                setRegisterUser({ ...registerUser, email: e.target.value })
              }
            />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              onChange={(e) =>
                setRegisterUser({ ...registerUser, password: e.target.value })
              }
            />
            <button type="" onClick={(e) => handleRegister(e)}>
              Sign up
            </button>
          </form>
        </div>

        <div className="login">
          <form className="">
            <label for="chk" aria-hidden="true">
              Login
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required=""
              onChange={(e) =>
                setLoginUser({ ...loginUser, email: e.target.value })
              }
            />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              onChange={(e) =>
                setLoginUser({ ...loginUser, password: e.target.value })
              }
            />
            <button onClick={(e) => handleLogin(e)}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Authentification;
