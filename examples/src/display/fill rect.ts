import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { FillRect } from '../../../../phaser-genesis/src/renderer/webgl1/draw/FillRect';
import { Game } from '../../../../phaser-genesis/src/Game';
import { IRenderPass } from '../../../../phaser-genesis/src/renderer/webgl1/renderpass/IRenderPass';
import { On } from '../../../../phaser-genesis/src/events/On';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { WorldPostRenderEvent } from '../../../../phaser-genesis/src/world/events';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        On(world, WorldPostRenderEvent, (renderPass: IRenderPass) => {

            FillRect(renderPass, 100, 100, 64, 64, 0xff0000);
            FillRect(renderPass, 200, 200, 128, 32, 0xffff00);
            FillRect(renderPass, 300, 300, 16, 128, 0xff00ff);

        });
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
