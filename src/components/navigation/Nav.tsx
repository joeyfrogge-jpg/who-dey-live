"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Users, Archive, Settings, Zap } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { APP_NAME } from "@/lib/constants";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/schedule", label: "Schedule", icon: Calendar },
  { href: "/players", label: "Players", icon: Users },
  { href: "/archive", label: "Archive", icon: Archive },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop top bar */}
      <header className="hidden md:block sticky top-0 z-50 border-b border-bengals-charcoal-light bg-bengals-near-black/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-bengals-orange font-display text-lg font-black text-black shadow-orange-glow group-hover:scale-105 transition-transform">
              WD
            </div>
            <div>
              <span className="font-display text-xl tracking-tight text-white">
                WHO DEY <span className="text-bengals-orange">LIVE</span>
              </span>
            </div>
          </Link>
          <nav className="flex items-center gap-1">
            {links.map(({ href, label, icon: Icon }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-bengals-orange/15 text-bengals-orange"
                      : "text-bengals-gray-light hover:bg-bengals-charcoal hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-bengals-charcoal-light bg-bengals-near-black/95 backdrop-blur-md safe-bottom">
        <div className="flex justify-around py-2">
          {links.map(({ href, label, icon: Icon }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium",
                  active ? "text-bengals-orange" : "text-bengals-gray"
                )}
              >
                <Icon className={cn("h-5 w-5", active && "drop-shadow-[0_0_6px_rgba(251,79,20,0.6)]")} />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
