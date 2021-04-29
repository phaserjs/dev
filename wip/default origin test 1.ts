import { BackgroundColor, CanvasRenderer, DefaultOrigin, Parent, Scenes, Size, WebGLRenderer } from '../src/config';

import { AddChildren } from '../src/display/';
import { Game } from '../src/Game';
import { ImageFile } from '../src/loader/files/ImageFile';
import { Loader } from '../src/loader/Loader';
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
        const box1 = new Sprite(0, 0, '256');
        const box2 = new Sprite(256, 0, '256');
        const box3 = new Sprite(512, 0, '256');
        const box4 = new Sprite(0, 256, '256');
        const box5 = new Sprite(256, 256, '256');
        const box6 = new Sprite(512, 256, '256');

        AddChildren(this.world, box1, box2, box3, box4, box5, box6);
    }
}

export default function (): void
{
    new Game(
        DefaultOrigin(0, 0),
        WebGLRenderer(),
        Size(800, 600),
        Parent('gameParent'),
        BackgroundColor(0x2d2d2d),
        Scenes(Demo)
    );
}
