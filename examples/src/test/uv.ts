import * as GL_CONST from '../../../../phaser-genesis/src/renderer/webgl1/GL_CONST';

import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Game } from '../../../../phaser-genesis/src/Game';
import { LoadImageFile } from '../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { SetFrameUVs } from '../../../../phaser-genesis/src/textures/SetFrameUVs';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await LoadImageFile('512', 'assets/512x512.png', { glConfig: { wrapS: GL_CONST.REPEAT, wrapT: GL_CONST.REPEAT }});

        const world = new StaticWorld(this);

        const bob = new Sprite(400, 300, '512');

        const texture = bob.texture;

        let x1 = 0;
        let x2 = 1;
        let y1 = 0;
        let y2 = 1;
        let scale = 1;

        setInterval(() => {

            SetFrameUVs(texture.firstFrame, x1 * scale, y1 * scale, x2 * scale, y2 * scale);

            x1 += 0.1;
            x2 += 0.1;

            // scale -= 0.01;

        }, 100);

        console.log(texture);

        AddChild(world, bob);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
