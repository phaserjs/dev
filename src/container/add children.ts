import { AddChild, AddChildren, ConsoleTreeChildren } from '@phaserjs/phaser/display/';
import { BackgroundColor, Parent, Scenes, Size, WebGL } from '@phaserjs/phaser/config';

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

new Game(
    WebGL(),
    Size(800, 600),
    Parent('gameParent'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
