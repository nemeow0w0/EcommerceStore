// rafce

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CircleGauge } from "lucide-react";
import { SquareChartGantt, LogOut } from "lucide-react";
import { ChartBarStacked } from "lucide-react";
import { Package } from "lucide-react";
import useEcomStore from "../../store/ecom-store";

const SidebarAdmin = () => {
  const navigate = useNavigate();
  // 2. ดึงฟังก์ชัน logout ออกมาจาก Store
  const logout = useEcomStore((state) => state.logout);

  const handleLogout = () => {
    if (window.confirm("คุณต้องการออกจากระบบใช่หรือไม่?")) {
      logout(); // ล้างข้อมูลใน Zustand และ LocalStorage (ตามที่คุณเขียนไว้)
      navigate("/login"); // ส่งกลับไปหน้า Login
    }
  };
  return (
    <div className="bg-gray-900 w-64 text-gray-100 flex flex-col h-screen">
      <div className="h-24 bg-black flex items-center justify-center text-2xl font-bold">
        Admin Panel
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <NavLink
          to={"/admin"}
          end
          className={({ isActive }) =>
            isActive
              ? "bg-black text-white px-4 py-2 rounded-md hover:bg-neutral-900 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-neutral-900 hover:text-white rounded flex items-center"
          }
        >
          <CircleGauge className="mr-3" />
          Dasboard
        </NavLink>
        <NavLink
          to={"manage"}
          className={({ isActive }) =>
            isActive
              ? "bg-black text-white px-4 py-2 rounded-md hover:bg-neutral-900 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-neutral-900 hover:text-white rounded flex items-center"
          }
        >
          <SquareChartGantt className="mr-3" />
          Manage
        </NavLink>
        <NavLink
          to={"category"}
          className={({ isActive }) =>
            isActive
              ? "bg-black text-white px-4 py-2 rounded-md hover:bg-neutral-900 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-neutral-900 hover:text-white rounded flex items-center"
          }
        >
          <ChartBarStacked className="mr-3" />
          Category
        </NavLink>
        <NavLink
          to={"product"}
          className={({ isActive }) =>
            isActive
              ? "bg-black text-white px-4 py-2 rounded-md hover:bg-neutral-900 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-neutral-900 hover:text-white rounded flex items-center"
          }
        >
          <Package className="mr-3" />
          product
        </NavLink>
        <NavLink
          to={"orders"}
          className={({ isActive }) =>
            isActive
              ? "bg-black text-white px-4 py-2 rounded-md hover:bg-neutral-900 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-neutral-900 hover:text-white rounded flex items-center"
          }
        >
          <Package className="mr-3" />
          Orders
        </NavLink>
      </nav>

      {/* ส่วนปุ่ม Logout ด้านล่างสุด */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full text-gray-400 px-4 py-2 hover:bg-red-500 hover:text-white rounded-lg flex items-center transition-all duration-300 group"
        >
          <LogOut className="mr-3 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarAdmin;
