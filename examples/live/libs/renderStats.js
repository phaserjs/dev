import { FPS } from './renderstats/fps.js';
import { GameObjects } from './renderstats/gameobjects.js';
import { MS } from './renderstats/ms.js';
import { Stats } from './renderstats/stats.js';

window.linkGame = (game) => {

    FPS(game);
    MS(game);
    Stats(game);
    GameObjects(game);

}