import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import Organization from "views/admin/Organization";
import Location from "views/admin/Location";
import User from "views/admin/User";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

const Role = localStorage?.getItem("role");

const routes =
  Role === "superadmin"
    ? [
        {
          name: "Main Dashboard",
          layout: "/",
          path: "dashboard",
          icon: <MdHome className="h-6 w-6" />,
          component: <MainDashboard />,
        },
        {
          name: "Organization",
          layout: "/",
          path: "organization",
          icon: <MdHome className="h-6 w-6" />,
          component: <Organization />,
        },
        {
          name: "Location",
          layout: "/",
          path: "location",
          icon: <MdHome className="h-6 w-6" />,
          component: <Location />,
        },
        {
          name: "User",
          layout: "/",
          path: "user",
          icon: <MdLock className="h-6 w-6" />,
          component: <User />,
        },
        // {
        //   name: "NFT Marketplace",
        //   layout: "/",
        //   path: "nft-marketplace",
        //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
        //   component: <NFTMarketplace />,
        //   secondary: true,
        // },
        // {
        //   name: "Data Tables",
        //   layout: "/",
        //   icon: <MdBarChart className="h-6 w-6" />,
        //   path: "data-tables",
        //   component: <DataTables />,
        // },
        {
          name: "Profile",
          layout: "/",
          path: "profile",
          icon: <MdPerson className="h-6 w-6" />,
          component: <Profile />,
        },
        // {
        //   name: "RTL Admin",
        //   layout: "/rtl",
        //   path: "rtl",
        //   icon: <MdHome className="h-6 w-6" />,
        //   component: <RTLDefault />,
        // },
      ]
    : Role === "organizationuser"
    ? [
        {
          name: "Main Dashboard",
          layout: "/",
          path: "dashboard",
          icon: <MdHome className="h-6 w-6" />,
          component: <MainDashboard />,
        },
      ]
    : Role === "locationuser"
    ? []
    : [];
export default routes;
