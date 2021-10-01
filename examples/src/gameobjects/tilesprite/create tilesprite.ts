import * as GL_CONST from '../../../../../phaser-genesis/src/renderer/webgl1/GL_CONST';

import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../../phaser-genesis/src/display';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { LoadImageFile } from '../../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { On } from '../../../../../phaser-genesis/src/events/On';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';
import { TileSprite } from '../../../../../phaser-genesis/src/gameobjects/tilesprite/TileSprite';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        const pixelArt = { glConfig: { minFilter: GL_CONST.NEAREST, magFilter: GL_CONST.NEAREST }};

        await LoadImageFile('lemming', 'assets/lemming.png', pixelArt);
        await LoadImageFile('terrain', 'assets/textures/bricks.png', pixelArt);

        const world = new StaticWorld(this);

        const lemming = new TileSprite(400, 300, 800, 600, 'lemming');
        const land = new TileSprite(400, 300, 512, 256, 'terrain');

        AddChild(world, lemming);
        AddChild(world, land);

        On(world, 'update', () =>
        {
            lemming.tilePosition.x += 0.01;
            lemming.tilePosition.y += 0.02;

            land.tilePosition.x -= 0.001;
            land.tilePosition.y += 0.002;
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
