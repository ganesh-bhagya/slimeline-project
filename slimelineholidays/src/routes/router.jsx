import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Packages } from "../pages/packages/Packages";
import { PackageDetail } from "../pages/package-detail/PackageDetail";
import AdminLayout from "../components/admin/AdminLayout";
import AdminLogin from "../pages/admin/Login";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminPackages from "../pages/admin/Packages";
import PackageNew from "../pages/admin/PackageNew";
import PackageEdit from "../pages/admin/PackageEdit";
import AdminEnquiries from "../pages/admin/Enquiries";
import AdminContacts from "../pages/admin/Contacts";
import AdminTestimonials from "../pages/admin/Testimonials";
import TestimonialNew from "../pages/admin/TestimonialNew";
import TestimonialEdit from "../pages/admin/TestimonialEdit";
import EmailSettings from "../pages/admin/EmailSettings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/packages",
    element: <Packages />
  },
  {
    path: "/packages/:slug",
    element: <PackageDetail />
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "login",
        element: <AdminLogin />
      },
      {
        path: "dashboard",
        element: <AdminDashboard />
      },
      {
        path: "packages",
        element: <AdminPackages />
      },
      {
        path: "packages/new",
        element: <PackageNew />
      },
      {
        path: "packages/:id/edit",
        element: <PackageEdit />
      },
      {
        path: "enquiries",
        element: <AdminEnquiries />
      },
      {
        path: "contacts",
        element: <AdminContacts />
      },
      {
        path: "testimonials",
        element: <AdminTestimonials />
      },
      {
        path: "testimonials/new",
        element: <TestimonialNew />
      },
      {
        path: "testimonials/:id/edit",
        element: <TestimonialEdit />
      },
      {
        path: "email-settings",
        element: <EmailSettings />
      }
    ]
  }
]);

export default router;
