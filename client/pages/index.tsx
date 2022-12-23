import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import RegisterForm from "../components/register/RegisterForm";

export default function Home() {
  const isExecuted = useRef(false);
  const svgContainer = useRef<any>(null);
  const [auth, setAuth] = useState<boolean>(false);
  const [pass, setPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function getCode() {
    const req = await axios.get("/api/register/generate-qr-code");

    const data = req.data;

    svgContainer.current.innerHTML = data.svg;
  }

  useEffect(() => {
    const p = window.localStorage.getItem("password");

    if (p === "admin@coin") {
      setAuth(true);
    }
  }, []);

  useEffect(() => {
    if (!isExecuted.current) {
      if (auth) {
        setLoading(true);
        getCode();
        setLoading(false);
        setInterval(() => {
          setLoading(true);
          getCode();
          setLoading(false);
        }, 1000 * 60 * 60);
        isExecuted.current = true;
      }
    }
  }, [auth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  const verifyPassword = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (pass === "admin@coin") {
      window.localStorage.setItem("password", pass);

      setAuth(true);
    }
  };

  return (
    <div className="">
      <Head>
        <title>Coin Registery</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen flex items-center justify-center mt-20 space-x-16">
        {/* qrcode  */}
        {auth ? (
          <>
            <section className=" w-52 text-center fixed top-1/2 -translate-y-1/2 right-16 shadow-2xl z-40 bg-white flex items-center flex-col p-2">
              <h1 className="text-blue-500 font-bold ">QR code</h1>
              <div ref={svgContainer} className=" w-40 h-40">
                {loading && <CircularProgress />}
              </div>
              <p className="break-words">
                If you registered before no need to enter name, dep, year
              </p>
            </section>

            <RegisterForm />
          </>
        ) : (
          <section className="p-4 shadow-lg mb-6">
            <form className="space-x-3" onSubmit={verifyPassword}>
              <input
                onChange={handleChange}
                className="border py-1 px-2"
                placeholder="Password"
                type="password"
              />

              <Button variant="outlined" size="small">
                Submit
              </Button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}
