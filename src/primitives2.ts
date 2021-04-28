import { AKey, DownKey, LeftKey, MKey, RightKey, UpKey } from '../src/input/keyboard/keys';
import { BackgroundColor, Parent, Scenes, Size, WebGL } from '../src/config';

import { AddChild3D } from '../src/display3d/AddChild3D';
import { AddChildren3D } from '../src/display3d/AddChildren3D';
import { Box } from '../src/gameobjects3d/box/Box';
import { BoxGeometry } from '../src/geom3d/BoxGeometry';
import { Cache } from '../src/cache/Cache';
import { Camera3D } from '../src/camera3d/Camera3D';
// import { Clone } from '../src/math/vec3/Vec3Clone';
import { Cone } from '../src/gameobjects3d/cone/Cone';
import { ConeGeometry } from '../src/geom3d/ConeGeometry';
import { CylinderGeometry } from '../src/geom3d/CylinderGeometry';
import { Game } from '../src/Game';
import { Geometry } from '../src/gameobjects3d/geometry/Geometry';
import { IWorld3D } from '../src/world3d/IWorld3D';
import { ImageFile } from '../src/loader/files/ImageFile';
import { JSONFile } from '../src/loader/files/JSONFile';
import { Keyboard } from '../src/input/keyboard';
import { Loader } from '../src/loader/Loader';
import { Mesh } from '../src/gameobjects3d/mesh/Mesh';
import { Mouse } from '../src/input/mouse/Mouse';
import { On } from '../src/events';
import { Plane } from '../src/gameobjects3d/plane/Plane';
import { PlaneGeometry } from '../src/geom3d/PlaneGeometry';
import { Scene } from '../src/scenes/Scene';
import { Sphere } from '../src/gameobjects3d/sphere/Sphere';
import { SphereGeometry } from '../src/geom3d/SphereGeometry';
import { TorusGeometry } from '../src/geom3d/TorusGeometry';
import { Vec3 } from '../src/math/vec3';
import { VertexBuffer } from '../src/renderer/webgl1/buffers/VertexBuffer';
import { World3D } from '../src/world3d/World3D';

// import { OrbitCamera } from '../src/camera3d/OrbitCamera';










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

        if (window.location.href.includes('192.168.0.100/phaser-genesis/'))
        {
            loader.setPath('/phaser4-examples/public/assets/textures/');
        }
        else
        {
            loader.setPath('/examples/public/assets/textures/');
        }

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

export default function (): void
{
    new Game(
        WebGL(),
        Size(800, 600),
        Parent('gameParent'),
        BackgroundColor(0x1d1d1d),
        Scenes(Demo)
    );
}
