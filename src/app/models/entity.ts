import {Sprite, SpriteSheet} from "kontra";

const _getAsset = (name: string): any => {
    return document.querySelector(`#${name}`)
}

type EntityType = {
    assetId: string,
}

export default class Entity extends Sprite.class {
    isForward: boolean;
    isMoving: boolean;

    constructor({assetId}: EntityType) {
        const playerSheet = SpriteSheet({
            image: _getAsset(assetId),
            frameWidth: 7,
            frameHeight: 14,
            animations: {
                idle: {
                    frames: 1,
                    loop: false,
                },
                walk: {
                    frames: [0, 1, 2, 1],
                    frameRate: 6,
                }
            }
        });
        const sprite = {
            x: 10,
            y: 10,
            anchor: {x: 0.5, y: 0.5},
            animations: playerSheet.animations
        }
        super(sprite)
        this.isForward = true;
        this.isMoving = false;

    }

}