import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-chalk/10 bg-terrace">
      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-floodlight text-xl tracking-tight">LASU</span>
          <span className="font-display text-chalk text-xl tracking-tight">STADIUM</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/" className="text-chalk/80 hover:text-chalk transition-colors">
            Fixtures
          </Link>
          <Link
            href="/my-tickets"
            className="text-chalk/80 hover:text-chalk transition-colors"
          >
            My tickets
          </Link>
        </nav>
      </div>
    </header>
  );
}
