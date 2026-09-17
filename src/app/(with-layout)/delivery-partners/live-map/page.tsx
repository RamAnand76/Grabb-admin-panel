"use client";

import { useState } from "react";

export default function LiveMapPage() {
  const [activeTab, setActiveTab] = useState<"all" | "online" | "busy" | "offline">("all");

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Live Fleet Map</h1>
          <p className="text-sm text-dark-4 dark:text-dark-6">
            Real-time tracking of active delivery partners and active orders.
          </p>
        </div>
        
        {/* Status Chips */}
        <div className="flex items-center gap-2 bg-white dark:bg-gray-dark p-1 rounded-lg border border-stroke dark:border-stroke-dark shadow-1">
          {["all", "online", "busy", "offline"].map((st) => (
            <button
              key={st}
              onClick={() => setActiveTab(st as any)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                activeTab === st
                  ? "bg-primary text-white"
                  : "bg-transparent text-dark-4 hover:bg-gray-2 dark:text-dark-6 dark:hover:bg-dark-2"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Map Placeholder */}
      <div className="flex-1 w-full rounded-2xl bg-gray-2 dark:bg-dark-2 border border-stroke dark:border-stroke-dark overflow-hidden flex items-center justify-center relative">
        <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAyMEg0ME0yMCAwVjQwIiBzdHJva2U9IiM5Q0EyQTgiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')",
            backgroundSize: "40px 40px"
        }} />
        <div className="z-10 text-center space-y-3 p-6 bg-white dark:bg-gray-dark rounded-xl shadow-lg max-w-md">
            <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <h3 className="font-bold text-dark dark:text-white">Live WebSocket Connection Ready</h3>
            <p className="text-sm text-dark-4 dark:text-dark-6">This fullscreen container is designed to render thousands of moving driver markers in real-time via WebSockets over Mapbox GL.</p>
        </div>
      </div>
    </div>
  );
}
