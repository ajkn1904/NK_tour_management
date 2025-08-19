import { createBrowserRouter } from "react-router";
import App from "../App";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Verify from "@/pages/Verify";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Analytics from "@/pages/Admin/Analytics";
import Bookings from "@/pages/User/Bookings";
import AddTour from "@/pages/Admin/AddTour";
import AddTourType from "@/pages/Admin/AddTourType";

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
        path: "login"
    },
    {
        Component: Register,
        path: "register"
    },
    {
        Component: Verify,
        path: "verify"
    },

    {
        Component: DashboardLayout,
        path: "/admin",
        children: [
            {
                Component: Analytics,
                path: "analytics"
            },
            {
                Component: AddTour,
                path: "add-tour"
            },
            {
                Component: AddTourType,
                path: "add-tour-type"
            }
        ]
    },
    {
        Component: DashboardLayout,
        path: "/user",
        children: [
            {
                Component: Bookings,
                path: "bookings"
            }
        ]
    },
])