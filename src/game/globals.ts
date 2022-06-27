export const CANVAS_WIDTH = 270;
export const CANVAS_HEIGHT = 99;

export function getSavedScore() {
    let score = localStorage.getItem('highscore');
    return score? score : '0'
}