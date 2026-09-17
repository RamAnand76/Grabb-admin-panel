"use client";

import { useState } from "react";

interface SurgeZone {
  id: string;
  name: string;
  baseFee: string;
  surgeMultiplier: number;
  surgeReason: "None" | "Rain" | "High Demand" | "Festival";
  activeDrivers: number;
  pendingOrders: number;
  isActive: boolean;
}

export default function SurgePricingPage() {
  const [zones, setZones] = useState<SurgeZone[]>([
    { id: "z1", name: "Downtown Metro", baseFee: "$2.50", surgeMultiplier: 1.5, surgeReason: "High Demand", activeDrivers: 15, pendingOrders: 45, isActive: true },
    { id: "z2", name: "North Hills Suburb", baseFee: "$4.00", surgeMultiplier: 1.0, surgeReason: "None", activeDrivers: 8, pendingOrders: 10, isActive: false },
    { id: "z3", name: "University District", baseFee: "$1.80", surgeMultiplier: 2.0, surgeReason: "Rain", activeDrivers: 4, pendingOrders: 32, isActive: true },
  ]);

  const toggleSurge = (id: string) => {
    setZones(prev => prev.map(z => z.id === id ? { ...z, isActive: !z.isActive, surgeMultiplier: z.isActive ? 1.0 : 1.5, surgeReason: z.isActive ? "None" : "High Demand" } : z));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark dark:text-white">Dynamic Surge Pricing</h1>
        <p className="text-sm text-dark-4 dark:text-dark-6">
          Manage real-time delivery fee multipliers to incentivize fleet drivers during peak hours or bad weather.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {zones.map(zone => (
          <div key={zone.id} className={`rounded-2xl p-6 shadow-1 border transition-all ${zone.isActive ? 'bg-primary/5 border-primary dark:bg-primary/10' : 'bg-white border-stroke dark:bg-gray-dark dark:border-stroke-dark'}`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg text-dark dark:text-white">{zone.name}</h3>
              <button 
                onClick={() => toggleSurge(zone.id)}
                className={`px-3 py-1 text-xs font-bold rounded-full ${zone.isActive ? 'bg-rose-500 text-white shadow-rose-500/30 shadow-lg' : 'bg-gray-2 text-dark-4 dark:bg-dark-2 dark:text-dark-6'}`}
              >
                {zone.isActive ? 'SURGE ACTIVE' : 'TURN ON SURGE'}
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-dark-4 dark:text-dark-6">Base Fee:</span>
                <span className="font-semibold">{zone.baseFee}</span>
              </div>
              
              <div className="flex justify-between text-sm items-center">
                <span className="text-dark-4 dark:text-dark-6">Multiplier:</span>
                {zone.isActive ? (
                  <select 
                    className="bg-transparent border-b border-primary text-primary font-bold focus:outline-none"
                    value={zone.surgeMultiplier}
                    onChange={(e) => setZones(prev => prev.map(z => z.id === zone.id ? {...z, surgeMultiplier: parseFloat(e.target.value)} : z))}
                  >
                    <option value={1.2}>1.2x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={1.8}>1.8x</option>
                    <option value={2.0}>2.0x</option>
                    <option value={2.5}>2.5x</option>
                  </select>
                ) : (
                  <span className="font-semibold text-dark-4">1.0x</span>
                )}
              </div>

              <div className="flex justify-between text-sm items-center">
                <span className="text-dark-4 dark:text-dark-6">Reason:</span>
                {zone.isActive ? (
                  <select 
                    className="bg-transparent border-b border-primary text-primary font-bold focus:outline-none"
                    value={zone.surgeReason}
                    onChange={(e) => setZones(prev => prev.map(z => z.id === zone.id ? {...z, surgeReason: e.target.value as any} : z))}
                  >
                    <option value="High Demand">High Demand</option>
                    <option value="Rain">Rain / Weather</option>
                    <option value="Festival">Festival Rush</option>
                  </select>
                ) : (
                  <span className="font-semibold text-dark-4">None</span>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-stroke dark:border-stroke-dark grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-dark-4 dark:text-dark-6 mb-1">Active Drivers</p>
                  <p className={`font-bold ${zone.activeDrivers < 10 ? 'text-rose-500' : 'text-emerald-500'}`}>{zone.activeDrivers}</p>
                </div>
                <div>
                  <p className="text-xs text-dark-4 dark:text-dark-6 mb-1">Pending Orders</p>
                  <p className={`font-bold ${zone.pendingOrders > 30 ? 'text-rose-500' : 'text-dark dark:text-white'}`}>{zone.pendingOrders}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
