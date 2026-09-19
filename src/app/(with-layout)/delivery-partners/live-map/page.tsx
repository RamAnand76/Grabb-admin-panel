"use client";

import { useState } from "react";
import { DynamicMap } from "@/components/Map";

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
        <DynamicMap type="live" />
      </div>
    </div>
  );
}
