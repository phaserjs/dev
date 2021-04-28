import { AddChild, AddChildren } from '../src/display/';
import { BackgroundColor, CanvasRenderer, Parent, Scenes, Size, WebGLRenderer } from '../src/config';

import { CanvasTexture } from '../src/textures/types';
import { Game } from '../src/Game';
import { ImageFile } from '../src/loader/files/ImageFile';
import { Loader } from '../src/loader/Loader';
import { On } from '../src/events';
import { Scene } from '../src/scenes/Scene';
import { Sprite } from '../src/gameobjects/';
import { StaticWorld } from '../src/world/StaticWorld';

class Demo extends Scene
{
    world: StaticWorld;

    constructor ()
    {
        super();

        this.world = new StaticWorld(this);

        const loader = new Loader();

        loader.setPath('/phaser4-examples/public/assets/');

        loader.add(ImageFile('256', 'f-texture.png'));
        loader.add(ImageFile('64', 'box-item-boxed.png'));
        loader.add(ImageFile('32', 'shinyball.png'));
        loader.add(ImageFile('16', 'skull.png'));

        loader.start(() => this.create());
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

        AddChild(this.world, sprite);
        AddChild(this.world, debug);

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

export default function (): void
{
    new Game(
        CanvasRenderer(),
        // WebGLRenderer(),
        Size(800, 600),
        Parent('gameParent'),
        BackgroundColor(0x2d2d2d),
        Scenes(Demo)
    );
}
