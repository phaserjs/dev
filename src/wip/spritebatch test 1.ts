import { AddChild, AddChildren } from '../src/display/';
import { BackgroundColor, CanvasRenderer, Parent, Scenes, Size, WebGLRenderer } from '../src/config';
import { Sprite, SpriteBatch } from '../src/gameobjects/';

import { Game } from '../src/Game';
import { GameInstance } from '../src/GameInstance';
import { ImageFile } from '../src/loader/files/ImageFile';
import { Loader } from '../src/loader/Loader';
import { On } from '../src/events';
import { Scene } from '../src/scenes/Scene';
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
        const batch = new SpriteBatch(16, '64');

        batch.addXY(100, 100);
        batch.addXY(200, 200);
        batch.addXY(300, 300);
        batch.addXY(400, 400);

        AddChild(this.world, batch);
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
