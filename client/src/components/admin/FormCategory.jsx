import React, { useState, useEffect } from "react";
import { createCategory, listCategory, removeCategory } from "../../api/Category";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { Plus, Trash2, FolderOpen } from "lucide-react";

const FormCategory = () => {
  const token = useEcomStore((state) => state.token);
  const [name, setName] = useState("");
  const categories = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);

  useEffect(() => {
    getCategory(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return toast.warning("⚠️ Please enter category name");
    }

    try {
      const res = await createCategory(token, { name });
      toast.success(`✅ Category "${res.data.name}" added successfully`);
      setName("");
      await getCategory(token);
    } catch (err) {
      console.log(err);
      toast.error("❌ Failed to add category");
    }
  };

  const handleRemove = async (id) => {
    try {
      const res = await removeCategory(token, id);
      toast.success(`🗑️ Category "${res.data.name}" deleted`);
      await getCategory(token);
    } catch (err) {
      console.log(err);
      toast.error("❌ Failed to delete category");
    }
  };

  return (
    <div className="container mx-auto max-w-lg bg-white rounded-2xl shadow-md p-8 border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <FolderOpen className="text-teal-500" size={24} />
        <h1 className="text-2xl font-semibold text-gray-800">
          Category Management
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex gap-3 items-center mb-8">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
        />
        <button
          type="submit"
          className="flex items-center gap-1 px-4 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 active:scale-95 transition"
        >
          <Plus size={18} />
          Add
        </button>
      </form>

      {/* List */}
      <div className="space-y-2">
        {categories.length === 0 ? (
          <p className="text-gray-500 text-center italic py-4">
            No categories available
          </p>
        ) : (
          categories.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-teal-50 transition"
            >
              <span className="text-gray-700 font-medium">{item.name}</span>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 hover:text-red-600 active:scale-95 transition flex items-center gap-1"
              >
                <Trash2 size={18} />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FormCategory;
