import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`/api/items/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data))
      .catch((err) => console.error("Error fetching item:", err));
  }, [id]);

  if (!item) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Item Details</h2>
      <p><span className="font-semibold">ID:</span> {item.id}</p>
      <p><span className="font-semibold">Name:</span> {item.title}</p>
      
      <Link
        to="/"
        className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Back to Items
      </Link>
    </div>
  );
}
