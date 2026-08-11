"use client";

import { cn } from "@/lib/utils";

type StatusType =
  | "placed"
  | "confirmed"
  | "packed"
  | "out-for-delivery"
  | "delivered"
  | "cancelled"
  | "returned"
  | "paid"
  | "pending"
  | "failed"
  | "refunded"
  | "active"
  | "inactive"
  | "archived"
  | "online"
  | "busy"
  | "offline"
  | "approved"
  | "rejected"
  | "open"
  | "in-progress"
  | "resolved";

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  placed: "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-[#0f2034] dark:text-[#60a5fa] dark:border-[#1e3a5f]/60",
  confirmed: "bg-purple-50 text-purple-700 border border-purple-200 dark:bg-[#2e1065] dark:text-[#d8b4fe] dark:border-[#581c87]/60",
  packed: "bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-[#1e1b4b] dark:text-[#c7d2fe] dark:border-[#312e81]/60",
  "out-for-delivery": "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-[#2a1900] dark:text-[#f59e0b] dark:border-[#3d2800]/60",
  delivered: "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-[#0d2b22] dark:text-[#34d399] dark:border-[#134030]/60",
  cancelled: "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-[#2a0a14] dark:text-[#f87171] dark:border-[#3d1020]/60",
  returned: "bg-orange-50 text-orange-700 border border-orange-200 dark:bg-[#431407] dark:text-[#ff7849] dark:border-[#7c2d12]/60",

  paid: "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-[#0d2b22] dark:text-[#34d399] dark:border-[#134030]/60",
  pending: "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-[#2a1900] dark:text-[#f59e0b] dark:border-[#3d2800]/60",
  failed: "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-[#2a0a14] dark:text-[#f87171] dark:border-[#3d1020]/60",
  refunded: "bg-slate-50 text-slate-700 border border-slate-200 dark:bg-[#0f172a] dark:text-[#94a3b8] dark:border-[#1e293b]/60",

  active: "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-[#0d2b22] dark:text-[#34d399] dark:border-[#134030]/60",
  inactive: "bg-gray-50 text-gray-700 border border-gray-200 dark:bg-[#1e1e24] dark:text-[#a1a1aa] dark:border-[#2e2e36]/60",
  archived: "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-[#2a0a14] dark:text-[#f87171] dark:border-[#3d1020]/60",

  online: "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-[#0d2b22] dark:text-[#34d399] dark:border-[#134030]/60",
  busy: "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-[#2a1900] dark:text-[#f59e0b] dark:border-[#3d2800]/60",
  offline: "bg-gray-50 text-gray-700 border border-gray-200 dark:bg-[#1e1e24] dark:text-[#a1a1aa] dark:border-[#2e2e36]/60",

  approved: "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-[#0d2b22] dark:text-[#34d399] dark:border-[#134030]/60",
  rejected: "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-[#2a0a14] dark:text-[#f87171] dark:border-[#3d1020]/60",
  open: "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-[#0f2034] dark:text-[#60a5fa] dark:border-[#1e3a5f]/60",
  "in-progress": "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-[#2a1900] dark:text-[#f59e0b] dark:border-[#3d2800]/60",
  resolved: "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-[#0d2b22] dark:text-[#34d399] dark:border-[#134030]/60",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalized = (status || "").toLowerCase().replace(/\s+/g, "-");
  const style = statusStyles[normalized] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";

  const label = (status || "")
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors",
        style,
        className
      )}
    >
      {label}
    </span>
  );
}
