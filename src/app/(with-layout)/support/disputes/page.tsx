"use client";

import { useState } from "react";
import { FilterBar } from "@/components/common/filter-bar";
import { StatusBadge } from "@/components/common/status-badge";

interface Dispute {
  id: string;
  orderId: string;
  customerName: string;
  shopName: string;
  driverName: string;
  issue: string;
  refundRequested: string;
  status: "open" | "resolved";
  liability?: "shop" | "driver" | "platform";
}

export default function DisputesPage() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [disputes, setDisputes] = useState<Dispute[]>([
    { id: "dsp-101", orderId: "ORD-94821", customerName: "Aarav Sharma", shopName: "Green Grocery Fresh", driverName: "Rahul Sharma", issue: "Missing 1x Organic Milk 1L", refundRequested: "₹3.50", status: "open" },
    { id: "dsp-102", orderId: "ORD-94815", customerName: "Neha Gupta", shopName: "Urban Organic Mart", driverName: "Vikram Singh", issue: "Damaged Eggs (Broken during transit)", refundRequested: "₹4.00", status: "open" },
    { id: "dsp-103", orderId: "ORD-94780", customerName: "Rohan Verma", shopName: "Daily Needs Superstore", driverName: "Amit Patel", issue: "Wrong item delivered (Got Apple instead of Avocado)", refundRequested: "₹5.90", status: "resolved", liability: "shop" },
  ]);

  const [resolveModal, setResolveModal] = useState<Dispute | null>(null);
  const [selectedLiability, setSelectedLiability] = useState<"shop" | "driver" | "platform">("platform");

  const filteredDisputes = disputes.filter((d) => {
    const matchesStatus = selectedStatus === "all" || d.status === selectedStatus;
    const matchesSearch = d.orderId.toLowerCase().includes(search.toLowerCase()) || d.customerName.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleResolve = () => {
    if (!resolveModal) return;
    setDisputes(prev => prev.map(d => d.id === resolveModal.id ? { ...d, status: "resolved", liability: selectedLiability } : d));
    setResolveModal(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark dark:text-white">Disputes & Refunds</h1>
        <p className="text-sm text-dark-4 dark:text-dark-6">
          Resolve missing item or damaged goods reports by assigning financial liability to the Shop, Driver, or Platform.
        </p>
      </div>

      <FilterBar
        searchPlaceholder="Search by Order ID or Customer..."
        searchValue={search}
        onSearchChange={setSearch}
        onExport={() => alert("Exporting Disputes...")}
      />

      <div className="flex gap-2">
        <button onClick={() => setSelectedStatus('all')} className={`px-4 py-2 text-sm font-semibold rounded-lg border ${selectedStatus === 'all' ? 'bg-primary text-white border-primary' : 'bg-transparent text-dark-4 border-stroke dark:border-stroke-dark dark:text-dark-6'}`}>All</button>
        <button onClick={() => setSelectedStatus('open')} className={`px-4 py-2 text-sm font-semibold rounded-lg border ${selectedStatus === 'open' ? 'bg-primary text-white border-primary' : 'bg-transparent text-dark-4 border-stroke dark:border-stroke-dark dark:text-dark-6'}`}>Open Requires Action</button>
        <button onClick={() => setSelectedStatus('resolved')} className={`px-4 py-2 text-sm font-semibold rounded-lg border ${selectedStatus === 'resolved' ? 'bg-primary text-white border-primary' : 'bg-transparent text-dark-4 border-stroke dark:border-stroke-dark dark:text-dark-6'}`}>Resolved</button>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-1 dark:bg-gray-dark border border-stroke dark:border-stroke-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-dark dark:text-white whitespace-nowrap">
            <thead className="bg-gray-2 text-xs font-semibold uppercase text-dark-4 dark:bg-dark-2 dark:text-dark-6">
              <tr>
                <th className="p-3">Dispute ID</th>
                <th className="p-3">Order details</th>
                <th className="p-3">Reported Issue</th>
                <th className="p-3">Refund Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action / Liability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke dark:divide-stroke-dark">
              {filteredDisputes.map((d) => (
                <tr key={d.id} className="hover:bg-gray-2 dark:hover:bg-dark-2">
                  <td className="p-3 font-bold text-dark dark:text-white">{d.id}</td>
                  <td className="p-3">
                    <p className="font-bold text-primary">{d.orderId}</p>
                    <p className="text-xs text-dark-4">C: {d.customerName}</p>
                    <p className="text-xs text-dark-4">S: {d.shopName}</p>
                    <p className="text-xs text-dark-4">D: {d.driverName}</p>
                  </td>
                  <td className="p-3 font-semibold text-rose-500">{d.issue}</td>
                  <td className="p-3 font-bold">{d.refundRequested}</td>
                  <td className="p-3">
                    <StatusBadge status={d.status} />
                  </td>
                  <td className="p-3 text-right">
                    {d.status === "open" ? (
                      <button 
                        onClick={() => setResolveModal(d)}
                        className="px-4 py-2 bg-dark text-white dark:bg-white dark:text-dark rounded-lg text-xs font-bold hover:opacity-90"
                      >
                        Resolve Liability
                      </button>
                    ) : (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-gray-2 text-dark dark:bg-dark-2 dark:text-white capitalize">
                        Billed to: {d.liability}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {resolveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-dark border border-stroke dark:border-stroke-dark">
            <h3 className="text-xl font-bold text-dark dark:text-white mb-2">Resolve Dispute: {resolveModal.id}</h3>
            <p className="text-sm text-dark-4 mb-4">Refund Amount: <span className="font-bold text-rose-500">{resolveModal.refundRequested}</span></p>
            
            <p className="font-semibold text-dark dark:text-white mb-2">Who is liable for this loss?</p>
            <div className="space-y-3 mb-6">
              <label className={`block p-3 border rounded-xl cursor-pointer transition-all ${selectedLiability === 'shop' ? 'border-primary bg-primary/5' : 'border-stroke dark:border-stroke-dark'}`}>
                <input type="radio" name="liability" className="mr-3" checked={selectedLiability === 'shop'} onChange={() => setSelectedLiability('shop')} />
                <span className="font-bold">Shop ({resolveModal.shopName})</span>
                <p className="text-xs text-dark-4 ml-6">Deduct from next shop payout. (Missing/Wrong item from store)</p>
              </label>

              <label className={`block p-3 border rounded-xl cursor-pointer transition-all ${selectedLiability === 'driver' ? 'border-primary bg-primary/5' : 'border-stroke dark:border-stroke-dark'}`}>
                <input type="radio" name="liability" className="mr-3" checked={selectedLiability === 'driver'} onChange={() => setSelectedLiability('driver')} />
                <span className="font-bold">Driver ({resolveModal.driverName})</span>
                <p className="text-xs text-dark-4 ml-6">Deduct from driver payout. (Damaged in transit / Stolen)</p>
              </label>

              <label className={`block p-3 border rounded-xl cursor-pointer transition-all ${selectedLiability === 'platform' ? 'border-primary bg-primary/5' : 'border-stroke dark:border-stroke-dark'}`}>
                <input type="radio" name="liability" className="mr-3" checked={selectedLiability === 'platform'} onChange={() => setSelectedLiability('platform')} />
                <span className="font-bold">Platform Loss (Grabb)</span>
                <p className="text-xs text-dark-4 ml-6">Absorb the cost as platform expense. (Goodwill refund)</p>
              </label>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setResolveModal(null)} className="flex-1 py-2 rounded-lg font-bold border border-stroke text-dark hover:bg-gray-2 dark:text-white dark:border-stroke-dark dark:hover:bg-dark-2">Cancel</button>
              <button onClick={handleResolve} className="flex-1 py-2 rounded-lg font-bold bg-primary text-white hover:bg-primary/90">Process Refund</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
