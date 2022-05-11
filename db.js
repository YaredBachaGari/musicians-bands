const path = require('path');
const { Sequelize, Model } = require('sequelize');

// TODO - create the new sequelize connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage:path.join(__dirname,'db.sqlite'),
    logging:false
})

module.exports = {
    sequelize,
    Sequelize,
    Model
};
