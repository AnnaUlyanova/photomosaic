var test = require('tape')
var getAverageRGB = require('../js/client.js')

test('should return an object', function (t) {
  t.getAverageRGB(function () {
    const rgb = {r: 0, g: 0, b: 0}
  })
  t.end()
})
