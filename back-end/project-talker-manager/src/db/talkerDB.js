const connection = require('./connection');

const findAll = async () => connection.execute('SELECT * FROM TalkerDB.talkers');

module.exports = { findAll };