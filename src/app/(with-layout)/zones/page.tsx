"use client";

import { useState } from "react";
import { FilterBar } from "@/components/common/filter-bar";
import { StatusBadge } from "@/components/common/status-badge";
import { TableActionsDropdown } from "@/components/common/table-actions-dropdown";

interface Zone {
  id: string;
  name: string;
  coverageArea: string;
  baseFee: string;
  assignedShops: number;
  status: "active" | "inactive";
}

export default function ZonesPage() {
  const [viewTab, setViewTab] = useState<"list" | "map">("list");
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [zones, setZones] = useState<Zone[]>([
    { id: "z1", name: "Downtown Metro", coverageArea: "12.5 sq km", baseFee: "$2.50", assignedShops: 45, status: "active" },
    { id: "z2", name: "North Hills Suburb", coverageArea: "28.0 sq km", baseFee: "$4.00", assignedShops: 12, status: "active" },
    { id: "z3", name: "University District", coverageArea: "8.2 sq km", baseFee: "$1.80", assignedShops: 34, status: "active" },
    { id: "z4", name: "Westside Industrial", coverageArea: "15.0 sq km", baseFee: "$3.50", assignedShops: 5, status: "inactive" },
  ]);

  const filteredZones = zones.filter((z) => {
    const matchesStatus = selectedStatus === "all" || z.status === selectedStatus;
    const matchesSearch = z.name.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Operational Zones</h1>
          <p className="text-sm text-dark-4 dark:text-dark-6">
            Define delivery polygons, manage base delivery fees, and assign local stores to specific areas.
          </p>
        </div>
        <button
          onClick={() => {
            setViewTab("map");
            setTimeout(() => alert("Opening Map Editor..."), 100);
          }}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-1 hover:bg-primary/90 transition-colors self-start sm:self-auto"
        >
          + Draw New Zone
        </button>
      </div>

      <div className="flex border-b border-stroke dark:border-stroke-dark">
        <button
          onClick={() => setViewTab("list")}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
            viewTab === "list"
              ? "border-primary text-primary"
              : "border-transparent text-dark-4 hover:text-dark dark:text-dark-6 dark:hover:text-white"
          }`}
        >
          Data View
        </button>
        <button
          onClick={() => setViewTab("map")}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
            viewTab === "map"
              ? "border-primary text-primary"
              : "border-transparent text-dark-4 hover:text-dark dark:text-dark-6 dark:hover:text-white"
          }`}
        >
          Map View
        </button>
      </div>

      {viewTab === "map" ? (
        /* Map Placeholder */
      <div className="w-full h-[400px] rounded-2xl bg-gray-2 dark:bg-dark-2 border border-stroke dark:border-stroke-dark overflow-hidden flex items-center justify-center relative">
        <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAyMEg0ME0yMCAwVjQwIiBzdHJva2U9IiM5Q0EyQTgiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')",
            backgroundSize: "40px 40px"
        }} />
        <div className="z-10 text-center space-y-3 p-6 bg-white dark:bg-gray-dark rounded-xl shadow-lg max-w-md">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <h3 className="font-bold text-dark dark:text-white">Interactive Map Ready</h3>
            <p className="text-sm text-dark-4 dark:text-dark-6">This container is ready for Mapbox or Google Maps integration to draw Geofence polygons visually.</p>
        </div>
      </div>
      ) : (
        <>
          <FilterBar
            searchPlaceholder="Search zones by name..."
            searchValue={search}
            onSearchChange={setSearch}
            onExport={() => alert("Exporting Zone Data...")}
          />

      <div className="rounded-2xl bg-white p-6 shadow-1 dark:bg-gray-dark border border-stroke dark:border-stroke-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-dark dark:text-white whitespace-nowrap">
            <thead className="bg-gray-2 text-xs font-semibold uppercase text-dark-4 dark:bg-dark-2 dark:text-dark-6">
              <tr>
                <th className="p-3">Zone Name</th>
                <th className="p-3">Coverage Area</th>
                <th className="p-3">Base Delivery Fee</th>
                <th className="p-3">Assigned Shops</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke dark:divide-stroke-dark">
              {filteredZones.map((z) => (
                <tr key={z.id} className="hover:bg-gray-2 dark:hover:bg-dark-2">
                  <td className="p-3 font-bold text-primary">
                    <span className="cursor-pointer hover:underline">{z.name}</span>
                  </td>
                  <td className="p-3 font-semibold">{z.coverageArea}</td>
                  <td className="p-3 font-bold text-emerald-500">{z.baseFee}</td>
                  <td className="p-3 font-semibold">{z.assignedShops}</td>
                  <td className="p-3">
                    <StatusBadge status={z.status} />
                  </td>
                  <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <TableActionsDropdown
                      actions={[
                        { label: "Edit Zone", onClick: () => alert(`Edit ${z.name}`) },
                        { label: "Delete", onClick: () => alert(`Delete ${z.name}`), variant: "danger" }
                      ]}
                    />
                  </td>
                </tr>
              ))}
              {filteredZones.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-dark-4 dark:text-dark-6">
                    No zones found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
        </>
      )}
    </div>
  );
}
