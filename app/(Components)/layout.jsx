"use client";

import Sidebar from "./Sidebar";

export default function Componentsl({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar fixed width */}
      <Sidebar />

      {/* Content area */}
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}