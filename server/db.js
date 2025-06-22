const sql = require('mssql');

const config = {
    user: '',
    password: '',
    server: '', // You can use 'localhost\\instance' to connect to a named instance
    database: '',
    options: {
        encrypt: true, // Use this if you're on Windows Azure
    },
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
    sql, poolPromise,
};
