const {sequelize} = require('./db');
const {Band, Musician,Song} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        const trialBand = await Band.create({name:"Jano", genre: 'rock'})
        expect(trialBand.name).toBe('Jano');
        expect(trialBand.genre).toBe('rock');
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const trialMusician = await Musician.create({name:"Abebe", instrument: 'kirar'})
        expect(trialMusician.name).toBe('Abebe');
        expect(trialMusician.instrument).toBe('kirar');
    })
    test('test to check associations Band.hasMany(Musician)', async () => {
        // TODO - test creating a band
        const Band1 = await Band.create({name:"Jano", genre: 'rock'})
        const Band2 = await Band.create({name:"Bano", genre: 'Jazz'})
        const Musician1 = await Musician.create({name:"Abebe", instrument: 'kirar'})
        const Musician2 = await Musician.create({name:"Kebed", instrument: 'Masinqo'})
        const Musician3 = await Musician.create({name:"Bekele", instrument: 'Washint'})
        await Band1.addMusician(Musician1)
        await Band1.addMusician(Musician2)
        await Band1.addMusician(Musician3)
        const Musicians = await Band1.getMusicians();
        const bands = await Band.findAll()
        expect(Musicians.length).toBe(3); 
        expect(bands.length).toBe(3); 
    })

    test('can create song',async ()=>{
        const song1 = await Song.create({title:'i love u', year:2020})
        const song2 = await Song.create({title:'when u call me', year:2022})
        expect(song2.title).toEqual('when u call me');
    })
    test('check many to many association',async ()=>{
        const Band1 = await Band.create({name:"Jano", genre: 'rock'})
        const Band2 = await Band.create({name:"Bano", genre: 'Jazz'})
        const song1 = await Song.create({title:'i love u', year:2020})
        const song2 = await Song.create({title:'when u call me', year:2022})
        const song3 = await Song.create({title:'Baby boy', year:2030})
        await Band1.addSong(song1);
        await Band1.addSong(song3);
        await song1.addBand(Band1)
        await song1.addBand(Band2)
        const Band1Songs = await Band1.getSongs();
        const Song1Bands = await song1.getBands()
        expect(Band1Songs.length).toBe(2)
        expect(Song1Bands.length).toBe(2)
    })
    test('test for eager- list of musicians in in Bands',async()=>{
        const bandsAndMusicians = await Band.findAll({
            include: [
                {model:Musician, As: 'ArtistInBands'}
            ]
        })
        expect(bandsAndMusicians.length).toBe(5)
    })
    test('test for eager- list of Songs in in Bands',async()=>{
        const bandsAndSongs = await Band.findAll({
            include: [
                {model:Song, As: 'BandsSong'}
            ]
        })
        expect(bandsAndSongs.length).toBe(5)
        console.log(bandsAndSongs)
    })
})