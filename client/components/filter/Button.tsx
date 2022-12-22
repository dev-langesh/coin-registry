import React from "react";

export default function Button({
  text,
  loading,
  clickHandler,
}: {
  text: String;
  loading: Boolean;
  clickHandler?: any;
  type: "button" | "submit";
}) {
  return (
    <button
      type="button"
      onClick={clickHandler}
      className="bg-blue-500 p-2 font-bold  text-white hover:bg-blue-600 tracking-wide hover:tracking-widest transition-all duration-200"
    >
      {loading ? "Loading..." : text}
    </button>
  );
}
