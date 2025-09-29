
const fetchUPCData = async (upc) => {
  const response = await fetch("https://api.upcitemdb.com/prod/trial/lookup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Uncomment these if you have a user key
      // "user_key": process.env.UPC_API_KEY,
      // "key_type": "3scale",
    },
    body: JSON.stringify({ upc }),
  });

  if (!response.ok) {
    throw new Error(`UPC API error: ${response.status}`);
  }

  return await response.json();
};

module.exports = fetchUPCData;

