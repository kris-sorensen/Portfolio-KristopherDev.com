import { ColorType } from '../types/types';

export const pickColors = (colors: ColorType[]): ColorType[] => {
    let currentIndex = colors.length, randomIndex;
    // While there remain elements to shuffle.
    while(currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [colors[currentIndex], colors[randomIndex]] = [
            colors[randomIndex], colors[currentIndex]];
    }
    return colors;
};

