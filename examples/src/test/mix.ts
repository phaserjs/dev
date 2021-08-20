import { BackgroundColor, BatchSize, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { Between, Clamp } from '../../../../phaser-genesis/src/math';
import { DownKey, LeftKey, RightKey, UpKey } from '../../../../phaser-genesis/src/input/keyboard/keys';
import { GetTexture, Texture } from '../../../../phaser-genesis/src/textures';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { AtlasFile } from '../../../../phaser-genesis/src/loader/files/AtlasFile';
import { DrawImage } from '../../../../phaser-genesis/src/renderer/webgl1/draw';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetRandom } from '../../../../phaser-genesis/src/utils/array/GetRandom';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Keyboard } from '../../../../phaser-genesis/src/input/keyboard';
import { On } from '../../../../phaser-genesis/src/events';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { WorldCamera } from '../../../../phaser-genesis/src/camera/WorldCamera';

class Star extends Sprite
{
    speed: number;

    constructor ()
    {
        super(Between(0, 800), Between(0, 600), 'snow');

        this.speed = Between(1, 8);
    }

    update (): void
    {
        this.x -= this.speed;

        if (this.x < 0)
        {
            this.x = 800;
        }
    }
}

class Wibble extends Sprite
{
    speed: number;

    constructor (t, f)
    {
        super(Between(0, 800), Between(0, 600), t, f);

        this.speed = Between(1, 8);
    }

    update (): void
    {
        this.y += this.speed;

        if (this.y > 600)
        {
            this.y = 0;
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
    world: StaticWorld;
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
        await ImageFile('snow', 'assets/cybertank-bullet.png');

        const frames = Array.from(GetTexture('items').frames.keys());

        //  Remove __BASE texture
        frames.shift();

        const world = new StaticWorld(this);
        
        this.world = world;

        this.camera = this.world.camera;

        const grass = AddChild(world, new Sprite(400, 300, 'grass'));

        window.grass = grass;

        const s1 = AddChild(world, new Star());
        // const s2 = AddChild(world, new Star());
        // const s3 = AddChild(world, new Star());

        world.list.push(s1);
        // world.list.push(s2);
        // world.list.push(s3);

        // const t1 = AddChild(world, new Wibble('items', 'TreeApple1'));
        // const t2 = AddChild(world, new Wibble('items', 'TreeApple1'));
        // const t3 = AddChild(world, new Wibble('items', 'TreeApple1'));

        // world.list.push(t1);
        // world.list.push(t2);
        // world.list.push(t3);

        // window.t2 = t2;
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

window.game = new Game(
    WebGL(),
    BatchSize(4096),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);
