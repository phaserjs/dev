import { AKey, DownKey, LeftKey, RightKey, UpKey } from '../src/input/keyboard/keys';
import { AddChild, AddChildren } from '../src/display';
import { BackgroundColor, Parent, Scenes, SetWebGL, Size } from '../src/config';

import { AddChild3D } from '../src/display3d/AddChild3D';
import { AddChildren3D } from '../src/display3d/AddChildren3D';
import { Box } from '../src/gameobjects3d/box/Box';
import { Camera3D } from '../src/camera3d/Camera3D';
import { Game } from '../src/Game';
import { IWorld3D } from '../src/world3d/IWorld3D';
import { ImageFile } from '../src/loader/files/ImageFile';
import { Keyboard } from '../src/input/keyboard';
import { Loader } from '../src/loader/Loader';
import { On } from '../src/events';
import { Scene } from '../src/scenes/Scene';
import { Sprite } from '../src/gameobjects/sprite/Sprite';
import { StaticWorld } from '../src/world/StaticWorld';
import { World3D } from '../src/world3d/World3D';

class Demo extends Scene
{
    leftKey: LeftKey;
    rightKey: RightKey;
    upKey: UpKey;
    downKey: DownKey;
    aKey: AKey;

    world: IWorld3D;
    camMode: number = 0;
    box: Box;

    constructor ()
    {
        super();

        const loader = new Loader();

        if (window.location.href.includes('192.168.0.100/phaser-genesis/'))
        {
            loader.setPath('/phaser4-examples/public/assets/');
        }
        else
        {
            loader.setPath('/examples/public/assets/');
        }

        loader.add(ImageFile('bg', 'checker.png'));
        loader.add(ImageFile('logo', 'logo.png'));
        loader.add(ImageFile('128', '128x128.png', { flipY: true }));
        loader.add(ImageFile('f', 'f-texture.png', { flipY: true }));
        loader.add(ImageFile('512', '512x512.png', { flipY: true, generateMipmap: true }));
        loader.add(ImageFile('brain', 'brain.png', { flipY: true }));

        loader.start().then(() => this.create());
    }

    create ()
    {
        this.world = new World3D(this);

        const box1 = new Box(0, 0, 0);
        const box2 = new Box(2, 1, 0);

        box1.setTexture('128');
        box2.setTexture('f');

        this.box = box1;

        // AddChildren3D(this.world, box1);
        AddChildren3D(this.world, box1, box2);

        //  Keyboard input ...

        const keyboard = new Keyboard();

        this.leftKey = new LeftKey();
        this.rightKey = new RightKey();
        this.upKey = new UpKey();
        this.downKey = new DownKey();
        this.aKey = new AKey();

        keyboard.addKeys(this.leftKey, this.rightKey, this.upKey, this.downKey, this.aKey);

        On(this.aKey, 'keydown', () => {

            this.camMode++;

            if (this.camMode === 3)
            {
                this.camMode = 0;
            }

            console.log('cam mode: ' + this.camMode);

        });

        On(this, 'update', (delta, time) => this.update(delta, time));
    }

    update (delta: number, time: number)
    {
        const camera = this.world.camera;
        const camMode = this.camMode;
        const box = this.box;

        if (this.leftKey.isDown)
        {
            if (camMode === 0)
            {
                box.transform.position.x -= 0.05;
            }
            else if (camMode === 1)
            {
                box.transform.rotateX(-0.05);
            }
            else
            {
                camera.pitch(0.05);
            }
        }
        else if (this.rightKey.isDown)
        {
            if (camMode === 0)
            {
                box.transform.position.x += 0.05;
            }
            else if (camMode === 1)
            {
                box.transform.rotateX(0.05);
            }
            else
            {
                camera.pitch(-0.05);
            }
        }

        if (this.upKey.isDown)
        {
            if (camMode === 0)
            {
                box.transform.position.y += 0.05;
            }
            else if (camMode === 1)
            {
                box.transform.rotateY(-0.05);
            }
            else
            {
                camera.forward(0.05);
            }
        }
        else if (this.downKey.isDown)
        {
            if (camMode === 0)
            {
                box.transform.position.y -= 0.05;
            }
            else if (camMode === 1)
            {
                box.transform.rotateY(0.05);
            }
            else
            {
                camera.forward(-0.05);
            }
        }
    }
}

export default function (): void
{
    new Game(
        SetWebGL(),
        Size(800, 600),
        Parent('gameParent'),
        BackgroundColor(0x2d2d2d),
        Scenes(Demo)
    );
}
