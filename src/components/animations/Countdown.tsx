"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatCountdown } from "@/lib/time/eastern";
import { cn } from "@/lib/utils/cn";

interface CountdownProps {
  target: string | Date;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Countdown({ target, className, size = "md" }: CountdownProps) {
  const [parts, setParts] = useState(() => formatCountdown(target));

  useEffect(() => {
    const id = setInterval(() => setParts(formatCountdown(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (parts.isPast) {
    return (
      <div className={cn("text-center", className)}>
        <span className="font-display text-bengals-orange tracking-widest">KICKOFF</span>
      </div>
    );
  }

  const box = cn(
    "flex flex-col items-center justify-center rounded bg-bengals-charcoal border border-bengals-charcoal-light",
    size === "sm" && "w-12 h-12",
    size === "md" && "w-16 h-16",
    size === "lg" && "w-20 h-20 md:w-24 md:h-24"
  );
  const num = cn(
    "font-score font-bold tabular-nums text-white",
    size === "sm" && "text-lg",
    size === "md" && "text-2xl",
    size === "lg" && "text-3xl md:text-4xl"
  );
  const label = "text-[10px] uppercase tracking-wider text-bengals-gray";

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {parts.days > 0 && (
        <>
          <motion.div key={`d-${parts.days}`} className={box} animate={{ scale: [1.05, 1] }} transition={{ duration: 0.3 }}>
            <span className={num}>{parts.days}</span>
            <span className={label}>Days</span>
          </motion.div>
          <span className="text-bengals-orange font-bold">:</span>
        </>
      )}
      <motion.div key={`h-${parts.hours}`} className={box} animate={{ scale: [1.05, 1] }} transition={{ duration: 0.3 }}>
        <span className={num}>{String(parts.hours).padStart(2, "0")}</span>
        <span className={label}>Hrs</span>
      </motion.div>
      <span className="text-bengals-orange font-bold">:</span>
      <motion.div key={`m-${parts.minutes}`} className={box} animate={{ scale: [1.05, 1] }} transition={{ duration: 0.3 }}>
        <span className={num}>{String(parts.minutes).padStart(2, "0")}</span>
        <span className={label}>Min</span>
      </motion.div>
      {parts.days === 0 && (
        <>
          <span className="text-bengals-orange font-bold">:</span>
          <motion.div key={`s-${parts.seconds}`} className={box} animate={{ scale: [1.05, 1] }} transition={{ duration: 0.2 }}>
            <span className={num}>{String(parts.seconds).padStart(2, "0")}</span>
            <span className={label}>Sec</span>
          </motion.div>
        </>
      )}
    </div>
  );
}
