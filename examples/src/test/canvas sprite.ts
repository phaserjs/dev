import { BackgroundColor, Canvas, GlobalVar, Parent, Scenes } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display/';
import { Game } from '../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../phaser-genesis/src/loader/Loader';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects/';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const loader = new Loader();

        loader.add(ImageFile('rocket', 'assets/rocket.png'));

        loader.start().then(() => {

            const world = new StaticWorld(this);

            const rocket = new Sprite(400, 300, 'rocket');

            AddChild(world, rocket);

        });
    }
}

new Game(
    Canvas(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
