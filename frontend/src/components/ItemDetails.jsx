import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
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
  }, [id]);

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
      await fetch(`/api/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setItem(formData);
      setEditing(false);
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!item) return <div className="p-4">Item not found.</div>;

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        {editing ? "Edit Item" : "Item Details"}
      </h2>

      {!editing ? (
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
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(formData).map(([key, value]) => {
            if (key === "id") {
              return (
                <div key={key}>
                  <label className="block text-sm font-semibold mb-1 capitalize">
                    {key}
                  </label>
                  <input
                    type="text"
                    value={value}
                    disabled
                    className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-500"
                  />
                </div>
              );
            }

            // Boolean field → checkbox
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

            // Number field → number input
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

            // String field → text or textarea
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

            // Default to text input
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
            <button
              type="button"
              onClick={() => {
                setFormData(item);
                setEditing(false);
              }}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
