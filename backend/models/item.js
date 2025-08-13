const pool = require("../db");

async function createItem(data) {
    const {
        title, upc, elid, description, brand, model,
        color, size, category, currency,
        lowest_recorded_price, highest_recorded_price,
        images
    } = data;

    const result = await pool.query(
        `INSERT INTO items
         (title, upc, elid, description, brand, model, color, size, category, currency,
          lowest_recorded_price, highest_recorded_price, images)
         VALUES
         ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
         RETURNING *`,
        [
            title, upc, elid, description, brand, model,
            color, size, category, currency,
            lowest_recorded_price, highest_recorded_price,
            images
        ]
    );
    return result.rows[0];
}

async function getItems() {
    const result = await pool.query(`SELECT * FROM items ORDER BY id ASC`);
    return result.rows;
}

async function getItemById(id) {
    const result = await pool.query(`SELECT * FROM items WHERE id = $1`, [id]);
    return result.rows[0];
}

async function updateItem(id, data) {
    // Dynamically build the update query
    const fields = [];
    const values = [];
    let idx = 1;

    for (const [key, value] of Object.entries(data)) {
        fields.push(`${key} = $${idx}`);
        values.push(value);
        idx++;
    }
    values.push(id); // For WHERE clause

    const query = `UPDATE items SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`;
    const result = await pool.query(query, values);
    return result.rows[0];
}

async function deleteItem(id) {
    const result = await pool.query(`DELETE FROM items WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
}

module.exports = {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
};


// https://www.upcitemdb.com/wp/docs/main/development/responses/

// const mongoose = require('mongoose');

// const itemSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     upc: { type: String },
//     elid: { type: String },
//     description: { type: String },
//     brand: { type : String },
//     model: { type: String },
//     color: { type: String },
//     size: { type: String },
//     category: { type: String },
//     currency: { type: String },
//     lowest_recorded_price: { type: Number },
//     highest_recorded_price: { type: Number },
//     images: { type: [String] },
// });

// const Item = mongoose.model('Item', itemSchema);

// module.exports = Item;