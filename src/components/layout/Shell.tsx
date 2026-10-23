import { Nav } from "@/components/navigation/Nav";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-bengals-near-black text-white safe-x">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-6 pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] md:pb-10">
        {children}
      </main>
      <footer className="border-t border-bengals-charcoal-light py-6 text-center text-xs text-bengals-gray safe-bottom">
        <p>WHO DEY LIVE · Fan-created experience · Not affiliated with the NFL or Cincinnati Bengals</p>
        <p className="mt-1">Data may be delayed. Who Dey!</p>
      </footer>
    </div>
  );
}
