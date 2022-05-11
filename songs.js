const {Sequelize, sequelize} = require('./db');

let Song = sequelize.define('song',{
    title: Sequelize.STRING,
    year: Sequelize.INTEGER
});

module.exports = {Song}