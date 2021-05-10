import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '../src/config';
import { ImageFile, SpriteSheetFile } from '../src/loader/files/';
import { LeftKey, RightKey } from '../src/input/keyboard/keys';

import { AddChild } from '../src/display/';
import { Between } from '../src/math';
import { Game } from '../src/Game';
import { Keyboard } from '../src/input/keyboard';
import { Loader } from '../src/loader/Loader';
import { On } from '../src/events';
import { Scene } from '../src/scenes/Scene';
import { Sprite } from '../src/gameobjects/';
import { StaticWorld } from '../src/world/StaticWorld';

class Demo extends Scene
{
    leftKey: LeftKey;
    rightKey: RightKey;
    player: Sprite;

    constructor ()
    {
        super();

        const loader = new Loader();

        loader.setPath('/phaser4-examples/public/assets/');

        loader.add(ImageFile('brain', 'brain.png'));
        loader.add(SpriteSheetFile('fruits', '32x32-item-pack.png', { frameWidth: 32 }));

        loader.start(() => this.create());
    }

    create ()
    {
        const world = new StaticWorld(this);
        const keyboard = new Keyboard();

        this.player = new Sprite(400, 300, 'brain');

        this.leftKey = new LeftKey();
        this.rightKey = new RightKey();

        keyboard.addKeys(this.leftKey, this.rightKey);

        AddChild(world, this.player);

        On(this, 'update', () => this.update());
    }

    update ()
    {
        if (this.leftKey.isDown)
        {
            this.player.x -= 4;
        }
        else if (this.rightKey.isDown)
        {
            this.player.x += 4;
        }
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
