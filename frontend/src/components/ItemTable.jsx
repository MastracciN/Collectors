import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ItemTable = () => {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch('api/items')
        .then(res => res.json())
        .then((data) => setItems(data))
        .catch((err) => console.error("Error fetching items:", err));
    }, []);

    const filteredItems = items.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="max-w-3xl mx-auto mt-8 p-4 bg-white rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Items</h2>
            <input
                type="text"
                placeholder="Search items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Link
                to="/items/createItem"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                Create New Item
            </Link>
            <Link
                to="/upcscanner"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                Scan New Item
            </Link>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-3">ID</th>
                        <th className="p-3">Name</th>
                        <th className="p-3"></th>
                        <th className="p-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((item) => (
                        <tr
                            key={item.id}
                            onClick={() => navigate(`/items/${item.id}`)}
                            className="border-b hover:bg-gray-50 transition cursor-pointer"
                        >
                            <td className="p-3">{item.id}</td>
                            <td className="p-3">{item.title}</td>
                            <td className="p-3"></td>
                            <td className="p-3"></td>
                        </tr>
                    ))}
                    {filteredItems.length === 0 && (
                        <tr>
                            <td colSpan="4" className="p-3 text-center text-gray-500">
                            No items found.
                            </td>
                        </tr>
                    )}
                </tbody>
                </table>
            </div>
        </div>
    );
};

export default ItemTable;