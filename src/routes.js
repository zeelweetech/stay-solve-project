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

//Organization-Admin
import OrganizationPanelOrg from "views/Organization-admin/Organization";
import OrganizationPanelSearch from "views/Organization-admin/Search";
import OrganizationPanelLocation from "views/Organization-admin/Location";
import OrganizationPanelUsers from "views/Organization-admin/Users";
import OrganizationPanelDocumets from "views/Organization-admin/Documents";

//Location-Admin
import LocationPanelSearch from "views/Location-admin/Search";
import LocationPanelLocation from "views/Location-admin/Location";
import LocationPanelUsers from "views/Location-admin/Users";
import LocationPanelDocuments from "views/Location-admin/Documents";

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
        {
          name: "Search",
          layout: "/",
          path: "search",
          icon: <MdHome className="h-6 w-6" />,
          component: <OrganizationPanelSearch />,
        },
        {
          name: "Organization",
          layout: "/",
          path: "organization",
          icon: <MdHome className="h-6 w-6" />,
          component: <OrganizationPanelOrg />,
        },
        {
          name: "Location",
          layout: "/",
          path: "location",
          icon: <MdHome className="h-6 w-6" />,
          component: <OrganizationPanelLocation />,
        },
        {
          name: "User",
          layout: "/",
          path: "user",
          icon: <MdHome className="h-6 w-6" />,
          component: <OrganizationPanelUsers />,
        },
        {
          name: "Documents",
          layout: "/",
          path: "documents",
          icon: <MdHome className="h-6 w-6" />,
          component: <OrganizationPanelDocumets />,
        },
        {
          name: "Profile",
          layout: "/",
          path: "profile",
          icon: <MdPerson className="h-6 w-6" />,
          component: <Profile />,
        },
      ]
    : Role === "locationuser"
    ? [
        {
          name: "Main Dashboard",
          layout: "/",
          path: "dashboard",
          icon: <MdHome className="h-6 w-6" />,
          component: <MainDashboard />,
        },
        {
          name: "Search",
          layout: "/",
          path: "search",
          icon: <MdHome className="h-6 w-6" />,
          component: <LocationPanelSearch />,
        },
        {
          name: "Location",
          layout: "/",
          path: "location",
          icon: <MdHome className="h-6 w-6" />,
          component: <LocationPanelLocation />,
        },
        {
          name: "Users",
          layout: "/",
          path: "users",
          icon: <MdHome className="h-6 w-6" />,
          component: <LocationPanelUsers />,
        },
        {
          name: "Documents",
          layout: "/",
          path: "documents",
          icon: <MdHome className="h-6 w-6" />,
          component: <LocationPanelDocuments />,
        },
        {
          name: "Profile",
          layout: "/",
          path: "profile",
          icon: <MdPerson className="h-6 w-6" />,
          component: <Profile />,
        },
      ]
    : [];
export default routes;
