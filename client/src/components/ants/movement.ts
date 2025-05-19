import { Vector2 } from "@dimforge/rapier2d";
import { antSize, antSpeed, canvasSize, type AntData } from "../antsSimulation";
import { getPheremoneAt, pheremoneInfluence } from "./pheromones";

export function handleAntMovement(ant: AntData) {
    if (shouldAntChangeDirection(ant)) {
        changeAntDirection(ant)
    }
    
    moveAnt(ant)
    edgeBounce(ant)
    pheremoneInfluence(ant)
}

function shouldAntChangeDirection(ant: AntData): boolean {

    // If the ant has a strong pheromone signal
    const pheremoneInfluence = getPheremoneAt(ant.rigidBody.translation())
    if (pheremoneInfluence && pheremoneInfluence.strength > 0) {
        return false
    }

    // Randomly decide if the ant should change direction
    return Math.random() < 0.1 / deltaTime;
}

function changeAntDirection(ant: AntData) {
    // Randomly change the ant's direction
    ant.angle = Math.random() * Math.PI * 2;
}

// Moves an ant in a direction with collision detection
function moveAnt(ant: AntData) {
    ant.rigidBody.setLinvel(new Vector2(
        Math.cos(ant.angle) * antSpeed * deltaTime,
        Math.sin(ant.angle) * antSpeed * deltaTime
    ), true) 
}

function edgeBounce(ant: AntData) {
    const { x, y } = ant.rigidBody.translation()

    const edge = (antSize / 2) + 1

    // If the ant goes close to the edge of the canvas
    if (x > edge && x < canvasSize.x - edge && y > edge && y < canvasSize.y - edge) {
        return
    }

    // Bounce. Generate an angle random towards the center with slight randomness
    const angle = Math.atan2(canvasSize.y / 2 - y, canvasSize.x / 2 - x) + (Math.random() * Math.PI / 4) - (Math.PI / 8)
    ant.angle = angle
}