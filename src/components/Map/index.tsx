import dynamic from "next/dynamic";

export const DynamicMap = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-2 dark:bg-dark-2">
      <p className="text-dark-4 dark:text-dark-6 animate-pulse">Loading map...</p>
    </div>
  ),
});
