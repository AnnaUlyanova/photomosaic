var test = require('tape')
var getAverageRGB = require('../js/client.js')

test('should return an object', function (t) {
  var expected = {r: 0, g: 0, b: 0}
  var actual = function getAverageRGB() {
    return {r: 0, g: 0, b: 0}
  }
  t.equal(actual, expected)
  t.end()
})
