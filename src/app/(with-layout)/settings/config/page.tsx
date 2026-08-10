"use client";

import { useState } from "react";

export default function AppConfigPage() {
  const [taxPct, setTaxPct] = useState(5.0);
  const [minOrder, setMinOrder] = useState(10.0);
  const [defaultRadius, setDefaultRadius] = useState(7.0);
  const [bannerActive, setBannerActive] = useState(true);
  const [announcementText, setAnnouncementText] = useState("🎉 Monsoon Offer: Get Free Delivery on orders above $35!");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark dark:text-white">App System Configuration</h1>
        <p className="text-sm text-dark-4 dark:text-dark-6">
          Global platform parameters, tax rates, order thresholds, and announcement banners.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-1 dark:bg-gray-dark border border-stroke dark:border-stroke-dark max-w-2xl space-y-6">
        <h3 className="text-base font-bold text-dark dark:text-white mb-2">Global Platform Rules</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Standard Tax Rate (%)</label>
            <input
              type="number"
              step="0.5"
              value={taxPct}
              onChange={(e) => setTaxPct(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-stroke bg-gray-2 p-2.5 text-sm font-bold dark:border-stroke-dark dark:bg-dark-2 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Minimum Order Value ($)</label>
            <input
              type="number"
              value={minOrder}
              onChange={(e) => setMinOrder(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-stroke bg-gray-2 p-2.5 text-sm font-bold dark:border-stroke-dark dark:bg-dark-2 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1">Default Shop Service Radius (KM)</label>
          <input
            type="number"
            value={defaultRadius}
            onChange={(e) => setDefaultRadius(parseFloat(e.target.value) || 0)}
            className="w-full rounded-lg border border-stroke bg-gray-2 p-2.5 text-sm font-bold dark:border-stroke-dark dark:bg-dark-2 dark:text-white"
          />
        </div>

        {/* App Announcement Banner Toggle */}
        <div className="border-t border-stroke dark:border-stroke-dark pt-6 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-dark dark:text-white">App-wide Top Announcement Bar</h4>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
              <input
                type="checkbox"
                checked={bannerActive}
                onChange={(e) => setBannerActive(e.target.checked)}
                className="size-4 rounded border-stroke"
              />
              {bannerActive ? "Enabled" : "Disabled"}
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Announcement Message</label>
            <input
              type="text"
              disabled={!bannerActive}
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full rounded-lg border border-stroke bg-gray-2 p-2.5 text-sm dark:border-stroke-dark dark:bg-dark-2 dark:text-white disabled:opacity-40"
            />
          </div>
        </div>

        <button
          onClick={() => alert("App configuration saved successfully!")}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-1 hover:bg-primary/90 transition-colors"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
}
