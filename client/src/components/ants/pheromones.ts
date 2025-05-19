import type { Vector2 } from "@dimforge/rapier2d"
import type { AntData } from "../antsSimulation"

type Cell = {
    angle: number,
    strength: number,
}
const pheromones: Cell[][] = []

const cellSize = 20

export function initPheromones(canvasSize: Vector2) {
    const cols = Math.ceil(canvasSize.x / cellSize)
    const rows = Math.ceil(canvasSize.y / cellSize)

    for (let i = 0; i < cols; i++) {
        pheromones[i] = []
        for (let j = 0; j < rows; j++) {
            pheromones[i][j] = { angle: 0, strength: 0 }
        }
    }
}

export function debugPheromones() {
    for (let x = 0; x < pheromones.length; x++) {
        for (let y = 0; y < pheromones[x].length; y++) {
            const cell = pheromones[x][y]
            
            fill(color(cell.strength, 0.9, 0.9, 1.0))
            stroke(color(0.0, 0.0, 0.0, 1.0))
            rect(x * cellSize, y * cellSize, cellSize, cellSize)

            textSize(6)
            fill(color(0, 0, 0, 1.0))
            text(cell.strength.toFixed(2), x * cellSize + 2, y * cellSize + 10)

            debugArrow(
                x * cellSize + cellSize / 2,
                y * cellSize + cellSize / 2,
                cell.angle
            )
        }
    }
}

function debugArrow(x: number, y: number, angle: number) {

    translate(x, y)
    rotate(angle + Math.PI / 2)

    triangle(
        0, 0,
        -4, 8,
        4, 8
    )

    rotate(-(angle + Math.PI / 2))
    translate(-x, -y)
}

export function updatePheromones(ant: AntData) {
    const antPos = ant.rigidBody.translation()

    const x = Math.floor(antPos.x / cellSize)
    const y = Math.floor(antPos.y / cellSize)

    if (pheromones[x]?.[y]) {
        const cell = pheromones[x][y]
        if (cell.strength === 0) {
            // Set the angle to the ant's angle
            cell.angle = ant.angle
        } else {

            // What impact does the ant have on the pheromone?
            let angleImpact = 4 / (cell.strength ** 0.8)

            // If the ant has food weigh the angle more highly
            angleImpact *= ant.hasFood ? 3.0 : 0.8

            if (ant.hasFood) {
                // Set the angle to the ant's angle
                cell.angle = lerp(cell.angle, ant.angle, angleImpact * deltaTime)
            } else {
                // Set the angle to the opposite of the ant's angle
                cell.angle = lerp(cell.angle, ant.angle + Math.PI, angleImpact * deltaTime)
            }
        }

        // Increase the strength of the pheromone
        cell.strength += 0.1 * deltaTime
    }
}

export function degradePheromones() {
    for (let x = 0; x < pheromones.length; x++) {
        for (let y = 0; y < pheromones[x].length; y++) {
            const cell = pheromones[x][y]
            cell.strength -= 0.01 * deltaTime
            if (cell.strength < 0) {
                cell.strength = 0
            }
        }
    }
}

export function pheremoneInfluence(ant: AntData) {
    const antPos = ant.rigidBody.translation()

    const x = Math.floor(antPos.x / cellSize)
    const y = Math.floor(antPos.y / cellSize)

    if (pheromones[x]?.[y]) {
        const cell = pheromones[x][y]

        if (cell.strength > 0) {

            const baseStrength = (0.0001 * cell.strength) / deltaTime
            const strength = Math.max(0, Math.min(baseStrength, 1.0))

            if (strength < 0.01) {
                return
            }

            if (!ant.hasFood) {
                // Set the ant's angle to the pheromone's angle
                ant.angle = lerp(ant.angle, cell.angle, strength)
            } else {
                // Set the ant's angle to the opposite of the pheromone's angle
                ant.angle = lerp(ant.angle, cell.angle + Math.PI, strength)
            }

            ant.angle %= Math.PI * 2
        }
    }
}

function lerp(a: number, b: number, t: number): number {
    const result = a + (b - a) * t

    return Math.max(b, Math.min(result, a))
}

export function getPheremoneAt(position: Vector2): Cell | null {

    const x = Math.floor(position.x / cellSize)
    const y = Math.floor(position.y / cellSize)

    const pheromone = pheromones[x]?.[y]
    if (pheromone) {
        return pheromone
    }

    return null
}