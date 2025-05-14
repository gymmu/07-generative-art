import { composeImage } from "./imageUtils.js"
import { createSliderGroup } from "./uiUtils.js"

export const categories = [
  { id: "00-bg", label: "00-bg", min: 0, max: 1, defaultValue: 1 },
  { id: "10-main", label: "10-main", min: 0, max: 1, defaultValue: 1 },
  { id: "20-hands", label: "20-hands", min: 0, max: 2, defaultValue: 1 },
  { id: "20-shoes", label: "20-shoes", min: 0, max: 1, defaultValue: 1 },
  // TODO: Hier können neue Teile hinzugefügt werden.
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
    const { sliderGroup, slider } = createSliderGroup(
      { id, label, min, max, defaultValue },
      (value) => {
        const valueSpan = document.getElementById(`value-${id}`)
        if (valueSpan) {
          valueSpan.textContent = value
        }
      },
    )

    // Insert slider group before the generate button
    const generateBtn = document.getElementById("generate-btn")
    sidebar.insertBefore(sliderGroup, generateBtn)

    // Store slider reference
    sliders[id] = slider
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
