import { AddChild, AddChildren } from '../../../../phaser-genesis/src/display/';
import { BackgroundColor, GlobalVar, Parent, Scenes, Size, WebGL } from '../../../../phaser-genesis/src/config';

import { Between } from '../../../../phaser-genesis/src/math';
import { Game } from '../../../../phaser-genesis/src/Game';
import { Keyboard } from '../../../../phaser-genesis/src/input/keyboard';
import { Loader } from '../../../../phaser-genesis/src/loader/Loader';
import { On } from '../../../../phaser-genesis/src/events';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects/';
import { SpriteSheetFile } from '../../../../phaser-genesis/src/loader/files/';
import { WebGLRenderer as W } from '../../../../phaser-genesis/src/renderer/webgl1/WebGLRenderer';
import { World } from '../../../../phaser-genesis/src/world/World';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const loader = new Loader();

        loader.setPath('assets/');

        loader.add(SpriteSheetFile('fruits', '32x32-item-pack.png', { frameWidth: 32 }));

        loader.start().then(() => this.create());
    }

    create ()
    {
        (this.game.renderer as W).optimizeRedraw = false;

        const world = new World(this);

        world.enableCameraCull = false;

        for (let i = 0; i < 256; i++)
        {
            const x = Between(-800, 0);
            const y = Between(0, 600);
            const f = Between(0, 35);

            AddChild(world, new Sprite(x, y, 'fruits', f));
        }

        for (let i = 0; i < 256; i++)
        {
            const x = Between(0, 800);
            const y = Between(0, 600);
            const f = Between(0, 35);

            AddChild(world, new Sprite(x, y, 'fruits', f));
        }

        for (let i = 0; i < 256; i++)
        {
            const x = Between(800, 1600);
            const y = Between(0, 600);
            const f = Between(0, 35);

            AddChild(world, new Sprite(x, y, 'fruits', f));
        }

        const keyboard = new Keyboard();

        On(keyboard, 'keydown', (event: KeyboardEvent) => {

            // const frame = parseInt(event.key);
        });
    }
}

new Game(
    WebGL(),
    Size(800, 600),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);