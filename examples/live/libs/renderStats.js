import { FPS } from './renderstats/fps.js';
import { GameObjects } from './renderstats/gameobjects.js';
import { LocalTransforms } from './renderstats/localTransforms.js';
import { MS } from './renderstats/ms.js';
import { Stats } from './renderstats/stats.js';
import { WorldTransforms } from './renderstats/worldTransforms.js';

window.linkGame = (game) => {

    FPS(game);
    MS(game);
    LocalTransforms(game);
    WorldTransforms(game);
    // Stats(game);
    // GameObjects(game);

}