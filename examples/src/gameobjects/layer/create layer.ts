import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';
import { Layer, Sprite } from '../../../../../phaser-genesis/src/gameobjects/';

import { AddChild } from '../../../../../phaser-genesis/src/display/';
import { Between } from '../../../../../phaser-genesis/src/math';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../../phaser-genesis/src/loader/files/ImageFile';
import { Mouse } from '../../../../../phaser-genesis/src/input/mouse';
import { On } from '../../../../../phaser-genesis/src/events';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await ImageFile('snowflake', 'assets/snowflake-pixel.png');
        await ImageFile('sonic', 'assets/sonic.png');

        const world = new StaticWorld(this);

        const layer = new Layer();

        for (let i = 0; i < 32; i++)
        {
            const x = Between(0, 800);
            const y = Between(0, 600);

            AddChild(layer, new Sprite(x, y, 'snowflake'));
        }

        AddChild(world, layer);

        for (let i = 0; i < 32; i++)
        {
            const x = Between(0, 800);
            const y = Between(0, 600);

            AddChild(world, new Sprite(x, y, 'sonic'));
        }

        const mouse = new Mouse();

        On(mouse, 'pointerdown', () =>
        {
            layer.visible = !layer.visible;
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
