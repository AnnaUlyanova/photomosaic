const fs = require('fs')

const getAverageRGB = require('../js/client.js')

describe('getAverageRGB', function() {
  it('should return an object', function() {
    tile = {}
    expect(getAverageRGB(tile)).toMatchSnapshot();
  })
})
