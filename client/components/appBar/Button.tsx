import React, { useEffect, useState } from "react";

export default function Button({
  text,
  type,
}: {
  text: String;
  type: "outlined" | "contained";
}) {
  const [style, setStyle] = useState("bg-white p-2 text-blue-500");

  useEffect(() => {
    if (type == "outlined") {
      setStyle("border border-white p-2 hover:bg-white hover:text-blue-500");
    }
  }, [type]);
  return <span className={`${style} transition-all duration-300`}>{text}</span>;
}
