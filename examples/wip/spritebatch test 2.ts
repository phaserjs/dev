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
        const batch = new SpriteBatch(7, '256');

        batch.add({ x: 512, y: 300, tint: 0xff0000 });
        batch.add({ alpha: 0.5 });
        batch.add({ x: 256, y: 0, rotation: 0.2, alpha: 0.5 });
        batch.add({ x: 512, y: 0, scaleX: 0.25, scaleY: 0.5 });
        batch.add({ x: 100, y: 300, skewX: 0.25, skewY: 0.25 });
        batch.add({ x: 300, y: 300, alpha: 0.2 });
        batch.add({ x: 500, y: 150, alpha: 0.2, tint: 0x0000ff });

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
