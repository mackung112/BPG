import React, { useEffect } from 'react';

export default function Oop2_1() {
  // Use a full-screen iframe to load the standalone HTML simulation exactly as provided
  return (
    <div className="w-full h-screen overflow-hidden bg-gray-50 m-0 p-0">
      <iframe 
        src="/lessons/oop/2.1.html" 
        title="OOP Simulator"
        className="w-full h-full border-0"
        allowFullScreen
      />
    </div>
  );
}
