import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';
import { Between, Clamp, FloatBetween } from '../../../../../phaser-genesis/src/math';
import { DownKey, LeftKey, RightKey, UpKey } from '../../../../../phaser-genesis/src/input/keyboard/keys';
import { GetTexture, Texture } from '../../../../../phaser-genesis/src/textures';

import { AddChild } from '../../../../../phaser-genesis/src/display';
import { AtlasFile } from '../../../../../phaser-genesis/src/loader/files';
import { FlatWorld } from '../../../../../phaser-genesis/src/world';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { GetRandom } from '../../../../../phaser-genesis/src/utils/array/GetRandom';
import { ImageFile } from '../../../../../phaser-genesis/src/loader/files/ImageFile';
import { Keyboard } from '../../../../../phaser-genesis/src/input/keyboard';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../../phaser-genesis/src/gameobjects';
import { WorldCamera } from '../../../../../phaser-genesis/src/camera/WorldCamera';

class Demo extends Scene
{
    leftKey: LeftKey;
    rightKey: RightKey;
    upKey: RightKey;
    downKey: RightKey;

    world: FlatWorld;
    camera: WorldCamera;

    texture: Texture;

    cameraSpeed: number = 16;

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
        await AtlasFile('items', 'assets/land.png', 'assets/land.json');
        await ImageFile('grass', 'assets/textures/grass-plain.png');

        this.world = new FlatWorld(this);

        this.camera = this.world.camera;

        this.texture = GetTexture('items');

        this.createGrass();
        this.createLandscape();

        this.camera.setPosition(-16384, -16384);

        window['camera'] = this.world.camera;
    }

    createGrass ()
    {
        //  Grass texture is 512 x 512
        //  World is 64 x 64 tiles = 32,768 x 32,768

        for (let y = 0; y < 64; y++)
        {
            for (let x = 0; x < 64; x++)
            {
                AddChild(this.world, new Sprite(x * 512, y * 512, 'grass').setOrigin(0, 0));
            }
        }
    }

    createLandscape ()
    {
        const frames = Array.from(this.texture.frames.keys());

        //  Remove __BASE texture
        frames.shift();

        for (let y = 0; y < 512; y++)
        {
            for (let x = 0; x < 512; x++)
            {
                const frame = GetRandom(frames);

                AddChild(this.world, new Sprite(256 + (x * 128), 512 + (y * 128), 'items', frame).setOrigin(0.5, 1));
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

        this.camera.x = Clamp(this.camera.x, -31968, 0);
        this.camera.y = Clamp(this.camera.y, -32168, 0);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);
