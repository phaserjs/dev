import { BackgroundColor, GlobalVar, Parent, Scenes, Size, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChildren3D } from '../../../../phaser-genesis/src/display3d/AddChildren3D';
import { Box } from '../../../../phaser-genesis/src/gameobjects3d/box/Box';
import { Game } from '../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../phaser-genesis/src/loader/Loader';
import { Mesh } from '../../../../phaser-genesis/src/gameobjects3d/mesh/Mesh';
import { Mouse } from '../../../../phaser-genesis/src/input/mouse/Mouse';
import { On } from '../../../../phaser-genesis/src/events';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { World3D } from '../../../../phaser-genesis/src/world3d/World3D';

class Demo extends Scene
{
    world: World3D;
    box: Mesh;

    constructor ()
    {
        super();

        const loader = new Loader();

        loader.setPath('assets/textures/');

        loader.add(ImageFile('stonegrass', 'stonegrass.png', { flipY: true }));

        loader.start().then(() => this.create());
    }

    create ()
    {
        this.world = new World3D(this, 0, 0, 4, { x: 0.5, y: 2, z: 10 });

        const box = new Box(0, 0, 0, 1.5, 1.5, 1.5).setTexture('stonegrass');

        AddChildren3D(this.world, box);

        this.box = box;

        const camera = this.world.camera;

        const mouse = new Mouse();

        On(mouse, 'wheel', (deltaX: number, deltaY: number, deltaZ: number) => {

            camera.zoom(deltaY);

        });

        On(this, 'update', () => this.update());
    }

    update ()
    {
        this.box.transform.rotateX(0.01);
        this.box.transform.rotateY(0.015);
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
