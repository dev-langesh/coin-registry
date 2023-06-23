import React from "react";
import Link from "next/link";
import Button from "./Button";
import { useRouter } from "next/router";

export default function AppBar() {
  const route = useRouter();

  const path = route.route;

  if (path !== "/register/[token]")
    return (
      <div className="bg-blue-500 text-white px-6 py-2 md:py-3 flex justify-between items-center relative">
        <span className="text-xl font-bold ">Coin Registery</span>

        <div className="bg-white rounded-full p-1 hidden md:block absolute -bottom-1/2 left-1/2 transform md:-translate-x-1/2 md:translate-y-6 ">
          <img
            src="/images/coin-logo.png"
            className="rounded-full w-10 md:w-20"
          />
        </div>

        <section className="space-x-6">
          <Link href="/">
            <Button text="Register" type="outlined" />
          </Link>
          <Link href="/report">
            <Button text="Report" type="contained" />
          </Link>
          {/* <Link href="/events">
          <Button text="Events" type="outlined" />
        </Link> */}
        </section>
      </div>
    );

  return <></>;
}
