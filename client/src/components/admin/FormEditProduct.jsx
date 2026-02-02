import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, readProduct, updateProduct } from "../../api/product";
import { toast } from "react-toastify";
import { Uploadfile } from "./Uploadfile";
import { useParams, useNavigate } from "react-router-dom";



const initailState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: []
};

const FormEditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
 
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  
  const [form, setForm] = useState(initailState);

  
  //console.log(products)
  useEffect(() => {
    //code
    getCategory();
    fetchProduct(token,id,form)

  }, []);

  const fetchProduct = async (token,id,form) => {
    try {
        // code
        const res = await readProduct(token,id,form)
        console.log('res from backend',res)
        setForm(res.data)
    } catch (err) {
        console.log('Error fetch data',err)
    }
  }
  console.log('Editform',form)

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(token,id, form);
      toast.success(`Added product: ${res.data.title} successfully`);
      navigate('/admin/product')
      await getProduct(token, 20); // โหลด list ใหม่
    } catch (err) {
      console.log(err);
      //toast.error("❌ Failed to save product");
    }
  };

  
  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* หัวข้อ */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Product Management
      </h1>

      {/* ฟอร์มเพิ่ม Product */}
      <form
        onSubmit={handlesubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={form.title}
          onChange={handleOnChange}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleOnChange}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={form.price}
          onChange={handleOnChange}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <input
          type="number"
          placeholder="Quantity"
          name="quantity"
          value={form.quantity}
          onChange={handleOnChange}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleOnChange}
          required
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <hr />
        {/**upload file */}
        <div className="col-span-full">
          <div className="border border-dashed border-gray-300 rounded-md p-4 text-center hover:border-cyan-400 transition">
              <Uploadfile form={form} setForm={setForm} />
          </div>
        </div>
        
        <div className="col-span-full flex justify-end">
          <button
            type="submit"
            className="bg-cyan-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-cyan-600 transition-all duration-200"
        >
            Edit Product
          </button>
        </div>
      </form>

      {/* ตารางแสดงสินค้า */}
      <div className="overflow-x-auto">

      </div>
    </div>
  );
};

export default FormEditProduct;
