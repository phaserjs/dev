import * as Phaser from '@phaserjs/phaser';

import { BackgroundColor, Parent, Scenes, WebGL } from '@phaserjs/phaser/config';

import { AddTween } from '@phaserjs/phaser/motion/tween/nano/AddTween';

class Demo extends Phaser.Scene
{
    constructor ()
    {
        super();

        const world = new Phaser.World.StaticWorld(this);

        const loader = new Phaser.Loader.Loader();

        loader.add(Phaser.Loader.Files.ImageFile('logo', 'assets/logo.png'));

        loader.start().then(() => {

            const logo = new Phaser.GameObjects.Sprite(400, 100, 'logo').setRotation(0.3);

            AddTween(logo).to(3000, { y: 400, rotation: 0 }).easing(Phaser.Math.Easing.Bounce.Out);

            Phaser.Display.AddChildren(world, logo);

        });
    }
}

new Phaser.Game(
    WebGL(),
    Parent('gameParent'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
