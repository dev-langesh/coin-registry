import React, { useEffect, useRef, useState } from "react";
import RegisterForm from "../../components/register/RegisterForm";
import { useRouter } from "next/router";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const isExecuted = useRef(false);

  async function verifyToken() {
    setLoading(true);
    const token = router.query.token;

    if (token) {
      const req = await axios.get(`/api/register/verify/${token}`);

      const data = req.data;

      setLoading(false);

      if (data.error) {
        setError(true);
      }
    }
  }

  useEffect(() => {
    if (!isExecuted.current) {
      verifyToken();

      if (router.query.token) {
        isExecuted.current = true;
      }
    }
  }, [router.query]);

  return (
    <main className="w-screen flex items-center justify-center mt-20 space-x-16">
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <div>Invalid URL</div>
      ) : (
        <RegisterForm hideQrcode={true} />
      )}
    </main>
  );
}
