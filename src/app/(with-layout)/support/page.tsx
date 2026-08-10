"use client";

import { useState } from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/common/status-badge";
import { FilterBar } from "@/components/common/filter-bar";

interface SupportTicket {
  id: string;
  customerName: string;
  subject: string;
  status: "open" | "in-progress" | "resolved";
  priority: "high" | "medium" | "low";
  assignedAgent: string;
  createdDate: string;
}

export default function SupportPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [tickets, setTickets] = useState<SupportTicket[]>([
    { id: "TICK-1082", customerName: "Aarav Sharma", subject: "Items missing from my grocery bag", status: "open", priority: "high", assignedAgent: "Support Rep Sarah", createdDate: "15 mins ago" },
    { id: "TICK-1081", customerName: "Neha Gupta", subject: "Double charged on UPI payment for ORD-94820", status: "in-progress", priority: "high", assignedAgent: "Finance Rep Alex", createdDate: "1 hour ago" },
    { id: "TICK-1075", customerName: "Rohan Verma", subject: "Request change of delivery address", status: "resolved", priority: "low", assignedAgent: "Support Rep Sarah", createdDate: "Yesterday" },
  ]);

  const filteredTickets = tickets.filter((t) => {
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    const matchesSearch =
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.customerName.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Customer Support Tickets</h1>
          <p className="text-sm text-dark-4 dark:text-dark-6">
            Helpdesk support inbox, order dispute handling, ticket assignment, and customer chat resolution.
          </p>
        </div>
      </div>

      <FilterBar
        searchPlaceholder="Search ticket ID, customer name, subject..."
        searchValue={search}
        onSearchChange={setSearch}
      />

      <div className="flex items-center gap-2">
        {["all", "open", "in-progress", "resolved"].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-all ${
              statusFilter === st
                ? "bg-dark text-white dark:bg-white dark:text-dark"
                : "bg-white text-dark-4 hover:bg-gray-2 dark:bg-gray-dark dark:text-dark-6 border border-stroke dark:border-stroke-dark"
            }`}
          >
            {st === "all" ? "All Tickets" : st.replace(/-/g, " ")}
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-1 dark:bg-gray-dark border border-stroke dark:border-stroke-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-dark dark:text-white">
            <thead className="bg-gray-2 text-xs font-semibold uppercase text-dark-4 dark:bg-dark-2 dark:text-dark-6">
              <tr>
                <th className="p-3">Ticket ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Subject / Issue</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Assigned Agent</th>
                <th className="p-3">Status</th>
                <th className="p-3">Created</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke dark:divide-stroke-dark">
              {filteredTickets.map((t) => (
                <tr key={t.id} className="hover:bg-gray-2 dark:hover:bg-dark-2">
                  <td className="p-3 font-bold text-primary">
                    <Link href={`/support/${t.id}`}>{t.id}</Link>
                  </td>
                  <td className="p-3 font-semibold">{t.customerName}</td>
                  <td className="p-3 font-medium">{t.subject}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        t.priority === "high"
                          ? "bg-rose-100 text-rose-800"
                          : t.priority === "medium"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {t.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-xs">{t.assignedAgent}</td>
                  <td className="p-3">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="p-3 text-xs text-dark-4 dark:text-dark-6">{t.createdDate}</td>
                  <td className="p-3 text-right">
                    <Link
                      href={`/support/${t.id}`}
                      className="rounded-lg bg-gray-2 px-3 py-1.5 text-xs font-semibold text-dark hover:bg-gray-3 dark:bg-dark-2 dark:text-white"
                    >
                      Open Thread
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
