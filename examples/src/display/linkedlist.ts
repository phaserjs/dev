import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { DebugHierarchyComponent } from '../../../../phaser-genesis/src/components/hierarchy/DebugHierarchyComponent';
import { Game } from '../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { IterateWorld } from '../../../../phaser-genesis/src/world/IterateWorld';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';
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
        await ImageFile('carrot', 'assets/carrot.png');
        await ImageFile('clown', 'assets/clown.png');

        const world = new StaticWorld(this);

        const childA = new Sprite(200, 300, 'carrot');
        const childB = new Sprite(400, 300, 'carrot');
        const childC = new Sprite(600, 300, 'carrot');

        const childD = new Sprite(0, 50, 'clown');
        const childE = new Sprite(0, 100, 'clown');
        const childF = new Sprite(0, 50, 'clown');

        AddChild(world, childA);
        AddChild(world, childB);
        AddChild(world, childC);

        AddChild(childA, childD);
        AddChild(childA, childE);
        AddChild(childC, childF);

        // DebugHierarchyComponent(world.id);

        // DebugHierarchyComponent(childA.id);
        // DebugHierarchyComponent(childB.id);
        // DebugHierarchyComponent(childC.id);
        // DebugHierarchyComponent(childD.id);
        // DebugHierarchyComponent(childE.id);
        // DebugHierarchyComponent(childF.id);

        // console.log(IterateWorld(world));
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);
