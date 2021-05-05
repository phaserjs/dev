import { AddChild, AddChildren } from '@phaserjs/phaser/display/';
import { BackgroundColor, Canvas, Parent, Scenes, Size, WebGL } from '@phaserjs/phaser/config';

import { CanvasTexture } from '@phaserjs/phaser/textures/types';
import { Game } from '@phaserjs/phaser/Game';
import { ImageFile } from '@phaserjs/phaser/loader/files/ImageFile';
import { Loader } from '@phaserjs/phaser/loader/Loader';
import { On } from '@phaserjs/phaser/events';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { Sprite } from '@phaserjs/phaser/gameobjects/';
import { StaticWorld } from '@phaserjs/phaser/world/StaticWorld';

class Demo extends Scene
{
    world: StaticWorld;

    constructor ()
    {
        super();

        this.world = new StaticWorld(this);

        const loader = new Loader();

        loader.setPath('assets/');

        loader.add(ImageFile('256', 'f-texture.png'));
        loader.add(ImageFile('64', 'box-item-boxed.png'));
        loader.add(ImageFile('32', 'shinyball.png'));
        loader.add(ImageFile('16', 'skull.png'));

        loader.start().then(() => this.create());
    }

    create ()
    {
        const sprite = new Sprite(400, 300, '256');

        const boundsDebug = CanvasTexture(800, 600);

        const debug = new Sprite(0, 0, boundsDebug);

        debug.setOrigin(0, 0);

        const ctx = (boundsDebug.image as HTMLCanvasElement).getContext('2d');

        ctx.strokeStyle = '#0f0';
        ctx.fillStyle = '#0f0';

        AddChildren(this.world, sprite, debug);

        let i = 0;

        On(this, 'update', () =>
        {
            sprite.rotation += 0.005;
            sprite.scaleX = Math.cos(i);
            sprite.scaleY = Math.sin(i);

            let b = sprite.bounds.get();

            ctx.clearRect(0, 0, 800, 600);
            ctx.strokeRect(b.x, b.y, b.width, b.height);

            i += 0.01;

        });
    }
}

new Game(
    // Canvas(),
    WebGL(),
    Size(800, 600),
    Parent('gameParent'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
