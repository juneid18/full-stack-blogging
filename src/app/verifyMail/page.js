'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import style from './page.module.css';

export default function VerifyMail() {
    const [token, setToken] = useState(""); // State to store token
    const [verified, setVerified] = useState(false); // State to store if user is verified
    const [error, setError] = useState(false); // State for error handling
    const [errorMessage, setErrorMessage] = useState(""); // Detailed error message

    // Fetching token from URL
    useEffect(() => {
        const URLToken = window.location.search.split("=")[1];
        setToken(URLToken || "");
    }, []);

    // Verify user email
    const VerifyUserEmail = async () => {
        if (!token) {
            setError(true);
            setErrorMessage("Invalid token.");
            return;
        }
        try {
            const response = await axios.post('/api/users/verifymail', { token });
            console.log(response);

            if (response.data.success) { // Assuming your API returns { success: true } on success
                setVerified(true);
                setError(false);
            } else {
                setError(true);
                setErrorMessage("Verification failed. Link may be expired.");
            }
        } catch (error) {
            setError(true);
            setErrorMessage("An error occurred during verification. Please try again.");
            console.log(error);
        }
    };

    // Calling VerifyUserEmail function if token is available
    useEffect(() => {
        if (token) {
            VerifyUserEmail();
        } else {
            setError(true);
            setErrorMessage("No token provided.");
        }
    }, [token]);

    return (
        <>
        <div className={style.maincontainer}>
            <div className={style.container}>
                <div className={style.content_box}>
                    <h1 className={style.title}>VerifyMail</h1>
                    <p className={style.token}>{token ? `Token: ${token}` : "No token available"}</p>

                    {verified && (
                        <Link href="/login" className={style.login_btn}>
                            Your email is verified, click here to login
                        </Link>
                    )}
                    {error && (
                        <h2 className={style.error}>{errorMessage}</h2>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}
