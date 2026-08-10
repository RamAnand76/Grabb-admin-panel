"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */
type TagColor = "blue" | "teal" | "amber" | "rose" | "slate";

interface Tag {
  label: string;
  color: TagColor;
}

interface Row {
  id: string;
  company: string;
  tags: Tag[];
  extra?: number;
  ownerName: string;
  ownerSeed: string;
  openDeals: number;
  pipelineValue: string;
}

/* ─── Data (mirrors reference image row-for-row) ─────────────── */
const ROWS: Row[] = [
  { id: "1",  company: "LVMH",           tags: [{ label: "Enterprise", color: "blue" }, { label: "Upsell", color: "teal" }],                               extra: 2,  ownerName: "Sarah Nguyen",  ownerSeed: "sarah1",   openDeals: 7,  pipelineValue: "$ 420,000" },
  { id: "2",  company: "Disney",          tags: [{ label: "Enterprise", color: "blue" }, { label: "New Logo", color: "teal" }],                                          ownerName: "James Taylor",  ownerSeed: "james2",   openDeals: 4,  pipelineValue: "$ 311,242" },
  { id: "3",  company: "Paypal",          tags: [{ label: "Enterprise", color: "blue" }],                                                                               ownerName: "Maria Keller",  ownerSeed: "maria3",   openDeals: 5,  pipelineValue: "$ 124,232" },
  { id: "4",  company: "United Airlines", tags: [{ label: "Renewal", color: "teal" }],                                                                                  ownerName: "Nia Jameson",   ownerSeed: "nia4",     openDeals: 2,  pipelineValue: "$ 221,231" },
  { id: "5",  company: "Apple",           tags: [{ label: "Pilot", color: "amber" }],                                                                                   ownerName: "Alex Santos",   ownerSeed: "alex5",    openDeals: 6,  pipelineValue: "$ 530,111" },
  { id: "6",  company: "Microsoft",       tags: [{ label: "Strategic", color: "rose" }, { label: "Expansion", color: "teal" }],                                         ownerName: "Mark Darnalds", ownerSeed: "mark6",    openDeals: 8,  pipelineValue: "$ 320,222" },
  { id: "7",  company: "Airbnb",          tags: [{ label: "Upsell", color: "teal" }, { label: "Expansion", color: "teal" }],                                extra: 2,  ownerName: "Drew Nash",     ownerSeed: "drew7",    openDeals: 3,  pipelineValue: "$ 122,230" },
  { id: "8",  company: "Intercom",        tags: [{ label: "Enterprise", color: "blue" }, { label: "Mid-Market", color: "teal" }],                                       ownerName: "Lina Wong",     ownerSeed: "lina8",    openDeals: 5,  pipelineValue: "$ 230,112" },
  { id: "9",  company: "Attio",           tags: [{ label: "Mid-Market", color: "teal" }, { label: "Upsell", color: "teal" }],                              extra: 2,  ownerName: "Jamie Fox",     ownerSeed: "jamie9",   openDeals: 2,  pipelineValue: "$ 420,222" },
  { id: "10", company: "Google",          tags: [{ label: "SMB", color: "amber" }, { label: "Enterprise", color: "teal" }],                                extra: 2,  ownerName: "Kate Chen",     ownerSeed: "kate10",   openDeals: 8,  pipelineValue: "$ 112,277" },
  { id: "11", company: "Netflix",         tags: [{ label: "Mid-Market", color: "teal" }],                                                                               ownerName: "Ricky Brown",   ownerSeed: "ricky11",  openDeals: 3,  pipelineValue: "$ 221,221" },
  { id: "12", company: "Spotify",         tags: [{ label: "Land & Expand", color: "teal" }],                                                               extra: 2,  ownerName: "Hannah Mills",  ownerSeed: "hannah12", openDeals: 5,  pipelineValue: "$ 170,991" },
  { id: "13", company: "Shopify",         tags: [{ label: "Co-Sell", color: "amber" }, { label: "Expansion", color: "teal" }],                                          ownerName: "Emma Green",    ownerSeed: "emma13",   openDeals: 9,  pipelineValue: "$ 139,007" },
];

/* ─── Tag color map (matches screenshot exactly) ─────────────── */
const TAG: Record<TagColor, string> = {
  blue:  "bg-[#0f2034] text-[#60a5fa] border border-[#1e3a5f]",
  teal:  "bg-[#0d2b22] text-[#34d399] border border-[#134030]",
  amber: "bg-[#2a1900] text-[#f59e0b] border border-[#3d2800]",
  rose:  "bg-[#2a0a14] text-[#f87171] border border-[#3d1020]",
  slate: "bg-[#1e1e24] text-[#a1a1aa] border border-[#2e2e36]",
};

