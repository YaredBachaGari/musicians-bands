//importing the brand and musician models
const {Band} = require('./Band')
const {Musician} = require('./Musician')
const {Song} = require('./Songs')

// Relationship between tables
Musician.belongsTo(Band);
Band.hasMany(Musician);
Song.belongsToMany(Band,{through:"Band-song"});
Band.belongsToMany(Song,{through:"Band-song"});


module.exports = {
    Band,
    Musician,
    Song
};
