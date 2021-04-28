import { AddChild, AddChildren, MoveToPosition } from '../src/display/';
import { BackgroundColor, CanvasRenderer, Parent, Scenes, Size, WebGLRenderer } from '../src/config';

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

        loader.add(ImageFile('logo', '/phaser4-examples/public/assets/hotdog.png'));

        loader.start(() => this.create());
    }

    create ()
    {
        const logo = AddChild(this.world, new Sprite(400, 0, 'logo'));

        MoveToPosition(400, 300, 3000, logo);
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
