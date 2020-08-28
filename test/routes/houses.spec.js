import { agent, connectToDatabase, expect, faker, Factory } from '../setup.js'
import House from '../../src/models/house.js'

describe('/houses', function () {
  let response

  beforeEach(async function () {
    await connectToDatabase()
    await House.deleteMany()
  })

  describe('GET /', function () {
    let housesAmount
    let housesParams

    beforeEach(async function () {
      housesAmount = faker.random.number({ min: 2, max: 10 })
      housesParams = Factory.buildList('house', housesAmount)
      await Promise.all(housesParams.map((houseParams) => House.create(houseParams)))
      response = await agent.get('/houses')
    })

    it('responds with status 200 OK', function () {
      expect(response.status).to.eq(200)
    })

    it('responds with all the stored houses', function () {
      const responseHouseNames = response.body.map(house => house.name).sort()
      expect(responseHouseNames).to.have.members(housesParams.map(house => house.name).sort())
    })
  })

  describe('POST /', function () {
    context('when the request provides a valid body', function () {
      let houseParams

      beforeEach(async function () {
        houseParams = Factory.build('house')
        response = await agent.post('/houses').send(houseParams)
      })

      it('responds with 201 Created status code', function () {
        expect(response.status).to.eq(201)
      })

      it('stores a new resource in the database', async function () {
        const house = await House.findOne().exec()
        expect(house).to.exist
      })

      it('responds with the created resource', async function () {
        const id = response.body._id
        const house = await House.findOne({ _id: id }).exec()
        expect(house.name).to.eq(houseParams.name)
      })
    })
  })
})
