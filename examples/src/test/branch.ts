import { AddChild, AddChildren } from '../../../../phaser-genesis/src/display';
import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { BranchSearch } from '../../../../phaser-genesis/src/components/hierarchy/BranchSearch';
import { Game } from '../../../../phaser-genesis/src/Game';
import { LoadImageFile } from '../../../../phaser-genesis/src/loader/files/LoadImageFile';
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
        await LoadImageFile('bolt', 'assets/items/bolt.png');
        await LoadImageFile('cd', 'assets/items/cd.png');
        await LoadImageFile('disk1', 'assets/items/disk1.png');
        await LoadImageFile('disk2', 'assets/items/disk3.png');
        await LoadImageFile('flower', 'assets/items/flower1.png');
        await LoadImageFile('book', 'assets/items/book4.png');
        await LoadImageFile('crown', 'assets/items/crown4.png');

        const world = new StaticWorld(this);

        const A = new Sprite(350, 100, 'bolt');
        const B = new Sprite(400, 100, 'bolt');
        const C = new Sprite(450, 100, 'bolt');

        AddChildren(world, A, B, C);

        const D = new Sprite(-50, 100, 'cd');
        const E = new Sprite(0, 100, 'cd');
        const F = new Sprite(50, 100, 'cd');

        AddChildren(A, D, E, F);

        const G = new Sprite(-50, 100, 'disk1');
        const H = new Sprite(0, 100, 'disk1');

        AddChildren(D, G, H);

        const X = new Sprite(-50, 100, 'flower');
        const I = new Sprite(0, 100, 'flower');
        const Q = new Sprite(50, 100, 'flower');

        AddChildren(G, X, I, Q);

        const Z = new Sprite(0, 100, 'disk2');

        AddChildren(F, Z);

        const M = new Sprite(0, 100, 'book');
        const N = new Sprite(50, 100, 'book');

        AddChildren(C, M, N);

        const O = new Sprite(0, 100, 'crown');
        const P = new Sprite(50, 100, 'crown');

        AddChildren(M, O, P);

        // const ids = [];

        // ids[world.id] = 'World';
        // ids[A.id] = 'A';
        // ids[B.id] = 'B';
        // ids[C.id] = 'C';
        // ids[D.id] = 'D';
        // ids[E.id] = 'E';
        // ids[F.id] = 'F';
        // ids[G.id] = 'G';
        // ids[H.id] = 'H';
        // ids[X.id] = 'X';
        // ids[I.id] = 'I';
        // ids[Q.id] = 'Q';
        // ids[Z.id] = 'Z';
        // ids[M.id] = 'M';
        // ids[N.id] = 'N';
        // ids[O.id] = 'O';
        // ids[P.id] = 'P';

        // BranchSearch(world.id, ids);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);
