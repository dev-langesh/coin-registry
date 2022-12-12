import React, { useEffect, useState } from "react";

export default function Button({
  text,
  type,
}: {
  text: String;
  type: "outlined" | "contained";
}) {
  const [style, setStyle] = useState(
    "bg-white p-1 text-blue-500 hover:bg-blue-500 hover:text-white"
  );

  useEffect(() => {
    if (type == "outlined") {
      setStyle("border-white p-1 hover:bg-white hover:text-blue-500");
    }
  }, [type]);
  return (
    <span className={`border ${style} transition-all duration-300`}>
      {text}
    </span>
  );
}
