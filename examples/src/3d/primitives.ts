import { BackgroundColor, GlobalVar, Parent, Scenes, Size, WebGL } from '../../../../phaser-genesis/src/config';
import { DownKey, LeftKey, RightKey, UpKey } from '../../../../phaser-genesis/src/input/keyboard/keys';

import { AddChildren3D } from '../../../../phaser-genesis/src/display3d/AddChildren3D';
import { Box } from '../../../../phaser-genesis/src/gameobjects3d/box/Box';
import { Cone } from '../../../../phaser-genesis/src/gameobjects3d/cone/Cone';
import { Game } from '../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../phaser-genesis/src/loader/Loader';
import { Mesh } from '../../../../phaser-genesis/src/gameobjects3d/mesh/Mesh';
import { Mouse } from '../../../../phaser-genesis/src/input/mouse/Mouse';
import { On } from '../../../../phaser-genesis/src/events';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sphere } from '../../../../phaser-genesis/src/gameobjects3d/sphere/Sphere';
import { World3D } from '../../../../phaser-genesis/src/world3d/World3D';

class Demo extends Scene
{
    leftKey: LeftKey;
    rightKey: RightKey;
    upKey: UpKey;
    downKey: DownKey;

    world: World3D;
    camMode: number = 0;
    model: Mesh;

    ball: Mesh;
    box: Mesh;
    cone: Mesh;

    constructor ()
    {
        super();

        const loader = new Loader();

        loader.setPath('assets/textures/');

        loader.add(ImageFile('wood', 'wooden-crate.png', { flipY: true }));
        loader.add(ImageFile('field', 'field.png', { flipY: true }));
        loader.add(ImageFile('water', 'water.png', { flipY: true }));
        loader.add(ImageFile('bricks', 'bricks.png', { flipY: true }));
        // loader.add(ImageFile('dirt', 'dirt.png', { flipY: true }));
        // loader.add(ImageFile('icerock', 'icerock.png', { flipY: true }));
        // loader.add(ImageFile('keops', 'keops.png', { flipY: true }));
        // loader.add(ImageFile('metal', 'metal.png', { flipY: true }));
        // loader.add(ImageFile('stone', 'stone.png', { flipY: true }));
        // loader.add(ImageFile('stonegrass', 'stonegrass.png', { flipY: true }));

        loader.start().then(() => this.create());
    }

    create ()
    {
        this.world = new World3D(this, 0, 0, 8, { x: 0.5, y: 3, z: 4 });

        const ball = new Sphere(-2.5, 0, 0, 1, 24, 24).setTexture('field');
        const box = new Box(0, 0, 0, 1.5, 1.5, 1.5).setTexture('wood');
        const cone = new Cone(2.5, 0, 0, 0.8, 1.8, 24, 6).setTexture('bricks');

        AddChildren3D(this.world, ball, box, cone);

        this.ball = ball;
        this.box = box;
        this.cone = cone;

        const camera = this.world.camera;

        camera.isOrbit = true;

        window['world'] = this.world;
        window['camera'] = camera;

        const mouse = new Mouse();

        let tracking = false;

        On(mouse, 'pointerdown', (x: number, y: number, button: number) => {

            if (button === 1)
            {
                camera.isOrbit = !camera.isOrbit;

                console.log('orbit', camera.isOrbit);
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

        On(mouse, 'wheel', (deltaX: number, deltaY: number, deltaZ: number) => {

            camera.zoom(deltaY);

        });

        On(mouse, 'pointerup', () => {

            tracking = false;

        });

        const light = this.world.light;

        On(this, 'update', (delta, time) => {

            time /= 1000;

            light.position.x = Math.sin(time * 2);
            light.position.y = Math.sin(time * 0.7);
            light.position.z = Math.sin(time * 1.3);

        });

        // On(this, 'update', () => this.update());
    }

    update ()
    {
        this.ball.transform.rotateX(0.01);
        this.box.transform.rotateX(0.01);
        // this.cone.transform.rotateX(0.01);

        this.ball.transform.rotateY(0.01);
        this.box.transform.rotateY(0.01);
        // this.cone.transform.rotateY(0.01);
    }
}

new Game(
    WebGL(),
    Size(800, 600),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x1d1d1d),
    Scenes(Demo)
);
