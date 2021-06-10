import { FPS } from './renderstats/fps.js';
import { GameObjects } from './renderstats/gameobjects.js';
import { LocalTransforms } from './renderstats/localTransforms.js';
import { MS } from './renderstats/ms.js';
import { MSGauge } from './renderstats/msGauge';
import { Stats } from './renderstats/stats.js';
import { Vertices } from './renderstats/vertices';
import { WorldTransforms } from './renderstats/worldTransforms.js';

window.linkGame = (game) => {

    FPS(game);
    MS(game);
    LocalTransforms(game);
    WorldTransforms(game);
    MSGauge(game);
    GameObjects(game);
    Vertices(game);
    Stats(game);

}