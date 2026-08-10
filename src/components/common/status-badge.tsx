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
  placed: "bg-[#0f2034] text-[#60a5fa] border border-[#1e3a5f]/60",
  confirmed: "bg-[#2e1065] text-[#d8b4fe] border border-[#581c87]/60",
  packed: "bg-[#1e1b4b] text-[#c7d2fe] border border-[#312e81]/60",
  "out-for-delivery": "bg-[#2a1900] text-[#f59e0b] border border-[#3d2800]/60",
  delivered: "bg-[#0d2b22] text-[#34d399] border border-[#134030]/60",
  cancelled: "bg-[#2a0a14] text-[#f87171] border border-[#3d1020]/60",
  returned: "bg-[#431407] text-[#ff7849] border border-[#7c2d12]/60",

  paid: "bg-[#0d2b22] text-[#34d399] border border-[#134030]/60",
  pending: "bg-[#2a1900] text-[#f59e0b] border border-[#3d2800]/60",
  failed: "bg-[#2a0a14] text-[#f87171] border border-[#3d1020]/60",
  refunded: "bg-[#0f172a] text-[#94a3b8] border border-[#1e293b]/60",

  active: "bg-[#0d2b22] text-[#34d399] border border-[#134030]/60",
  inactive: "bg-[#1e1e24] text-[#a1a1aa] border border-[#2e2e36]/60",
  archived: "bg-[#2a0a14] text-[#f87171] border border-[#3d1020]/60",

  online: "bg-[#0d2b22] text-[#34d399] border border-[#134030]/60",
  busy: "bg-[#2a1900] text-[#f59e0b] border border-[#3d2800]/60",
  offline: "bg-[#1e1e24] text-[#a1a1aa] border border-[#2e2e36]/60",

  approved: "bg-[#0d2b22] text-[#34d399] border border-[#134030]/60",
  rejected: "bg-[#2a0a14] text-[#f87171] border border-[#3d1020]/60",
  open: "bg-[#0f2034] text-[#60a5fa] border border-[#1e3a5f]/60",
  "in-progress": "bg-[#2a1900] text-[#f59e0b] border border-[#3d2800]/60",
  resolved: "bg-[#0d2b22] text-[#34d399] border border-[#134030]/60",
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
