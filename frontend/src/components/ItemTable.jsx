import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ItemTable = () => {

    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('api/items')
        .then(res => res.json())
        .then((data) => setItems(data))
        .catch((err) => console.error("Error fetching items:", err));
    }, []);

    return (
        <div className="max-w-3xl mx-auto mt-8 p-4 bg-white rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Items</h2>
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
                    {items.map((item) => (
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
                </tbody>
                </table>
            </div>
        </div>
    );
};

export default ItemTable;