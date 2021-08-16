import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display/';
import { Between } from '../../../../phaser-genesis/src/math';
import { CreateGame } from '../../../../phaser-genesis/src/CreateGame';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects/';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.preload();
    }

    async preload ()
    {
        await ImageFile('logo', 'assets/logo.png');

        const world = new StaticWorld(this);

        const x = Between(200, 600);
        const y = Between(100, 300);

        const logo = new Sprite(x, y, 'logo');

        AddChild(world, logo);
    }
}

CreateGame(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
