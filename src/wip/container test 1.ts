import { AddChild, AddChildren, ConsoleTreeChildren } from '../src/display/';
import { BackgroundColor, CanvasRenderer, Parent, Scenes, Size, WebGLRenderer } from '../src/config';

import { Game } from '../src/Game';
import { ImageFile } from '../src/loader/files/ImageFile';
import { Loader } from '../src/loader/Loader';
import { On } from '../src/events';
import { Scene } from '../src/scenes/Scene';
import { Sprite } from '../src/gameobjects/';
import { StaticWorld } from '../src/world/StaticWorld';
import { WebGLRenderer as W } from '../src/renderer/webgl1/WebGLRenderer';
import { World } from '../src/world/World';

class Demo extends Scene
{
    world: StaticWorld;

    constructor ()
    {
        super();

        this.world = new StaticWorld(this);
        // this.world = new World(this);

        const loader = new Loader();

        loader.setPath('/phaser4-examples/public/assets/');
        // loader.setPath('/examples/public/assets/');

        loader.add(ImageFile('256', 'f-texture.png'));
        loader.add(ImageFile('64', 'box-item-boxed.png'));
        loader.add(ImageFile('32', 'shinyball.png'));
        loader.add(ImageFile('16', 'skull.png'));

        loader.start(() => this.create());
    }

    create ()
    {
        // (this.game.renderer as W).optimizeRedraw = false;

        // AddChild(this.world, new Sprite(200, 200, '256'));
        // AddChild(this.world, new Sprite(300, 250, '256'));
        // AddChild(this.world, new Sprite(400, 300, '256'));
        // AddChild(this.world, new Sprite(500, 350, '256'));

        const parent = new Sprite(400, 300, '256');

        parent.name = 'P';

        const child1 = new Sprite(-128, -128, '64');
        const child2 = new Sprite(128, -128, '64');
        const child3 = new Sprite(-128, 128, '64');
        const child4 = new Sprite(128, 128, '64');

        child1.name = '64A';
        child2.name = '64B';
        child3.name = '64C';
        child4.name = '64D';

        const child5 = new Sprite(0, -32, '32');
        const child6 = new Sprite(0, 32, '32');
        const child7 = new Sprite(-32, 0, '32');
        const child8 = new Sprite(32, 0, '32');

        child5.name = '32A';
        child6.name = '32B';
        child7.name = '32C';
        child8.name = '32D';

        const child9 = new Sprite(0, -16, '16');
        const child10 = new Sprite(0, 16, '16');
        const child11 = new Sprite(-16, 0, '16');
        const child12 = new Sprite(16, 0, '16');

        child9.name = '16A';
        child10.name = '16B';
        child11.name = '16C';
        child12.name = '16D';

        AddChildren(parent, child1, child2, child3, child4);
        AddChildren(child1, child5, child6, child7, child8);
        AddChildren(child5, child9, child10, child11, child12);

        AddChild(this.world, parent);

        let i = 0;

        ConsoleTreeChildren(this.world);

        On(this, 'update', (delta, time) =>
        {
            parent.rotation += 0.005;

            child1.rotation += 0.01;
            child5.rotation -= 0.03;

            parent.scaleX = Math.cos(i);
            parent.scaleY = Math.cos(i);

            i += 0.01;
        });
    }
}

export default function (): void
{
    new Game(
        WebGLRenderer(),
        Size(800, 600),
        Parent('gameParent'),
        BackgroundColor(0x2d2d2d),
        Scenes(Demo)
    );
}
