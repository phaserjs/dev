import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '../src/config';

import { AddChild } from '../src/display/';
import { Between } from '../src/math';
import { Game } from '../src/Game';
import { Keyboard } from '../src/input/keyboard';
import { Loader } from '../src/loader/Loader';
import { On } from '../src/events';
import { Scene } from '../src/scenes/Scene';
import { Sprite } from '../src/gameobjects/';
import { SpriteSheetFile } from '../src/loader/files/';
import { StaticWorld } from '../src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const loader = new Loader();

        loader.setPath('/phaser4-examples/public/assets/');

        loader.add(SpriteSheetFile('fruits', '32x32-item-pack.png', { frameWidth: 32 }));

        loader.start(() => this.create());
    }

    create ()
    {
        const world = new StaticWorld(this);
        const keyboard = new Keyboard();

        On(keyboard, 'keydown', (event: KeyboardEvent) => {

            const frame = parseInt(event.key);

            const x = Between(0, 800);
            const y = Between(0, 600);

            const sprite = new Sprite(x, y, 'fruits', frame);

            AddChild(world, sprite);
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
