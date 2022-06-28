import LevelBuilder from "./LevelBuilder";

export class LevelDirector{
    builder: LevelBuilder

    colors = [
        "rgb(0, 255, 0, 0.07)",
        "rgb(255, 0, 0, 0.07)",
        "rgb(0, 0, 255, 0.07)",
        "rgb(0, 255, 255, 0.07)",
        "rgb(255, 255, 0, 0.07)",
        "rgb(255, 0, 255, 0.07)",
    ]

    constructor(builder: LevelBuilder) {
        this.builder = builder
    }

    buildLevelByDifficulty(difficulty: number){
        this.builder.reset()
        this.builder
            .setWorldSize(80 * difficulty, 11)
            .setBackgroundColorLayer(this.colors[difficulty % this.colors.length])
            .setTileEngine(difficulty)

        return this.builder.getResult()
    }

}