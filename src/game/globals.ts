export const CANVAS_WIDTH = 270;
export const CANVAS_HEIGHT = 99;
export const FONT_SMALL: string = '5px Verdana'
export const TEXT_PROPS: any = {font: '8px Verdana', color: 'rgb(250, 250, 250, 0.7)', textAlign: 'center', lineHeight: 1.5}

export function getSavedScore() {
    let score = localStorage.getItem('highscore');
    return score? score : '0'
}