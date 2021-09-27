import { BackgroundColor, DefaultOrigin, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../../phaser-genesis/src/display';
import { CursorKeyCameraControls } from '../../../../../phaser-genesis/src/camera/controls/CursorKeyCameraControls';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { LoadImageFile } from '../../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { ParallaxLayer } from '../../../../../phaser-genesis/src/gameobjects/parallaxlayer/ParallaxLayer';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../../phaser-genesis/src/gameobjects';
import { World } from '../../../../../phaser-genesis/src/world/World';

class Demo extends Scene
{
    constructor ()
    {
        super();

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
        
        const camera = world.camera;

        const controls = new CursorKeyCameraControls(world, 16, 0);

        const background = new ParallaxLayer(camera, 0.9, 0.9);
        const middleGround = new ParallaxLayer(camera, 0.8, 0.8);
        const foreGround = new ParallaxLayer(camera, 0.75, 0.75);
        const floor = new ParallaxLayer(camera, 0.5, 0.5);

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
}

const game = new Game(
    WebGL(),
    DefaultOrigin(0, 0),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);
