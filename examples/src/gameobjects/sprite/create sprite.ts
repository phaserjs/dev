import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../../phaser-genesis/src/display/';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../../phaser-genesis/src/loader/Loader';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../../phaser-genesis/src/gameobjects/';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const loader = new Loader();

        loader.add(ImageFile('rocket', 'assets/rocket.png'));
        loader.add(ImageFile('8', 'assets/8x8.png'));

        loader.start().then(() => {

            const world = new StaticWorld(this);

            const rocket = new Sprite(400, 300, 'rocket');

            const bit1 = new Sprite(0, 100, '8');
            const bit2 = new Sprite(50, 100, '8');
            const bit3 = new Sprite(100, 100, '8');

            window.top['rocket'] = rocket;
            window.top['bit1'] = bit1;
            window.top['bit2'] = bit2;
            window.top['bit3'] = bit3;

            AddChild(rocket, bit1);
            AddChild(rocket, bit2);
            AddChild(rocket, bit3);

            AddChild(world, rocket);

        });
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x59010c),
    Scenes(Demo)
);
