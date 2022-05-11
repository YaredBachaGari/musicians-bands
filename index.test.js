const {sequelize} = require('./db');
const {Band, Musician} = require('./index')

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
})