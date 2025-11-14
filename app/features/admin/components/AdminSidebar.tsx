"use client";

import React from "react";
import {
  FaHome,
  FaShoppingCart,
  FaQuestionCircle,
  FaSignOutAlt,
  FaBook,
  FaUsers,
  FaTicketAlt,
} from "react-icons/fa";
import { AdminView } from "../types";

interface AdminSidebarProps {
  isOpen: boolean;
  setCurrentView: (view: AdminView) => void;
  currentView: AdminView;
}

const AdminSidebar = ({
  isOpen,
  setCurrentView,
  currentView,
}: AdminSidebarProps) => {
  const menuItems = [
    { id: "home", label: "Dashboard", icon: FaHome },
    { id: "orders", label: "Orders", icon: FaShoppingCart },  
    { id: "courses", label: "Courses", icon: FaBook },
    { id: "cohort", label: "Cohort", icon: FaUsers },
    { id: "referral", label: "Referral Codes", icon: FaTicketAlt },
  ];

  return (
    <aside
      className={`bg-blue-80 fixed text-white w-[50%] md:w-[20%] min-h-screen pt-[12rem] pb-[8.5rem] px-4 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } z-[4000]`}>
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
      <nav>
        <ul className="space-y-10">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setCurrentView(item.id as AdminView)}
                className={`flex items-center space-x-2 w-full text-left ${
                  currentView === item.id
                    ? "text-yellow-base"
                    : "hover:text-yellow-base"
                }`}>
                <item.icon />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
          <li>
            <a
              href="/logout"
              className="flex items-center space-x-2 hover:text-yellow-base">
              <FaSignOutAlt />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
