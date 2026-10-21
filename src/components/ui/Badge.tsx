import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "orange" | "home" | "away" | "live" | "final" | "bye" | "alert";
  className?: string;
}

export function Badge({ children, variant = "orange", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded",
        variant === "orange" && "bg-bengals-orange text-black",
        variant === "home" && "bg-bengals-orange text-black shadow-orange-glow",
        variant === "away" && "bg-bengals-charcoal-light text-bengals-gray-light border border-bengals-charcoal-light",
        variant === "live" && "bg-bengals-red text-white animate-pulse",
        variant === "final" && "bg-bengals-charcoal-light text-bengals-gray-light",
        variant === "bye" && "bg-bengals-charcoal text-bengals-gray border border-dashed border-bengals-gray",
        variant === "alert" && "bg-bengals-red/20 text-bengals-red border border-bengals-red/40",
        className
      )}
    >
      {children}
    </span>
  );
}
