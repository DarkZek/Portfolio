
export const PI = Math.PI
export const TWO_PI = Math.PI * 2

// Precompute random values for performance
const randomValuesLength = 10000
const randomValues = new Array(randomValuesLength)
    .fill(0)
    .map(() => Math.random())
let randomIndex = 0

function cachedRandom(): number {
    return randomValues[randomIndex++ % randomValuesLength]
}

export function random(min?: number, max?: number): number {
    if (min === undefined && max === undefined) {
        return cachedRandom()
    }

    if (max === undefined) {
        // If only min is provided, use it as the max value
        max = min
        min = 0
    }

    return cachedRandom() * (max! - min!) + min!
}

export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t
}

export function dist(x: number, y: number, x1: number, y1: number) {
    const dx = x - x1
    const dy = y - y1
    return Math.sqrt(dx * dx + dy * dy)
}
