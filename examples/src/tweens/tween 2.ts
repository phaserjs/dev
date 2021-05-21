import * as Easing from '../../../../phaser-genesis/src/math/easing';

import { AddChild, AddChildren } from '../../../../phaser-genesis/src/display';
import { BackgroundColor, GlobalVar, Parent, Scenes, Size, WebGL } from '../../../../phaser-genesis/src/config';

import { AddTween } from '../../../../phaser-genesis/src/motion/tween/nano/AddTween';
import { Game } from '../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../phaser-genesis/src/loader/Loader';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

// import { ITweenPlugin } from '../../../../phaser-genesis/src/motion/tween/ITweenPlugin';
// import { TweenPlugin } from '../../../../phaser-genesis/src/motion/tween/TweenPlugin';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        const loader = new Loader();

        loader.setPath('assets/');

        loader.add(ImageFile('logo', 'logo.png'));
        loader.add(ImageFile('rocket', 'rocket.png'));
        loader.add(ImageFile('star', 'star.png'));
        loader.add(ImageFile('bubble', 'bubble256.png'));

        loader.start().then(() => {

            const logo = new Sprite(400, 100, 'logo').setRotation(0.5);
            const rocket = new Sprite(200, 300, 'rocket');
            const bubble = new Sprite(400, 500, 'bubble').setScale(0.5);

            AddTween(logo).to(3000, { y: 500, rotation: 0 }).easing(Easing.Bounce.Out).repeat(100);
            AddTween(rocket).delay(2000).to(1500, { x: 800 }).easing(Easing.Quadratic.In);

            // AddTween(bubble).to(2000, { y: '-300' }).easing(Easing.Bounce.Out).repeat(2).yoyo();

            // AddTween(bubble).to(2, { y: 600 }).yoyo().easing(Easing.Bounce.Out).hold(2);

            AddTween(bubble).from(2000, { y: '-600' }).yoyo().easing(Easing.Bounce.Out).repeat(2, 2000).hold(500).delay(1000);

            // AddTween(bubble).from(3, { y: 600 }).yoyo().easing(Easing.Bounce.Out);

            // AddTween(bubble).to(2, { x: 200 }).easing(Easing.Sine.InOut).repeat(3);

            // AddChildren(world, logo, rocket);

            AddChildren(world, logo, rocket, bubble);

        });
    }
}

new Game(
    WebGL(),
    Size(800, 600),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
