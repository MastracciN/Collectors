import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deleteItem } from "../api/items";

export default function CreateItem() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    upc: "",
    elid: "",
    description: "",
    brand: "",
    model: "",
    color: "",
    size: "",
    category: "",
    currency: "",
    lowest_recorded_price: 0,
    highest_recorded_price: 0,
    images:[],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting:", formData);
    try {
      // Create new item
      await fetch(`/api/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      navigate("/"); // go back to items list
    } catch (err) {
      console.error("Error saving item:", err);
    }
  };
  
  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Create New Item</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label
          className="block text-sm font-semibold mb-1 capitalize">
          Title
        </label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange} 
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
        <label className="block text-sm font-semibold mb-1 capitalize">
          UPC
        </label>
        <input
          name="upc"
          value={formData.upc}
          onChange={handleChange}  
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
        <label className="block text-sm font-semibold mb-1 capitalize">
          Elid
        </label>
        <input 
          name="elid"
          value={formData.elid}
          onChange={handleChange} 
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
        <label className="block text-sm font-semibold mb-1 capitalize">
          Description
        </label>
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}  
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
        <label className="block text-sm font-semibold mb-1 capitalize">
          Brand
        </label>
        <input 
          name="brand"
          value={formData.brand}
          onChange={handleChange} 
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
        <label className="block text-sm font-semibold mb-1 capitalize">
          Model
        </label>
        <input 
          name="model"
          value={formData.model}
          onChange={handleChange} 
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
        <label className="block text-sm font-semibold mb-1 capitalize">
          Color
        </label>
        <input 
          name="color"
          value={formData.color}
          onChange={handleChange} 
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
        <label className="block text-sm font-semibold mb-1 capitalize">
          Size
        </label>
        <input 
          name="size"
          value={formData.size}
          onChange={handleChange} 
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
        <label className="block text-sm font-semibold mb-1 capitalize">
          Category
        </label>
        <input 
          name="category"
          value={formData.category}
          onChange={handleChange} 
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
        <label className="block text-sm font-semibold mb-1 capitalize">
          Currency
        </label>
        <input
          name="currency"
          value={formData.currency}
          onChange={handleChange}  
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
        <label className="block text-sm font-semibold mb-1 capitalize">
          Lowest Recorded Price
        </label>
        <input 
          type="number"
          name="lowest_recorded_price"
          value={formData.lowest_recorded_price}
          onChange={handleChange} 
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
        <label className="block text-sm font-semibold mb-1 capitalize">
          Highest Recorded Price
        </label>
        <input
          type="number"
          name="highest_recorded_price"
          value={formData.highest_recorded_price}
          onChange={handleChange}  
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
        <label className="block text-sm font-semibold mb-1 capitalize">
          Images
        </label>
        <input
          name="images"
          value={formData.images}
          onChange={handleChange}  
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>

        <div className="flex justify-between mt-4">
              <Link
                to="/"
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
                Back
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Create
              </button>
        </div>
      </form>

    </div>
  );
}
