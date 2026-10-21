import { Nav } from "@/components/navigation/Nav";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bengals-near-black text-white">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-6 pb-24 md:pb-10">{children}</main>
      <footer className="border-t border-bengals-charcoal-light py-6 text-center text-xs text-bengals-gray">
        <p>
          {`WHO DEY LIVE`} · Fan-created experience · Not affiliated with the NFL or Cincinnati Bengals
        </p>
        <p className="mt-1">Data may be delayed. Who Dey!</p>
      </footer>
    </div>
  );
}
