const spellChecker = require('simple-spellchecker')

class InventoryAllocator {
  /**
   * Constructs a new InventoryAllocator object with a dictionary to support spell checking
   */
  constructor () {
    this.dictionary = spellChecker.getDictionarySync('en-US', './node_modules/simple-spellchecker/dict')
  }

  /**
   * Determines the cheapest shipment for a requested order given inventory distributions
   * @param order - fruit order requested by customer
   * @param inventory - list of warehouses with available stock
   * @returns {[]|*[]} -  list of warehouses with number of fruits provided to complete the order
   */
  getCheapestShipment (order, inventory) {
    this.isValidInputs(order, inventory)
    const currOrder = this.removeZeroRequestedFruits(order)
    if (!this.isInventoryAvailable(currOrder, inventory)) return []

    const shipmentResults = []
    for (const currWarehouse in inventory) {
      const currWarehouseName = inventory[currWarehouse].name
      const currWarehouseResults = {}

      for (const currFruit in currOrder) {
        const numOfCurrFruitOrdered = currOrder[currFruit]
        const numOfCurrFruitAvailable = inventory[currWarehouse].inventory[currFruit]

        if (numOfCurrFruitAvailable) {
          const numOfCurrFruitProvided = Math.min(numOfCurrFruitAvailable, numOfCurrFruitOrdered)
          currWarehouseResults[currFruit] = numOfCurrFruitProvided
          currOrder[currFruit] = numOfCurrFruitOrdered - numOfCurrFruitProvided
          if (!currOrder[currFruit]) delete currOrder[currFruit]
        }
      }

      if (this.getWarehouseTotalFruitsCount(currWarehouseResults)) shipmentResults.push({ [currWarehouseName]: currWarehouseResults })
      if (this.isOrderComplete(currOrder)) break
    }
    return shipmentResults
  }

  /**
   * Checks if order and inventory inputs are valid through
   * null checks, spell checks, casing checks, and number checks
   * @param order - fruit order requested by customer
   * @param inventory - list of warehouses with available stock
   * @returns {boolean} - returns true if inputs are valid, false otherwise
   */
  isValidInputs (order, inventory) {
    const nullOrUndefinedErrorMsg = 'Inputs is null or undefined'
    const isNotTypeObjectErrorMsg = 'Inputs is not of type object'
    const invalidInputsErrorMsg = 'Inputs format is invalid'

    if (!order || !inventory) throw new Error(nullOrUndefinedErrorMsg)
    if (typeof order !== 'object' || typeof inventory !== 'object') throw new Error(isNotTypeObjectErrorMsg)
    if (!this.isValidFruitInput(order)) throw new Error(invalidInputsErrorMsg)

    for (const currWarehouse in inventory) {
      const currInventory = inventory[currWarehouse].inventory
      if (!currInventory) throw new Error(nullOrUndefinedErrorMsg)
      if (!this.isValidFruitInput(currInventory)) throw new Error(invalidInputsErrorMsg)
    }

    return true
  }

  /**
   * Checks if current inventory distribution contains enough stock to complete requested order
   * @param order - fruit order requested by customer
   * @param inventory - list of warehouses with available stock
   * @returns {boolean} - returns true if there is enough inventory, false otherwise
   */
  isInventoryAvailable (order, inventory) {
    for (const currFruit in order) {
      const numOfFruitOrdered = order[currFruit]
      let totalInventory = 0
      for (let i = 0; i < inventory.length; i++) {
        if (totalInventory > numOfFruitOrdered) break
        if (inventory[i].inventory[currFruit]) {
          totalInventory += inventory[i].inventory[currFruit]
        }
      }

      if (numOfFruitOrdered > totalInventory) return false
    }

    return true
  }

  /**
   * Returns number of fruits provided by warehouse for the requested order
   * @param currWarehouseResults - list of final fruits provided by current warehouse
   * @returns {number} - number of fruits provided by current warehouse
   */
  getWarehouseTotalFruitsCount (currWarehouseResults) {
    return Object.keys(currWarehouseResults).length
  }

  /**
   * Checks if requested order is completed
   * @param order - fruit order requested by customer
   * @returns {boolean} - returns true if all fruits in requested order is provided, false otherwise
   */
  isOrderComplete (order) {
    return order === {}
  }

  /**
   * Reviews requested order and removes fruits with quantity zero
   * @param order - fruit order requested by customer
   */
  removeZeroRequestedFruits (order) {
    for (const fruit in order) {
      if (!order[fruit]) delete order[fruit]
    }
    return order
  }

  /**
   * Gets fruit name in correct casing
   * @param fruit - current fruit
   * @returns {string} - returns fruit name in all lowercase
   */
  getCorrectCasing (fruit) {
    return fruit.toLowerCase()
  }

  /**
   * Checks if fruit provided in list is correctly formatted
   * by performing spell check, casing check, and number check
   * @param order - fruit order requested by customer
   * @returns {boolean} - returns true if valid input, false otherwise
   */
  isValidFruitInput (order) {
    for (const currFruit in order) {
      const currFruitSpelledCorrectly = this.checkSpelling(currFruit)
      const currFruitCorrectCasing = this.getCorrectCasing(currFruit)
      if (typeof order[currFruit] !== 'number' || !currFruitSpelledCorrectly || currFruit !== currFruitCorrectCasing) return false
    }
    return true
  }

  /**
   * Checks if the provided fruit is spelled correctly
   * @param fruit - current fruit
   * @returns {bool} - returns true if fruit is spelled correctly, false otherwise
   */
  checkSpelling (fruit) {
    return this.dictionary.spellCheck(fruit)
  }
}

module.exports.InventoryAllocator = InventoryAllocator
