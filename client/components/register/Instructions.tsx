import React from "react";

export default function Instructions({
  text,
  title,
}: {
  text: String;
  title: String;
}) {
  return (
    <div className="shadow-xl p-8 space-y-4 w-80">
      <h1 className="text-center text-2xl text-blue-500 font-bold">{title}</h1>
      <p className="text-center">{text}</p>
    </div>
  );
}
