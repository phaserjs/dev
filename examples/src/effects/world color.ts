import * as Effects from '../../../../phaser-genesis/src/colormatrix/';

import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChildren } from '../../../../phaser-genesis/src/display/';
import { AddTween } from '../../../../phaser-genesis/src/motion/tween/nano/AddTween';
import { Between } from '../../../../phaser-genesis/src/math';
import { Game } from '../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { On } from '../../../../phaser-genesis/src/events';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects/';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await ImageFile('bg', 'assets/doom.png').load();
        await ImageFile('sig', 'assets/sig.png').load();

        const world = new StaticWorld(this);

        const bg = new Sprite(400, 300, 'bg');
        const sig = new Sprite(160, 350, 'sig');
        
        AddChildren(world, bg, sig);

        const t = {
            amount: 0
        };

        const tween = AddTween(t).to(2000, { 'amount': 3600 }).yoyo(true).repeat(-1);

        tween.onUpdate = () => {

            // Effects.Grayscale(world, t.amount);
            // Effects.Contrast(world, t.amount);
            Effects.Hue(world, t.amount);

        };

    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x000000),
    Scenes(Demo)
);
