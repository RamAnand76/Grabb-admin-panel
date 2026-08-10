import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "Analytics",
        url: "/analytics",
        icon: Icons.PieChart,
        items: [],
      },
      {
        title: "Orders",
        icon: Icons.ShoppingBagIcon,
        items: [
          { title: "All Orders", url: "/orders" },
          { title: "Unassigned Queue", url: "/orders/unassigned" },
        ],
      },
      {
        title: "Catalog",
        icon: Icons.Table,
        items: [
          { title: "Categories", url: "/catalog/categories" },
          { title: "Subcategories", url: "/catalog/subcategories" },
          { title: "Products", url: "/catalog/products" },
          { title: "Inventory", url: "/catalog/inventory" },
        ],
      },
      {
        title: "Shops",
        icon: Icons.StoreIcon,
        items: [
          { title: "All Shops", url: "/shops" },
          { title: "Onboarding Queue", url: "/shops/onboarding" },
        ],
      },
      {
        title: "Delivery Partners",
        icon: Icons.DeliveryIcon,
        items: [
          { title: "All Partners", url: "/delivery-partners" },
          { title: "Verification Queue", url: "/delivery-partners/onboarding" },
        ],
      },
      {
        title: "Customers",
        url: "/users",
        icon: Icons.User,
        items: [],
      },
    ],
  },
  {
    label: "MARKETING & FINANCE",
    items: [
      {
        title: "Promotions",
        icon: Icons.TagIcon,
        items: [
          { title: "Coupons", url: "/promotions/coupons" },
          { title: "Banners", url: "/promotions/banners" },
          { title: "Push Notifications", url: "/promotions/notifications" },
        ],
      },
      {
        title: "Finance",
        icon: Icons.DollarSignIcon,
        items: [
          { title: "Payouts", url: "/finance/payouts" },
          { title: "Commission Rules", url: "/finance/commission" },
          { title: "Settlement Reports", url: "/finance/reports" },
        ],
      },
      {
        title: "Reviews",
        url: "/reviews",
        icon: Icons.StarIcon,
        items: [],
      },
      {
        title: "Support Tickets",
        url: "/support",
        icon: Icons.HelpCircleIcon,
        items: [],
      },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      {
        title: "Settings",
        icon: Icons.SettingsIcon,
        items: [
          { title: "Admin Users & Roles", url: "/settings/admins" },
          { title: "App Config", url: "/settings/config" },
          { title: "Audit Log", url: "/settings/audit-log" },
        ],
      },
    ],
  },
];
