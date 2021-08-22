import {Sprite} from "kontra";
import {_getAsset} from "../globals";
import Scene from "./scene";


type EntityType = {
    assetId: string,
}

export default class Entity extends Sprite.class {
    asset: any;
    scene: any;
    globalX: number;
    globalY: number;

    constructor({assetId}: EntityType) {
        super({
            anchor: {x: 0.5, y: 0.8},
        })
        this.asset = _getAsset(assetId);
        this.globalX = 10;
        this.globalY = 10;
    }

    setScene(scene: Scene) {
        this.scene = scene;
    }
}