import Link from "next/link";
import { OverviewCard } from "./card";
import * as icons from "./icons";

export async function OverviewCardsGroup() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 sm:gap-6 2xl:gap-7.5">
      <OverviewCard
        label="Today's Orders"
        data={{
          value: "142",
          growthRate: 12.5,
        }}
        Icon={icons.Views}
      />

      <OverviewCard
        label="Today's Revenue"
        data={{
          value: "$4,820",
          growthRate: 8.3,
        }}
        Icon={icons.Profit}
      />

      <Link href="/orders?status=pending" className="block transition-transform hover:scale-[1.02]">
        <OverviewCard
          label="Pending Orders"
          data={{
            value: "18",
            growthRate: -2.1,
          }}
          Icon={icons.Product}
        />
      </Link>

      <OverviewCard
        label="Active Partners"
        data={{
          value: "34/45",
          growthRate: 5.0,
        }}
        Icon={icons.Users}
      />

      <OverviewCard
        label="New Users Today"
        data={{
          value: "56",
          growthRate: 15.2,
        }}
        Icon={icons.Users}
      />

      <Link href="/catalog/inventory?status=low" className="block transition-transform hover:scale-[1.02]">
        <OverviewCard
          label="Low Stock Items"
          data={{
            value: "12",
            growthRate: -4.5,
          }}
          Icon={icons.Product}
        />
      </Link>
    </div>
  );
}
