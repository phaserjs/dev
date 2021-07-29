import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { Between, FloatBetween } from '../../../../phaser-genesis/src/math';
import { FlatWorld, SortWorldList } from '../../../../phaser-genesis/src/world';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Game } from '../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';

class Slider extends Sprite
{
    speed: number;

    constructor (x: number, y: number, texture: string)
    {
        super(x, y, texture);

        const s = FloatBetween(1, 8);

        this.setScale(1 / s);

        this.speed = 8 - s;
    }

    update (): void
    {
        this.y += this.speed;

        if (this.y > 800)
        {
            this.y = -300;
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
        await ImageFile('glove', 'assets/boxing-glove.png');
        await ImageFile('box', 'assets/box-item-boxed.png');

        const world = new FlatWorld(this);

        for (let i = 0; i < 512; i++)
        {
            const x = Between(0, 800);
            const y = Between(-300, 600);

            AddChild(world, new Slider(x, y, 'glove'));
        }

        SortWorldList(world, 'speed');
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);
