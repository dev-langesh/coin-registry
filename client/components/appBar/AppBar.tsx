import React from "react";
import Link from "next/link";
import Button from "./Button";

export default function AppBar() {
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
        <Link href="/records">
          <Button text="Records" type="contained" />
        </Link>
        {/* <Link href="/events">
          <Button text="Events" type="outlined" />
        </Link> */}
      </section>
    </div>
  );
}
