// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

// const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

// // Register
// const register = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const exists = await User.findOne({ email });
//         if (exists) 
//             return res.status(400).json({ message: 'Email already registered'});

//         const user = new User({ email, password });
//         await user.save();

//         res.status(201).json({ message: 'User registered '});
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ email });
//         if (!user || !(await user.comparePassword(password))) {
//             return res.status(401).json({ message: 'Invalid email or password'});
//         }

//         const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {expiresIn: '1h'});

//         res.json({ token });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// module.exports = {
//     register,
//     login
// };