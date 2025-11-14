"use client";

import React, { useState } from "react";
import { Layout, Nav, FullPageLoader } from "@/app/components";
import AdminSidebar from "./AdminSidebar";
import DashboardHome from "./DashboardHome";
import OrdersView from "./OrdersView";
import CreateCourseModal from "./CreateCourseModal";
import EditCourseModal from "./EditCourseModal";
import CreateCohortModal from "./CreateCohortModal";
import CreateReferralModal from "./CreateReferralModal";
import { Course } from "../../courses/slice/courseSlice";
import { selectStatus, selectError } from "../slice/courseManagementSlice";
import { useAppSelector } from "@/lib/hooks";
import { AdminView } from "@/app/features/admin/types";
import CoursesList from "@/app/features/admin/components/CourseList";
import OrderDetail from "@/app/features/admin/components/OrderDetail";
import CohortMembers from "./CohortMembers";
import CohortsView from "./CohortsView";
import ReferralCodesView from "./ReferralCodesView";

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState<AdminView>("home");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isCreateCohortModalOpen, setIsCreateCohortModalOpen] = useState(false);
  const [isCreateReferralModalOpen, setIsCreateReferralModalOpen] =
    useState(false);

  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  const renderView = () => {
    switch (currentView) {
      case "home":
        return (
          <DashboardHome
            setIsCreateModalOpen={setIsCreateModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            setSelectedCourse={setSelectedCourse}
            setCurrentView={setCurrentView}
            setSelectedOrderId={setSelectedOrderId}
            setIsCreateCohortModalOpen={setIsCreateCohortModalOpen}
          />
        );
      case "orders":
        return (
          <OrdersView
            setCurrentView={setCurrentView}
            setSelectedOrderId={setSelectedOrderId}
          />
        );
      case "courses":
        return (
          <CoursesList
            setSelectedCourse={setSelectedCourse}
            setIsEditModalOpen={setIsEditModalOpen}
            includeAllCoursesButton={false}
            includeAllCoursesHeading={true}
            setIsCreateModalOpen={setIsCreateModalOpen}
            setCurrentView={setCurrentView}
          />
        );
      case "cohort":
        return (
          <CohortsView
            setIsCreateCohortModalOpen={setIsCreateCohortModalOpen}
          />
        );
      case "order-detail":
        return selectedOrderId ? (
          <OrderDetail
            orderId={selectedOrderId}
            onBack={() => {
              setCurrentView("orders");
              setSelectedOrderId(null);
            }}
          />
        ) : null;
      case "cohort-members":
        return selectedCourse ? (
          <CohortMembers
            courseId={selectedCourse?._id || ""}
            onBack={() => {
              setCurrentView("courses");
              setSelectedCourse(null);
            }}
          />
        ) : null;
      case "referral":
        return (
          <ReferralCodesView
            setIsCreateReferralModalOpen={setIsCreateReferralModalOpen}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Nav
        navbarIsColored={true}
        includeTopSpacer={false}
        isAdmin={true}
        toggleAdminSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex">
        <AdminSidebar
          isOpen={isSidebarOpen}
          setCurrentView={setCurrentView}
          currentView={currentView}
        />
        <main className="flex-1 ml-auto px-4 pt-[12rem] pb-[8.5rem] md:px-8 max-w-[100%] md:max-w-[80%]">
          <Layout>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-80 mb-6 md:mb-8">
              Admin Dashboard
            </h1>
            {renderView()}
          </Layout>
        </main>
      </div>
      <CreateCourseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <EditCourseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        course={selectedCourse}
      />
      <CreateCohortModal
        isOpen={isCreateCohortModalOpen}
        onClose={() => setIsCreateCohortModalOpen(false)}
      />
      <CreateReferralModal
        isOpen={isCreateReferralModalOpen}
        onClose={() => setIsCreateReferralModalOpen(false)}
      />
      {status === "failed" && <p>{error}</p>}
      {status === "loading" && <FullPageLoader />}
    </>
  );
}
