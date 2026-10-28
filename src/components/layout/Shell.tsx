import { Nav } from "@/components/navigation/Nav";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-bengals-near-black text-white safe-x overscroll-none">
      {/* Top safe area for notch / Dynamic Island in standalone mode */}
      <div className="safe-top" aria-hidden="true" />
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-5 pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-10">
        {children}
      </main>
      <footer className="border-t border-bengals-charcoal-light py-5 text-center text-xs text-bengals-gray safe-bottom">
        <p>
          WHO DEY LIVE · Fan-created experience · Not affiliated with the NFL or
          Cincinnati Bengals
        </p>
        <p className="mt-1">Data may be delayed. Who Dey!</p>
      </footer>
    </div>
  );
}
