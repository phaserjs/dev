import { AddChild, AddChildren } from '../src/display/';
import { BackgroundColor, CanvasRenderer, Parent, Scenes, Size, WebGLRenderer } from '../src/config';

import { Game } from '../src/Game';
import { Keyboard } from '../src/input/keyboard/Keyboard';
import { On } from '../src/events/On';
import { Scene } from '../src/scenes/Scene';
import { SolidColorTexture } from '../src/textures/types';
import { Sprite } from '../src/gameobjects/';
import { StaticWorld } from '../src/world/StaticWorld';
import { Vec2Callback } from '../src/math/vec2/Vec2Callback';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        const block1 = new Sprite(400, 300, SolidColorTexture('#f00', 128, 128));

        AddChildren(world, block1);

        const moveBlock = (vec2) => {

            console.log('moveBlock', vec2.x, vec2.y);

            block1.x = vec2.x;
            block1.y = vec2.y;

        };

        const pos: Vec2Callback = new Vec2Callback(moveBlock, 400, 300, false);

        const keyboard = new Keyboard();

        On(keyboard, 'keydown-a', () => {

            pos.x -= 4;

        });

        On(keyboard, 'keydown-d', () => {

            pos.x += 4;

        });

        On(keyboard, 'keydown-w', () => {

            pos.y -= 4;

        });

        On(keyboard, 'keydown-s', () => {

            pos.y += 4;

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
