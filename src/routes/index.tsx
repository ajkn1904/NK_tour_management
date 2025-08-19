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

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: About,
                path: "about"
            }
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
        Component: DashboardLayout,
        path: "/admin",
        children: [
            {index: true, element: <Navigate to="/admin/analytics" />},
            ... generateRoutes(adminSidebarItems) 
        ]
    },
    {
        Component: DashboardLayout,
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
])

