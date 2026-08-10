"use client";

import { useState } from "react";

interface ShopCommission {
  id: string;
  name: string;
  commissionPct: number;
}

export default function CommissionPage() {
  const [globalCommission, setGlobalCommission] = useState(15.0);
  const [baseDeliveryFee, setBaseDeliveryFee] = useState(3.0);
  const [perKmRate, setPerKmRate] = useState(0.8);
  const [freeThreshold, setFreeThreshold] = useState(35.0);

  const [shopOverrides, setShopOverrides] = useState<ShopCommission[]>([
    { id: "s1", name: "Green Grocery Fresh", commissionPct: 12.5 },
    { id: "s2", name: "Urban Organic Mart", commissionPct: 15.0 },
    { id: "s3", name: "Daily Needs Superstore", commissionPct: 10.0 },
  ]);

  const handleUpdateShopPct = (id: string, pct: number) => {
    setShopOverrides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, commissionPct: Math.max(0, pct) } : s))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark dark:text-white">Commission & Delivery Fee Rules</h1>
        <p className="text-sm text-dark-4 dark:text-dark-6">
          Set platform revenue commission rates, per-shop overrides, and customer delivery fee calculation rules.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Global Platform Commission Form */}
        <div className="col-span-12 xl:col-span-6 rounded-2xl bg-white p-6 shadow-1 dark:bg-gray-dark border border-stroke dark:border-stroke-dark space-y-4">
          <h3 className="text-base font-bold text-dark dark:text-white mb-2">Global Platform Commission</h3>
          <div>
            <label className="block text-xs font-semibold mb-1">Default Commission Rate (%)</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                step="0.5"
                value={globalCommission}
                onChange={(e) => setGlobalCommission(parseFloat(e.target.value) || 0)}
                className="w-32 rounded-lg border border-stroke bg-gray-2 p-2.5 font-bold text-dark dark:border-stroke-dark dark:bg-dark-2 dark:text-white"
              />
              <span className="text-sm text-dark-4">% per completed order</span>
            </div>
          </div>
          <button
            onClick={() => alert("Global commission rate updated!")}
            className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white"
          >
            Save Global Commission
          </button>
        </div>

        {/* Delivery Fee Calculation Rules */}
        <div className="col-span-12 xl:col-span-6 rounded-2xl bg-white p-6 shadow-1 dark:bg-gray-dark border border-stroke dark:border-stroke-dark space-y-4">
          <h3 className="text-base font-bold text-dark dark:text-white mb-2">Delivery Fee Calculation</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Base Delivery Fee ($)</label>
              <input
                type="number"
                step="0.5"
                value={baseDeliveryFee}
                onChange={(e) => setBaseDeliveryFee(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-stroke bg-gray-2 p-2.5 text-sm font-bold dark:border-stroke-dark dark:bg-dark-2 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Per KM Rate ($/km)</label>
              <input
                type="number"
                step="0.1"
                value={perKmRate}
                onChange={(e) => setPerKmRate(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-stroke bg-gray-2 p-2.5 text-sm font-bold dark:border-stroke-dark dark:bg-dark-2 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Free Delivery Order Threshold ($)</label>
            <input
              type="number"
              value={freeThreshold}
              onChange={(e) => setFreeThreshold(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-stroke bg-gray-2 p-2.5 text-sm font-bold dark:border-stroke-dark dark:bg-dark-2 dark:text-white"
            />
          </div>

          <button
            onClick={() => alert("Delivery fee rules saved!")}
            className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white"
          >
            Save Delivery Fee Rules
          </button>
        </div>
      </div>

      {/* Per-Shop Custom Commission Overrides Table */}
      <div className="rounded-2xl bg-white p-6 shadow-1 dark:bg-gray-dark border border-stroke dark:border-stroke-dark">
        <h3 className="text-base font-bold text-dark dark:text-white mb-4">Per-Shop Custom Commission Overrides</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-dark dark:text-white">
            <thead className="bg-gray-2 text-xs font-semibold uppercase text-dark-4 dark:bg-dark-2 dark:text-dark-6">
              <tr>
                <th className="p-3">Shop Name</th>
                <th className="p-3">Custom Commission (%)</th>
                <th className="p-3">Effective Override</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke dark:divide-stroke-dark">
              {shopOverrides.map((s) => (
                <tr key={s.id} className="hover:bg-gray-2 dark:hover:bg-dark-2">
                  <td className="p-3 font-bold">{s.name}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.5"
                        value={s.commissionPct}
                        onChange={(e) => handleUpdateShopPct(s.id, parseFloat(e.target.value) || 0)}
                        className="w-24 rounded border border-stroke p-1.5 font-bold text-center dark:border-stroke-dark dark:bg-dark-2 dark:text-white"
                      />
                      <span className="text-xs font-semibold">%</span>
                    </div>
                  </td>
                  <td className="p-3 text-xs font-bold text-emerald-500">
                    {s.commissionPct}% per sale
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
