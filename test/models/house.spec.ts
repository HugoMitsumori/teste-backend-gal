import { connectToDatabase, expect, Factory } from '../setup'
import House from '../../src/models/house'

type Params = Record<string, any>

describe('House', function () {
  beforeEach(async function () {
    await connectToDatabase()
    await House.deleteMany({})
  })

  describe('create', function () {
    it('stores an house in the database', async function () {
      const houseParams = Factory.build('house')
      await House.create(houseParams)
      const lastHouse = (await House.findOne().exec()) as any
      expect(lastHouse?.name).to.eq(houseParams.name)
    })
  })
})
