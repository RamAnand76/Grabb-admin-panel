"use client";

import { useState } from "react";
import { FilterBar } from "@/components/common/filter-bar";
import { StatusBadge } from "@/components/common/status-badge";

interface MasterProduct {
  id: string;
  name: string;
  barcode: string;
  category: string;
  globalPriceRef: string;
  mappedShops: number;
}

export default function MasterCatalogMappingPage() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [masterProducts, setMasterProducts] = useState<MasterProduct[]>([
    { id: "mp-1", name: "Coca-Cola 2L PET", barcode: "890103001001", category: "Beverages", globalPriceRef: "₹2.00", mappedShops: 42 },
    { id: "mp-2", name: "Amul Butter 100g", barcode: "890126215001", category: "Dairy", globalPriceRef: "₹0.80", mappedShops: 65 },
    { id: "mp-3", name: "Lays Classic Salted 50g", barcode: "890149110001", category: "Snacks", globalPriceRef: "₹0.50", mappedShops: 58 },
  ]);

  const filteredProducts = masterProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.barcode.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Master Catalog Mapping</h1>
          <p className="text-sm text-dark-4 dark:text-dark-6">
            Maintain universal SKUs (Master Products). Shops map their local inventory to these master barcodes.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-1 hover:bg-primary/90 transition-colors self-start sm:self-auto"
        >
          + Create Master SKU
        </button>
      </div>

      <FilterBar
        searchPlaceholder="Search by product name or barcode..."
        searchValue={search}
        onSearchChange={setSearch}
        onExport={() => alert("Exporting Master Catalog...")}
      />

      <div className="rounded-2xl bg-white p-6 shadow-1 dark:bg-gray-dark border border-stroke dark:border-stroke-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-dark dark:text-white whitespace-nowrap">
            <thead className="bg-gray-2 text-xs font-semibold uppercase text-dark-4 dark:bg-dark-2 dark:text-dark-6">
              <tr>
                <th className="p-3">Master SKU Name</th>
                <th className="p-3">Barcode (EAN/UPC)</th>
                <th className="p-3">Category</th>
                <th className="p-3">Ref. Price</th>
                <th className="p-3">Mapped Shops</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke dark:divide-stroke-dark">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-2 dark:hover:bg-dark-2">
                  <td className="p-3 font-bold text-primary">{p.name}</td>
                  <td className="p-3 font-mono text-xs">{p.barcode}</td>
                  <td className="p-3 font-semibold">{p.category}</td>
                  <td className="p-3 font-bold text-dark-4">{p.globalPriceRef}</td>
                  <td className="p-3">
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500">
                      {p.mappedShops} Shops
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="text-primary font-bold hover:underline">View Mappings</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-dark">
            <h2 className="mb-4 text-xl font-bold text-dark dark:text-white">Create Master SKU</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-dark dark:text-white">Product Name</label>
                <input type="text" className="w-full rounded-lg border border-stroke bg-transparent p-3 text-dark outline-none focus:border-primary dark:border-stroke-dark dark:text-white" placeholder="e.g. Coca-Cola 2L PET" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-dark dark:text-white">Barcode (EAN/UPC)</label>
                  <input type="text" className="w-full rounded-lg border border-stroke bg-transparent p-3 text-dark outline-none focus:border-primary dark:border-stroke-dark dark:text-white" placeholder="e.g. 890103001001" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-dark dark:text-white">Category</label>
                  <select className="w-full rounded-lg border border-stroke bg-transparent p-3 text-dark outline-none focus:border-primary dark:border-stroke-dark dark:text-white">
                    <option value="beverages">Beverages</option>
                    <option value="dairy">Dairy</option>
                    <option value="snacks">Snacks</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-dark dark:text-white">Reference Price (₹)</label>
                <input type="number" className="w-full rounded-lg border border-stroke bg-transparent p-3 text-dark outline-none focus:border-primary dark:border-stroke-dark dark:text-white" placeholder="0.00" />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-dark-4 hover:bg-gray-2 dark:text-dark-6 dark:hover:bg-dark-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Master SKU created!");
                  setIsModalOpen(false);
                }}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
              >
                Create SKU
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
