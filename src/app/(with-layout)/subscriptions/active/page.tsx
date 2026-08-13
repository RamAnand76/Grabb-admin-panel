"use client";

import { useState } from "react";
import { StatusBadge } from "@/components/common/status-badge";
import { TableActionsDropdown } from "@/components/common/table-actions-dropdown";
import Link from "next/link";

interface Subscription {
  id: string;
  shopName: string;
  ownerName: string;
  planName: string;
  startDate: string;
  expiryDate: string;
  amountPaid: string;
  autoRenew: boolean;
  status: "active" | "pending" | "cancelled";
  paymentStatus: "paid" | "pending" | "refunded";
}

export default function ActiveSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: "SUB-ACT-1092",
      shopName: "Green Grocery Fresh",
      ownerName: "Aarav Sharma",
      planName: "Growth Professional",
      startDate: "2026-08-01",
      expiryDate: "2026-09-01",
      amountPaid: "$49.99",
      autoRenew: true,
      status: "active",
      paymentStatus: "paid",
    },
    {
      id: "SUB-ACT-1087",
      shopName: "Urban Organic Mart",
      ownerName: "Neha Gupta",
      planName: "Enterprise Elite",
      startDate: "2026-07-15",
      expiryDate: "2026-08-15",
      amountPaid: "$149.99",
      autoRenew: true,
      status: "active",
      paymentStatus: "paid",
    },
    {
      id: "SUB-ACT-1081",
      shopName: "Daily Needs Superstore",
      ownerName: "Rohan Verma",
      planName: "Lite Starter",
      startDate: "2026-08-10",
      expiryDate: "2026-09-10",
      amountPaid: "$19.99",
      autoRenew: false,
      status: "active",
      paymentStatus: "paid",
    },
    {
      id: "SUB-ACT-1075",
      shopName: "Mega Foods Hub",
      ownerName: "Kavita Rao",
      planName: "Growth Professional",
      startDate: "2026-08-12",
      expiryDate: "2026-09-12",
      amountPaid: "$49.99",
      autoRenew: true,
      status: "pending",
      paymentStatus: "pending",
    },
    {
      id: "SUB-ACT-1064",
      shopName: "Corner Organic Shop",
      ownerName: "Siddharth Jain",
      planName: "Lite Starter",
      startDate: "2026-06-01",
      expiryDate: "2026-07-01",
      amountPaid: "$19.99",
      autoRenew: false,
      status: "cancelled",
      paymentStatus: "refunded",
    },
  ]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSubs = subscriptions.filter(
    (s) =>
      s.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.planName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredSubs.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredSubs.map((s) => s.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Active Subscriptions</h1>
          <p className="text-sm text-dark-4 dark:text-dark-6">
            Monitor subscribed merchant shops, billing schedules, and plan auto-renewals.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-xl bg-white p-4 dark:bg-gray-dark border border-stroke dark:border-stroke-dark flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-[320px]">
          <input
            type="text"
            placeholder="Search shop, owner, plan, subscription ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-stroke bg-gray-5 py-2 pl-4 pr-10 text-sm outline-none focus:border-primary dark:border-stroke-dark dark:bg-dark-2 dark:text-white"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => alert(`Exporting ${filteredSubs.length} active subscriptions...`)}
            className="rounded-lg border border-stroke bg-white px-4 py-2 text-sm font-semibold text-dark hover:bg-gray-2 dark:border-stroke-dark dark:bg-dark-2 dark:text-white dark:hover:bg-dark-3"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Main Table section */}
      <div className="rounded-2xl bg-white p-6 shadow-1 dark:bg-gray-dark border border-stroke dark:border-stroke-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-dark dark:text-white">
            <thead className="bg-gray-2 text-xs font-semibold uppercase text-dark-4 dark:bg-dark-2 dark:text-dark-6">
              <tr>
                <th className="p-3 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredSubs.length && filteredSubs.length > 0}
                    onChange={toggleSelectAll}
                    className="size-4 rounded border-stroke cursor-pointer"
                  />
                </th>
                <th className="p-3">Subscription ID</th>
                <th className="p-3">Shop & Owner</th>
                <th className="p-3">Active Plan</th>
                <th className="p-3">Billing Cycle</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Auto-Renew</th>
                <th className="p-3">Subscription Status</th>
                <th className="p-3">Payment Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke dark:divide-stroke-dark">
              {filteredSubs.map((s) => {
                const isSelected = selectedIds.includes(s.id);
                return (
                  <tr
                    key={s.id}
                    className={`hover:bg-gray-2 dark:hover:bg-dark-2 transition-colors cursor-pointer ${
                      isSelected ? "bg-primary/5 dark:bg-primary/5" : ""
                    }`}
                    onClick={() => toggleSelectRow(s.id)}
                  >
                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectRow(s.id)}
                        className="size-4 rounded border-stroke cursor-pointer"
                      />
                    </td>
                    <td className="p-3 font-bold text-primary">
                      {s.id}
                    </td>
                    <td className="p-3">
                      <p className="font-semibold">{s.shopName}</p>
                      <p className="text-xs text-dark-4 dark:text-dark-6">Owner: {s.ownerName}</p>
                    </td>
                    <td className="p-3 font-medium text-dark dark:text-white">{s.planName}</td>
                    <td className="p-3 text-xs">
                      <div>Start: {s.startDate}</div>
                      <div className="text-dark-4 dark:text-dark-6">Expiry: {s.expiryDate}</div>
                    </td>
                    <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">
                      {s.amountPaid}
                    </td>
                    <td className="p-3 font-semibold text-center sm:text-left">
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider ${
                          s.autoRenew
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-rose-500/10 text-rose-500"
                        }`}
                      >
                        {s.autoRenew ? "Enabled" : "Disabled"}
                      </span>
                    </td>
                    <td className="p-3">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="p-3">
                      <StatusBadge status={s.paymentStatus} />
                    </td>
                    <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <TableActionsDropdown
                        actions={[
                          {
                            label: "Modify Plan",
                            onClick: () => alert(`Modifying subscription: ${s.id}`),
                            variant: "primary",
                          },
                          ...(s.status !== "cancelled"
                            ? [
                                {
                                  label: "Cancel Subscription",
                                  onClick: () => {
                                    if (confirm(`Cancel active subscription plan for ${s.shopName}?`)) {
                                      setSubscriptions((prev) =>
                                        prev.map((item) =>
                                          item.id === s.id
                                            ? { ...item, status: "cancelled", autoRenew: false }
                                            : item
                                        )
                                      );
                                    }
                                  },
                                  variant: "danger" as const,
                                },
                              ]
                            : []),
                        ]}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
