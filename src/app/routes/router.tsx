import { createBrowserRouter, Navigate } from "react-router"
import { OnboardingLayout } from "@/app/layouts/OnboardingLayout"
import { DashboardLayout } from "@/app/layouts/DashboardLayout"
import { AuthLayout } from "@/app/layouts/AuthLayout"
import { OnboardingPage } from "@/features/home/pages/OnboardingPage"
import { LoginPage } from "@/features/auth/pages/LoginPage"
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage"
import { GradesPage } from "@/features/grades/pages/GradesPage"
import { IncidentsPage } from "@/features/incidents/pages/IncidentsPage"
import { AttendancePage } from "@/features/attendance/pages/AttendancePage"
import { SettingsPage } from "@/features/settings/pages/SettingsPage"
import { ProfilePage } from "@/features/settings/pages/ProfilePage"
import { StudentsPage } from "@/features/students/pages/StudentsPage"
import { ReportsPage } from "@/features/reports/pages/ReportsPage"
import { SectionsPage } from "@/features/sections/pages/SectionsPage"
import { SectionDetailPage } from "@/features/sections/pages/SectionDetailPage"
import { ProtectedRoute } from "./ProtectedRoute"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <OnboardingLayout />,
    children: [{ index: true, element: <OnboardingPage /> }],
  },
  {
    path: "/login",
    element: <AuthLayout />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "attendance", element: <AttendancePage /> },
      { path: "grades", element: <GradesPage /> },
      { path: "incidents", element: <IncidentsPage /> },
      { path: "students", element: <StudentsPage /> },
      { path: "sections", element: <SectionsPage /> },
      { path: "sections/:id", element: <SectionDetailPage /> },
      { path: "more", element: <SettingsPage /> },
      { path: "more/profile", element: <ProfilePage /> },
      { path: "more/reports", element: <ReportsPage /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
])
