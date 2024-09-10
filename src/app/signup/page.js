"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./page.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupPage() {
  // created a router to navigate user
  const router = useRouter();

  // created a state to store user data
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  // created a state to display button if fields are empty
  const [ButtonDisable, setButtonDisable] = useState(false);
  // display this state on loding proccess
  const [Loading, setLoading] = useState(false);

  // created a function to signup the user by hitting /api
  const OnSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const responce = await axios.post("../api/users/signup", user);
      console.log("SignUp Success ", responce.data);
      toast.success('Registration Successfull');
      toast.info("Verification mail is send!")
    } catch (error) {
      console.log("signUp Error");
      toast.error(error.message);
    }
  };
  // validation
  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  return (
    <>
      <div className={style.main_container}>
        <div className={style.login_wrapper}>
          <div className={style.login_container}>
            <h1 className={style.heading_title}>
              {Loading ? "Proccesing" : "Signup Page"}
            </h1>
            <form>
              <label id={style.label}>Username</label>
              <input
                id={style.username}
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                type="text"
              />
              <label id={style.label}>Email</label>
              <input
                id={style.email}
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="text"
              />
              <label id={style.label}>Password</label>
              <input
                id={style.password}
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
              />
              <Link style={{color:"black", textDecoration: 'none'}} href="../login">already have an account</Link>

              <button
                id={style.submit_button}
                onClick={OnSignUp}              
              >
                {ButtonDisable ? "no Signup" : "Signup"}
              </button>
            </form>
          </div>
          <ToastContainer />
        </div>
        
      </div>
    </>
  );
}
