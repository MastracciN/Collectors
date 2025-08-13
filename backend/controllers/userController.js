const userModel = require("../models/user");

async function createUser(req, res) {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }
    try {
        const user = await userModel.createUser(name);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getUsers(req, res) {
    try {
        const users = await userModel.getUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getUserById(req, res) {
    try {
        const user = await userModel.getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById
};

// const getUserById =  async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
// Get all users
// const getUsers = async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
// Create a new user
// const createUser = async (req, res) => {
//     try {
//         const newUser = new User({ name: req.body.name });
//         const savedUser = await newUser.save();
//         res.status(201).json(savedUser);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };
// // Get user by id
// app.get('/users/:id', (req, res) => {
//     try{
//         const user = users.find((u) => u.id === parseInt(req.params.id));
//         if (!user) throw new Error('User not found');
//         res.json(user);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// });
// // Update user via id
// app.put('/users/:id', (req, res) => {
//     const users = [
//         { id: 1, name: 'Name1'},
//         { id: 2, name: 'Name2'},
//     ];
//     const user = users.find((u) => u.id === parseInt(req.params.id));
//     if (user) {
//         user.name = req.body.name;
//         res.json(user);
//     } else {
//         res.status(404).send('User not found');
//     }
// });

// // Delete user via id
// app.delete('/users/:id', (req, res) => {
//     const users = [
//         { id: 1, name: 'Name1'},
//         { id: 2, name: 'Name2'},
//     ];
//     const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
//     if (userIndex !== -1) {
//         users.splice(userIndex, 1);
//         res.send('User deleted');
//     } else {
//         res.status(404).send('User not found');
//     }
// });

// ---------- Notes -----------

// app.get('/users', (req, res) =>{
//     const users = [
//         { id: 1, name: 'Name1'},
//         { id: 2, name: 'Name2'},
//     ];
//     res.json(users);
// });

// app.get('/users/:id', (req, res) => {
//     const users = [
//         { id: 1, name: 'Name1'},
//         { id: 2, name: 'Name2'},
//     ];
//     const user = users.find((u) => u.id === parseInt(req.params.id));
//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404).send('User not found');
//     }
// });

// Pre mongoose
// app.post('/users', (req, res) => {
//     const newUser = {
//         id: Date.now(),
//         name: req.body.name,
//     };
//     // Normally, you would save this user to a database
//     res.status(201).json(newUser);
// });