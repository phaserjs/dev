import { AddChild, AddChildren } from '../../../../phaser-genesis/src/display';
import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { Container, Sprite } from '../../../../phaser-genesis/src/gameobjects';

import { AtlasFile } from '../../../../phaser-genesis/src/loader/files';
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

        const body = new Sprite(400, 300, 'banshee', 'body');
        const head = new Sprite(0, 0, 'banshee', 'head');

        AddChild(body, head);
        AddChild(world, body);

        /*
        const banshee = new Container(400, 300);

        //  Back arm
        const arm1 = new Sprite(0, -300, 'banshee', 'arm1');
        const hand1 = new Sprite(0, -300, 'banshee', 'hand1');

        const body = new Sprite(0, 0, 'banshee', 'body');

        //  Front arm
        const arm2 = new Sprite(0, -300, 'banshee', 'arm2');
        const hand2 = new Sprite(0, -300, 'banshee', 'hand2');

        const head = new Sprite(0, -300, 'banshee', 'head');

        AddChildren(banshee, arm1, hand1, body, arm2, hand2, head);

        banshee.setScale(0.5, 0.5);

        AddChild(world, banshee);

        window['banshee'] = banshee;
        */

        window['bhead'] = head;
        window['bbody'] = body;
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
