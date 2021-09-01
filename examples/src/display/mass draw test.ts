import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { Between, FloatBetween } from '../../../../phaser-genesis/src/math';

import { DrawImage } from '../../../../phaser-genesis/src/renderer/webgl1/draw';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetTexture } from '../../../../phaser-genesis/src/textures';
import { IRenderPass } from '../../../../phaser-genesis/src/renderer/webgl1/renderpass/IRenderPass';
import { LoadImageFile } from '../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { On } from '../../../../phaser-genesis/src/events';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { WorldPostRenderEvent } from '../../../../phaser-genesis/src/world/events';

class Pixel
{
    x: number;
    y: number;
    speed: number;

    constructor (x: number, y: number)
    {
        this.x = x;
        this.y = y;
        this.speed = FloatBetween(1, 8);
    }

    update (): void
    {
        this.x -= this.speed;

        if (this.x < -200)
        {
            this.x = 1000;
        }
    }
}

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await LoadImageFile('pixel', 'assets/1x1.png');

        const world = new StaticWorld(this);

        const pixels = [];

        for (let i = 0; i < 100000; i++)
        {
            const x = Between(-200, 1000);
            const y = Between(0, 600);

            pixels.push(new Pixel(x, y));
        }

        const texture = GetTexture('pixel');

        On(world, WorldPostRenderEvent, (renderPass: IRenderPass) =>
        {
            pixels.forEach(pixel =>
            {
                pixel.update();

                DrawImage(renderPass, texture, pixel.x, pixel.y);
            });
        });
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);
