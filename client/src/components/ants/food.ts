import { antSpawner, foods, type AntData } from "../antsSimulation";

export function pickUpFood(ant: AntData) {

    if (ant.hasFood) {
        return
    }

    const nearest = getNearestFood(ant)
    
    if (nearest) {
        if (nearest.distance < 5) {
            // Remove food if ant reaches it
            const index = foods.indexOf(nearest.food);
            if (index > -1) {
                foods.splice(index, 1);
            }
            
            ant.hasFood = true
            ant.angle += Math.PI
        }
    }
}

// Returns the nearest food to the ant
function getNearestFood(ant: AntData): { food: FoodData, distance: number } | null {

    const antPos = ant.rigidBody.translation()

    let closestFood = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    for (const food of foods) {
        const { x: fx, y: fy } = food
        const distance = Math.sqrt((antPos.x - fx) ** 2 + (antPos.y - fy) ** 2);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestFood = food;
        }
    }

    if (closestFood === null) {
        return null
    }

    return {
        food: closestFood,
        distance: closestDistance
    };
}

export function depositFood(ant: AntData) {
    // If the ant has food, deposit it
    if (!ant.hasFood) {
        return
    }

    // Is the ant close to the nest?
    const { x, y } = ant.rigidBody.translation()
    const distance = Math.sqrt((x - antSpawner.x) ** 2 + (y - antSpawner.y) ** 2);

    if (distance < antSpawner.radius) {
        // Deposit food
        ant.hasFood = false

        // Rotate 180 degrees
        ant.angle += Math.PI
    }
}
