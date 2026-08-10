"use client";

import { useState } from "react";
import { FilterBar } from "@/components/common/filter-bar";

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("30d");
  const [shop, setShop] = useState("all");

  const reports = [
    { name: "Monthly Settlement Report - July 2026", date: "Jul 31, 2026", totalRevenue: "$142,500.00", netPayout: "$121,125.00", format: "CSV & PDF" },
    { name: "Weekly Settlement Report - Aug Week 1", date: "Aug 07, 2026", totalRevenue: "$34,200.00", netPayout: "$29,070.00", format: "CSV & PDF" },
    { name: "Quarterly Tax & Commission Summary Q2", date: "Jun 30, 2026", totalRevenue: "$380,000.00", netPayout: "$323,000.00", format: "PDF" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark dark:text-white">Settlement & Financial Reports</h1>
        <p className="text-sm text-dark-4 dark:text-dark-6">
          Downloadable accounting reports, net payout summaries, and platform revenue statements.
        </p>
      </div>

      <FilterBar
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        selectedShop={shop}
        onShopChange={setShop}
        onExport={() => alert("Generating full financial export...")}
      />

      <div className="rounded-2xl bg-white p-6 shadow-1 dark:bg-gray-dark border border-stroke dark:border-stroke-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-dark dark:text-white">
            <thead className="bg-gray-2 text-xs font-semibold uppercase text-dark-4 dark:bg-dark-2 dark:text-dark-6">
              <tr>
                <th className="p-3">Report Name</th>
                <th className="p-3">Period Date</th>
                <th className="p-3">Gross Revenue</th>
                <th className="p-3">Net Vendor Payout</th>
                <th className="p-3 text-right">Download Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke dark:divide-stroke-dark">
              {reports.map((r, idx) => (
                <tr key={idx} className="hover:bg-gray-2 dark:hover:bg-dark-2">
                  <td className="p-3 font-bold text-primary">{r.name}</td>
                  <td className="p-3 text-xs text-dark-4 dark:text-dark-6">{r.date}</td>
                  <td className="p-3 font-bold">{r.totalRevenue}</td>
                  <td className="p-3 font-bold text-emerald-500">{r.netPayout}</td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => alert(`Downloading ${r.name} as CSV...`)}
                      className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary/90"
                    >
                      CSV 📥
                    </button>
                    <button
                      onClick={() => alert(`Downloading ${r.name} as PDF...`)}
                      className="rounded-lg border border-stroke bg-gray-2 px-3 py-1.5 text-xs font-semibold text-dark hover:bg-gray-3 dark:border-stroke-dark dark:bg-dark-2 dark:text-white"
                    >
                      PDF 📄
                    </button>
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
