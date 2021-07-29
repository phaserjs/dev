import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { Between, FloatBetween } from '../../../../phaser-genesis/src/math';
import { DownKey, LeftKey, RightKey, UpKey } from '../../../../phaser-genesis/src/input/keyboard/keys';
import { FlatWorld, SortWorldList } from '../../../../phaser-genesis/src/world';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Game } from '../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Keyboard } from '../../../../phaser-genesis/src/input/keyboard';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';
import { WorldCamera } from '../../../../phaser-genesis/src/camera/WorldCamera';

/*
class Slider extends Sprite
{
    speed: number;

    constructor (x: number, y: number, texture: string)
    {
        super(x, y, texture);

        const s = FloatBetween(1, 8);

        this.setScale(1 / s);

        this.speed = 8 - s;
    }

    update (): void
    {
        this.y += this.speed;

        if (this.y > 800)
        {
            this.y = -300;
        }
    }
}
*/

class Demo extends Scene
{
    leftKey: LeftKey;
    rightKey: RightKey;
    upKey: RightKey;
    downKey: RightKey;

    camera: WorldCamera;

    constructor ()
    {
        super();

        const keyboard = new Keyboard();

        this.leftKey = new LeftKey();
        this.rightKey = new RightKey();
        this.upKey = new UpKey();
        this.downKey = new DownKey();

        keyboard.addKeys(this.leftKey, this.rightKey, this.upKey, this.downKey);

        this.create();
    }

    async create ()
    {
        await ImageFile('glove', 'assets/boxing-glove.png');

        const world = new FlatWorld(this);

        this.camera = world.camera;

        for (let i = 0; i < 4096; i++)
        {
            const x = Between(-4000, 4000);
            const y = Between(-4000, 4000);

            AddChild(world, new Sprite(x, y, 'glove'));
        }

        window['camera'] = world.camera;
    }

    update (): void
    {
        if (this.leftKey.isDown)
        {
            this.camera.x -= 4;
        }
        else if (this.rightKey.isDown)
        {
            this.camera.x += 4;
        }

        if (this.upKey.isDown)
        {
            this.camera.y -= 4;
        }
        else if (this.downKey.isDown)
        {
            this.camera.y += 4;
        }
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);
