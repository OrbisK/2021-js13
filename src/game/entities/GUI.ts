// import {GameObject, GameObjectClass, SceneClass, Text} from "kontra"
// import {CANVAS_HEIGHT, CANVAS_WIDTH, getSavedScore} from "../globals"
//
// const FONT_SMALL: string = '5px Verdana'
// const TEXT_PROPS: any = {font: '8px Verdana', color: 'rgb(250, 250, 250, 0.7)', textAlign: 'center', lineHeight: 1.5}
//
//
//
//
// export class GUI extends GameObjectClass{
//     gameScreen: GameScreen = new GameScreen()
//     menuScreen: MenuScreen = new MenuScreen()
//     endScreen: EndScreen = new EndScreen()
//     activeScreen!: GameObject
//
//     constructor() {
//         super()
//         this.changeScreen("game")
//         this.addChild(this.activeScreen)
//     }
//
//     changeScreen(type: string){
//         this.activeScreen = {
//             menu: this.menuScreen,
//             game: this.gameScreen,
//             end: this.endScreen,
//         }[type] as GameObject
//     }
//
//     setScore(score: number){
//         this.gameScreen.setScore(score)
//         this.endScreen.setScore(score)
//     }
//
//     setCorona(percent: number){
//         this.gameScreen.setCorona(percent)
//     }
// }