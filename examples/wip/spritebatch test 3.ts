import { BackgroundColor, CanvasRenderer, Parent, Scenes, Size, WebGLRenderer } from '../src/config';

import { AddChild } from '../src/display/';
import { Between } from '../src/math';
import { Game } from '../src/Game';
import { Loader } from '../src/loader/Loader';
import { Scene } from '../src/scenes/Scene';
import { SpriteBatch } from '../src/gameobjects/';
import { SpriteSheetFile } from '../src/loader/files/SpriteSheetFile';
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

        loader.add(SpriteSheetFile('fruits', '32x32-item-pack.png', { frameWidth: 32 }));

        loader.start(() => this.create());
    }

    create ()
    {
        const batch = new SpriteBatch(512, 'fruits');

        for (let i = 0; i < batch.maxSize; i++)
        {
            const x = Between(0, 800 - 32);
            const y = Between(0, 600 - 32);
            const f = Between(0, 35);

            batch.addXY(x, y, f);
        }

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
