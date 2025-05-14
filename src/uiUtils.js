export function createSliderGroup(
  { id, label, min, max, defaultValue },
  onInput,
) {
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

  // Add event listener to update value span on input
  slider.addEventListener("input", () => {
    valueSpan.textContent = slider.value
    if (onInput) {
      onInput(slider.value)
    }
  })

  return { sliderGroup, slider }
}
