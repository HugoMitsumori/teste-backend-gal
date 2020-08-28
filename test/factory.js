import { utils } from './setup.js'
import factoryTypes from './factory-types/index.js'

class Factory {
  static build (factoryType, params = {}) {
    if (!factoryTypes[factoryType]) {
      throw new Error('Factory not available!')
    }

    return factoryTypes[factoryType](params)
  }

  static buildList (factoryType, amount, params = {}) {
    if (!factoryTypes[factoryType]) {
      throw new Error('Factory not available!')
    }

    return utils.times(amount, factoryTypes[factoryType].bind(this, params))
  }
}

export default Factory
