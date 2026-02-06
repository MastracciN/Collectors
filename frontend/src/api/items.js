export async function createItem(formData){
  const res = await fetch(`/api/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!res.ok)
    throw new Error("Failed to create item");
  return res.json();
}

export async function deleteItem(id) {
  const res = await fetch(`/api/items/${id}`, { 
    method: "DELETE" 
  });
  if (!res.ok) 
    throw new Error("Failed to delete item");
  return res.json();
}
