import { BackgroundColor, BatchSize, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { Between, FloatBetween } from '../../../../phaser-genesis/src/math';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Game } from '../../../../phaser-genesis/src/Game';
import { LoadImageFile } from '../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

class Pixel extends Sprite
{
    speed: number;

    constructor (x: number, y: number)
    {
        super(x, y, 'pixel');

        this.speed = FloatBetween(1, 8);
    }

    update (): void
    {
        this.x -= this.speed;

        if (this.x < -200)
        {
            this.x = 1000;
        }
    }
}

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await LoadImageFile('pixel', 'assets/2x2.png');

        const world = new StaticWorld(this);

        for (let i = 0; i < 50000; i++)
        {
            const x = Between(-200, 1000);
            const y = Between(0, 600);

            AddChild(world, new Pixel(x, y));
        }
    }
}

window['game'] = new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);
