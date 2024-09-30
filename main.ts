namespace SpriteKind {
    export const USB = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.USB, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.spray, 500)
    info.changeScoreBy(1)
    info.changeLifeBy(1)
    computerboy.sayText("yay!", 1000, true)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . 4 . . . . . 
        . . . . 2 . . . . 4 4 . . . . . 
        . . . . 2 4 . . 4 5 4 . . . . . 
        . . . . . 2 4 d 5 5 4 . . . . . 
        . . . . . 2 5 5 5 5 4 . . . . . 
        . . . . . . 2 5 5 5 5 4 . . . . 
        . . . . . . 2 5 4 2 4 4 . . . . 
        . . . . . . 4 4 . . 2 4 4 . . . 
        . . . . . 4 4 . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, computerboy, 50, 50)
})
sprites.onOverlap(SpriteKind.Food, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.confetti, 200)
    info.changeScoreBy(1)
    computerboy.sayText("yay!", 1000, true)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    pauseUntil(() => false)
})
info.onLifeZero(function () {
    sprites.destroy(computerboy, effects.fire, 1000)
    pause(1050)
    game.gameOver(false)
})
sprites.onCreated(SpriteKind.Projectile, function (sprite) {
    sprite.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.ashes, 200)
})
let usb: Sprite = null
let exp2: Sprite = null
let file: Sprite = null
let exp1: Sprite = null
let projectile: Sprite = null
let computerboy: Sprite = null
computerboy = sprites.create(assets.image`babey`, SpriteKind.Player)
controller.moveSprite(computerboy)
info.setLife(3)
scene.cameraFollowSprite(computerboy)
tiles.setCurrentTilemap(tilemap`level2`)
game.showLongText("Use arrow keys to move, and B (x) to attack! Collect files and avoid enemies!", DialogLayout.Full)
game.onUpdateInterval(randint(2000, 8000), function () {
    exp1 = sprites.create(img`
        . . . . b b b b b b . . . . . . 
        . . . b f f f f f f b . . . . . 
        . . b f 1 1 1 1 1 f f b . . . . 
        . b f 1 1 1 1 1 1 1 f f b . . . 
        . b f f 1 1 1 1 f 1 f f b . . . 
        . c f 1 f 1 1 f 1 1 1 f c . . . 
        . c f f 1 1 1 1 f f 1 f c . . . 
        . . c f 1 f f 1 b f f f c b . . 
        . . . c b b b b f 1 1 c f 1 b . 
        . . b f f f 1 1 f b c f f f 1 b 
        . b f 1 1 1 f b c b f 1 1 f b b 
        b 1 1 1 1 1 1 c b b f 1 1 b . . 
        c f f f 1 f f f b f f f f c . . 
        c 1 1 1 1 1 1 f 1 1 1 f b c . . 
        . c f 1 1 1 f 1 1 1 1 f c . . . 
        . . b b b b b b b b b c . . . . 
        `, SpriteKind.Enemy)
    exp1.setFlag(SpriteFlag.BounceOnWall, true)
    tiles.placeOnRandomTile(exp1, assets.tile`myTile0`)
    exp1.follow(computerboy, 50)
})
game.onUpdateInterval(randint(2000, 8000), function () {
    file = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 5 . . . . . . . 
        . . . . . . . 5 7 5 5 . . . . . 
        . . 6 . 6 6 5 7 7 7 7 5 . . . . 
        . . . 6 6 7 7 7 7 7 3 7 5 5 . . 
        . . . 5 7 7 7 7 7 7 7 3 7 7 5 . 
        . . 5 7 7 7 7 7 7 3 7 7 7 5 . . 
        . . 5 7 7 7 3 7 3 7 7 7 5 . . . 
        . . 5 2 2 7 7 7 3 7 7 7 5 . . . 
        . . 5 5 2 2 7 7 7 7 7 5 . . . . 
        . . . . 5 5 2 7 7 7 5 . . . . . 
        . . . . . . . 5 5 5 5 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    tiles.placeOnRandomTile(file, assets.tile`myTile0`)
})
game.onUpdateInterval(randint(2000, 8000), function () {
    exp2 = sprites.create(img`
        . . b b b . . . . . . . . b b b 
        . b b a a . . . . . . b a 6 6 a 
        b b a a . . . . . . b a 6 6 a . 
        b a b a . . . . . . b 6 a a a . 
        b b b a a . a a . b a 6 6 a a . 
        b b a f a a f a a b 6 a 6 6 a . 
        b b 6 f 6 a f 6 a b 6 a a 6 a . 
        . a 6 6 6 6 6 6 a 6 6 a a a . . 
        . a . 6 6 6 . 6 6 a a a a . . . 
        a 2 6 6 6 6 6 6 a 6 a a . . . . 
        a 2 a 6 6 6 a 6 a a 6 b . . . . 
        b 2 1 b b b 1 a 2 1 2 b a . . . 
        b 1 6 6 6 a 2 1 4 4 2 b a a . . 
        . b 6 a a 1 1 2 4 1 a b . . . . 
        . . b 6 1 1 1 1 1 a b . . . . . 
        . . . b b b b b b b . . . . . . 
        `, SpriteKind.Enemy)
    exp2.setFlag(SpriteFlag.BounceOnWall, true)
    tiles.placeOnRandomTile(exp2, assets.tile`myTile0`)
    exp2.setVelocity(randint(-50, 50), randint(-50, 50))
})
game.onUpdateInterval(randint(6000, 10000), function () {
    usb = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 1 . . . . . . . . . 
        . . . . . 9 3 3 f f . . . . . . 
        . . . . . 9 3 3 f . f . . . . . 
        . . . . . 3 3 3 f f . . . . . . 
        . . . . . f f . f . . . . . . . 
        . . . . . . f f f . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.USB)
    tiles.placeOnRandomTile(usb, assets.tile`myTile0`)
})
