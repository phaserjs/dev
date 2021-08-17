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
        await ImageFile('brain', 'assets/1x1.png');

        const world = new StaticWorld(this);
        
        this.camera = world.camera;

        // http://192.168.0.100/dev/examples/live/debug.html?f=test/maxrender.js

        /*
        //  200,000 draws at 50fps solid (with batch of 2048)
        const texture = GetTexture('brain');

        On(world, 'worldpostrender', (renderPass) => {

            let x = 0;
            let y = 0;

            for (let i = 0; i < 200000; i++)
            {
                DrawImage(renderPass, texture, x, y);
    
                x += 2;
    
                if (x >= 800)
                {
                    x = 0;
                    y += 2;
                }
            }
        });
        */

        let x = 0;
        let y = 0;

        //  100,000 sprites at 60fps solid (with batch of 4096)
        // for (let i = 0; i < 100000; i++)
        for (let i = 0; i < 200000; i++)
        {
            AddChild(world, new Sprite(x, y, 'brain'));

            x += 2;

            if (x >= 800)
            {
                x = 0;
                y += 2;
            }
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
    BatchSize(1024),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);
