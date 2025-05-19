import { ColliderDesc, RigidBodyDesc, type Vector2, type World } from '@dimforge/rapier2d'

export function spawnWorldBounds(
    world: World,
    canvasSize: Vector2
) {

    // Top
    world.createCollider(ColliderDesc.cuboid(canvasSize.x, 10).setTranslation(canvasSize.x / 2, -10))

    // Bottom
    world.createCollider(ColliderDesc.cuboid(canvasSize.x, 10).setTranslation(canvasSize.x / 2, canvasSize.y + 10))

    // Left
    world.createCollider(ColliderDesc.cuboid(10, canvasSize.y).setTranslation(-10, canvasSize.y / 2))

    // Right
    world.createCollider(ColliderDesc.cuboid(10, canvasSize.y).setTranslation(canvasSize.x + 10, canvasSize.y / 2))
}