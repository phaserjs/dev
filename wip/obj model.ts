import * as Materials from '../src/materials3d';

import { AKey, DownKey, LeftKey, RightKey, UpKey } from '../src/input/keyboard/keys';
import { BackgroundColor, Parent, Scenes, Size, WebGL } from '../src/config';
import { Game, Scene } from '../src/';

import { AddChildren3D } from '../src/display3d/AddChildren3D';
import { Cache } from '../src/cache/Cache';
import { Geometry } from '../src/gameobjects3d/geometry/Geometry';
import { ImageFile } from '../src/loader/files/ImageFile';
import { Keyboard } from '../src/input/keyboard';
import { Loader } from '../src/loader/Loader';
import { Mesh } from '../src/gameobjects3d/mesh/Mesh';
import { Mouse } from '../src/input/mouse/Mouse';
import { OBJGeometryFile } from '../src/loader/files/OBJGeometryFile';
import { On } from '../src/events';
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

        keyboard.addKeys(leftKey, rightKey, upKey, downKey);

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

        return keyboard;
    }

    constructor ()
    {
        super();

        const loader = new Loader();

        if (window.location.href.includes('192.168.0.100/phaser-genesis/'))
        {
            loader.setPath('/phaser4-examples/public/assets/3d/');
        }
        else
        {
            loader.setPath('/examples/public/assets/3d/');
        }

        // loader.add(ImageFile('house', 'house.png'));
        loader.add(ImageFile('alienTexture1', 'AL01-2.jpg'));
        // loader.add(ImageFile('alienTexture2', 'AL02-2.jpg'));
        // loader.add(ImageFile('alienTexture3', 'AL03-2.jpg'));
        // loader.add(ImageFile('alienTexture4', 'AL04-2.jpg'));
        // loader.add(ImageFile('alienTexture5', 'AL05-2.jpg'));
        // loader.add(ImageFile('forestTexture', 'forest-extras-A.png'));
        // loader.add(ImageFile('buggyTexture', 'buggy.png'));
        // loader.add(OBJFile('alien', 'alien3.obj'));
        // loader.add(OBJGeometryFile('alien', 'alien4.obj'));
        // loader.add(OBJGeometryFile('alien', 'alien3.obj'));
        // loader.add(OBJGeometryFile('house', 'house.obj'));
        // loader.add(OBJGeometryFile('ship', 'smooth-ship.obj'));
        // loader.add(OBJGeometryFile('sphere', 'sphere.obj'));
        loader.add(OBJGeometryFile('sphere', 'silo.obj'));
        // loader.add(OBJGeometryFile('mushroom', 'mushroom.obj'));
        // loader.add(OBJGeometryFile('buggy', 'buggy.obj'));

        loader.start().then(() => this.create());
    }

    create ()
    {
        const world = new World3D(this, 0, 0, 4, { x: 0.5, y: 3, z: 4 });

        // const obj = Cache.getEntry('Geometry', 'ship') as Geometry;
        // const obj = Cache.getEntry('Geometry', 'house') as Geometry;
        const obj = Cache.getEntry('Geometry', 'sphere') as Geometry;

        const model = new Mesh(0, 0, 0, obj);

        model.setTexture('alienTexture1');

        // model.setTexture('house');

        // model.transform.scale.set(0.25, 0.25, 0.25);
        // model.transform.rotateX(-Math.PI / 2);
        // model.setTexture('alienTexture1');

        // model.setTexture('forestTexture');
        // model.setTexture('buggyTexture');

        // model.material.shine = 0.1;

        window['alien'] = model;

        AddChildren3D(world, model);

        const camera = world.camera;

        camera.isOrbit = true;

        window['world'] = world;
        window['camera'] = camera;

        const keyboard = this.setupCameraControls(camera);

        const aKey = new AKey();

        keyboard.addKeys(aKey);

        let skin = 1;

        On(aKey, 'keydown', () => {

            skin++;

            if (skin === 6)
            {
                skin = 1;
            }

            model.setTexture('alienTexture' + skin);

        });

        const light = world.light;

        On(this, 'update', (delta, time) => {

            time /= 1000;

            // model.transform.rotateY(-0.01 + (Math.sin(time) * 0.005));
            // model.transform.rotateZ(0.01);

            light.position.x = Math.sin(time * 2);
            light.position.y = Math.sin(time * 0.7);
            light.position.z = Math.sin(time * 1.3);

        });
    }
}

export default function (): void
{
    new Game(
        WebGL(),
        Size(800, 600),
        Parent('gameParent'),
        BackgroundColor(0x000000),
        Scenes(Demo)
    );
}
