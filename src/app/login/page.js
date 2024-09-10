"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import style from './page.module.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const router = useRouter();
  // create a state to store the user data
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  // Create a state of boolen to display the button if fields complete
  const [ButtonDisable, setButtonDisable] = useState(false);
  // create a state to display an loding message
  const [Loading, setLoading] = useState(false);

  // Login function to send the user state data to server
  const OnLogIn = async () => {
    try {
      setLoading(true);
      const responce = await axios.post("../api/users/login", user);
      console.log("Login Success ", responce.data);
      toast.success("Login success");
      router.push("/");
    } catch (error) {
      console.log("Login Error");
      toast.error(error.message);
    }
  };
  // checking the validations
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
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
          <h1 className={style.heading_title}>{Loading ? "Proccesing" : "Login Page"}</h1>
          <div>
            <label id={style.label} >Email</label>
            <input
              id={style.email}
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="text"
            />
            <label id={style.label} >Password</label>
            <input
              id={style.password}
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
            />
            <Link href="../signup">Dont have an account</Link>

            <button id={style.submit_button} onClick={OnLogIn}>
              {ButtonDisable ? "no Login" : "Login"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
      
    </>
  );
}
