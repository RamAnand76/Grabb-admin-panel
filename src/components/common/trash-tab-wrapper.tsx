"use client";

import { cn } from "@/lib/utils";

interface TrashTabWrapperProps {
  activeTab: "active" | "trash";
  onTabChange: (tab: "active" | "trash") => void;
  activeCount?: number;
  trashCount?: number;
  children: React.ReactNode;
}

export function TrashTabWrapper({
  activeTab,
  onTabChange,
  activeCount,
  trashCount,
  children,
}: TrashTabWrapperProps) {
  return (
    <div>
      <div className="flex border-b border-stroke dark:border-stroke-dark mb-6">
        <button
          onClick={() => onTabChange("active")}
          className={cn(
            "flex items-center gap-2 border-b-2 py-3 px-5 text-sm font-medium transition-colors",
            activeTab === "active"
              ? "border-primary text-primary dark:text-white"
              : "border-transparent text-dark-4 hover:text-dark dark:text-dark-6 dark:hover:text-white"
          )}
        >
          Active Items
          {typeof activeCount === "number" && (
            <span className="rounded-full bg-gray-2 px-2 py-0.5 text-xs text-dark dark:bg-dark-2 dark:text-white">
              {activeCount}
            </span>
          )}
        </button>

        <button
          onClick={() => onTabChange("trash")}
          className={cn(
            "flex items-center gap-2 border-b-2 py-3 px-5 text-sm font-medium transition-colors",
            activeTab === "trash"
              ? "border-rose-500 text-rose-500"
              : "border-transparent text-dark-4 hover:text-rose-500 dark:text-dark-6"
          )}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
          Trash / Archived
          {typeof trashCount === "number" && (
            <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              {trashCount}
            </span>
          )}
        </button>
      </div>

      {children}
    </div>
  );
}
