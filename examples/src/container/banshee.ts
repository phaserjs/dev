import { AddChild, AddChildren } from '../../../../phaser-genesis/src/display';
import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { Container, Sprite } from '../../../../phaser-genesis/src/gameobjects';

import { AddTween } from '../../../../phaser-genesis/src/motion/tween/nano/AddTween';
import { AtlasFile } from '../../../../phaser-genesis/src/loader/files';
import { Easing } from '../../../../phaser-genesis/src/math';
import { Game } from '../../../../phaser-genesis/src/Game';
import { Scene } from '../../../../phaser-genesis/src/scenes';
import { StaticWorld } from '../../../../phaser-genesis/src/world';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await AtlasFile('banshee', 'assets/banshee.png', 'assets/banshee.json');

        const world = new StaticWorld(this);

        const banshee = new Container(400, 400);

        //  Back arm
        const arm1 = new Sprite(50, -200, 'banshee', 'arm1');
        const hand1 = new Sprite(110, -200, 'banshee', 'hand1').setOrigin(0, 0.5);

        const body = new Sprite(0, 0, 'banshee', 'body');

        //  Front arm
        const arm2 = new Sprite(50, -250, 'banshee', 'arm2').setOrigin(1, 0.5);
        const hand2 = new Sprite(-180, -25, 'banshee', 'hand2').setOrigin(0, 0);

        AddChild(arm2, hand2);

        const head = new Sprite(60, -305, 'banshee', 'head').setOrigin(0.5, 1);

        AddChildren(banshee, hand1, arm1, body, arm2, head);

        banshee.setScale(0.5);

        AddChild(world, banshee);

        AddTween(banshee).to(300, { y: 300 }).yoyo(true).repeat(-1).easing(Easing.Sine.InOut);
        AddTween(head).to(300, { rotation: 0.25 }).yoyo(true).repeat(-1).easing(Easing.Sine.InOut);
        AddTween(arm2).to(300, { x: 60, rotation: -0.20 }).yoyo(true).repeat(-1).easing(Easing.Sine.InOut);
        AddTween(hand2).to(300, { rotation: 0.30 }).yoyo(true).repeat(-1).easing(Easing.Sine.InOut);
        AddTween(hand1).to(300, { rotation: -0.20 }).yoyo(true).repeat(-1).easing(Easing.Sine.InOut);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
