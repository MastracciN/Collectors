const { Pool } = require("pg");

const pool = new Pool({
    user: "coluser",
    host: "localhost",
    database: "collectors",
    password: "collect2025",
    port: 5432,
});

module.exports = pool;
