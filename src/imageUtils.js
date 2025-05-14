export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export function getFileByIndex(category, index) {
  const randomIndex = Math.floor(Math.random() * index) + 1
  const indexStr = randomIndex.toString().padStart(3, "0")
  return `./parts/${category}-${indexStr}.png`
}

export async function composeImage(ctx, canvas, sliders) {
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
