import { BackgroundColor, GlobalVar, MaxTextures, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Game } from '../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
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
        await ImageFile('disk1', 'assets/items/disk1.png').load();
        await ImageFile('disk2', 'assets/items/disk2.png').load();
        await ImageFile('disk3', 'assets/items/disk3.png').load();
        await ImageFile('disk4', 'assets/items/disk4.png').load();
        await ImageFile('disk5', 'assets/items/disk5.png').load();
        await ImageFile('disk6', 'assets/items/disk6.png').load();
        await ImageFile('disk7', 'assets/items/disk7.png').load();

        //  This will only use 1 bound texture at a time, which uses the faster
        //  SINGLE_QUAD_FRAG fragment shader, instead of MULTI_QUAD_FRAG

        const world = new StaticWorld(this);

        let x = 64;
        let y = 64;

        for (let i = 1; i < 8; i++)
        {
            AddChild(world, new Sprite(x, y, `disk${i}`));

            x += 64;
        }
    }
}

new Game(
    WebGL(),
    MaxTextures(1),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
