import { AKey, DownKey, LeftKey, RightKey, UpKey } from '../src/input/keyboard/keys';
import { BackgroundColor, Parent, Scenes, SetWebGL, Size } from '../src/config';
import { Brass, Bronze, Chrome, Emerald, Jade, Obsidian, Pearl, Ruby, Turquoise } from '../src/materials3d';

import { AddChildren3D } from '../src/display3d/AddChildren3D';
import { Box } from '../src/gameobjects3d/box/Box';
import { Cone } from '../src/gameobjects3d/cone/Cone';
import { Game } from '../src/Game';
import { Keyboard } from '../src/input/keyboard';
import { Mouse } from '../src/input/mouse/Mouse';
import { On } from '../src/events';
import { Scene } from '../src/scenes/Scene';
import { Sphere } from '../src/gameobjects3d/sphere/Sphere';
import { World3D } from '../src/world3d/World3D';

class Demo extends Scene
{
    setupCameraControls (camera)
    {
        const keyboard = new Keyboard();

        const leftKey = new LeftKey();
        const rightKey = new RightKey();
        const upKey = new UpKey();
        const downKey = new DownKey();
        const aKey = new AKey();

        keyboard.addKeys(leftKey, rightKey, upKey, downKey, aKey);

        On(this, 'update', () => {

            if (leftKey.isDown)
            {
                camera.yaw -= 0.1;
                camera.update();
            }
            else if (rightKey.isDown)
            {
                camera.yaw += 0.1;
                camera.update();
            }

            if (upKey.isDown)
            {
                camera.panZ(-0.1);
            }
            else if (downKey.isDown)
            {
                camera.panZ(0.1);
            }
        });

        const mouse = new Mouse();

        let tracking = false;

        On(mouse, 'pointerdown', (x: number, y: number, button: number) => {

            if (button === 1)
            {
                camera.isOrbit = !camera.isOrbit;
            }
            else
            {
                camera.begin(x, y);
                tracking = true;
            }

        });

        On(mouse, 'pointermove', (x: number, y: number) => {

            if (!tracking)
            {
                return;
            }

            if (mouse.primaryDown)
            {
                camera.rotate(x, y);
            }
            else if (mouse.secondaryDown)
            {
                camera.pan(x, y);
            }

        });

        On(mouse, 'wheel', (deltaX: number, deltaY: number) => {

            camera.zoom(deltaY);

        });

        On(mouse, 'pointerup', () => {

            tracking = false;

        });
    }

    constructor ()
    {
        super();

        const world = new World3D(this, 0, 0, 8, { x: 0.5, y: 3, z: 4 });

        const ball1 = new Sphere(-2.5, -1.25, 0, 1, 24, 24);
        const box1 = new Box(0, -1.25, 0, 1.5, 1.5, 1.5);
        const cone1 = new Cone(2.5, -1.25, 0, 0.8, 1.8, 24, 6);

        const ball2 = new Sphere(2.5, 1.25, 0, 1, 24, 24);
        const box2 = new Box(0, 1.25, 0, 1.5, 1.5, 1.5);
        const cone2 = new Cone(-2.5, 1.25, 0, 0.8, 1.8, 24, 6);

        ball1.setMaterial(Brass);
        box1.setMaterial(Emerald);
        cone1.setMaterial(Ruby);

        ball2.setMaterial(Jade);
        box2.setMaterial(Bronze);
        cone2.setMaterial(Turquoise);

        AddChildren3D(world, ball1, box1, cone1, ball2, box2, cone2);

        const camera = world.camera;

        camera.isOrbit = true;

        window['world'] = world;
        window['camera'] = camera;

        this.setupCameraControls(camera);

        const light = world.light;

        On(this, 'update', (delta, time) => {

            time /= 1000;

            light.position.x = Math.sin(time * 2);
            light.position.y = Math.sin(time * 0.7);
            light.position.z = Math.sin(time * 1.3);

        });
    }
}

export default function (): void
{
    new Game(
        SetWebGL(),
        Size(800, 600),
        Parent('gameParent'),
        BackgroundColor(0x1d1d1d),
        Scenes(Demo)
    );
}
