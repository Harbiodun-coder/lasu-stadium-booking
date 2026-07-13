"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print mt-6 text-sm border border-chalk/20 rounded px-4 py-2 text-chalk/80 hover:text-chalk hover:border-chalk/40 transition-colors"
    >
      Print ticket
    </button>
  );
}
