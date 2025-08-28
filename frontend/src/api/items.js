export async function deleteItem(id) {
  const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete item");
  return res.json();
}
