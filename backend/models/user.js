const pool = require('../db');

async function createUser(name) {
    const result = await pool.query(
        `INSERT INTO users (name) VALUES ($1) RETURNING id, name`,
        [name]
    );
    console.log(result);
    return result.rows[0];
}

async function getUserById(id) {
    const result = await pool.query(
        `SELECT id, name FROM users WHERE id = $1`,
        [id]
    );
    return result.rows[0];
}

async function getUsers(){
    const result = await pool.query(
        `SELECT id, name FROM users ORDER BY id ASC`
    );
    return result.rows;
}

module.exports = {
    createUser,
    getUserById,
    getUsers
};

// const bcrypt = require('bcrypt');

// const userSchema = new mongoose.Schema({
//     email: {type: String, required: true, unique: true },
//     password: {type: String, required: true }
// });

// // Hash password before saving
// userSchema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

// // Compare password method
// userSchema.methods.comparePassword = function (plainPassword) {
//     return bcrypt.compare(plainPassword, this.password);
// }

// const User = mongoose.model('User', userSchema);

// module.exports = User;