import { BackgroundColor, BatchSize, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { Between, Clamp } from '../../../../phaser-genesis/src/math';
import { DownKey, LeftKey, RightKey, UpKey } from '../../../../phaser-genesis/src/input/keyboard/keys';
import { GetTexture, Texture } from '../../../../phaser-genesis/src/textures';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Game } from '../../../../phaser-genesis/src/Game';
import { Keyboard } from '../../../../phaser-genesis/src/input/keyboard';
import { LoadImageFile } from '../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { ParallaxLayer } from '../../../../phaser-genesis/src/gameobjects/parallaxlayer/ParallaxLayer';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';
import { World } from '../../../../phaser-genesis/src/world/World';
import { WorldCamera } from '../../../../phaser-genesis/src/camera/WorldCamera';

class Snowflake extends Sprite
{
    speedX: number;
    speedY: number;

    constructor ()
    {
        super(Between(0, 1600), Between(0, 1600), 'snow');

        this.speedX = Between(1, 8);
        this.speedY = Between(1, 8);
    }

    update (): void
    {
        this.x -= this.speedX;
        this.y += this.speedY;

        if (this.x < 0)
        {
            this.x = 1600;
        }

        if (this.y > 1600)
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
    world: World;
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
        await LoadImageFile('grass', 'assets/textures/grass.png');
        await LoadImageFile('snow', 'assets/snowflake-pixel.png');
        await LoadImageFile('logo', 'assets/logo.png');

        const world = new World(this);
        
        this.world = world;

        this.camera = this.world.camera;

        AddChild(world, new Sprite(0, 0, 'grass').setOrigin(0));
        AddChild(world, new Sprite(512, 0, 'grass').setOrigin(0));
        AddChild(world, new Sprite(1024, 0, 'grass').setOrigin(0));
        AddChild(world, new Sprite(0, 512, 'grass').setOrigin(0));
        AddChild(world, new Sprite(512, 512, 'grass').setOrigin(0));
        AddChild(world, new Sprite(1024, 512, 'grass').setOrigin(0));

        for (let i = 0; i < 64; i++)
        {
            const flake = new Snowflake();

            AddChild(world, flake);
        }

        const parallax = new ParallaxLayer(this.camera, 0.5, 0.5);

        AddChild(parallax, new Sprite(400, 300, 'logo'));

        AddChild(world, parallax);
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

        // this.camera.x = Clamp(this.camera.x, -1600, 0);
        // this.camera.y = Clamp(this.camera.y, -1600, 0);
    }
}

const game = new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);
