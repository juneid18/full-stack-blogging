'use client'

import { useEffect, useState } from "react"
import axios from "axios";
import Link from "next/link";
import style from './page.module.css'

export default function VerifyMail() {
    const [token, setToken] = useState(""); // state to store token
    const [verified, setVerified] = useState(false); // usestate to store user is verified ro not
    const [error, setError] = useState(false); // created a error state

    // created a VerifyUserEmail function to verify user email
    const VerifyUserEmail = async () => {
        try {
        const responce = await axios.post('../api/users/verifymail', {token});
        console.log(responce);
        
        if (responce) {
            setVerified(true); 
            setError(false) 
        }else{
            setError(true)
        }
        } catch (error) {
            setError(true)
            console.log(error);
        }
    }
    // fetching token from URL
    useEffect(() => {
        const URLToken = window.location.search.split("=")[1]
        setToken(URLToken || "");
    }, [])
    // calling VerifyUserEmail function if token is avalible
    useEffect(() => {
        if (token.length > 0) {
            VerifyUserEmail()
        }else{
            setError(true)
        }
    }, [token])
  return (
    <>
    <div className={style.maincontainer}>
    <div className={style.container}>
        <div className={style.content_box}>
            <h1 className={style.title}>VerifyMail</h1>
            <p className={style.token}>{token ? `${token}` : "No token"}</p>
            {verified && (
            <Link href="/login" className={style.login_btn}>Verify</Link>
            )}
            {error && (
                <h2 className={style.error}>Link Expire</h2>
            )}
        </div>
    </div>
    </div>
    </>

  )
}

