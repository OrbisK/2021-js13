import {Sprite} from "kontra";
import {_getAsset} from "../globals";


type EntityType = {
    assetId: string,
}

export default class Entity extends Sprite.class {
    asset: any;

    constructor({assetId}: EntityType) {
        const sprite = {
            x: 10,
            y: 10,
            anchor: {x: 0.5, y: 0.8},
        }
        super(sprite)
        this.asset = _getAsset(assetId);
    }
}