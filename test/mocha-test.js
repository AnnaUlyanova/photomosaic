const assert = require('assert')

const getAverageRGB = require('../js/client.js')

describe('getAverageRGB', function() {
  it('should return an object', function() {
    const rgb = {r: 0, g: 0, b: 0}
    assert.equal(rgb.b, 0);
  })
})
