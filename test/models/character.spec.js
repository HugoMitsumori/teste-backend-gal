import { connectToDatabase, expect, Factory } from '../setup.js'
import Character from '../../src/models/character.js'

describe('Character', function () {
  beforeEach(async function () {
    await connectToDatabase()
    await Character.deleteMany({})
  })

  describe('create', function () {
    it('stores an character in the database', async function () {
      const characterParams = Factory.build('character')
      await Character.create(characterParams)
      const lastCharacter = (await Character.findOne().exec())
      expect(lastCharacter?.name).to.eq(characterParams.name)
    })
  })
})
