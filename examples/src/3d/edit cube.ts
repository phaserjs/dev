import { BackgroundColor, GlobalVar, Parent, Scenes, Size, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChildren3D } from '../../../../phaser-genesis/src/display3d/AddChildren3D';
import { Box } from '../../../../phaser-genesis/src/gameobjects3d/box/Box';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GameObject3DEditor } from '../../live/libs/phaser4debugkit/GameObject3DEditor';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../phaser-genesis/src/loader/Loader';
import { Mesh } from '../../../../phaser-genesis/src/gameobjects3d/mesh/Mesh';
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

        loader.add(ImageFile('keops', 'keops.png', { flipY: true }));
        loader.add(ImageFile('metal', 'metal.png', { flipY: true }));
        loader.add(ImageFile('stone', 'stone.png', { flipY: true }));
        loader.add(ImageFile('stonegrass', 'stonegrass.png', { flipY: true }));

        loader.start().then(() => this.create());
    }

    create ()
    {
        const world = new World3D(this, 0, 0, 4, { x: 0.5, y: 2, z: 10 });

        const box = new Box(0, 0, 0, 1.5, 1.5, 1.5).setTexture('stonegrass');

        AddChildren3D(world, box);

        new GameObject3DEditor(box);
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
