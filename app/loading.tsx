"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Loading = () => {

    const pathname = usePathname();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 700); // loader kitni der dikhana hai (ms me)

      return () => clearTimeout(timer);
    }, [pathname]); // jab bhi path badlega

    if (!loading) return null;

  return (
    <div>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
        <div className="text-white text-xl ml-4">Loading ...</div>
      </div>
    </div>
  );
};

export default Loading;
