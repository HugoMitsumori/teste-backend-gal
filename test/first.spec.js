import chai from 'chai'
import request from 'supertest'
import app from '../src/index'

const expect = chai.expect
const agent = request.agent(app)

describe('First spec', function () {
  it('is true', async function () {
    const response = await agent.get('/')
    expect(response.status).to.eq(200)
  })
})
