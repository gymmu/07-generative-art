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

const categories = [
  { id: "00-bg", label: "00-bg", min: 0, max: 1, defaultValue: 1 },
  { id: "10-main", label: "10-main", min: 0, max: 1, defaultValue: 1 },
  { id: "20-hands", label: "20-hands", min: 0, max: 2, defaultValue: 1 },
  { id: "20-shoes", label: "20-shoes", min: 0, max: 1, defaultValue: 1 },
]

function main() {
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")

  // Set canvas size explicitly to match CSS size
  canvas.width = 320
  canvas.height = 320

  const sidebar = document.querySelector(".sidebar")

  // Create slider groups dynamically
  const sliders = {}

  categories.forEach(({ id, label, min, max, defaultValue }) => {
    // Create slider group container
    const sliderGroup = document.createElement("div")
    sliderGroup.className = "slider-group"

    // Create label group container
    const labelGroup = document.createElement("div")
    labelGroup.className = "label-group"

    // Create label element
    const labelEl = document.createElement("label")
    labelEl.setAttribute("for", `slider-${id}`)
    labelEl.textContent = label

    // Create value span
    const valueSpan = document.createElement("span")
    valueSpan.className = "slider-value"
    valueSpan.id = `value-${id}`
    valueSpan.textContent = defaultValue

    // Append label and value span to label group
    labelGroup.appendChild(labelEl)
    labelGroup.appendChild(valueSpan)

    // Create input range slider
    const slider = document.createElement("input")
    slider.type = "range"
    slider.id = `slider-${id}`
    slider.min = min
    slider.max = max
    slider.value = defaultValue

    // Append label group and slider to slider group
    sliderGroup.appendChild(labelGroup)
    sliderGroup.appendChild(slider)

    // Insert slider group before the generate button
    const generateBtn = document.getElementById("generate-btn")
    sidebar.insertBefore(sliderGroup, generateBtn)

    // Store slider reference
    sliders[id] = slider

    // Add event listener to update value span on input
    slider.addEventListener("input", () => {
      valueSpan.textContent = slider.value
    })
  })

  async function generate() {
    const sliderValues = {}
    Object.keys(sliders).forEach((key) => {
      sliderValues[key] = parseInt(sliders[key].value, 10)
    })
    await composeImage(ctx, canvas, sliderValues)
  }

  const generateBtn = document.getElementById("generate-btn")
  generateBtn.addEventListener("click", generate)

  // Initial image composition on page load
  generate()
}

main()
