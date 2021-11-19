
import { getFullArtFromRepos } from './getFullArtsFromRepos.js';

export function getRndNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
async function setRndBackground() {
    const pictureNumber = getRndNumber(0, 240);
    const pictureUrl = await getFullArtFromRepos('AndrewMakarevich', 'image-data', 'full', 'master', pictureNumber);
    document.body.style.backgroundImage = `url(${pictureUrl})`;
}
setRndBackground();


