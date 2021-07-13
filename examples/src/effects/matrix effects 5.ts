import * as Effects from '../../../../phaser-genesis/src/colormatrix/';

import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChildren } from '../../../../phaser-genesis/src/display/';
import { Game } from '../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { On } from '../../../../phaser-genesis/src/events';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects/';
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
        await ImageFile('pic', 'assets/traps.png').load();

        const world = new StaticWorld(this);

        const original = new Sprite(200, 150, 'pic');
        const variation1 = new Sprite(600, 150, 'pic');
        const variation2 = new Sprite(200, 450, 'pic');
        const variation3 = new Sprite(600, 450, 'pic');

        AddChildren(world, original, variation1, variation2, variation3);

        Effects.Night(variation1, 0.3);
        Effects.Polaroid(variation2);
        Effects.Predator(variation3, 0.4);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
