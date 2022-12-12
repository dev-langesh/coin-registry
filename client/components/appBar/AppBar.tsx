import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

export default function AppBar() {
  return (
    <div className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center relative">
      <span className="text-2xl font-bold">Coin Registery</span>

      <div className="bg-white rounded-full p-2 absolute -bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-6">
        <Image
          alt="Img not found"
          width={100}
          height={100}
          src="/images/coin-logo.png"
          className="rounded-full "
        />
      </div>

      <section className="space-x-6 text-xl">
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
