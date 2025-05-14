function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function getFileByIndex(category, index) {
  const randomIndex = Math.floor(Math.random() * index) + 1
  const indexStr = randomIndex.toString().padStart(3, "0")
  return `./parts/${category}-${indexStr}.png`
}

async function composeImage(ctx, canvas, sliders) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  console.log(Object.keys(sliders))
  const categories = Object.keys(sliders)

  for (const category of categories) {
    const index = sliders[category]
    if (index === 0) {
      // Skip this category if slider value is 0
      continue
    }
    const src = getFileByIndex(category, index)
    try {
      const img = await loadImage(src)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    } catch (error) {
      console.error(`Failed to load image: ${src}`, error)
    }
  }
}

function main() {
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")

  // Set canvas size explicitly to match CSS size
  canvas.width = 320
  canvas.height = 320

  const sliders = {
    "00-bg": document.getElementById("slider-00-bg"),
    "10-main": document.getElementById("slider-10-main"),
    "20-hands": document.getElementById("slider-20-hands"),
  }

  // Add event listeners to update slider value display
  Object.keys(sliders).forEach((key) => {
    const slider = sliders[key]
    const valueSpan = document.getElementById(`value-${key}`)
    if (valueSpan) {
      valueSpan.textContent = slider.value
      slider.addEventListener("input", () => {
        valueSpan.textContent = slider.value
      })
    }
  })

  const generateBtn = document.getElementById("generate-btn")

  async function generate() {
    const sliderValues = {
      "00-bg": parseInt(sliders["00-bg"].value, 10),
      "10-main": parseInt(sliders["10-main"].value, 10),
      "20-hands": parseInt(sliders["20-hands"].value, 10),
    }
    await composeImage(ctx, canvas, sliderValues)
  }

  generateBtn.addEventListener("click", generate)

  // Initial image composition on page load
  generate()
}

main()
