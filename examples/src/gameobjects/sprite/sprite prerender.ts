import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../../phaser-genesis/src/display/';
import { AddTween } from '../../../../../phaser-genesis/src/motion/tween/nano/AddTween';
import { DrawImage } from '../../../../../phaser-genesis/src/renderer/webgl1/draw';
import { Easing } from '../../../../../phaser-genesis/src/math';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { GetTexture } from '../../../../../phaser-genesis/src/textures';
import { LoadImageFile } from '../../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../../phaser-genesis/src/gameobjects/';
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
        await LoadImageFile('sky', 'assets/gradient26.png');
        await LoadImageFile('star', 'assets/star.png');
        await LoadImageFile('particle', 'assets/muzzleflash2.png');

        const world = new StaticWorld(this);

        AddChild(world, new Sprite(400, 300, 'sky'));

        const star = new Sprite(190, 90, 'star');

        AddTween(star).to(3200, { x: 650 }).yoyo(true).repeat(-1).easing(Easing.Back.InOut);
        AddTween(star).to(2000, { y: 450 }).yoyo(true).repeat(-1).easing(Easing.Sine.InOut);

        AddChild(world, star);

        const texture = GetTexture('particle');

        const trail = [];

        star.preRenderGL = (renderPass) =>
        {
            trail.push({ x: star.x - 64, y: star.y - 64 });

            let alpha = 0;
            const alphaInc = 1 / trail.length;

            trail.forEach(pos =>
            {
                DrawImage(renderPass, texture, pos.x, pos.y, alpha);

                alpha += alphaInc;
            });

            if (trail.length > 96)
            {
                trail.shift();
            }
        };
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x59010c),
    Scenes(Demo)
);
