// const imageLoader = document.getElementById('imageLoader')
// if (imageLoader) {
//   imageLoader.addEventListener('change', uploadImage, false)
// }

// load local image into canvas
function uploadImage (e) {
  const reader = new FileReader()
  reader.onload = function (event) {
    const img = new Image()
    img.onload = function () {
      const canvas = document.getElementById('imageCanvas')
      const ctx = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
    }
    img.src = event.target.result
  }
  reader.readAsDataURL(e.target.files[0])
}

// calculate average color
function getAverageRGB (tile) { // taking a sepate tile from generateMosaic function
  let i = 0
  const rgb = {r: 0, g: 0, b: 0}
  let pixelCount = 0

  const length = tile.data.length

  while ((i += 4) < length) {
    ++pixelCount
    rgb.r += tile.data[i]
    rgb.g += tile.data[i + 1]
    rgb.b += tile.data[i + 2]
  }

  rgb.r = Math.floor(rgb.r / pixelCount)
  rgb.g = Math.floor(rgb.g / pixelCount)
  rgb.b = Math.floor(rgb.b / pixelCount)

  return rgb // rgb returned as an object
}

function generateMosaic () {
  const canvas = document.getElementById('imageCanvas')
  const ctx = canvas.getContext('2d')

// generate mosaic for the entire image except for the last row and column of tiles
  for (let y = 0; y <= canvas.height - TILE_HEIGHT; y += TILE_HEIGHT) {
    for (let x = 0; x <= canvas.width - TILE_WIDTH; x += TILE_WIDTH) {
      const tile = ctx.getImageData(x, y, TILE_WIDTH, TILE_HEIGHT) // select separate tile

      const rgb = getAverageRGB(tile)
      ctx.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}`
      ctx.fillRect(x, y, TILE_WIDTH, TILE_HEIGHT)
    }
  }

  const lastTileHeight = canvas.height % TILE_HEIGHT
  const lastTileWidth = canvas.width % TILE_WIDTH
  const lastTileY = canvas.width - lastTileHeight
  const lastTileX = canvas.width - lastTileWidth

// generate mosaic for the last row and column of tiles as canvas.height % TILE_HEIGHT and canvas.width % TILE_WIDTH are not always 0
  for (let lastY = 0; lastY <= canvas.height; lastY += TILE_HEIGHT) {
    const tileY = ctx.getImageData(lastTileX, lastY, lastTileWidth, lastTileHeight)

    const rgb = getAverageRGB(tileY)
    ctx.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}`
    ctx.fillRect(lastTileX, lastY, lastTileWidth, lastTileHeight)
  }

  for (let lastX = 0; lastX <= canvas.width; lastX += TILE_WIDTH) {
    const tileX = ctx.getImageData(lastX, lastTileY, lastTileWidth, lastTileHeight)

    const rgb = getAverageRGB(tileX)
    ctx.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}`
    ctx.fillRect(lastX, lastTileY, lastTileWidth, lastTileHeight)
  }
}

module.exports = {
  getAverageRGB: getAverageRGB
}
