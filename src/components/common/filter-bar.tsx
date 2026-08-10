"use client";

import { SearchIcon } from "@/assets/icons";

interface FilterBarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  dateRange?: string;
  onDateRangeChange?: (val: string) => void;
  selectedShop?: string;
  onShopChange?: (val: string) => void;
  shops?: { id: string; name: string }[];
  showCompare?: boolean;
  isCompareOn?: boolean;
  onCompareChange?: (val: boolean) => void;
  onExport?: () => void;
  extraFilters?: React.ReactNode;
}

export function FilterBar({
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  dateRange = "7d",
  onDateRangeChange,
  selectedShop = "all",
  onShopChange,
  shops = [
    { id: "all", name: "All Shops" },
    { id: "s1", name: "Green Grocery Fresh" },
    { id: "s2", name: "Urban Organic Mart" },
    { id: "s3", name: "Daily Needs Superstore" },
  ],
  showCompare = false,
  isCompareOn = false,
  onCompareChange,
  onExport,
  extraFilters,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card mb-6">
      <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
        {/* Search */}
        {onSearchChange && (
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <input
              type="search"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-lg border border-stroke bg-gray-2 py-2 pl-10 pr-4 text-sm text-dark outline-none focus:border-primary dark:border-stroke-dark dark:bg-dark-2 dark:text-white"
            />
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-dark-4 dark:text-dark-6" />
          </div>
        )}

        {/* Date Range Selector */}
        {onDateRangeChange && (
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value)}
            className="rounded-lg border border-stroke bg-gray-2 px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-stroke-dark dark:bg-dark-2 dark:text-white"
          >
            <option value="today">Today</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="this_month">This Month</option>
            <option value="last_month">Last Month</option>
            <option value="custom">Custom Range</option>
          </select>
        )}

        {/* Shop Selector */}
        {onShopChange && (
          <select
            value={selectedShop}
            onChange={(e) => onShopChange(e.target.value)}
            className="rounded-lg border border-stroke bg-gray-2 px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-stroke-dark dark:bg-dark-2 dark:text-white"
          >
            {shops.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        )}

        {/* Custom Extra Filters */}
        {extraFilters}
      </div>

      <div className="flex items-center gap-3">
        {/* Compare Toggle */}
        {showCompare && onCompareChange && (
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-dark dark:text-white">
            <input
              type="checkbox"
              checked={isCompareOn}
              onChange={(e) => onCompareChange(e.target.checked)}
              className="size-4 rounded border-stroke text-primary focus:ring-primary dark:border-stroke-dark"
            />
            Compare Prev. Period
          </label>
        )}

        {/* Export Action */}
        {onExport && (
          <button
            onClick={onExport}
            className="flex items-center gap-2 rounded-lg border border-stroke bg-gray-2 px-3 py-2 text-xs font-semibold text-dark hover:bg-gray-3 dark:border-stroke-dark dark:bg-dark-2 dark:text-white dark:hover:bg-dark-3 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export
          </button>
        )}
      </div>
    </div>
  );
}
