"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

export function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    // Set initial time
    const updateTime = () => {
      try {
        // Jakarta time zone: Asia/Jakarta
        const now = new Date();
        const formatted = formatInTimeZone(now, 'Asia/Jakarta', "h:mm a");
        setTime(`Jakarta, ${formatted}`);
      } catch (e) {
        // Fallback if date-fns-tz is not available or throws
        setTime("Jakarta, 2:30 AM");
      }
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Hydration mismatch prevention
  if (!time) {
    return <span className="font-medium text-[18px]">Jakarta, ...</span>;
  }

  return (
    <span className="font-medium text-[18px]">
      {time}
    </span>
  );
}
