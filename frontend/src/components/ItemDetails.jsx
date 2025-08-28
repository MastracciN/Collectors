import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deleteItem } from "../api/items";

export default function ItemForm() {
  const { id } = useParams(); // might be "new" or a number
  const navigate = useNavigate();

  const isNew = id === "new";
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(!isNew); // only load if editing
  const [editing, setEditing] = useState(isNew); // new items start in edit mode
  const [formData, setFormData] = useState({});

  // Fetch existing item only if editing
  useEffect(() => {
    if (!isNew) {
      fetch(`/api/items/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setItem(data);
          setFormData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching item:", err);
          setLoading(false);
        });
    } else {
      // Default empty form for new items
      setFormData({
        title: "",
        description: "",
        price: 0
      });
    }
  }, [id, isNew]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    let newValue = value;
    if (type === "number") newValue = value === "" ? "" : Number(value);
    if (type === "checkbox") newValue = checked;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNew) {
        // Create new item
        await fetch(`/api/items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        // Update existing
        await fetch(`/api/items/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      navigate("/"); // go back to items list
    } catch (err) {
      console.error("Error saving item:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await deleteItem(id);
      navigate("/");
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!isNew && !item) return <div className="p-4">Item not found.</div>;

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        {isNew ? "Create Item" : editing ? "Edit Item" : "Item Details"}
      </h2>

      {!editing && !isNew ? (
        <>
          {Object.entries(item).map(([key, value]) => (
            <p key={key}>
              <span className="font-semibold capitalize">{key}:</span>{" "}
              {typeof value === "boolean" ? (value ? "Yes" : "No") : String(value)}
            </p>
          ))}

          <div className="flex justify-between mt-4">
            <Link
              to="/"
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Back
            </Link>
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete Item
          </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(formData).map(([key, value]) => {
            if (key === "id") return null; // don't show id for new items

            if (typeof value === "boolean") {
              return (
                <div key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={key}
                    checked={value}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <label className="text-sm font-semibold capitalize">
                    {key}
                  </label>
                </div>
              );
            }

            if (typeof value === "number") {
              return (
                <div key={key}>
                  <label className="block text-sm font-semibold mb-1 capitalize">
                    {key}
                  </label>
                  <input
                    type="number"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              );
            }

            if (typeof value === "string" && value.length > 80) {
              return (
                <div key={key}>
                  <label className="block text-sm font-semibold mb-1 capitalize">
                    {key}
                  </label>
                  <textarea
                    name={key}
                    value={value}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              );
            }

            return (
              <div key={key}>
                <label className="block text-sm font-semibold mb-1 capitalize">
                  {key}
                </label>
                <input
                  type="text"
                  name={key}
                  value={value ?? ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            );
          })}

          <div className="flex justify-between">
            <Link
              to="/"
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              {isNew ? "Create" : "Save"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
