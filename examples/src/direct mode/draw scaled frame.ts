import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { DrawFrame } from '../../../../phaser-genesis/src/renderer/webgl1/draw/DrawFrame';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetTexture } from '../../../../phaser-genesis/src/textures/GetTexture';
import { IRenderPass } from '../../../../phaser-genesis/src/renderer/webgl1/renderpass/IRenderPass';
import { LoadSpriteSheetFile } from '../../../../phaser-genesis/src/loader/files/LoadSpriteSheetFile';
import { On } from '../../../../phaser-genesis/src/events/On';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { WorldPostRenderEvent } from '../../../../phaser-genesis/src/world/events';
import { gl } from '../../../../phaser-genesis/src/renderer/webgl1/GL';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await LoadSpriteSheetFile('fruit', 'assets/32x32-item-pack.png', { frameWidth: 32 }, { glConfig: { minFilter: gl.NEAREST, magFilter: gl.NEAREST }});

        const texture = GetTexture('fruit');

        const world = new StaticWorld(this);

        On(world, WorldPostRenderEvent, (renderPass: IRenderPass) => {

            DrawFrame(renderPass, texture, 0, 56, 6, 1, 9, 9);
            DrawFrame(renderPass, texture, 1, 456, 6, 1, 9, 9);
            DrawFrame(renderPass, texture, 2, 56, 306, 1, 9, 9);
            DrawFrame(renderPass, texture, 3, 456, 306, 1, 9, 9);

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
