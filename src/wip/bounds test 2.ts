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
        const parent = new Sprite(400, 300, '256');

        const child1 = new Sprite(-180, -180, '64');
        const child2 = new Sprite(180, -180, '64');
        const child3 = new Sprite(-180, 180, '64');
        const child4 = new Sprite(180, 180, '64');

        AddChildren(parent, child1, child2, child3, child4);
        AddChild(this.world, parent);

        window['bob'] = parent;

        const boundsDebug = CanvasTexture(800, 600);
        const debug = new Sprite(0, 0, boundsDebug);

        debug.setOrigin(0, 0);

        const ctx = (boundsDebug.image as HTMLCanvasElement).getContext('2d');

        ctx.strokeStyle = '#0f0';
        ctx.fillStyle = '#0f0';

        AddChild(this.world, debug);

        let i = 0;

        On(this, 'update', () =>
        {
            ctx.clearRect(0, 0, 800, 600);

            // parent.rotation += 0.005;

            parent.rotation += 0.005;
            parent.scaleX = Math.min(0.5, Math.cos(i));
            parent.scaleY = Math.min(0.5, Math.sin(i));

            let b = parent.bounds.get();

            ctx.strokeRect(b.x, b.y, b.width, b.height);

            let c1 = child1.bounds.get();
            ctx.strokeRect(c1.x, c1.y, c1.width, c1.height);

            let c2 = child2.bounds.get();
            ctx.strokeRect(c2.x, c2.y, c2.width, c2.height);

            let c3 = child3.bounds.get();
            ctx.strokeRect(c3.x, c3.y, c3.width, c3.height);

            let c4 = child4.bounds.get();
            ctx.strokeRect(c4.x, c4.y, c4.width, c4.height);

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
