import chai from 'chai'
import request from 'supertest'
import app from '../src/index'
import faker from 'faker'
import connectToDatabase from '../src/database-connection'
import Factory from './factory'

const expect = chai.expect
const agent = request.agent(app)

const utils = {
  sample: (list) => {
    return list[faker.random.number({ min: 0, max: list.length - 1 })]
  },

  times: (amount, func) => {
    const results = []
    for (let i = 0; i < amount; i++) {
      results.push(func())
    }

    return results
  },
}

export {
  agent,
  connectToDatabase,
  expect,
  faker,
  utils,
  Factory,
}
