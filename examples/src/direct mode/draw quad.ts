import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddTween } from '../../../../phaser-genesis/src/motion/tween/nano/AddTween';
import { DrawQuad } from '../../../../phaser-genesis/src/renderer/webgl1/draw/DrawQuad';
import { Easing } from '../../../../phaser-genesis/src/math';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetTexture } from '../../../../phaser-genesis/src/textures/GetTexture';
import { IRenderPass } from '../../../../phaser-genesis/src/renderer/webgl1/renderpass/IRenderPass';
import { LoadImageFile } from '../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { On } from '../../../../phaser-genesis/src/events/On';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { Vec2 } from '../../../../phaser-genesis/src/math/vec2';
import { WorldPostRenderEvent } from '../../../../phaser-genesis/src/world/events';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await LoadImageFile('512', 'assets/512x512.png');

        const texture = GetTexture('512');

        const world = new StaticWorld(this);

        const topLeft = new Vec2(130, 100);
        const bottomLeft = new Vec2(100, 450);
        const bottomRight = new Vec2(500, 420);
        const topRight = new Vec2(480, 80);

        AddTween(topLeft).to(3000, { x: 90, y: 70 }).yoyo(true).repeat(-1).easing(Easing.Sine.InOut);
        AddTween(bottomLeft).to(4000, { x: 150, y: 400 }).yoyo(true).repeat(-1).easing(Easing.Sine.InOut);
        AddTween(bottomRight).to(2000, { x: 520, y: 500 }).yoyo(true).repeat(-1).easing(Easing.Sine.InOut);
        AddTween(topRight).to(5000, { x: 400, y: 20 }).yoyo(true).repeat(-1).easing(Easing.Sine.InOut);

        On(world, WorldPostRenderEvent, (renderPass: IRenderPass) => {

            DrawQuad(renderPass, texture, null, topLeft.x, topLeft.y, bottomLeft.x, bottomLeft.y, bottomRight.x, bottomRight.y, topRight.x, topRight.y);

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
