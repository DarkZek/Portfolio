import { ants, antSize, antSpawner, canvasSize, foods } from "../antsSimulation";
import { debugPheromones } from "./pheromones";

let antColor: Color
let antNestColor: Color
let foodColor: Color

export function setup() {
    antColor = color(1.0, 0, 0, 1.0)
    antNestColor = color(1.0, 0.8, 0.8, 1.0)
    foodColor = color(0, 1.0, 0, 1.0)
}

export function draw() {
    clear();

    // Start at top left corner
    translate(-canvasSize.x / 2, -canvasSize.y / 2);

    debugPheromones();

    // Draw ant nest
    fill(antNestColor)
    noStroke()
    circle(antSpawner.x, antSpawner.y, antSpawner.radius * 2);
    
    // Draw ants
    fill(antColor)
    for (const ant of ants) {
        const { x, y } = ant.rigidBody.translation()
        if (ant.hasFood) {
            stroke(foodColor)
        } else {
            noStroke()
        }
        circle(x, y, antSize);
    }

    // Draw foods
    fill(foodColor)
    for (const food of foods) {
        const { x, y } = food
        circle(x, y, 5);
    }
}