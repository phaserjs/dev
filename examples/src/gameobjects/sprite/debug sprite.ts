import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';

import { AddChildren } from '../../../../../phaser-genesis/src/display/';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../../phaser-genesis/src/loader/Loader';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../../phaser-genesis/src/gameobjects/';
import { SpriteEditor } from '../../../live/libs/phaser4debugkit/SpriteEditor';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        const loader = new Loader();

        loader.add(ImageFile('logo', 'assets/logo.png'));

        loader.start().then(() => {

            const logo = new Sprite(400, 300, 'logo');

            AddChildren(world, logo);

            new SpriteEditor(logo);

        });
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x3d8d2d),
    Scenes(Demo)
);
