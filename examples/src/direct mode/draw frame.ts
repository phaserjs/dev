import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { DrawFrame } from '../../../../phaser-genesis/src/renderer/webgl1/draw/DrawFrame';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetTexture } from '../../../../phaser-genesis/src/textures/GetTexture';
import { IRenderPass } from '../../../../phaser-genesis/src/renderer/webgl1/renderpass/IRenderPass';
import { On } from '../../../../phaser-genesis/src/events/On';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { SpriteSheetFile } from '../../../../phaser-genesis/src/loader/files/SpriteSheetFile';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { WorldPostRenderEvent } from '../../../../phaser-genesis/src/world/events';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await SpriteSheetFile('tiles', 'assets/fantasy-tiles.png', { frameWidth: 64 }).load();

        const texture = GetTexture('tiles');

        const world = new StaticWorld(this);

        On(world, WorldPostRenderEvent, (renderPass: IRenderPass) => {

            DrawFrame(renderPass, texture, 52, 64, 270);
            DrawFrame(renderPass, texture, 49, 192, 270);
            DrawFrame(renderPass, texture, 25, 320, 270);
            DrawFrame(renderPass, texture, 7, 448, 270);
            DrawFrame(renderPass, texture, 23, 576, 270);
            DrawFrame(renderPass, texture, 31, 704, 270);

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
