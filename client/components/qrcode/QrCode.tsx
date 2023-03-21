import axios from "axios";
import React, { useEffect, useRef } from "react";

export default function QrCode() {
  const svgContainer = useRef<any>(null);
  const isExecuted = useRef(false);

  async function getCode() {
    const req = await axios.get("/api/register/generate-qr-code");

    const data = req.data;

    svgContainer.current.innerHTML = data.svg;
  }

  useEffect(() => {
    if (!isExecuted.current) {
      getCode();
      isExecuted.current = true;
    }
  }, []);

  return (
    <div>
      <section className=" text-center  shadow-2xl z-40 bg-white flex items-center flex-col p-2">
        <h1 className="text-blue-500 font-bold ">QR code</h1>
        <div ref={svgContainer} className=" w-40 h-40"></div>
      </section>
    </div>
  );
}
