const itemModel = require("../models/item");

async function createItem(req, res) {
    try {
        const newItem = await itemModel.createItem(req.body);
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getItems(req, res) {
    try {
        const items = await itemModel.getItems();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getItemById(req, res) {
    try {
        const item = await itemModel.getItemById(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateItem(req, res) {
    try {
        const updated = await itemModel.updateItem(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Item not found" });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteItem(req, res) {
    try {
        const deleted = await itemModel.deleteItem(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Item not found" });
        res.json(deleted);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
};
