import { FPS } from './renderstats/fps.js';
import { GameObjects } from './renderstats/gameobjects.js';
import { LocalTransforms } from './renderstats/localTransforms.js';
import { MSGauge } from './renderstats/msGauge.js';
import { RenderMS } from './renderstats/renderMS.js';
import { Stats } from './renderstats/stats.js';
import { UpdateMS } from './renderstats/updateMS.js';
import { Vertices } from './renderstats/vertices.js';
import { WorldTransforms } from './renderstats/worldTransforms.js';

window.linkGame = (game, panel) => {

    FPS(game);
    RenderMS(game);
    UpdateMS(game);
    LocalTransforms(game);
    WorldTransforms(game);
    MSGauge(game);
    GameObjects(game);
    Vertices(game);
    Stats(game, panel);

}