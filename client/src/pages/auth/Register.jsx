import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // แก้จาก motion/react เป็น framer-motion (มาตรฐาน)
import { useForm } from "react-hook-form";
import { z } from "zod";
import zxcvbn from "zxcvbn";
import { zodResolver } from "@hookform/resolvers/zod";

// 1. ปรับ Schema ให้ครอบคลุม
const registerSchema = z
  .object({
    email: z.string().email({ message: "รูปแบบอีเมลไม่ถูกต้อง" }),
    password: z
      .string()
      .min(6, { message: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange", // ตรวจสอบ error ทันทีที่พิมพ์
  });

  // 2. ใช้ watch เฉพาะฟิลด์ที่ต้องการเพื่อลดการ Re-render ที่ไม่จำเป็น
  const passwordValue = watch("password", "");

  useEffect(() => {
    const result = zxcvbn(passwordValue);
    setPasswordScore(passwordValue ? result.score : -1); // -1 คือยังไม่ได้พิมพ์
  }, [passwordValue]);

  const onSubmit = async (data) => {
    // 3. ตรวจสอบความปลอดภัยก่อนส่ง (Optional)
    if (passwordScore < 2) {
      toast.warning("รหัสผ่านคาดเดาง่ายเกินไป กรุณาเพิ่มความซับซ้อน");
      return;
    }

    try {
      // ปรับปรุง: ส่งเฉพาะข้อมูลที่จำเป็นไป Backend (ไม่ส่ง confirmPassword)
      const { email, password } = data;
      await axios.post("http://localhost:4100/api/register", { email, password });
      
      toast.success("ลงทะเบียนสำเร็จแล้ว 🎉");
      navigate("/login");
    } catch (err) {
      const errMsg = err.response?.data?.message || "การลงทะเบียนล้มเหลว";
      toast.error(errMsg);
    }
  };

  // ฟังก์ชันช่วยกำหนดสีของ Strength Bar
  const getStrengthColor = (index) => {
    if (index > passwordScore) return "bg-gray-200"; // ส่วนที่ยังไปไม่ถึง
    switch (passwordScore) {
      case 0: case 1: return "bg-red-500";
      case 2: return "bg-yellow-500";
      case 3: return "bg-blue-500";
      case 4: return "bg-green-500";
      default: return "bg-gray-200";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100 p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="name@company.com"
              className={`w-full px-4 py-2 rounded-lg border transition-all outline-none ${
                errors.email ? "border-red-400 focus:ring-red-100" : "border-gray-200 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50"
              }`}
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-2 rounded-lg border transition-all outline-none ${
                errors.password ? "border-red-400" : "border-gray-200 focus:border-cyan-400"
              }`}
              {...register("password")}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}

            {/* Password Strength Indicator */}
            {passwordValue && (
              <div className="flex gap-1 mt-2">
                {[0, 1, 2, 3, 4].map((step) => (
                  <div key={step} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${getStrengthColor(step)}`} />
                ))}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-2 rounded-lg border transition-all outline-none ${
                errors.confirmPassword ? "border-red-400" : "border-gray-200 focus:border-cyan-400"
              }`}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-2.5 rounded-xl shadow-lg hover:shadow-cyan-200/50 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Loading..." : "Register"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-cyan-600 font-semibold hover:underline">
            Login
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;