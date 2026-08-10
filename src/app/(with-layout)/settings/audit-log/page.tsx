"use client";

import { useState } from "react";
import { FilterBar } from "@/components/common/filter-bar";

interface AuditEntry {
  id: string;
  timestamp: string;
  adminUser: string;
  action: string;
  module: string;
  beforeVal: string;
  afterVal: string;
}

export default function AuditLogPage() {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const logs: AuditEntry[] = [
    {
      id: "log_101",
      timestamp: "Today, 10:14 AM",
      adminUser: "Client Admin (admin@grabb.com)",
      action: "UPDATE_STATUS",
      module: "Orders",
      beforeVal: JSON.stringify({ orderId: "ORD-94821", status: "packed" }, null, 2),
      afterVal: JSON.stringify({ orderId: "ORD-94821", status: "out-for-delivery" }, null, 2),
    },
    {
      id: "log_102",
      timestamp: "Today, 09:30 AM",
      adminUser: "Alex Mercer (Finance)",
      action: "SETTLE_PAYOUT",
      module: "Finance",
      beforeVal: JSON.stringify({ payoutId: "po5", status: "pending" }, null, 2),
      afterVal: JSON.stringify({ payoutId: "po5", status: "paid" }, null, 2),
    },
    {
      id: "log_103",
      timestamp: "Yesterday, 04:15 PM",
      adminUser: "Sarah Connor (Support)",
      action: "BLOCK_USER",
      module: "Users",
      beforeVal: JSON.stringify({ userId: "u4", status: "active" }, null, 2),
      afterVal: JSON.stringify({ userId: "u4", status: "blocked", reason: "Spam activity" }, null, 2),
    },
  ];

  const filteredLogs = logs.filter(
    (l) =>
      l.adminUser.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.module.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark dark:text-white">System Audit & Compliance Log</h1>
        <p className="text-sm text-dark-4 dark:text-dark-6">
          Immutable audit trail of administrative changes, status updates, payouts, and user blocks.
        </p>
      </div>

      <FilterBar
        searchPlaceholder="Filter audit log by admin, action, or module..."
        searchValue={search}
        onSearchChange={setSearch}
        onExport={() => alert("Exporting Audit Logs CSV...")}
      />

      <div className="rounded-2xl bg-white p-6 shadow-1 dark:bg-gray-dark border border-stroke dark:border-stroke-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-dark dark:text-white">
            <thead className="bg-gray-2 text-xs font-semibold uppercase text-dark-4 dark:bg-dark-2 dark:text-dark-6">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Admin User</th>
                <th className="p-3">Module</th>
                <th className="p-3">Action</th>
                <th className="p-3 text-right">Payload Diff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke dark:divide-stroke-dark">
              {filteredLogs.map((l) => {
                const isExpanded = expandedId === l.id;
                return (
                  <tr key={l.id} className="hover:bg-gray-2 dark:hover:bg-dark-2">
                    <td className="p-3 text-xs text-dark-4 dark:text-dark-6 font-mono">{l.timestamp}</td>
                    <td className="p-3 font-semibold">{l.adminUser}</td>
                    <td className="p-3">
                      <span className="bg-gray-2 dark:bg-dark-2 px-2.5 py-1 rounded text-xs font-bold">
                        {l.module}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-xs font-bold text-primary">{l.action}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : l.id)}
                        className="rounded-lg bg-gray-2 px-3 py-1.5 text-xs font-semibold text-dark hover:bg-gray-3 dark:bg-dark-2 dark:text-white"
                      >
                        {isExpanded ? "Hide Diff ▲" : "Inspect Diff ▼"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Expandable JSON Diff View */}
        {expandedId && (
          <div className="mt-6 border-t border-stroke dark:border-stroke-dark pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-dark-4 mb-3">
              Before / After Value State Inspection ({expandedId})
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300">
                <p className="font-bold mb-2 uppercase text-[10px]">State Before Change (-):</p>
                <pre>{logs.find((l) => l.id === expandedId)?.beforeVal}</pre>
              </div>
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                <p className="font-bold mb-2 uppercase text-[10px]">State After Change (+):</p>
                <pre>{logs.find((l) => l.id === expandedId)?.afterVal}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
