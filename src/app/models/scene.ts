import Entity from "./entity";
import {TileEngine} from "kontra";
import {_getAsset} from "../globals";

export default class Scene {
    children: Array<Entity>;
    tileEngine: TileEngine;
    width: number;
    height: number;
    tileMapWidth: number;
    tileMapHeight: number;
    groundTiles: Array<number> | undefined;

    constructor(width: number, height: number, children: Array<Entity>) {
        this.width = width;
        this.height = height;
        this.tileMapWidth = Math.ceil(width / 9);
        this.tileMapHeight = Math.ceil(height / 9);
        this.children = children;
        this.groundTiles = this.getGroundTiles();
        this.tileEngine = this.getTileEngine()
    }

    getGroundTiles() {
        let groundTiles = [];

        for (let y = 0; y < this.tileMapHeight; y++) {
            for (let x = 0; x < this.tileMapWidth; x++) {
                groundTiles.push(1);
            }
        }

        return groundTiles;
    }

    getTileEngine() {
        return new TileEngine({
            // tile size
            tilewidth: 9,
            tileheight: 9,

            // map size in tiles
            width: this.tileMapWidth,
            height: this.tileMapHeight,

            // tileset object
            tilesets: [{
                firstgid: 1,
                image: _getAsset("tiles"),
            }],

            // layer object
            layers: [{
                name: 'ground',
                data: this.groundTiles,
            }]
        });
    }

    update() {
        // Sprites must be sorted to make sure, which Entity is in the background and which in the foreground
        this.children.sort((a: Entity, b: Entity) => a.y < b.y ? -1 : 1);

        for (const child of this.children) {
            child.update();
        }
    }

    render() {
        // @ts-ignore
        this.tileEngine.render();
        for (const child of this.children) {
            child.render();
        }
    }
}