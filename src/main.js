function addToCanvas(ctx, filename) {
  const backgroundImage = new Image()
  backgroundImage.src = filename

  backgroundImage.onload = function () {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
  }
}

function random(maxIndex) {
  const r = Math.floor(Math.random() * maxIndex) + 1
  if (r < 10) {
    return `00${r}`
  } else if (r < 100) {
    return `0${r}`
  } else if (r < 1000) {
    return `${r}`
  } else {
    return "001"
  }
}

function getFileByPattern(category, maxIndex) {
  const ret = `./parts/${category}-${random(maxIndex)}.png`
  console.log(ret)
  return ret
}

function main() {
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")

  addToCanvas(ctx, getFileByPattern("00-bg", 1))
  addToCanvas(ctx, getFileByPattern("10-main", 1))
  addToCanvas(ctx, getFileByPattern("20-hands", 2))
}

main()
