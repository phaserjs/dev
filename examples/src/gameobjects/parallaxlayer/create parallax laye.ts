import { BackgroundColor, DefaultOrigin, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';
import { DownKey, LeftKey, RightKey, UpKey } from '../../../../../phaser-genesis/src/input/keyboard/keys';

import { AddChild } from '../../../../../phaser-genesis/src/display';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { Keyboard } from '../../../../../phaser-genesis/src/input/keyboard';
import { LoadImageFile } from '../../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { ParallaxLayer } from '../../../../../phaser-genesis/src/gameobjects/parallaxlayer/ParallaxLayer';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../../phaser-genesis/src/gameobjects';
import { World } from '../../../../../phaser-genesis/src/world/World';
import { WorldCamera } from '../../../../../phaser-genesis/src/camera/WorldCamera';

class Demo extends Scene
{
    leftKey: LeftKey;
    rightKey: RightKey;
    upKey: RightKey;
    downKey: RightKey;

    camera: WorldCamera;
    world: World;

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
        await LoadImageFile('sky', 'assets/parallax/sky.png');
        await LoadImageFile('moon', 'assets/parallax/moon.png');
        await LoadImageFile('trees', 'assets/parallax/trees.png');
        await LoadImageFile('middle', 'assets/parallax/middle.png');
        await LoadImageFile('ground', 'assets/parallax/ground.png');

        const world = new World(this);
        
        this.world = world;

        this.camera = this.world.camera;

        const background = new ParallaxLayer(this.camera, 0.9, 0.9);
        const middleGround = new ParallaxLayer(this.camera, 0.8, 0.8);
        const foreGround = new ParallaxLayer(this.camera, 0.75, 0.75);
        const floor = new ParallaxLayer(this.camera, 0.5, 0.5);

        AddChild(background, new Sprite(0, 0, 'sky'));
        AddChild(background, new Sprite(960, 0, 'sky'));
        AddChild(background, new Sprite(300, 100, 'moon'));

        AddChild(middleGround, new Sprite(0, 0, 'trees'));
        AddChild(middleGround, new Sprite(960, 0, 'trees'));

        AddChild(foreGround, new Sprite(0, 30, 'middle'));
        AddChild(foreGround, new Sprite(960, 30, 'middle'));

        AddChild(floor, new Sprite(0, 496, 'ground'));
        AddChild(floor, new Sprite(960, 496, 'ground'));
        AddChild(floor, new Sprite(1920, 496, 'ground'));

        AddChild(world, background);
        AddChild(world, middleGround);
        AddChild(world, foreGround);
        AddChild(world, floor);
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

const game = new Game(
    WebGL(),
    DefaultOrigin(0, 0),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);
