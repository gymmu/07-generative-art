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

  // Dynamically get all sliders with id starting with "slider-"
  const sliderElements = document.querySelectorAll(
    'input[type="range"][id^="slider-"]',
  )
  const sliders = {}

  sliderElements.forEach((slider) => {
    const category = slider.id.replace("slider-", "")
    sliders[category] = slider
  })

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
    const sliderValues = {}
    Object.keys(sliders).forEach((key) => {
      sliderValues[key] = parseInt(sliders[key].value, 10)
    })
    await composeImage(ctx, canvas, sliderValues)
  }

  generateBtn.addEventListener("click", generate)

  // Initial image composition on page load
  generate()
}

main()
