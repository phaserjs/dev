import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddTween } from '../../../../phaser-genesis/src/motion/tween/nano/AddTween';
import { DrawImagePart } from '../../../../phaser-genesis/src/renderer/webgl1/draw/DrawImagePart';
import { Easing } from '../../../../phaser-genesis/src/math';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetTexture } from '../../../../phaser-genesis/src/textures/GetTexture';
import { IRenderPass } from '../../../../phaser-genesis/src/renderer/webgl1/renderpass/IRenderPass';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { On } from '../../../../phaser-genesis/src/events/On';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { Vec2 } from '../../../../phaser-genesis/src/math/vec2/Vec2';
import { WorldPostRenderEvent } from '../../../../phaser-genesis/src/world/events';
import { gl } from '../../../../phaser-genesis/src/renderer/webgl1/GL';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        //  256 x 192
        await ImageFile('city', 'assets/city.png', { minFilter: gl.NEAREST, magFilter: gl.NEAREST }).load();

        const texture = GetTexture('city');

        const world = new StaticWorld(this);

        const pos = new Vec2(0, 0);

        AddTween(pos).to(3000, { x: 90, y: 10 }).yoyo(true).repeat(-1).easing(Easing.Sine.InOut);

        let s = 0;

        On(world, WorldPostRenderEvent, (renderPass: IRenderPass) => {

            for (let i = 0; i < 192; i += 2)
            {
                DrawImagePart(renderPass, texture, 0, i, 256, i + 2, pos.x + s, i * 2, 512, 4);

                s = Math.sin(pos.y + i) * 4;
            }

        });
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);
