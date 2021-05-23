import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { DrawImage } from '../../../../phaser-genesis/src/renderer/webgl1/draw/DrawImage';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetTexture } from '../../../../phaser-genesis/src/textures/GetTexture';
import { IRenderPass } from '../../../../phaser-genesis/src/renderer/webgl1/renderpass/IRenderPass';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../phaser-genesis/src/loader/Loader';
import { On } from '../../../../phaser-genesis/src/events/On';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { WorldPostRenderEvent } from '../../../../phaser-genesis/src/world/events';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.preload();
    }

    async preload ()
    {
        const loader = new Loader();

        loader.add(ImageFile('logo', 'assets/f-texture.png'));

        await loader.start();

        const texture = GetTexture('logo');

        const world = new StaticWorld(this);

        On(world, WorldPostRenderEvent, (renderPass: IRenderPass) => {

            DrawImage(renderPass, texture, 64, 64);

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
