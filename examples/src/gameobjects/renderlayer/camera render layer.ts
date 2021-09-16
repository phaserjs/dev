import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';
import { RenderLayer, Sprite } from '../../../../../phaser-genesis/src/gameobjects/';

import { AddChildren } from '../../../../../phaser-genesis/src/display/AddChildren';
import { DownKey } from '../../../../../phaser-genesis/src/input/keyboard/keys/DownKey';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { GetQuadVertices } from '../../../../../phaser-genesis/src/components/vertices/GetQuadVertices';
import { ImageFile } from '../../../../../phaser-genesis/src/loader/files/ImageFile';
import { Keyboard } from '../../../../../phaser-genesis/src/input/keyboard/Keyboard';
import { LeftKey } from '../../../../../phaser-genesis/src/input/keyboard/keys/LeftKey';
import { Loader } from '../../../../../phaser-genesis/src/loader/Loader';
import { On } from '../../../../../phaser-genesis/src/events/On';
import { QuadVertexComponent } from '../../../../../phaser-genesis/src/components/vertices/QuadVertexComponent';
import { RightKey } from '../../../../../phaser-genesis/src/input/keyboard/keys/RightKey';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { UpKey } from '../../../../../phaser-genesis/src/input/keyboard/keys/UpKey';
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

    cameraSpeed: number = 4;

    constructor ()
    {
        super();

        const keyboard = new Keyboard();

        this.leftKey = new LeftKey();
        this.rightKey = new RightKey();
        this.upKey = new UpKey();
        this.downKey = new DownKey();

        keyboard.addKeys(this.leftKey, this.rightKey, this.upKey, this.downKey);

        const loader = new Loader();

        loader.setPath('assets/');

        loader.add(ImageFile('background', 'farm-background.png'));
        loader.add(ImageFile('ayu', 'ayu.png'));
        loader.add(ImageFile('logo', 'logo.png'));
        loader.add(ImageFile('rocket', 'rocket.png'));
        loader.add(ImageFile('farm', 'farm-logo.png'));
        loader.add(ImageFile('star', 'star.png'));
        loader.add(ImageFile('bubble', 'bubble256.png'));

        loader.start().then(() => this.create());
    }

    create ()
    {
        const world = new World(this);

        this.camera = world.camera;

        const layer = new RenderLayer();

        const bg = new Sprite(400, 300, 'background');

        /*
        bg.scale.y = -1;

        AddChildren(world, bg);
        */

        setTimeout(() => {

            // console.log(QuadVertexComponent.values[bg.id]);
            console.log(GetQuadVertices(layer.id));

        }, 2000);

        const logo = new Sprite(200, 300, 'logo');
        const ayu = new Sprite(600, 300, 'ayu');
        const farm = new Sprite(200, 150, 'farm');
        const rocket = new Sprite(150, 500, 'rocket');
        const bubble = new Sprite(400, 450, 'bubble');
        const star = new Sprite(650, 500, 'star');

        AddChildren(layer, ayu, logo, farm, rocket, bubble);

        AddChildren(world, bg, layer, star);
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
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
