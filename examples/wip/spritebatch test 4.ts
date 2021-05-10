import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '../src/config';
import { Between, FloatBetween } from '../src/math';

import { AddChild } from '../src/display/';
import { Game } from '../src/Game';
import { Keyboard } from '../src/input/keyboard/Keyboard';
import { Loader } from '../src/loader/Loader';
import { On } from '../src/events/On';
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
        const batch = new SpriteBatch(1024, 'fruits');

        const keyboard = new Keyboard();

        On(keyboard, 'keydown', (event: KeyboardEvent) => {

            const x = Between(0, 800 - 32);
            const y = Between(0, 600 - 32);
            const frame = Between(0, 35);
            const rotation = FloatBetween(-1, 1);
            const scale = FloatBetween(0.5, 2);

            batch.add({ frame, x, y, rotation, scaleX: scale, scaleY: scale });
        });

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
