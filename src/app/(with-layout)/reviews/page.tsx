"use client";

import { useState } from "react";
import Link from "next/link";
import { FilterBar } from "@/components/common/filter-bar";
import { ConfirmModal } from "@/components/common/confirm-modal";

interface Review {
  id: string;
  type: "product" | "delivery";
  rating: number;
  comment: string;
  author: string;
  targetName: string;
  orderId: string;
  isFlagged: boolean;
  isDeleted?: boolean;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([
    { id: "r1", type: "product", rating: 5, comment: "Super fresh vegetables! Arrived crisp and cold inside 20 mins.", author: "Aarav Sharma", targetName: "Fresh Organic Spinach", orderId: "ORD-94821", isFlagged: false },
    { id: "r2", type: "delivery", rating: 5, comment: "Rahul the rider was polite and handled the eggs with extreme care.", author: "Neha Gupta", targetName: "Rahul Sharma (Rider)", orderId: "ORD-94820", isFlagged: false },
    { id: "r3", type: "product", rating: 1, comment: "Milk package was leaking inside the bag upon opening!", author: "Spammer Account", targetName: "Whole Milk 1L", orderId: "ORD-94815", isFlagged: true },
  ]);

  const [selectedRating, setSelectedRating] = useState("all");
  const [flaggedOnly, setFlaggedOnly] = useState(false);
  const [viewCommentModal, setViewCommentModal] = useState<Review | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filteredReviews = reviews.filter((r) => {
    if (r.isDeleted) return false;
    if (flaggedOnly && !r.isFlagged) return false;
    if (selectedRating !== "all" && r.rating !== parseInt(selectedRating)) return false;
    return true;
  });

  const toggleFlag = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isFlagged: !r.isFlagged } : r))
    );
  };

  const handleSoftDelete = (id: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, isDeleted: true } : r)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Customer Reviews & Ratings</h1>
          <p className="text-sm text-dark-4 dark:text-dark-6">
            Moderate product quality ratings, delivery feedback, and flag abusive reviews.
          </p>
        </div>
      </div>

      {/* Filter Options Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-1 dark:bg-gray-dark border border-stroke dark:border-stroke-dark">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-dark-4 dark:text-dark-6">Filter Star Rating:</span>
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="rounded-lg border border-stroke bg-gray-2 px-3 py-1.5 text-xs font-semibold text-dark dark:border-stroke-dark dark:bg-dark-2 dark:text-white"
          >
            <option value="all">All Ratings (1 - 5 ★)</option>
            <option value="5">5 Stars ★★★★★</option>
            <option value="4">4 Stars ★★★★☆</option>
            <option value="3">3 Stars ★★★☆☆</option>
            <option value="2">2 Stars ★★☆☆☆</option>
            <option value="1">1 Star ★☆☆☆☆</option>
          </select>
        </div>

        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-rose-500">
          <input
            type="checkbox"
            checked={flaggedOnly}
            onChange={(e) => setFlaggedOnly(e.target.checked)}
            className="size-4 rounded border-stroke"
          />
          Show Flagged Only 🚩
        </label>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-1 dark:bg-gray-dark border border-stroke dark:border-stroke-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-dark dark:text-white">
            <thead className="bg-gray-2 text-xs font-semibold uppercase text-dark-4 dark:bg-dark-2 dark:text-dark-6">
              <tr>
                <th className="p-3">Type</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Item / Target</th>
                <th className="p-3">Comment Snippet</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Order Link</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke dark:divide-stroke-dark">
              {filteredReviews.map((r) => (
                <tr key={r.id} className="hover:bg-gray-2 dark:hover:bg-dark-2">
                  <td className="p-3">
                    <span className="capitalize font-semibold text-xs bg-gray-2 dark:bg-dark-2 px-2.5 py-1 rounded-md">
                      {r.type}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-amber-500">{r.rating} ★</td>
                  <td className="p-3 font-semibold">{r.targetName}</td>
                  <td className="p-3 text-xs max-w-xs truncate text-dark-4 dark:text-dark-6">
                    {r.isFlagged && <span className="text-rose-500 font-bold mr-1">[FLAGGED]</span>}
                    "{r.comment}"
                  </td>
                  <td className="p-3 font-medium">{r.author}</td>
                  <td className="p-3 font-mono text-xs font-bold text-primary">
                    <Link href={`/orders/${r.orderId}`}>{r.orderId}</Link>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => setViewCommentModal(r)}
                      className="rounded-lg bg-gray-2 px-3 py-1.5 text-xs font-semibold text-dark hover:bg-gray-3 dark:bg-dark-2 dark:text-white"
                    >
                      Read Full
                    </button>
                    <button
                      onClick={() => toggleFlag(r.id)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                        r.isFlagged
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-2 text-dark dark:bg-dark-2 dark:text-white"
                      }`}
                    >
                      {r.isFlagged ? "Unflag 🚩" : "Flag 🚩"}
                    </button>
                    <button
                      onClick={() => setDeleteTargetId(r.id)}
                      className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-100"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Comment Modal */}
      {viewCommentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-dark border border-stroke dark:border-stroke-dark">
            <h3 className="text-lg font-bold text-dark dark:text-white mb-2">Review Detail</h3>
            <p className="text-amber-500 font-bold text-base mb-2">{viewCommentModal.rating} ★★★★★</p>
            <p className="text-sm italic text-dark dark:text-white bg-gray-2 dark:bg-dark-2 p-4 rounded-xl leading-relaxed mb-4">
              "{viewCommentModal.comment}"
            </p>
            <p className="text-xs text-dark-4 dark:text-dark-6">
              By <span className="font-bold text-dark dark:text-white">{viewCommentModal.author}</span> for{" "}
              <span className="font-semibold text-primary">{viewCommentModal.targetName}</span>
            </p>
            <button
              onClick={() => setViewCommentModal(null)}
              className="mt-6 w-full rounded-lg bg-primary py-2 text-sm font-semibold text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => {
          if (deleteTargetId) handleSoftDelete(deleteTargetId);
        }}
        title="Delete Review"
        description="Are you sure you want to soft delete this customer review?"
        confirmLabel="Confirm Delete"
      />
    </div>
  );
}
