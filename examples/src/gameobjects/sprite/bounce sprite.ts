import * as Easing from '../../../../../phaser-genesis/src/math/easing';

import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';

import { AddChildren } from '../../../../../phaser-genesis/src/display/';
import { AddTween } from '../../../../../phaser-genesis/src/motion/tween/nano/AddTween';
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

        const world = new StaticWorld(this);

        const loader = new Loader();

        loader.add(ImageFile('logo', 'assets/logo.png'));

        loader.start().then(() => {

            const logo = new Sprite(400, 100, 'logo').setRotation(0.3);

            AddTween(logo).to(3000, { y: 400, rotation: 0 }).easing(Easing.Bounce.Out);

            AddChildren(world, logo);

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
