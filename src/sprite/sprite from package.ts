import * as Easing from '@phaserjs/phaser/math/easing';

import { BackgroundColor, Parent, Scenes, WebGL } from '@phaserjs/phaser/config';

import { AddChildren } from '@phaserjs/phaser/display/';
import { AddTween } from '@phaserjs/phaser/motion/tween/nano/AddTween';
import { Game } from '@phaserjs/phaser/Game';
import { ImageFile } from '@phaserjs/phaser/loader/files/ImageFile';
import { Loader } from '@phaserjs/phaser/loader/Loader';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { Sprite } from '@phaserjs/phaser/gameobjects/';
import { StaticWorld } from '@phaserjs/phaser/world/StaticWorld';

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
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
