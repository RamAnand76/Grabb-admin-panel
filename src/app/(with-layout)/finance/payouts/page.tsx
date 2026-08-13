"use client";

import { useState } from "react";
import { StatusBadge } from "@/components/common/status-badge";
import { ConfirmModal } from "@/components/common/confirm-modal";
import { TableActionsDropdown } from "@/components/common/table-actions-dropdown";

interface PayoutRecord {
  id: string;
  recipientName: string;
  type: "shop" | "partner";
  period: string;
  ordersCount: number;
  amountDue: string;
  status: "pending" | "paid";
}

export default function PayoutsPage() {
  const [activeTab, setActiveTab] = useState<"shop" | "partner">("shop");

  const [payouts, setPayouts] = useState<PayoutRecord[]>([
    { id: "po1", recipientName: "Green Grocery Fresh", type: "shop", period: "Aug 01 - Aug 07, 2026", ordersCount: 420, amountDue: "$4,280.00", status: "pending" },
    { id: "po2", recipientName: "Urban Organic Mart", type: "shop", period: "Aug 01 - Aug 07, 2026", ordersCount: 310, amountDue: "$3,150.50", status: "pending" },
    { id: "po3", recipientName: "Daily Needs Superstore", type: "shop", period: "Jul 25 - Jul 31, 2026", ordersCount: 520, amountDue: "$5,620.00", status: "paid" },
    { id: "po4", recipientName: "Rahul Sharma (Rider)", type: "partner", period: "Aug 01 - Aug 07, 2026", ordersCount: 48, amountDue: "$482.00", status: "pending" },
    { id: "po5", recipientName: "Vikram Singh (Rider)", type: "partner", period: "Aug 01 - Aug 07, 2026", ordersCount: 42, amountDue: "$420.00", status: "paid" },
  ]);

  const [confirmTargetId, setConfirmTargetId] = useState<string | null>(null);

  const filteredPayouts = payouts.filter((p) => p.type === activeTab);

  const handleMarkAsPaid = () => {
    if (!confirmTargetId) return;
    setPayouts((prev) =>
      prev.map((p) => (p.id === confirmTargetId ? { ...p, status: "paid" } : p))
    );
    setConfirmTargetId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Vendor & Driver Payouts</h1>
          <p className="text-sm text-dark-4 dark:text-dark-6">
            Weekly payout settlements for partner shops and delivery partners.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stroke dark:border-stroke-dark">
        <button
          onClick={() => setActiveTab("shop")}
          className={`py-3 px-6 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "shop"
              ? "border-primary text-primary dark:text-white"
              : "border-transparent text-dark-4 hover:text-dark dark:text-dark-6"
          }`}
        >
          Shop Vendor Payouts
        </button>
        <button
          onClick={() => setActiveTab("partner")}
          className={`py-3 px-6 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === "partner"
              ? "border-primary text-primary dark:text-white"
              : "border-transparent text-dark-4 hover:text-dark dark:text-dark-6"
          }`}
        >
          Delivery Partner Payouts
        </button>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-1 dark:bg-gray-dark border border-stroke dark:border-stroke-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-dark dark:text-white">
            <thead className="bg-gray-2 text-xs font-semibold uppercase text-dark-4 dark:bg-dark-2 dark:text-dark-6">
              <tr>
                <th className="p-3">Recipient Name</th>
                <th className="p-3">Payout Period</th>
                <th className="p-3">Orders Included</th>
                <th className="p-3">Amount Due</th>
                <th className="p-3">Payout Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke dark:divide-stroke-dark">
              {filteredPayouts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-2 dark:hover:bg-dark-2">
                  <td className="p-3 font-bold text-primary">{p.recipientName}</td>
                  <td className="p-3 text-xs text-dark-4 dark:text-dark-6">{p.period}</td>
                  <td className="p-3 font-semibold">{p.ordersCount} orders</td>
                  <td className="p-3 font-bold text-emerald-500">{p.amountDue}</td>
                  <td className="p-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <TableActionsDropdown
                      actions={[
                        ...(p.status === "pending"
                          ? [
                              {
                                label: "Mark as Paid",
                                onClick: () => setConfirmTargetId(p.id),
                                variant: "primary" as const,
                              },
                            ]
                          : []),
                        {
                          label: "View Report",
                          onClick: () => alert(`Viewing payout report for: ${p.recipientName}...`),
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        isOpen={Boolean(confirmTargetId)}
        onClose={() => setConfirmTargetId(null)}
        onConfirm={handleMarkAsPaid}
        title="Confirm Payout Settlement"
        description="Are you sure you want to mark this payout settlement as paid? This records bank transfer execution."
        confirmLabel="Confirm Payment"
        variant="info"
      />
    </div>
  );
}
