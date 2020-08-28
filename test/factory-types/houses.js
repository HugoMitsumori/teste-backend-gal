import faker from 'faker'

const house = (params) => {
  return {
    name: params.name || faker.name.findName(),
    region: params.region || faker.address.country(),
    currentLord: params.currentLord || faker.name.findName(),
    founded: params.founded || faker.date.past(),
  }
}

export { house }
