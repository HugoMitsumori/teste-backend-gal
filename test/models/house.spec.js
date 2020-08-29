import { connectToDatabase, expect, Factory } from '../setup.js'
import House from '../../src/models/house.js'
import Character from '../../src/models/character.js'

describe('House', function () {
  beforeEach(async function () {
    await connectToDatabase()
    await House.deleteMany({})
  })

  describe('create', function () {
    let houseParams

    beforeEach(function () {
      houseParams = Factory.build('house')
    })

    it('stores an house in the database', async function () {
      await House.create(houseParams)
      const lastHouse = (await House.findOne().exec())
      expect(lastHouse?.name).to.eq(houseParams.name)
    })

    context('when a lord is provided', function () {
      it('creates the reference', async function () {
        const character = await Character.create(Factory.build('character'))
        houseParams.currentLord = character
        const house = await House.create(houseParams)
        expect(house.currentLord.name).to.eq(character.name)
      })
    })
  })
})
