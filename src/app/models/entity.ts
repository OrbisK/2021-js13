import {Sprite} from "kontra";
import {_getAsset, EntityType} from "../globals";
import Level from "./level";

export default class Entity extends Sprite.class {
    asset: any;
    scene: any;
    globalX: number;
    globalY: number;

    constructor({assetId}: EntityType, globalX: number, globalY: number) {
        super({anchor: {x: 0.5, y: 0.8}})
        this.asset = _getAsset(assetId);

        this.globalX = globalX;
        this.globalY = globalY;
    }

    setScene(scene: Level) {
        this.scene = scene;
    }
}