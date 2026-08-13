"use client";

import { useState } from "react";
import { StatusBadge } from "@/components/common/status-badge";
import { TableActionsDropdown } from "@/components/common/table-actions-dropdown";
import Link from "next/link";

interface Plan {
  id: string;
  name: string;
  price: string;
  billingPeriod: string;
  orderLimit: string;
  activeSubscribers: number;
  status: "active" | "inactive";
  features: string[];
}

export default function SubscriptionPlans() {
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: "SUB-PLAN-1",
      name: "Lite Starter",
      price: "$19.99",
      billingPeriod: "Monthly",
      orderLimit: "150 orders/mo",
      activeSubscribers: 42,
      status: "active",
      features: ["1 Shop", "Standard Support", "Basic Analytics"],
    },
    {
      id: "SUB-PLAN-2",
      name: "Growth Professional",
      price: "$49.99",
      billingPeriod: "Monthly",
      orderLimit: "1,000 orders/mo",
      activeSubscribers: 128,
      status: "active",
      features: ["3 Shops", "Priority Support", "Advanced Analytics", "Radius customizer"],
    },
    {
      id: "SUB-PLAN-3",
      name: "Enterprise Elite",
      price: "$149.99",
      billingPeriod: "Monthly",
      orderLimit: "Unlimited",
      activeSubscribers: 35,
      status: "active",
      features: ["Unlimited Shops", "24/7 Dedicated Support", "Real-time Live GPS Tracking", "API Access"],
    },
    {
      id: "SUB-PLAN-4",
      name: "Legacy Trial",
      price: "$0.00",
      billingPeriod: "One-time",
      orderLimit: "20 orders total",
      activeSubscribers: 8,
      status: "inactive",
      features: ["1 Shop", "No Support"],
    },
  ]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === plans.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(plans.map((p) => p.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Subscription Plans</h1>
          <p className="text-sm text-dark-4 dark:text-dark-6">
            Configure premium subscription packages, pricing terms, and platform limits.
          </p>
        </div>
        <button
          onClick={() => alert("Creating new subscription plan...")}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-1 hover:bg-primary/90 transition-colors self-start sm:self-auto"
        >
          Add New Plan
        </button>
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
                    checked={selectedIds.length === plans.length && plans.length > 0}
                    onChange={toggleSelectAll}
                    className="size-4 rounded border-stroke cursor-pointer"
                  />
                </th>
                <th className="p-3">Plan Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Billing Cycle</th>
                <th className="p-3">Order Limit</th>
                <th className="p-3">Subscribers</th>
                <th className="p-3">Status</th>
                <th className="p-3">Key Features</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke dark:divide-stroke-dark">
              {plans.map((p) => {
                const isSelected = selectedIds.includes(p.id);
                return (
                  <tr
                    key={p.id}
                    className={`hover:bg-gray-2 dark:hover:bg-dark-2 transition-colors cursor-pointer ${
                      isSelected ? "bg-primary/5 dark:bg-primary/5" : ""
                    }`}
                    onClick={() => toggleSelectRow(p.id)}
                  >
                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectRow(p.id)}
                        className="size-4 rounded border-stroke cursor-pointer"
                      />
                    </td>
                    <td className="p-3">
                      <p className="font-bold text-dark dark:text-white">{p.name}</p>
                      <p className="text-xs text-dark-4 dark:text-dark-6">{p.id}</p>
                    </td>
                    <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">
                      {p.price}
                    </td>
                    <td className="p-3 font-medium">{p.billingPeriod}</td>
                    <td className="p-3 text-dark-4 dark:text-dark-6">{p.orderLimit}</td>
                    <td className="p-3 font-bold text-center sm:text-left">{p.activeSubscribers} shops</td>
                    <td className="p-3">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="p-3 max-w-[240px] truncate">
                      <div className="flex flex-wrap gap-1">
                        {p.features.slice(0, 2).map((f, i) => (
                          <span key={i} className="rounded bg-gray-100 dark:bg-dark-3 px-1.5 py-0.5 text-[10px]">
                            {f}
                          </span>
                        ))}
                        {p.features.length > 2 && (
                          <span className="text-[10px] text-dark-4 dark:text-dark-6">
                            +{p.features.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <TableActionsDropdown
                        actions={[
                          {
                            label: "Edit",
                            onClick: () => alert(`Editing plan: ${p.name}`),
                            variant: "primary",
                          },
                          {
                            label: "Delete Plan",
                            onClick: () => {
                              if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                                setPlans((prev) => prev.filter((item) => item.id !== p.id));
                              }
                            },
                            variant: "danger",
                          },
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
