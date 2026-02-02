import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, readProduct, listProduct, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import { Uploadfile } from "./Uploadfile";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { FormatsNumber } from "../../utils/formatsnumber";
import { DateFormat } from "../../utils/FormatDate";

const initailState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: []
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const [form, setForm] = useState(initailState);
  const [clearUpload, setClearUpload] = useState(0);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  useEffect(() => {
    getCategory();
    getProduct(100);
  }, []);

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      toast.success(`✅ Added product: ${res.data.title} successfully`);
      setForm(initailState);
      setClearUpload(prev => prev + 1);
      await getProduct();
    } catch (err) {
      console.log(err);
      toast.error("❌ Failed to save product");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await deleteProduct(token, id);
        toast.success("🗑️ Deleted product successfully");
        getProduct();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">จัดการสินค้า</h1>
          <p className="text-gray-500 text-sm mt-1">เพิ่ม แก้ไข หรือลบสินค้าภายในร้านของคุณ</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handlesubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        <input
          type="text"
          placeholder="ชื่อสินค้า"
          name="title"
          value={form.title}
          onChange={handleOnChange}
          className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 transition text-gray-700"
        />
        <input
          type="text"
          placeholder="คำอธิบาย"
          name="description"
          value={form.description}
          onChange={handleOnChange}
          className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 transition text-gray-700"
        />
        <input
          type="number"
          placeholder="ราคา"
          name="price"
          value={form.price}
          onChange={handleOnChange}
          className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 transition text-gray-700"
        />
        <input
          type="number"
          placeholder="จำนวนสินค้า"
          name="quantity"
          value={form.quantity}
          onChange={handleOnChange}
          className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 transition text-gray-700"
        />
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleOnChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 transition text-gray-700"
        >
          <option value="" disabled>
            เลือกหมวดหมู่สินค้า
          </option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <div className="col-span-full border border-dashed border-gray-300 rounded-xl p-6 hover:border-cyan-400 transition bg-gray-50">
          <Uploadfile form={form} setForm={setForm} clearUpload={clearUpload} />
        </div>

        <div className="col-span-full flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold px-8 py-2.5 rounded-lg hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-sm"
          >
            + เพิ่มสินค้า
          </button>
        </div>
      </form>

      {/* Product Table */}
      <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50 border-b text-gray-600 uppercase text-xs tracking-wide">
            <tr>
              <th className="py-3 px-4 text-left font-medium">#</th>
              <th className="py-3 px-4 text-left font-medium">ภาพ</th>
              <th className="py-3 px-4 text-left font-medium">ชื่อสินค้า</th>
              <th className="py-3 px-4 text-left font-medium">รายละเอียด</th>
              <th className="py-3 px-4 text-left font-medium">ราคา</th>
              <th className="py-3 px-4 text-left font-medium">สต็อก</th>
              <th className="py-3 px-4 text-left font-medium">ขายแล้ว</th>
              <th className="py-3 px-4 text-left font-medium">อัปเดตล่าสุด</th>
              <th className="py-3 px-4 text-center font-medium">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="py-3 px-4 font-medium text-gray-600">{index + 1}</td>
                <td className="py-3 px-4">
                  {item.images.length > 0 ? (
                    <div className="w-14 h-14 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                      <img
                        src={item.images[0].url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">No image</span>
                  )}
                </td>
                <td className="py-3 px-4 font-medium text-gray-800">{item.title}</td>
                <td className="py-3 px-4 text-gray-600">{item.description}</td>
                <td className="py-3 px-4 font-medium text-gray-700">{FormatsNumber(item.price)} ฿</td>
                <td className="py-3 px-4">{item.quantity}</td>
                <td className="py-3 px-4">{item.sold}</td>
                <td className="py-3 px-4 text-gray-500">{DateFormat(item.updatedAt)}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2 justify-center">
                    <Link
                      to={`/admin/product/${item.id}`}
                      className="p-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                    >
                      <Pencil size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormProduct;
