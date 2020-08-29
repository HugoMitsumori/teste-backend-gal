import { utils, faker } from '../setup.js'

const character = (params) => {
  return {
    name: params.name || faker.name.findName(),
    tvSeries: params.tvSeries || utils.times(faker.random.number({ min: 1, max: 8 }), faker.lorem.word),
  }
}

export { character }
