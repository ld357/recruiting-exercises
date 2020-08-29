const chai = require('chai')
const { InventoryAllocator } = require('../InventoryAllocator')

const inventoryAllocator = new InventoryAllocator()
const nullOrUndefinedErrorMsg = 'Inputs is null or undefined'
const isNotTypeObjectErrorMsg = 'Inputs is not of type object'
const invalidInputsErrorMsg = 'Inputs format is invalid'

describe('checking inputs validity for InventoryAllocator', () => {
  it('missing name for 1 warehouse', () => {
    try {
      const order = { apple: '5', banana: '3', orange: '8' }
      const inventory = [
        { name: 'owd', inventory: { apple: 5, orange: 10 } },
        { inventory: { banana: 5, orange: 10 } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('missing name for a few warehouses', () => {
    try {
      const order = { apple: '5', banana: '3', orange: '8' }
      const inventory = [
        { name: 'owd', inventory: { apple: 5, orange: 10 } },
        { inventory: { banana: 5, orange: 10 } },
        { inventory: { plum: 100, melon: 100 } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('missing name for all warehouses', () => {
    try {
      const order = { apple: '5', banana: '3', orange: '8' }
      const inventory = [
        { inventory: { apple: 5, orange: 10 } },
        { inventory: { banana: 5, orange: 10 } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('missing numbers for 1 warehouse', () => {
    try {
      const order = { apple: '5', banana: '3', orange: '8' }
      const inventory = [
        { name: 'owd', inventory: { apple: 1 } },
        { name: 'dm' }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('missing numbers for a few warehouses', () => {
    try {
      const order = { apple: '5', banana: '3', orange: '8' }
      const inventory = [
        { name: 'owd', inventory: { apple: 1 } },
        { name: 'dm' },
        { name: 'lke', inventory: { blueberry: 3, raspberry: 10 } },
        { name: 'lma' }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('missing numbers for all warehouses', () => {
    try {
      const order = { apple: '5', banana: '3', orange: '8' }
      const inventory = [
        { name: 'owd' },
        { name: 'dm' }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('string instead of map and list for inputs', () => {
    try {
      const order = '{ apple: 5, banana: 3, orange: 8 }'
      const inventory = '[\n' +
                '    { name: lka, inventory: { peach: 120, blueberry: 10 }},\n' +
                '    { name: lka, inventory: { pear: 102, cherry: 73 }},\n' +
                '    { name: owd, inventory: { orange: 8, apple: 5, banana: 3}},\n' +
                '    { name: mvn, inventory: { pineapple: 134, watermelon: 2 }},\n' +
                '    { name: qlk, inventory: { raspberry: 10, orange: 400 }} ]'
      inventoryAllocator.getCheapestShipment(order, inventory)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = isNotTypeObjectErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('Invalid spelling for 1 fruit in requested order', () => {
    try {
      const order = { apple: 2, bana: 40, orange: 9 }
      const inventory = [
        { name: 'owd', inventory: { orange: 8 } },
        { name: 'dm', inventory: { apple: 5 } },
        { name: 'cde', inventory: { banana: 3 } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('Invalid spelling for 1 fruit in warehouses', () => {
    try {
      const order = { apple: 5, banana: 100, orange: 8 }
      const inventory = [
        { name: 'owd', inventory: { orange: 8 } },
        { name: 'dm', inventory: { apple: 5 } },
        { name: 'cde', inventory: { bnna: 3 } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('Invalid spelling for a few fruits in requested order', () => {
    try {
      const order = { apple: 2, bana: 300, ornge: 9 }
      const inventory = [
        { name: 'owd', inventory: { orange: 8 } },
        { name: 'dm', inventory: { apple: 5 } },
        { name: 'cde', inventory: { banana: 3 } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('Invalid spelling for a few fruits in warehouses', () => {
    try {
      const order = { apple: 5, banana: 100, orange: 11 }
      const inventory = [
        { name: 'owd', inventory: { orange: 8 } },
        { name: 'dm', inventory: { aple: 5 } },
        { name: 'cde', inventory: { bnna: 3 } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('Invalid spelling for all fruits in requested order', () => {
    try {
      const order = { aple: 2, bana: 3, orge: 9 }
      const inventory = [
        { name: 'owd', inventory: { orange: 8 } },
        { name: 'dm', inventory: { apple: 5 } },
        { name: 'cde', inventory: { banana: 3 } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('Invalid spelling for all fruits in warehouses', () => {
    try {
      const order = { apple: 5, banana: 3, orange: 8 }
      const inventory = [
        { name: 'owd', inventory: { ornge: 8 } },
        { name: 'dm', inventory: { aple: 5 } },
        { name: 'cde', inventory: { bnna: 3 } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('Invalid number format for 1 fruit in requested order', () => {
    try {
      const order = { apple: 'five', banana: 3, orange: 8 }
      const inventory = [
        { name: 'owd', inventory: { orange: 8 } },
        { name: 'dm', inventory: { apple: 5 } },
        { name: 'cde', inventory: { banana: 3 } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('Invalid number format for 1 fruit in warehouses', () => {
    try {
      const order = { apple: 5, banana: 3, orange: 8 }
      const inventory = [
        { name: 'owd', inventory: { orange: 'eight' } },
        { name: 'dm', inventory: { apple: 5 } },
        { name: 'cde', inventory: { banana: 3 } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('Invalid number format for a few fruits in requested order', () => {
    try {
      const order = { apple: 'five', banana: 3, orange: 'eight' }
      const inventory = [
        { name: 'owd', inventory: { orange: 8 } },
        { name: 'dm', inventory: { apple: 5 } },
        { name: 'cde', inventory: { banana: 3 } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('Invalid number format for a few fruits in warehouses', () => {
    try {
      const order = { apple: 5, banana: 3, orange: 8 }
      const inventory = [
        { name: 'owd', inventory: { orange: 'eight' } },
        { name: 'dm', inventory: { apple: 5 } },
        { name: 'cde', inventory: { banana: 'three' } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('Invalid number format for all fruits in requested order', () => {
    try {
      const order = { apple: 'five', banana: 'three', orange: 'eight' }
      const inventory = [
        { name: 'owd', inventory: { orange: 8 } },
        { name: 'dm', inventory: { apple: 5 } },
        { name: 'cde', inventory: { banana: 3 } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('Invalid number format for all fruits in warehouses', () => {
    try {
      const order = { apple: 5, banana: 3, orange: 8 }
      const inventory = [
        { name: 'owd', inventory: { orange: 'eight' } },
        { name: 'dm', inventory: { apple: 'five' } },
        { name: 'cde', inventory: { banana: 'three' } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('Invalid name casing for 1 fruit in requested order', () => {
    try {
      const order = { Apple: 1, banana: 2, orange: 3 }
      const inventory = [
        { name: 'owd', inventory: { orange: 8 } },
        { name: 'dm', inventory: { apple: 6 } },
        { name: 'cde', inventory: { banana: 3 } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('Invalid name casing for 1 fruit in warehouses', () => {
    try {
      const order = { apple: 1, banana: 2, orange: 3 }
      const inventory = [
        { name: 'owd', inventory: { orange: 8 } },
        { name: 'dm', inventory: { Apple: 6 } },
        { name: 'cde', inventory: { banana: 3 } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('Invalid name casing for a few fruits in requested order', () => {
    try {
      const order = { Apple: 1, banana: 2, Orange: 10 }
      const inventory = [
        { name: 'owd', inventory: { orange: 8 } },
        { name: 'dm', inventory: { apple: 6 } },
        { name: 'cde', inventory: { banana: 3 } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('Invalid name casing for a few fruits in warehouses', () => {
    try {
      const order = { apple: 1, banana: 20, orange: 3 }
      const inventory = [
        { name: 'owd', inventory: { orange: 8 } },
        { name: 'dm', inventory: { Apple: 6 } },
        { name: 'cde', inventory: { Banana: 3 } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('Invalid name casing for all fruits in requested order', () => {
    try {
      const order = { Apple: 1, Banana: 2, Orange: 3 }
      const inventory = [
        { name: 'owd', inventory: { orange: 8 } },
        { name: 'dm', inventory: { apple: 6 } },
        { name: 'cde', inventory: { banana: 3 } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('Invalid name casing for all fruits in warehouses', () => {
    try {
      const order = { apple: 1, banana: 2, orange: 3 }
      const inventory = [
        { name: 'owd', inventory: { Orange: 8 } },
        { name: 'dm', inventory: { Apple: 5 } },
        { name: 'cde', inventory: { Banana: 3 } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('empty warehouses inside inventory input', () => {
    try {
      const order = { apple: 2, banana: 4, orange: 9 }
      const inventory = [{}, {}]
      inventoryAllocator.getCheapestShipment(order, inventory)
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = nullOrUndefinedErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('1 empty warehouse inside inventory input', () => {
    try {
      const order = { apple: 2, banana: 4, orange: 9 }
      const inventory = [
        { name: 'owd', inventory: { apple: 5, orange: 10 } },
        {}
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = nullOrUndefinedErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('a few empty warehouses inside inventory input', () => {
    try {
      const order = { apple: 2, banana: 4, orange: 9 }
      const inventory = [
        { name: 'owd', inventory: { apple: 5, orange: 10 } },
        {},
        { name: 'mba', inventory: { blueberry: 100, strawberry: 10 } },
        {}
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = nullOrUndefinedErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })
})

describe('null parameters in inputs for Inventory Allocator', () => {
  it('no numbers in 1 warehouse', () => {
    const order = { apple: 2, banana: 4, orange: 9 }
    const inventory = [
      { name: 'owd', inventory: {} },
      { name: 'dm', inventory: { apple: 2, banana: 5, orange: 10 } },
      { name: 'lke', inventory: { peach: 2030, orange: 10 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, inventory)
    const expectedResult = [{ dm: { apple: 2, banana: 4, orange: 9 } }]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('no numbers in a few warehouses', () => {
    const order = { apple: 2, banana: 4, orange: 9 }
    const inventory = [
      { name: 'owd', inventory: {} },
      { name: 'dm', inventory: { apple: 2, banana: 5, orange: 10 } },
      { name: 'lke', inventory: {} }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, inventory)
    const expectedResult = [{ dm: { apple: 2, banana: 4, orange: 9 } }]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('no numbers in all warehouses', () => {
    const order = { apple: 2, banana: 4, orange: 9 }
    const inventory = [
      { name: 'owd', inventory: {} },
      { name: 'dm', inventory: {} },
      { name: 'lke', inventory: {} }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, inventory)
    const expectedResult = []
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('zero items for all fruits in requested order', () => {
    const order = { apple: 0, banana: 0, orange: 0 }
    const inventory = [
      { name: 'owd', inventory: { orange: 8 } },
      { name: 'dm', inventory: { apple: 5 } },
      { name: 'cde', inventory: { banana: 3 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, inventory)
    const expectedResult = []
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('zero items for all fruits in warehouses', () => {
    const order = { apple: 2, banana: 3, orange: 3 }
    const inventory = [
      { name: 'owd', inventory: { orange: 0 } },
      { name: 'dm', inventory: { apple: 0 } },
      { name: 'cde', inventory: { banana: 0 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, inventory)
    const expectedResult = []
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('zero items for a few fruits in requested order', () => {
    const order = { apple: 2, banana: 0, orange: 3 }
    const inventory = [
      { name: 'owd', inventory: { orange: 8 } },
      { name: 'dm', inventory: { apple: 5 } },
      { name: 'cde', inventory: { banana: 3 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, inventory)
    const expectedResult = [
      { owd: { orange: 3 } },
      { dm: { apple: 2 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('zero items for a few fruits in warehouses', () => {
    const order = { apple: 2, banana: 7, orange: 3 }
    const inventory = [
      { name: 'owd', inventory: { orange: 5 } },
      { name: 'dm', inventory: { apple: 0 } },
      { name: 'cde', inventory: { banana: 0 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, inventory)
    const expectedResult = []
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('null for all fruits in requested order', () => {
    try {
      const order = { apple: null, banana: null, orange: null }
      const inventory = [
        { name: 'owd', inventory: { orange: 8 } },
        { name: 'dm', inventory: { apple: 5 } },
        { name: 'cde', inventory: { banana: 3 } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('null for all fruits in warehouses', () => {
    try {
      const order = { apple: 3, banana: 5, orange: 8 }
      const inventory = [
        { name: 'owd', inventory: { orange: null } },
        { name: 'dm', inventory: { apple: null } },
        { name: 'cde', inventory: { banana: null } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('null for a few fruits in requested order', () => {
    try {
      const order = { apple: 1, banana: null, orange: null }
      const inventory = [
        { name: 'owd', inventory: { orange: 8 } },
        { name: 'dm', inventory: { apple: 5 } },
        { name: 'cde', inventory: { banana: 3 } }
      ]
      inventoryAllocator.getCheapestShipment(order, inventory)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })

  it('null for a few fruits in warehouses', () => {
    try {
      const order = { apple: 1, banana: 3, orange: 9 }
      const warehouses = [
        { name: 'owd', inventory: { orange: null } },
        { name: 'dm', inventory: { apple: 5 } },
        { name: 'cde', inventory: { banana: null } }
      ]
      inventoryAllocator.getCheapestShipment(order, warehouses)
      chai.expect.fail()
    } catch (error) {
      const actualErrorMessage = error.message
      const expectedErrorMessage = invalidInputsErrorMsg
      chai.expect(actualErrorMessage).to.equal(expectedErrorMessage)
    }
  })
})

describe('unit tests for 1 fruit in requested order for InventoryAllocator', () => {
  it('perfect exact inventory match in 1 inventory', () => {
    const order = { apple: 5 }
    const warehouses = [
      { name: 'owd', inventory: { apple: 5, orange: 10 } },
      { name: 'dm', inventory: { banana: 5 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [{ owd: { apple: 5 } }]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('not enough inventory, fruit completely unavailable', () => {
    const order = { apple: 5 }
    const warehouses = [
      { name: 'owd', inventory: { orange: 10 } },
      { name: 'dm', inventory: { banana: 5 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = []
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('not enough inventory, missing 1 item', () => {
    const order = { apple: 5 }
    const warehouses = [
      { name: 'owd', inventory: { apple: 4, orange: 10 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'dm', inventory: { banana: 5 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = []
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('split items across warehouses, using 2 warehouses', () => {
    const order = { apple: 5 }
    const warehouses = [
      { name: 'owd', inventory: { apple: 2, orange: 10 } },
      { name: 'dm', inventory: { apple: 3, banana: 5 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { apple: 2 } },
      { dm: { apple: 3 } }]
    chai.expect(actualResult).to.eql(expectedResult)
  })
})

describe('unit tests for multiple fruits in requested order for InventoryAllocator', () => {
  it('perfect exact match in 3 different inventories located at the start of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'owd', inventory: { orange: 8 } },
      { name: 'dm', inventory: { apple: 5 } },
      { name: 'cde', inventory: { banana: 3 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { orange: 8 } },
      { dm: { apple: 5 } },
      { cde: { banana: 3 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('perfect exact match in 3 different inventories located in the middle of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'oql', inventory: { plum: 400 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'owd', inventory: { orange: 8 } },
      { name: 'dm', inventory: { apple: 5 } },
      { name: 'cde', inventory: { banana: 3 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { apple: 134, watermelon: 2 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { orange: 8 } },
      { dm: { apple: 5 } },
      { cde: { banana: 3 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('perfect exact match in 3 different inventories located in the start and middle of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'dm', inventory: { apple: 5 } },
      { name: 'oql', inventory: { plum: 400 } },
      { name: 'owd', inventory: { orange: 8 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'cde', inventory: { banana: 3 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { apple: 134, watermelon: 2 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { dm: { apple: 5 } },
      { owd: { orange: 8 } },
      { cde: { banana: 3 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('perfect exact match in 3 different inventories located at the end of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'oql', inventory: { plum: 400 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'owd', inventory: { orange: 8 } },
      { name: 'dm', inventory: { apple: 5 } },
      { name: 'cde', inventory: { banana: 3 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { orange: 8 } },
      { dm: { apple: 5 } },
      { cde: { banana: 3 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('perfect exact match in 3 different inventories located at the start and end of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'owd', inventory: { orange: 8 } },
      { name: 'oql', inventory: { plum: 400 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'dm', inventory: { apple: 5 } },
      { name: 'cde', inventory: { banana: 3 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { orange: 8 } },
      { dm: { apple: 5 } },
      { cde: { banana: 3 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('perfect exact match in 3 different inventories located at the middle and end of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'oql', inventory: { plum: 400 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'owd', inventory: { orange: 8 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'dm', inventory: { apple: 5 } },
      { name: 'cde', inventory: { banana: 3 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { orange: 8 } },
      { dm: { apple: 5 } },
      { cde: { banana: 3 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('perfect exact match in 2 different inventories located at the start of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'owd', inventory: { orange: 8, banana: 3 } },
      { name: 'dm', inventory: { apple: 5 } },
      { name: 'oql', inventory: { plum: 400 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10, strawberry: 0 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { banana: 3, orange: 8 } },
      { dm: { apple: 5 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('perfect exact match in 2 different inventories located in the middle of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'oql', inventory: { plum: 400 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'owd', inventory: { orange: 8, banana: 3 } },
      { name: 'dm', inventory: { apple: 5, pineapple: 0 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { banana: 3, orange: 8 } },
      { dm: { apple: 5 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('perfect exact match in 2 different inventories located at the end of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'oql', inventory: { plum: 400 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'owd', inventory: { orange: 8, banana: 3 } },
      { name: 'dm', inventory: { apple: 5 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { banana: 3, orange: 8 } },
      { dm: { apple: 5 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('perfect exact match in 1 warehouse located at the start of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'owd', inventory: { orange: 8, apple: 5, banana: 3 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [{ owd: { apple: 5, banana: 3, orange: 8 } }]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('perfect exact match in 1 warehouse located at the middle of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'owd', inventory: { orange: 8, apple: 5, banana: 3 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, orange: 400 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [{ owd: { apple: 5, banana: 3, orange: 8 } }]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('perfect exact match in 1 warehouse located at the end of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } },
      { name: 'owd', inventory: { orange: 8, apple: 5, banana: 3 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [{ owd: { apple: 5, banana: 3, orange: 8 } }]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('not enough inventory, missing a few items for all fruits', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'owd', inventory: { orange: 7, apple: 4, banana: 1 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = []
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('not enough inventory, missing completely for all fruits', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      {
        name: 'owd',
        inventory: {
          kiwi: 7, watermelon: 4, grape: 5, apple: 0, banana: 0, orange: 0
        }
      },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = []
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('not enough inventory, missing a few items for 2 fruits', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'owd', inventory: { orange: 8, apple: 4, banana: 1 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = []
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('not enough inventory, missing completely for 2 fruits', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'owd', inventory: { orange: 8, kiwi: 2, grape: 1 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = []
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('not enough inventory, missing a few items for 1 fruit', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } },
      { name: 'owd', inventory: { orange: 8, apple: 5, banana: 2 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = []
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('not enough inventory, missing completely for 1 fruit', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'owd', inventory: { orange: 8, apple: 5, watermelon: 1 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = []
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('split across same set of warehouses with no remaining stock for requests', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      {
        name: 'owd',
        inventory: {
          orange: 3, apple: 1, banana: 1, watermelon: 1
        }
      },
      {
        name: 'cde',
        inventory: {
          orange: 2, banana: 1, apple: 2, kiwi: 4
        }
      },
      {
        name: 'dm',
        inventory: {
          apple: 2, orange: 3, banana: 1, watermelon: 10
        }
      },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { apple: 1, banana: 1, orange: 3 } },
      { cde: { apple: 2, banana: 1, orange: 2 } },
      { dm: { apple: 2, banana: 1, orange: 3 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('split across same set of warehouses located at the start of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      {
        name: 'owd',
        inventory: {
          orange: 3, apple: 1, banana: 1, watermelon: 1
        }
      },
      {
        name: 'cde',
        inventory: {
          orange: 2, banana: 1, apple: 2, kiwi: 4
        }
      },
      {
        name: 'dm',
        inventory: {
          apple: 4, orange: 7, banana: 8, watermelon: 10
        }
      },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { apple: 1, banana: 1, orange: 3 } },
      { cde: { apple: 2, banana: 1, orange: 2 } },
      { dm: { apple: 2, banana: 1, orange: 3 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('split across same set of warehouses located in the middle of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      {
        name: 'owd',
        inventory: {
          orange: 3, apple: 1, banana: 1, watermelon: 1
        }
      },
      {
        name: 'cde',
        inventory: {
          orange: 2, banana: 1, apple: 2, kiwi: 4
        }
      },
      {
        name: 'dm',
        inventory: {
          apple: 4, orange: 7, banana: 8, watermelon: 10
        }
      },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { apple: 1, banana: 1, orange: 3 } },
      { cde: { apple: 2, banana: 1, orange: 2 } },
      { dm: { apple: 2, banana: 1, orange: 3 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('split across same set of warehouses located at the end of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } },
      {
        name: 'owd',
        inventory: {
          orange: 3, apple: 1, banana: 1, watermelon: 1
        }
      },
      {
        name: 'cde',
        inventory: {
          orange: 2, banana: 1, apple: 2, kiwi: 4
        }
      },
      {
        name: 'dm',
        inventory: {
          apple: 4, orange: 7, banana: 8, watermelon: 10
        }
      }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { apple: 1, banana: 1, orange: 3 } },
      { cde: { apple: 2, banana: 1, orange: 2 } },
      { dm: { apple: 2, banana: 1, orange: 3 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('split across different warehouses with no stock remaining for requests', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'owd', inventory: { pear: 10, apple: 3, watermelon: 1 } },
      { name: 'cde', inventory: { apple: 2, raspberry: 10, kiwi: 4 } },
      { name: 'dm', inventory: { orange: 6, watermelon: 10 } },
      {
        name: 'mba',
        inventory: {
          grape: 1, kiwi: 60, peach: 10, banana: 2
        }
      },
      { name: 'pal', inventory: { blueberry: 10, orange: 2, cherry: 30 } },
      { name: 'qwe', inventory: { kiwi: 3, banana: 1, grape: 2 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { apple: 3 } },
      { cde: { apple: 2 } },
      { dm: { orange: 6 } },
      { mba: { banana: 2 } },
      { pal: { orange: 2 } },
      { qwe: { banana: 1 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('split across different warehouses located at the start of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'owd', inventory: { pear: 10, apple: 3, watermelon: 1 } },
      { name: 'cde', inventory: { apple: 2, raspberry: 10, kiwi: 4 } },
      { name: 'dm', inventory: { orange: 6, watermelon: 10 } },
      {
        name: 'mba',
        inventory: {
          grape: 1, kiwi: 60, peach: 10, banana: 2
        }
      },
      { name: 'pal', inventory: { blueberry: 10, orange: 3, cherry: 30 } },
      { name: 'qwe', inventory: { kiwi: 3, banana: 100, grape: 2 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { apple: 3 } },
      { cde: { apple: 2 } },
      { dm: { orange: 6 } },
      { mba: { banana: 2 } },
      { pal: { orange: 2 } },
      { qwe: { banana: 1 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('split across different warehouses located in the middle of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'owd', inventory: { pear: 10, apple: 3, watermelon: 1 } },
      { name: 'cde', inventory: { apple: 2, raspberry: 10, kiwi: 4 } },
      { name: 'dm', inventory: { orange: 6, watermelon: 10 } },
      {
        name: 'mba',
        inventory: {
          grape: 1, kiwi: 60, peach: 10, banana: 2
        }
      },
      { name: 'pal', inventory: { blueberry: 10, orange: 3, cherry: 30 } },
      { name: 'qwe', inventory: { kiwi: 3, banana: 100, grape: 2 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { apple: 3 } },
      { cde: { apple: 2 } },
      { dm: { orange: 6 } },
      { mba: { banana: 2 } },
      { pal: { orange: 2 } },
      { qwe: { banana: 1 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('split across different warehouses located at the end of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } },
      { name: 'owd', inventory: { pear: 10, apple: 3, watermelon: 1 } },
      { name: 'cde', inventory: { apple: 2, raspberry: 10, kiwi: 4 } },
      { name: 'dm', inventory: { orange: 6, watermelon: 10 } },
      {
        name: 'mba',
        inventory: {
          grape: 1, kiwi: 60, peach: 10, banana: 2
        }
      },
      { name: 'pal', inventory: { blueberry: 10, orange: 3, cherry: 30 } },
      { name: 'qwe', inventory: { kiwi: 3, banana: 100, grape: 2 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { apple: 3 } },
      { cde: { apple: 2 } },
      { dm: { orange: 6 } },
      { mba: { banana: 2 } },
      { pal: { orange: 2 } },
      { qwe: { banana: 1 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('split across warehouses, two fruits from the same warehouses, no remaining stock for requests', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      {
        name: 'owd',
        inventory: {
          pear: 10, apple: 3, orange: 3, watermelon: 1
        }
      },
      {
        name: 'cde',
        inventory: {
          apple: 2, raspberry: 10, kiwi: 4, orange: 5, watermelon: 10
        }
      },
      {
        name: 'mba',
        inventory: {
          grape: 1, kiwi: 60, peach: 10, banana: 2
        }
      },
      { name: 'pal', inventory: { blueberry: 10, cherry: 30 } },
      { name: 'qwe', inventory: { kiwi: 3, banana: 1, grape: 2 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { apple: 3, orange: 3 } },
      { cde: { apple: 2, orange: 5 } },
      { mba: { banana: 2 } },
      { qwe: { banana: 1 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('split across warehouses, two fruits from the same warehouses, located in the start of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      {
        name: 'owd',
        inventory: {
          pear: 10, apple: 3, orange: 3, watermelon: 1
        }
      },
      {
        name: 'cde',
        inventory: {
          apple: 2, raspberry: 10, kiwi: 4, orange: 6, watermelon: 10
        }
      },
      {
        name: 'mba',
        inventory: {
          grape: 1, kiwi: 60, peach: 10, banana: 2
        }
      },
      { name: 'pal', inventory: { blueberry: 10, orange: 3, cherry: 30 } },
      { name: 'qwe', inventory: { kiwi: 3, banana: 100, grape: 2 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { apple: 3, orange: 3 } },
      { cde: { apple: 2, orange: 5 } },
      { mba: { banana: 2 } },
      { qwe: { banana: 1 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('split across warehouses, two fruits from the same warehouses, located in the middle of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      {
        name: 'owd',
        inventory: {
          pear: 10, apple: 3, orange: 3, watermelon: 1
        }
      },
      {
        name: 'cde',
        inventory: {
          apple: 2, raspberry: 10, kiwi: 4, orange: 6, watermelon: 10
        }
      },
      {
        name: 'mba',
        inventory: {
          grape: 1, kiwi: 60, peach: 10, banana: 2
        }
      },
      { name: 'pal', inventory: { blueberry: 10, orange: 3, cherry: 30 } },
      { name: 'qwe', inventory: { kiwi: 3, banana: 100, grape: 2 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { apple: 3, orange: 3 } },
      { cde: { apple: 2, orange: 5 } },
      { mba: { banana: 2 } },
      { qwe: { banana: 1 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('split across warehouses, two fruits from the same warehouses, located in the end of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'lka', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } },
      {
        name: 'owd',
        inventory: {
          pear: 10, apple: 3, orange: 3, watermelon: 1
        }
      },
      {
        name: 'cde',
        inventory: {
          apple: 2, raspberry: 10, kiwi: 4, orange: 6, watermelon: 10
        }
      },
      {
        name: 'mba',
        inventory: {
          grape: 1, kiwi: 60, peach: 10, banana: 2
        }
      },
      { name: 'pal', inventory: { blueberry: 10, orange: 3, cherry: 30 } },
      { name: 'qwe', inventory: { kiwi: 3, banana: 100, grape: 2 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { apple: 3, orange: 3 } },
      { cde: { apple: 2, orange: 5 } },
      { mba: { banana: 2 } },
      { qwe: { banana: 1 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('split across warehouses, 1 warehouse provides two fruits, no remaining stock for requests', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      {
        name: 'owd',
        inventory: {
          pear: 10, apple: 3, orange: 3, watermelon: 1
        }
      },
      {
        name: 'cde',
        inventory: {
          apple: 2, raspberry: 10, kiwi: 4, watermelon: 10
        }
      },
      { name: 'qol', inventory: { peach: 10, orange: 5 } },
      { name: 'mba', inventory: { grape: 1, kiwi: 60, banana: 2 } },
      { name: 'pal', inventory: { blueberry: 10, cherry: 30 } },
      { name: 'qwe', inventory: { kiwi: 3, banana: 1, grape: 2 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'mao', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { apple: 3, orange: 3 } },
      { cde: { apple: 2 } },
      { qol: { orange: 5 } },
      { mba: { banana: 2 } },
      { qwe: { banana: 1 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('split across warehouses, 1 warehouse provides two fruits, in the start of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      {
        name: 'owd',
        inventory: {
          pear: 10, apple: 3, orange: 3, watermelon: 1
        }
      },
      {
        name: 'cde',
        inventory: {
          apple: 2, raspberry: 10, kiwi: 4, watermelon: 10
        }
      },
      { name: 'qol', inventory: { peach: 10, orange: 6 } },
      { name: 'mba', inventory: { grape: 1, kiwi: 60, banana: 2 } },
      { name: 'pal', inventory: { blueberry: 10, orange: 3, cherry: 30 } },
      { name: 'qwe', inventory: { kiwi: 3, banana: 100, grape: 2 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'mao', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { apple: 3, orange: 3 } },
      { cde: { apple: 2 } },
      { qol: { orange: 5 } },
      { mba: { banana: 2 } },
      { qwe: { banana: 1 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('split across warehouses, 1 warehouse provides two fruits, in the middle of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'pal', inventory: { blueberry: 10, cherry: 30 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      {
        name: 'owd',
        inventory: {
          pear: 10, apple: 3, orange: 3, watermelon: 1
        }
      },
      {
        name: 'cde',
        inventory: {
          apple: 2, raspberry: 10, kiwi: 4, watermelon: 10
        }
      },
      { name: 'mba', inventory: { grape: 1, kiwi: 60, banana: 2 } },
      { name: 'qwe', inventory: { kiwi: 3, banana: 100, grape: 2 } },
      { name: 'qol', inventory: { peach: 10, orange: 6 } },
      { name: 'mao', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { apple: 3, orange: 3 } },
      { cde: { apple: 2 } },
      { mba: { banana: 2 } },
      { qwe: { banana: 1 } },
      { qol: { orange: 5 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('split across warehouses, 1 warehouse provides two fruits, in the end of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'pal', inventory: { blueberry: 10, cherry: 30 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'mao', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } },
      {
        name: 'owd',
        inventory: {
          pear: 10, apple: 3, orange: 3, watermelon: 1
        }
      },
      {
        name: 'cde',
        inventory: {
          apple: 2, raspberry: 10, kiwi: 4, watermelon: 10
        }
      },
      { name: 'qol', inventory: { peach: 10, orange: 6 } },
      { name: 'mba', inventory: { grape: 1, kiwi: 60, banana: 2 } },
      { name: 'qwe', inventory: { kiwi: 3, banana: 100, grape: 2 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { apple: 3, orange: 3 } },
      { cde: { apple: 2 } },
      { qol: { orange: 5 } },
      { mba: { banana: 2 } },
      { qwe: { banana: 1 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('split across warehouses, 1 warehouse provides a few of each fruit, in the start of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      {
        name: 'owd',
        inventory: {
          pear: 10, apple: 3, orange: 3, watermelon: 1, banana: 2
        }
      },
      {
        name: 'cde',
        inventory: {
          apple: 2, raspberry: 10, kiwi: 4, watermelon: 10
        }
      },
      { name: 'qol', inventory: { peach: 10, orange: 6 } },
      { name: 'mba', inventory: { grape: 1, kiwi: 60 } },
      { name: 'pal', inventory: { blueberry: 10, orange: 3, cherry: 30 } },
      { name: 'qwe', inventory: { kiwi: 3, banana: 100, grape: 2 } },
      { name: 'pvl', inventory: { blueberry: 10, orange: 3, cherry: 30 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'mao', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { apple: 3, banana: 2, orange: 3 } },
      { cde: { apple: 2 } },
      { qol: { orange: 5 } },
      { qwe: { banana: 1 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('split across warehouses, 1 warehouse provides a few of each fruit, in the middle of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'mba', inventory: { grape: 1, kiwi: 60 } },
      { name: 'pal', inventory: { blueberry: 10, cherry: 30 } },
      {
        name: 'owd',
        inventory: {
          pear: 10, apple: 3, orange: 3, watermelon: 1, banana: 2
        }
      },
      { name: 'qwe', inventory: { kiwi: 3, grape: 2, banana: 10 } },
      {
        name: 'cde',
        inventory: {
          apple: 2, raspberry: 10, kiwi: 4, watermelon: 10
        }
      },
      { name: 'qol', inventory: { peach: 10, orange: 6 } },
      { name: 'pvl', inventory: { blueberry: 10, orange: 3, cherry: 30 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'mao', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { apple: 3, banana: 2, orange: 3 } },
      { qwe: { banana: 1 } },
      { cde: { apple: 2 } },
      { qol: { orange: 5 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('split across warehouses, 1 warehouse provides a few of each fruit, in the end of the list', () => {
    const order = { apple: 5, banana: 3, orange: 8 }
    const warehouses = [
      { name: 'mba', inventory: { grape: 1, kiwi: 60 } },
      { name: 'pal', inventory: { blueberry: 10, cherry: 30 } },
      { name: 'pvl', inventory: { blueberry: 10, cherry: 30 } },
      { name: 'lka', inventory: { peach: 120, blueberry: 10 } },
      { name: 'mao', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } },
      {
        name: 'owd',
        inventory: {
          pear: 10, apple: 3, orange: 3, watermelon: 1, banana: 2
        }
      },
      { name: 'qwe', inventory: { kiwi: 3, grape: 2, banana: 10 } },
      {
        name: 'cde',
        inventory: {
          apple: 2, raspberry: 10, kiwi: 4, watermelon: 10
        }
      },
      { name: 'qol', inventory: { peach: 10, orange: 6 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { owd: { apple: 3, banana: 2, orange: 3 } },
      { qwe: { banana: 1 } },
      { cde: { apple: 2 } },
      { qol: { orange: 5 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('successful multiple orders from same warehouse', function () {
    const order = { apple: 2, banana: 1, orange: 4 }
    const order2 = { apple: 1, banana: 3, orange: 5 }
    const warehouses = [
      { name: 'mba', inventory: { grape: 1, kiwi: 60 } },
      { name: 'pal', inventory: { blueberry: 10, cherry: 30 } },
      { name: 'mao', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } },
      {
        name: 'owd',
        inventory: {
          pear: 10, apple: 3, orange: 3, watermelon: 1, banana: 2
        }
      },
      { name: 'qwe', inventory: { kiwi: 3, grape: 2, banana: 10 } },
      {
        name: 'cde',
        inventory: {
          apple: 2, raspberry: 10, kiwi: 4, watermelon: 10
        }
      },
      { name: 'qol', inventory: { peach: 10, orange: 6 } }
    ]
    inventoryAllocator.getCheapestShipment(order, warehouses)
    const actualResult = inventoryAllocator.getCheapestShipment(order2, warehouses)
    const expectedResult = [
      { owd: { apple: 1, banana: 2, orange: 3 } },
      { qwe: { banana: 1 } },
      { qol: { orange: 2 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('unsuccessful larger order with multiple warehouses', function () {
    const order = {
      apple: 200,
      banana: 10,
      orange: 40,
      cherry: 32,
      raspberry: 43,
      blueberry: 322,
      grape: 100,
      kiwi: 300,
      pineapple: 13,
      pear: 21,
      peach: 123
    }
    const warehouses = [
      { name: 'mba', inventory: { grape: 1, kiwi: 60 } },
      { name: 'pal', inventory: { blueberry: 10, cherry: 30 } },
      { name: 'mao', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } },
      {
        name: 'owd',
        inventory: {
          pear: 10, apple: 100, orange: 3, watermelon: 1, banana: 2
        }
      },
      { name: 'qwe', inventory: { kiwi: 3, grape: 2, banana: 10 } },
      {
        name: 'cde',
        inventory: {
          apple: 400, raspberry: 10, kiwi: 4, watermelon: 10
        }
      },
      { name: 'qol', inventory: { peach: 10, orange: 6 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = []
    chai.expect(actualResult).to.eql(expectedResult)
  })

  it('successful larger order with multiple warehouses', function () {
    const order = {
      apple: 200,
      banana: 10,
      orange: 40,
      cherry: 32,
      raspberry: 43,
      blueberry: 322,
      grape: 100,
      kiwi: 300,
      pineapple: 13,
      pear: 21,
      peach: 123
    }
    const warehouses = [
      { name: 'mba', inventory: { grape: 130, kiwi: 60 } },
      { name: 'pal', inventory: { blueberry: 423, cherry: 300 } },
      { name: 'mao', inventory: { pear: 102, cherry: 73 } },
      { name: 'mvn', inventory: { pineapple: 134, watermelon: 2 } },
      { name: 'qlk', inventory: { raspberry: 10, plum: 400 } },
      {
        name: 'owd',
        inventory: {
          pear: 10, apple: 100, orange: 35, watermelon: 1, banana: 2
        }
      },
      { name: 'qwe', inventory: { kiwi: 33, grape: 2, banana: 10 } },
      {
        name: 'cde',
        inventory: {
          apple: 400, raspberry: 1000, kiwi: 445, watermelon: 10
        }
      },
      { name: 'qol', inventory: { peach: 145, orange: 600 } }
    ]
    const actualResult = inventoryAllocator.getCheapestShipment(order, warehouses)
    const expectedResult = [
      { mba: { grape: 100, kiwi: 60 } },
      { pal: { blueberry: 322, cherry: 32 } },
      { mao: { pear: 21 } },
      { mvn: { pineapple: 13 } },
      { qlk: { raspberry: 10 } },
      { owd: { apple: 100, banana: 2, orange: 35 } },
      { qwe: { banana: 8, kiwi: 33 } },
      { cde: { apple: 100, kiwi: 207, raspberry: 33 } },
      { qol: { orange: 5, peach: 123 } }
    ]
    chai.expect(actualResult).to.eql(expectedResult)
  })
})
