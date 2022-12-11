import React from "react";

export default function TableHeader({ title }: { title: String }) {
  return (
    <div className="py-4 flex justify-between items-center">
      <span className="text-2xl font-semibold text-blue-500">{title}</span>
      <button className="bg-blue-500 rounded p-2 font-bold text-xl text-white hover:bg-blue-600 tracking-wide  transition-all duration-200">
        Filter
      </button>
    </div>
  );
}
