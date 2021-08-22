export let SCALE = 3;

export default [
    {
        name: "player",
        path: "person-sheet.png"
    },
]

export const _getAsset = (name: string): any => {
    return document.querySelector(`#${name}`)
}