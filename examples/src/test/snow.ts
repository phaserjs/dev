import { BackgroundColor, BatchSize, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { DownKey, LeftKey, RightKey, UpKey } from '../../../../phaser-genesis/src/input/keyboard/keys';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Between } from '../../../../phaser-genesis/src/math';
import { DrawImage } from '../../../../phaser-genesis/src/renderer/webgl1/draw';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetTexture } from '../../../../phaser-genesis/src/textures';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Keyboard } from '../../../../phaser-genesis/src/input/keyboard';
import { On } from '../../../../phaser-genesis/src/events';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { WorldCamera } from '../../../../phaser-genesis/src/camera/WorldCamera';

class Star extends Sprite
{
    // i: number;
    speed: number;

    constructor ()
    {
        super(Between(-8000, 8000), Between(-8000, 8000), 'snow');

        this.speed = Between(1, 8);

        // this.i = 0;
    }

    update (): void
    {
        // if (this.i > 10)
        // {
        //     return;
        // }

        // this.i++;

        this.position.x -= this.speed;

        if (this.position.x < -8000)
        {
            this.position.x = 8000;
        }
    }
}

class Demo extends Scene
{
    leftKey: LeftKey;
    rightKey: RightKey;
    upKey: RightKey;
    downKey: RightKey;

    camera: WorldCamera;

    cameraSpeed: number = 8;

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
        // await ImageFile('snow', 'assets/snowflake-pixel.png');
        await ImageFile('snow', 'assets/cybertank-bullet.png');

        const world = new StaticWorld(this);
        
        this.camera = world.camera;

        //  PC = 100k @ 50fps
        //  PC = 80k @ 55fps
        //  PC = 75k @ 60fps

        // for (let i = 0; i < 100000; i++)
        // for (let i = 0; i < 80000; i++)
        // for (let i = 0; i < 75000; i++)
        for (let i = 0; i < 50000; i++)
        {
            // const star = new Star();
            // const star = new Sprite(400, 300, 'snow');

            // if (i % 1000 === 0)
            // {
            //     console.log(star);
            // }

            // AddChild(world, star);

            AddChild(world, new Star());
        }
    }

    update (): void
    {
        if (!this.camera)
        {
            return;
        }

        if (this.leftKey.isDown)
        {
            this.camera.x += this.cameraSpeed;
        }
        else if (this.rightKey.isDown)
        {
            this.camera.x -= this.cameraSpeed;
        }

        if (this.upKey.isDown)
        {
            this.camera.y += this.cameraSpeed;
        }
        else if (this.downKey.isDown)
        {
            this.camera.y -= this.cameraSpeed;
        }
    }
}

new Game(
    WebGL(),
    BatchSize(4096),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);
