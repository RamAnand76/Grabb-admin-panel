"use client";

import { useState } from "react";
import { StatusBadge } from "@/components/common/status-badge";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Ops Manager" | "Support Rep" | "Finance Manager";
  status: "active" | "inactive";
  lastLogin: string;
}

export default function AdminsPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([
    { id: "a1", name: "Client Admin (You)", email: "admin@grabb.com", role: "Super Admin", status: "active", lastLogin: "Just now" },
    { id: "a2", name: "Sarah Connor", email: "sarah@grabb.com", role: "Support Rep", status: "active", lastLogin: "10 mins ago" },
    { id: "a3", name: "Alex Mercer", email: "alex@grabb.com", role: "Finance Manager", status: "active", lastLogin: "2 hours ago" },
    { id: "a4", name: "John Miller", email: "john@grabb.com", role: "Ops Manager", status: "active", lastLogin: "Yesterday" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<any>("Ops Manager");

  const handleAddAdmin = () => {
    if (!name.trim() || !email.trim()) return;
    setAdmins((prev) => [
      ...prev,
      {
        id: `a_${Date.now()}`,
        name,
        email,
        role,
        status: "active",
        lastLogin: "Never",
      },
    ]);
    setModalOpen(false);
    setName("");
    setEmail("");
  };

  const modules = ["Dashboard", "Analytics", "Orders", "Catalog", "Shops", "Delivery Partners", "Users", "Promotions", "Finance", "Settings"];
  const roles = ["Super Admin", "Ops Manager", "Support Rep", "Finance Manager"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Admin Users & Role Permissions</h1>
          <p className="text-sm text-dark-4 dark:text-dark-6">
            Manage staff admin accounts, assign roles, and view access permission matrices.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-1 hover:bg-primary/90"
        >
          + Add Admin User
        </button>
      </div>

      {/* Admins Table */}
      <div className="rounded-2xl bg-white p-6 shadow-1 dark:bg-gray-dark border border-stroke dark:border-stroke-dark overflow-hidden">
        <h3 className="text-base font-bold text-dark dark:text-white mb-4">Staff Admin Accounts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-dark dark:text-white">
            <thead className="bg-gray-2 text-xs font-semibold uppercase text-dark-4 dark:bg-dark-2 dark:text-dark-6">
              <tr>
                <th className="p-3">Admin Name</th>
                <th className="p-3">Email Address</th>
                <th className="p-3">Assigned Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Last Login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke dark:divide-stroke-dark">
              {admins.map((a) => (
                <tr key={a.id} className="hover:bg-gray-2 dark:hover:bg-dark-2">
                  <td className="p-3 font-bold">{a.name}</td>
                  <td className="p-3 font-medium text-dark-4 dark:text-dark-6">{a.email}</td>
                  <td className="p-3 font-semibold text-primary">{a.role}</td>
                  <td className="p-3">
                    <StatusBadge status={a.status} />
                  </td>
                  <td className="p-3 text-xs text-dark-4 dark:text-dark-6">{a.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Permission Matrix Grid */}
      <div className="rounded-2xl bg-white p-6 shadow-1 dark:bg-gray-dark border border-stroke dark:border-stroke-dark">
        <h3 className="text-base font-bold text-dark dark:text-white mb-2">Role Permission Matrix</h3>
        <p className="text-xs text-dark-4 dark:text-dark-6 mb-4">Access permissions grid by administrative role.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-dark dark:text-white">
            <thead className="bg-gray-2 text-xs font-semibold uppercase text-dark-4 dark:bg-dark-2 dark:text-dark-6">
              <tr>
                <th className="p-3">Module</th>
                {roles.map((r) => (
                  <th key={r} className="p-3 text-center">{r}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke dark:divide-stroke-dark text-xs font-medium">
              {modules.map((m) => (
                <tr key={m}>
                  <td className="p-3 font-bold">{m}</td>
                  {roles.map((r) => {
                    const isSuper = r === "Super Admin";
                    const isOps = r === "Ops Manager" && m !== "Settings" && m !== "Finance";
                    const isSupport = r === "Support Rep" && (m === "Orders" || m === "Users" || m === "Reviews" || m === "Support");
                    const isFinance = r === "Finance Manager" && (m === "Finance" || m === "Orders" || m === "Analytics");
                    const hasAccess = isSuper || isOps || isSupport || isFinance;

                    return (
                      <td key={r} className="p-3 text-center">
                        <span className={`text-base ${hasAccess ? "text-emerald-500" : "text-gray-300 dark:text-gray-700"}`}>
                          {hasAccess ? "✓" : "✕"}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Admin Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-dark border border-stroke dark:border-stroke-dark">
            <h3 className="text-lg font-bold text-dark dark:text-white mb-4">Add Staff Admin User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. David Miller"
                  className="w-full rounded-lg border border-stroke bg-gray-2 p-2.5 text-sm dark:border-stroke-dark dark:bg-dark-2 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Work Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="david@grabb.com"
                  className="w-full rounded-lg border border-stroke bg-gray-2 p-2.5 text-sm dark:border-stroke-dark dark:bg-dark-2 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full rounded-lg border border-stroke bg-gray-2 p-2.5 text-sm dark:border-stroke-dark dark:bg-dark-2 dark:text-white"
                >
                  <option value="Ops Manager">Ops Manager</option>
                  <option value="Support Rep">Support Rep</option>
                  <option value="Finance Manager">Finance Manager</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setModalOpen(false)} className="rounded-lg border border-stroke px-4 py-2 text-sm font-medium">
                Cancel
              </button>
              <button onClick={handleAddAdmin} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">
                Create Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
