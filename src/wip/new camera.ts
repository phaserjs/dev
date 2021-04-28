import { AKey, DownKey, LeftKey, RightKey, UpKey } from '../src/input/keyboard/keys';
import { AddChild, AddChildren } from '../src/display';
import { BackgroundColor, Parent, Scenes, SetWebGL, Size } from '../src/config';

import { AddChild3D } from '../src/display3d/AddChild3D';
import { AddChildren3D } from '../src/display3d/AddChildren3D';
import { Box } from '../src/gameobjects3d/box/Box';
import { Game } from '../src/Game';
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

    constructor ()
    {
        super();

        const world2d = new StaticWorld(this);
        const world = new World3D(this);

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
        loader.add(ImageFile('f', 'f-texture.png', { flipY: true }));

        loader.start().then(() => {

            const keyboard = new Keyboard();

            this.leftKey = new LeftKey();
            this.rightKey = new RightKey();
            this.upKey = new UpKey();
            this.downKey = new DownKey();
            this.aKey = new AKey();

            keyboard.addKeys(this.leftKey, this.rightKey, this.upKey, this.downKey, this.aKey);

            let camMode = 0;

            On(this.aKey, 'keydown', () => {

                camMode++;

                if (camMode === 3)
                {
                    camMode = 0;
                }

                console.log('cam mode: ' + camMode);

            });

            const camera = world.camera;

            const box = new Box();

            AddChild3D(world, box);

            const bg = new Sprite(400, 300, 'bg');

            bg.alpha = 0.2;

            const logo = new Sprite(400, 300, 'logo');

            AddChild(world2d, bg);
            AddChild(world2d, logo);

            On(this, 'update', (delta, time) => {

                if (this.leftKey.isDown)
                {
                    if (camMode === 0)
                    {
                        camera.position.x += 0.05;
                    }
                    else if (camMode === 1)
                    {
                        camera.direction.x += 0.05;
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
                        camera.position.x -= 0.05;
                    }
                    else if (camMode === 1)
                    {
                        camera.direction.x -= 0.05;
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
                        camera.position.z -= 0.05;
                    }
                    else if (camMode === 1)
                    {
                        camera.direction.z -= 0.05;
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
                        camera.position.z += 0.05;
                    }
                    else if (camMode === 1)
                    {
                        camera.direction.z += 0.05;
                    }
                    else
                    {
                        camera.forward(-0.05);
                    }
                }
            });
        });
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
