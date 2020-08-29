import { agent, connectToDatabase, expect, faker, Factory } from '../setup.js'
import House from '../../src/models/house.js'
import mongoose from 'mongoose'

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
    })

    it('responds with status 200 OK', async function () {
      response = await agent.get('/houses')
      expect(response.status).to.eq(200)
    })

    it('responds with all the stored houses', async function () {
      response = await agent.get('/houses')
      const responseHouseNames = response.body.map(house => house.name).sort()
      expect(responseHouseNames).to.have.members(housesParams.map(house => house.name).sort())
    })

    context('when an id is provided', function () {
      let house

      beforeEach(async function () {
        house = await House.findOne({}).exec()
        response = await agent.get('/houses?id=' + house._id)
      })

      it('returns the house matching the id', async function () {
        expect(response.body[0]._id).to.eq(house._id.toString())
      })
    })

    context('when an name is provided', function () {
      let house

      beforeEach(async function () {
        house = await House.findOne({}).exec()
        response = await agent.get('/houses?name=' + house.name)
      })

      it('returns the houses matching the name', async function () {
        expect(response.body.every(resHouse => resHouse.name === house.name)).to.eq(true)
      })
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

      it('stores a new house in the database', async function () {
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

  describe('DELETE /:id', function () {
    context('when the house with given id is found', function () {
      let house

      beforeEach(async function () {
        house = await House.create(Factory.build('house'))
      })

      it('responds with 200 OK status code', async function () {
        const response = await agent.delete(`/houses/${house._id}`)
        expect(response.status).to.eq(200)
      })

      it('deletes the house from the database', async function () {
        const id = house._id
        await agent.delete(`/houses/${id}`)
        const matchingHouse = await House.findOne({ _id: id })
        expect(matchingHouse).not.to.exist
      })
    })

    context('when the house with given id is not found', function () {
      it('responds with 404 Not Found status code', async function () {
        const fakeObjectId = mongoose.Types.ObjectId()
        const response = await agent.delete(`/houses/${fakeObjectId}`)
        expect(response.status).to.eq(404)
      })
    })
  })
})
