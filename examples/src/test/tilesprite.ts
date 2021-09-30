import * as GL_CONST from '../../../../phaser-genesis/src/renderer/webgl1/GL_CONST';

import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Game } from '../../../../phaser-genesis/src/Game';
import { LoadImageFile } from '../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { SetFrameUVs } from '../../../../phaser-genesis/src/textures/SetFrameUVs';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { TileSprite } from '../../../../phaser-genesis/src/gameobjects/tilesprite/TileSprite';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await LoadImageFile('512', 'assets/fantasy-tiles.png', { glConfig: { wrapS: GL_CONST.REPEAT, wrapT: GL_CONST.REPEAT, flipY: true }});

        const world = new StaticWorld(this);

        const bob = new TileSprite(400, 300, '512');

        bob.rotation = 0.2;

        setInterval(() => {

        }, 100);

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
