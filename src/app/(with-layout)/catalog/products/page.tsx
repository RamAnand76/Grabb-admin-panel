"use client";

import { useState } from "react";
import { FilterBar } from "@/components/common/filter-bar";
import { TrashTabWrapper } from "@/components/common/trash-tab-wrapper";
import { ConfirmModal } from "@/components/common/confirm-modal";

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  priceRange: string;
  stockStatus: "in-stock" | "low" | "out";
  status: "active" | "inactive";
  shopsCount: number;
  isDeleted?: boolean;
}

export default function ProductsPage() {
  const [tab, setTab] = useState<"active" | "trash">("active");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedShop, setSelectedShop] = useState("all");

  const [products, setProducts] = useState<Product[]>([
    {
      id: "p1",
      name: "Fresh Organic Milk 1L",
      category: "Dairy & Eggs",
      subcategory: "Cheese & Butter",
      priceRange: "$3.20 - $3.60",
      stockStatus: "in-stock",
      status: "active",
      shopsCount: 3,
    },
    {
      id: "p2",
      name: "Farm Fresh Eggs 12pk",
      category: "Dairy & Eggs",
      subcategory: "Cheese & Butter",
      priceRange: "$4.00 - $4.50",
      stockStatus: "low",
      status: "active",
      shopsCount: 2,
    },
    {
      id: "p3",
      name: "Avocado Hass (Pack of 2)",
      category: "Fresh Fruits",
      subcategory: "Citrus Fruits",
      priceRange: "$5.90",
      stockStatus: "out",
      status: "active",
      shopsCount: 3,
    },
    {
      id: "p4",
      name: "Organic Brown Bread 400g",
      category: "Bakery & Bread",
      subcategory: "Whole Grain",
      priceRange: "$2.80 - $3.10",
      stockStatus: "in-stock",
      status: "inactive",
      shopsCount: 2,
    },
    {
      id: "p5",
      name: "Discontinued Seasoning Mix",
      category: "Spices",
      subcategory: "Mixes",
      priceRange: "$1.50",
      stockStatus: "out",
      status: "inactive",
      shopsCount: 1,
      isDeleted: true,
    },
  ]);

  const [bulkUploadOpen, setBulkUploadOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("Dairy & Eggs");
  const [formSubcategory, setFormSubcategory] = useState("Cheese & Butter");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filteredProducts = products.filter((p) => {
    const matchesTab = tab === "trash" ? p.isDeleted : !p.isDeleted;
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesCategory && matchesSearch;
  });

  const handleSaveProduct = () => {
    if (!formName.trim()) return;
    setProducts((prev) => [
      ...prev,
      {
        id: `p_${Date.now()}`,
        name: formName,
        category: formCategory,
        subcategory: formSubcategory,
        priceRange: "$3.50",
        stockStatus: "in-stock",
        status: "active",
        shopsCount: 2,
      },
    ]);
    setProductModalOpen(false);
    setFormName("");
  };

  const handleSoftDelete = (id: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, isDeleted: true } : p)));
  };

  const handleRestore = (id: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, isDeleted: false } : p)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Product Catalog</h1>
          <p className="text-sm text-dark-4 dark:text-dark-6">
            Multi-shop product management with per-shop pricing, stock controls, and CSV bulk upload.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setBulkUploadOpen(true)}
            className="rounded-lg border border-stroke bg-white px-4 py-2 text-sm font-semibold text-dark hover:bg-gray-100 dark:border-stroke-dark dark:bg-dark-2 dark:text-white"
          >
            Bulk Upload (CSV)
          </button>
          <button
            onClick={() => {
              setFormName("");
              setProductModalOpen(true);
            }}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-1 hover:bg-primary/90"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        searchPlaceholder="Search product by name..."
        searchValue={search}
        onSearchChange={setSearch}
        selectedShop={selectedShop}
        onShopChange={setSelectedShop}
        onExport={() => alert(`Exporting catalog CSV...`)}
      />

      <TrashTabWrapper
        activeTab={tab}
        onTabChange={setTab}
        activeCount={products.filter((p) => !p.isDeleted).length}
        trashCount={products.filter((p) => p.isDeleted).length}
      >
        <div className="rounded-2xl bg-white p-6 shadow-1 dark:bg-gray-dark border border-stroke dark:border-stroke-dark overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-dark dark:text-white">
              <thead className="bg-gray-2 text-xs font-semibold uppercase text-dark-4 dark:bg-dark-2 dark:text-dark-6">
                <tr>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Shops Active</th>
                  <th className="p-3">Price Range</th>
                  <th className="p-3">Stock Status</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stroke dark:divide-stroke-dark">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-2 dark:hover:bg-dark-2">
                    <td className="p-3 font-bold">{p.name}</td>
                    <td className="p-3">
                      <p className="font-semibold text-dark dark:text-white">{p.category}</p>
                      <p className="text-xs text-dark-4 dark:text-dark-6">{p.subcategory}</p>
                    </td>
                    <td className="p-3 font-medium">{p.shopsCount} Shops</td>
                    <td className="p-3 font-bold text-emerald-500">{p.priceRange}</td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          p.stockStatus === "in-stock"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : p.stockStatus === "low"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                            : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                        }`}
                      >
                        {p.stockStatus.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          p.status === "active" ? "text-emerald-500" : "text-dark-4"
                        }`}
                      >
                        ● {p.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      {tab === "active" ? (
                        <>
                          <button
                            onClick={() => {
                              setFormName(p.name);
                              setProductModalOpen(true);
                            }}
                            className="rounded-lg bg-gray-2 px-3 py-1.5 text-xs font-semibold text-dark hover:bg-gray-3 dark:bg-dark-2 dark:text-white"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteTargetId(p.id)}
                            className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-400"
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleRestore(p.id)}
                          className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400"
                        >
                          Restore
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </TrashTabWrapper>

      {/* CSV Bulk Upload Modal */}
      {bulkUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-dark border border-stroke dark:border-stroke-dark">
            <h3 className="text-lg font-bold text-dark dark:text-white mb-2">CSV Bulk Product Upload</h3>
            <p className="text-xs text-dark-4 dark:text-dark-6 mb-4">
              Upload your products CSV file. Download our sample template if needed.
            </p>
            <div className="border-2 border-dashed border-stroke dark:border-stroke-dark p-6 rounded-xl text-center mb-4 cursor-pointer hover:border-primary">
              <p className="text-sm font-semibold text-dark dark:text-white">Drag & drop CSV file here</p>
              <p className="text-xs text-dark-4 dark:text-dark-6 mt-1">or click to browse from computer</p>
            </div>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Downloading CSV Template..."); }} className="text-xs font-bold text-primary underline mb-4 block">
              Download Sample CSV Template (.csv)
            </a>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setBulkUploadOpen(false)} className="rounded-lg border border-stroke px-4 py-2 text-sm font-medium">
                Cancel
              </button>
              <button onClick={() => { alert("Products uploaded successfully!"); setBulkUploadOpen(false); }} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">
                Upload & Process
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-dark border border-stroke dark:border-stroke-dark my-8">
            <h3 className="text-lg font-bold text-dark dark:text-white mb-4">
              Add / Edit Product Details
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Product Name *</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Organic Almond Milk"
                    className="w-full rounded-lg border border-stroke bg-gray-2 p-2.5 text-sm dark:border-stroke-dark dark:bg-dark-2 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Unit (e.g. 1L, 500g)</label>
                  <input
                    type="text"
                    placeholder="1L / Pack of 6"
                    className="w-full rounded-lg border border-stroke bg-gray-2 p-2.5 text-sm dark:border-stroke-dark dark:bg-dark-2 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-gray-2 p-2.5 text-sm dark:border-stroke-dark dark:bg-dark-2 dark:text-white"
                  >
                    <option value="Dairy & Eggs">Dairy & Eggs</option>
                    <option value="Fresh Vegetables">Fresh Vegetables</option>
                    <option value="Fresh Fruits">Fresh Fruits</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Subcategory</label>
                  <select
                    value={formSubcategory}
                    onChange={(e) => setFormSubcategory(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-gray-2 p-2.5 text-sm dark:border-stroke-dark dark:bg-dark-2 dark:text-white"
                  >
                    <option value="Cheese & Butter">Cheese & Butter</option>
                    <option value="Citrus Fruits">Citrus Fruits</option>
                  </select>
                </div>
              </div>

              {/* Per-Shop Repeatable Pricing Block */}
              <div className="border-t border-stroke dark:border-stroke-dark pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-dark-4 mb-3">
                  Per-Shop Pricing & Stock Allocation (Multishop)
                </h4>
                <div className="space-y-3">
                  {["Green Grocery Fresh", "Urban Organic Mart", "Daily Needs Superstore"].map((shopName, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-gray-2 dark:bg-dark-2 flex items-center justify-between gap-3">
                      <span className="text-xs font-bold w-1/3">{shopName}</span>
                      <input
                        type="text"
                        placeholder="Price ($)"
                        defaultValue="$3.50"
                        className="w-1/4 rounded border border-stroke p-1.5 text-xs text-dark dark:bg-gray-dark dark:text-white"
                      />
                      <input
                        type="number"
                        placeholder="Stock Qty"
                        defaultValue={50}
                        className="w-1/4 rounded border border-stroke p-1.5 text-xs text-dark dark:bg-gray-dark dark:text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setProductModalOpen(false)} className="rounded-lg border border-stroke px-4 py-2 text-sm font-medium">
                Cancel
              </button>
              <button onClick={handleSaveProduct} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => {
          if (deleteTargetId) handleSoftDelete(deleteTargetId);
        }}
        title="Soft Delete Product"
        description="Are you sure you want to move this product to the Trash tab?"
        confirmLabel="Move to Trash"
      />
    </div>
  );
}
