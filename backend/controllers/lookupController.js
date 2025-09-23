// import { fetchUPCData } from "../services/lookupService.js";

// async function lookup(req, res) {
//     try {
//         const upc = req.body;
//         if (!upc) {
//             return res.status(400).json({ error: "UPC code is required" });
//         }

//         const data = await fetchUPCData(upc);
//         res.json(data);
//     } catch (err) {
//         console.error("Lookup error:", err);
//         res.status(500).json({ error: "Failed to fetch UPC data" });
//     }
// };

// module.exports = {
//     lookup
// };

import { fetchUPCData } from "../services/lookupService.js";

export const lookupUPC = async (req, res) => {
  try {
    const { upc } = req.body;
    if (!upc) {
      return res.status(400).json({ error: "UPC code is required" });
    }

    const data = await fetchUPCData(upc);
    res.json(data);
  } catch (err) {
    console.error("Lookup error:", err);
    res.status(500).json({ error: "Failed to fetch UPC data" });
  }
};



