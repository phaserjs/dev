import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../../phaser-genesis/src/display/';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../../phaser-genesis/src/loader/Loader';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../../phaser-genesis/src/gameobjects/';
import { SpriteVertsEditor } from '../../../live/libs/phaser4debugkit/SpriteVertsEditor';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';
import { UpdateVertices } from '../../../../../phaser-genesis/src/components/transform';

class Demo extends Scene
{
    constructor ()
    {
        super();

        const loader = new Loader();

        loader.add(ImageFile('f', 'assets/f-texture.png'));

        loader.start().then(() => {

            const world = new StaticWorld(this);

            const sprite = new Sprite(300, 300, 'f');

            //  Populate the verts so Tweakpane can see the values before rendering
            UpdateVertices(sprite.vertices, sprite.worldTransform, sprite.transformExtent);

            AddChild(world, sprite);

            new SpriteVertsEditor(sprite);

        });
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
