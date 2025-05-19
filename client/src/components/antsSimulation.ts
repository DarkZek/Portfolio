import 'q5/q5'
import RAPIER, { Vector2 } from '@dimforge/rapier2d'
import { spawnWorldBounds } from './ants/worldBounds'
import { degradePheromones, initPheromones, updatePheromones } from './ants/pheromones';
import { setup, draw } from './ants/draw'
import { handleAntMovement } from './ants/movement';
import { depositFood, pickUpFood } from './ants/food';

export const canvasSize = new Vector2(800, 400);

const world = new RAPIER.World(new RAPIER.Vector2(0, 0))

spawnWorldBounds(world, canvasSize)
initPheromones(canvasSize)

export const ants: AntData[] = []
export const antSpeed = 2.1
export const antSize = 6
export type AntData = {
    rigidBody: RAPIER.RigidBody,
    collider: RAPIER.Collider,
    angle: number,
    hasFood: boolean
}

export const antSpawner = {
    x: 100,
    y: 100,
    radius: 50,
    count: 500
}

// Populate points with random values inside sphere
for (let i = 0; i < antSpawner.count; i++) {

    const angle = Math.random() * Math.PI * 2
    const radius = Math.random() * antSpawner.radius
    const x = antSpawner.x + Math.cos(angle) * radius
    const y = antSpawner.y + Math.sin(angle) * radius

    const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(x, y)
        .setLinearDamping(0.5);
    const rigidBody = world.createRigidBody(rigidBodyDesc);

    const colliderDesc = RAPIER.ColliderDesc.ball(antSize / 2);
    const collider = world.createCollider(colliderDesc, rigidBody);

    ants.push({
        rigidBody,
        collider,
        angle: Math.random() * Math.PI * 2,
        hasFood: false
    });
}

export const foods: FoodData[] = []
export type FoodData = { x: number, y: number }
export const foodSpawner = {
    x: 600,
    y: 200,
    radius: 100,
    count: 1000
}

// Populate points with random values
for (let i = 0; i < foodSpawner.count; i++) {

    const angle = Math.random() * Math.PI * 2
    const radius = Math.random() * foodSpawner.radius
    const x = foodSpawner.x + Math.cos(angle) * radius
    const y = foodSpawner.y + Math.sin(angle) * radius

    foods.push({ x, y });
}

function simulate() {
    // All ants move towards the closest food
    for (const ant of ants) {
        handleAntMovement(ant)
        updatePheromones(ant)
        pickUpFood(ant)
        depositFood(ant)
    }

    degradePheromones()

    world.step()
}

export async function start() {
    const q5 = await Q5.WebGPU()

    createCanvas(canvasSize.x, canvasSize.y, { alpha: true })
    
    q5.draw = () => {
        draw()
        simulate()
    }
    q5.setup = setup
}