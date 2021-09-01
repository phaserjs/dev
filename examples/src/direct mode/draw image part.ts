import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { Easing, Wrap } from '../../../../phaser-genesis/src/math';

import { DrawImagePart } from '../../../../phaser-genesis/src/renderer/webgl1/draw/DrawImagePart';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetTexture } from '../../../../phaser-genesis/src/textures/GetTexture';
import { IRenderPass } from '../../../../phaser-genesis/src/renderer/webgl1/renderpass/IRenderPass';
import { LoadImageFile } from '../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { On } from '../../../../phaser-genesis/src/events/On';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sine } from '../../../../phaser-genesis/src/math/easing/';
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
        //  256 x 192
        await LoadImageFile('city', 'assets/city.png', { glConfig: { minFilter: gl.NEAREST, magFilter: gl.NEAREST }});

        const texture = GetTexture('city');

        const world = new StaticWorld(this);

        const data = [];

        const chunks = 192;

        for (let x = 0; x < chunks; x++)
        {
            data[x] = Sine.InOut(x / chunks);
            data[chunks + x] = Sine.InOut(1 - (x / chunks));
        }

        let s = 0;

        On(world, WorldPostRenderEvent, (renderPass: IRenderPass) => {

            for (let i = 0; i < 192; i++)
            {
                DrawImagePart(
                    renderPass,
                    texture,
                    0, i, 256, i + 1, // x, y, w, h
                    data[Wrap(s + i * 2, 0, data.length)] * 300, // dx
                    i * 4, // dy
                    512, 4 // dw, dh
                );
            }

            s++;

        });
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);