/* ─── Checkbox ───────────────────────────────────────────────── */
function Checkbox({
  checked,
  indeterminate,
  onChange,
  onClick,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange?: () => void;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => { onClick?.(e); onChange?.(); }}
      className={cn(
        "flex size-[15px] shrink-0 items-center justify-center rounded-[3px] border transition-all",
        checked || indeterminate
          ? "bg-[#f59e0b] border-[#f59e0b]"
          : "border-[#3f3f46] bg-transparent hover:border-[#71717a]"
      )}
    >
      {indeterminate && !checked && (
        <svg viewBox="0 0 10 2" className="w-2 h-[2px]" fill="currentColor">
          <rect x="0" y="0" width="10" height="2" className="text-black" />
        </svg>
      )}
      {checked && (
        <svg viewBox="0 0 10 8" className="w-2.5" fill="none" stroke="black" strokeWidth="2">
          <polyline points="1,4 4,7 9,1" />
        </svg>
      )}
    </button>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export function ModernReferenceTable({ className }: { className?: string }) {
  const TABS = ["Companies", "Deals", "Forecast"];
  const [tab, setTab] = useState("Companies");
  const [selected, setSelected] = useState<Set<string>>(new Set(["6"]));

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const allSelected = selected.size === ROWS.length;
  const someSelected = selected.size > 0 && !allSelected;

  const toggleAll = () =>
    setSelected(allSelected || someSelected ? new Set() : new Set(ROWS.map((r) => r.id)));

  return (
    <div className={cn("bg-[#0e0e11] text-white font-sans", className)}>

      {/* ── Tabs ──────────────────────────────────────────────── */}
      <div className="flex gap-5 border-b border-[#222226] mb-4">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "relative pb-3 text-[13px] font-medium transition-colors",
              t === tab ? "text-white" : "text-[#71717a] hover:text-[#a1a1aa]"
            )}
          >
            {t}
            {t === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* ── Filter Pills ──────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-5">
        {[
          { label: "Sort by", value: "Pipeline Value" },
          { label: "Filter", value: "All Owners" },
          { label: "Stage", value: "Any" },
          { label: "Last Activity", value: "90 Days" },
        ].map((pill) => (
          <button
            key={pill.label}
            className="flex items-center gap-1 rounded-full border border-[#2e2e36] bg-[#18181c] px-3 py-1 text-[11px] hover:border-[#3f3f46] transition-colors"
          >
            <span className="text-[#71717a]">{pill.label}</span>
            <span className="text-white font-medium">{pill.value}</span>
            <svg className="ml-0.5 w-2.5 h-2.5 text-[#71717a]" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 1l4 4 4-4" />
            </svg>
          </button>
        ))}
      </div>

      {/* ── Table ─────────────────────────────────────────────── */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">

          {/* Head */}
          <thead>
            <tr className="border-b border-[#222226]">
              {/* All-select checkbox */}
              <th className="w-8 pb-2 pr-3 text-left">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={toggleAll}
                />
              </th>
              {["Companies", "Segment & Stage", "Account Owner", "Open Deals", "Pipeline Value"].map((h) => (
                <th
                  key={h}
                  className="pb-2 pr-6 text-left text-[11px] font-medium uppercase tracking-wide text-[#52525b] last:text-right"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-[#18181c]">
            {ROWS.map((row) => {
              const isSel = selected.has(row.id);
              return (
                <tr
                  key={row.id}
                  onClick={() => toggle(row.id)}
                  className={cn(
                    "group cursor-pointer transition-colors duration-75",
                    isSel ? "bg-[#16161a]" : "hover:bg-[#13131700]"
                  )}
                >
                  {/* Checkbox cell */}
                  <td
                    className="py-2.5 pr-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={isSel}
                      onChange={() => toggle(row.id)}
                    />
                  </td>

                  {/* Company name */}
                  <td className="py-2.5 pr-6 font-medium text-[#e4e4e7] whitespace-nowrap">
                    {row.company}
                  </td>

                  {/* Tags */}
                  <td className="py-2.5 pr-6">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {row.tags.map((tag, i) => (
                        <span
                          key={i}
                          className={cn(
                            "rounded-full px-2 py-[2px] text-[11px] font-medium leading-none",
                            TAG[tag.color]
                          )}
                        >
                          {tag.label}
                        </span>
                      ))}
                      {row.extra && (
                        <span className="rounded-full bg-[#1e1e24] border border-[#2e2e36] px-2 py-[2px] text-[11px] font-medium text-[#71717a] leading-none">
                          +{row.extra}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Account Owner */}
                  <td className="py-2.5 pr-6 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://i.pravatar.cc/32?u=${row.ownerSeed}`}
                        alt={row.ownerName}
                        className="size-5 rounded-full object-cover shrink-0"
                      />
                      <span className="text-[#a1a1aa] text-[12px]">{row.ownerName}</span>
                    </div>
                  </td>

                  {/* Open Deals */}
                  <td className="py-2.5 pr-6 text-[#71717a] text-[12px]">
                    {row.openDeals}
                  </td>

                  {/* Pipeline Value */}
                  <td className="py-2.5 text-right text-[12px] font-medium text-[#e4e4e7] whitespace-nowrap">
                    {row.pipelineValue}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
