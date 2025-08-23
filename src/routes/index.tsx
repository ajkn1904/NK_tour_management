import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Verify from "@/pages/Verify";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { adminSidebarItems } from "./adminSidebarItems";
import { generateRoutes } from "@/utils/generateRoutes";
import { userSidebarItems } from "./userSidebarItems";
import Unauthorized from "@/pages/Unauthorized";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import Homepage from "@/pages/HomePage";
import Tours from "@/pages/Tours";
import TourDetails from "@/pages/TourDetails";
import Booking from "@/pages/Booking";
import Success from "@/pages/Payment/Success";
import Fail from "@/pages/Payment/Fail";
import Cancel from "@/pages/Payment/Cancel";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: Homepage,
                path: "/"
            },
            {
                Component: About,
                path: "about"
            },
            {
                Component: Tours,
                path: "tours",
            },
            {
                Component: TourDetails,
                path: "tours/:id",
            },
            {
                Component: withAuth(Booking),
                path: "booking/:id",
            },
        ]

    },
    {
        Component: Login,
        path: "/login"
    },
    {
        Component: Register,
        path: "/register"
    },
    {
        Component: Verify,
        path: "/verify"
    },

    {
        Component: withAuth(DashboardLayout, (role.superAdmin || role.admin) as TRole),
        path: "/admin",
        children: [
            {index: true, element: <Navigate to="/admin/analytics" />},
            ... generateRoutes(adminSidebarItems) 
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.user as TRole),
        path: "/user",
        children: [
            {index: true, element: <Navigate to="/user/bookings" />},
            ...generateRoutes(userSidebarItems)
        ]
    },

    {
        Component: Unauthorized,
        path: "/unauthorized"
    },
    {
        Component: Success,
        path: "/payment/success",
    },
    {
        Component: Fail,
        path: "/payment/fail",
    },
    {
        Component: Cancel,
        path: "/payment/cancel",
    },
])

