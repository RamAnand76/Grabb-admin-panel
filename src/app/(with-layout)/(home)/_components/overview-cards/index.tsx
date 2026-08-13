import Link from "next/link";
import { OverviewCard } from "./card";
import * as icons from "./icons";

export async function OverviewCardsGroup() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 sm:gap-6 2xl:gap-7.5">
      <OverviewCard
        label="Monthly Subscription Rev"
        data={{
          value: "$12,450",
          growthRate: 14.2,
        }}
        Icon={icons.Profit}
      />

      <Link href="/subscriptions/active" className="block transition-transform hover:scale-[1.02]">
        <OverviewCard
          label="Active Premium Shops"
          data={{
            value: "185",
            growthRate: 8.5,
          }}
          Icon={icons.Views}
        />
      </Link>

      <Link href="/shops/onboarding" className="block transition-transform hover:scale-[1.02]">
        <OverviewCard
          label="Pending Shops"
          data={{
            value: "14",
            growthRate: -2.4,
          }}
          Icon={icons.Product}
        />
      </Link>

      <Link href="/delivery-partners" className="block transition-transform hover:scale-[1.02]">
        <OverviewCard
          label="Active Delivery Drivers"
          data={{
            value: "42/50",
            growthRate: 5.0,
          }}
          Icon={icons.Users}
        />
      </Link>

      <Link href="/orders/unassigned" className="block transition-transform hover:scale-[1.02]">
        <OverviewCard
          label="Unassigned Orders"
          data={{
            value: "8",
            growthRate: -15.0,
          }}
          Icon={icons.Product}
        />
      </Link>

      <Link href="/support" className="block transition-transform hover:scale-[1.02]">
        <OverviewCard
          label="Open Support Tickets"
          data={{
            value: "5",
            growthRate: -10.0,
          }}
          Icon={icons.Users}
        />
      </Link>
    </div>
  );
}
