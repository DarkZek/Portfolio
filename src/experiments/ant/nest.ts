import { Particle, Texture, type IParticle, type ParticleContainer } from "pixi.js";
import { random, TWO_PI } from "./utils";

export type Ant = {
    x: number;
    y: number;
    angle: number;
    hasFood: boolean;
    nearNest: boolean;
    nearFood: boolean;
    speed: number;
    sprite: IParticle;
}

export const nest = {
    x: 300,
    y: 500,
    radius: 60
}

export function spawnAnts(container: ParticleContainer, texture: Texture, count: number): Ant[] {
    const ants: Ant[] = []

    for (let i = 0; i < count; i++) {

        // Generate a random position near the nest
        const angle = random(TWO_PI);
        const distance = random(0, nest.radius);
        
        const x = nest.x + Math.cos(angle) * distance;
        const y = nest.y + Math.sin(angle) * distance;

        const sprite = new Particle({
            texture,
            width: 1,
            height: 1
        })

        ants.push({
            x,
            y,
            angle: random(TWO_PI),
            hasFood: false,
            nearNest: false,
            nearFood: false,
            sprite: container.addParticle(sprite),
            speed: random(0.6, 1.0)
        });
    }

    return ants
}