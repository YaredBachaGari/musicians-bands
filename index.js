//importing the brand and musician models
const {Band} = require('./Band')
const {Musician} = require('./Musician')

// Relationship between tables
Musician.belongsTo(Band);
Band.hasMany(Musician);



module.exports = {
    Band,
    Musician
};
