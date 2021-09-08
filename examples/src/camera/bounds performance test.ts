import { BackgroundColor, BatchSize, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { Between, Clamp } from '../../../../phaser-genesis/src/math';
import { DownKey, LeftKey, RightKey, UpKey } from '../../../../phaser-genesis/src/input/keyboard/keys';
import { GetTexture, Texture } from '../../../../phaser-genesis/src/textures';
import { Layer, Sprite } from '../../../../phaser-genesis/src/gameobjects';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { DebugHierarchyComponent } from '../../../../phaser-genesis/src/components/hierarchy/DebugHierarchyComponent';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetRandom } from '../../../../phaser-genesis/src/utils/array/GetRandom';
import { Keyboard } from '../../../../phaser-genesis/src/input/keyboard';
import { LoadAtlasFile } from '../../../../phaser-genesis/src/loader/files/LoadAtlasFile';
import { LoadImageFile } from '../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { SetDepth } from '../../../../phaser-genesis/src/components/hierarchy/SetDepth';
import { SetWillUpdateChildren } from '../../../../phaser-genesis/src/components/permissions/SetWillUpdateChildren';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { WillUpdateChildren } from '../../../../phaser-genesis/src/components/permissions/WillUpdateChildren';
import { WorldCamera } from '../../../../phaser-genesis/src/camera/WorldCamera';

// import { StartStats } from '../../live/libs/stats.js';

// const worldSize = 131072;
// const worldSize = 98304;
// const worldSize = 65536;
// const worldSize = 49152;
const worldSize = 32768;
// const worldSize = 16384;
// const worldSize = 8192;

class Snowflake extends Sprite
{
    speedX: number;
    speedY: number;

    constructor ()
    {
        super(Between(0, worldSize), Between(0, worldSize), 'snow');

        this.speedX = Between(1, 8);
        this.speedY = Between(1, 8);

        this.name = 'snow';
    }

    update (): void
    {
        this.x -= this.speedX;
        this.y += this.speedY;

        if (this.x < 0)
        {
            this.x = worldSize;
        }

        if (this.y > worldSize)
        {
            this.y = 0;
        }
    }
}

class Demo extends Scene
{
    leftKey: LeftKey;
    rightKey: RightKey;
    upKey: RightKey;
    downKey: RightKey;

    camera: WorldCamera;
    world: StaticWorld;
    texture: Texture;

    cameraSpeed: number = 16;

    constructor ()
    {
        super();

        const keyboard = new Keyboard();

        this.leftKey = new LeftKey();
        this.rightKey = new RightKey();
        this.upKey = new UpKey();
        this.downKey = new DownKey();

        keyboard.addKeys(this.leftKey, this.rightKey, this.upKey, this.downKey);

        this.create();
    }

    async create ()
    {
        console.log('Loading ...');

        await LoadAtlasFile('items', 'assets/land.png', 'assets/land.json');
        await LoadImageFile('grass', 'assets/textures/grass-plain.png');
        await LoadImageFile('snow', 'assets/particle1.png');

        console.log('Creating ...');

        const world = new StaticWorld(this);
        
        this.world = world;

        this.camera = this.world.camera;

        this.texture = GetTexture('items');

        this.createGrass();
        this.createLandscape();

        console.log('Making snow ...');

        const start = performance.now();

        for (let i = 0; i < total; i++)
        {
            const flake = new Snowflake();

            AddChild(world, flake);
        }

        console.log('Created snow in', (performance.now() - start), 'ms');

        this.camera.setPosition(-(worldSize / 2), -(worldSize / 2));

        // StartStats(this.game);
    }

    createGrass ()
    {
        //  Grass texture is 512 x 512
        //  World is 64 x 64 tiles = 32,768 x 32,768

        const layer = new Layer();

        SetWillUpdateChildren(layer.id, false);
        SetDepth(layer.id, 1);

        const start = performance.now();

        const size = worldSize / 512;

        for (let y = 0; y < size; y++)
        {
            for (let x = 0; x < size; x++)
            {
                AddChild(layer, new Sprite(x * 512, y * 512, 'grass').setOrigin(0, 0));
            }
        }

        console.log(`Created grass in ${(performance.now() - start)} ms`);

        AddChild(this.world, layer);
    }

    createLandscape ()
    {
        const frames = Array.from(this.texture.frames.keys());

        //  Remove __BASE texture
        frames.shift();

        const layer = new Layer();

        SetWillUpdateChildren(layer.id, false);
        SetDepth(layer.id, 1);

        const size = (worldSize / 512) * 8;

        let total = 0;

        console.log('Adding items ...');

        const start = performance.now();

        for (let y = 0; y < size; y++)
        {
            for (let x = 0; x < size; x++)
            {
                const frame = GetRandom(frames);

                AddChild(layer, new Sprite(256 + (x * 128), size + (y * 128), 'items', frame).setOrigin(0.5, 1));

                total++;
            }
        }

        console.log(`${total} items in ${(performance.now() - start)} ms`);

        AddChild(this.world, layer);
    }

    update (): void
    {
        if (!this.camera)
        {
            return;
        }

        if (this.leftKey.isDown)
        {
            this.camera.x += this.cameraSpeed;
        }
        else if (this.rightKey.isDown)
        {
            this.camera.x -= this.cameraSpeed;
        }

        if (this.upKey.isDown)
        {
            this.camera.y += this.cameraSpeed;
        }
        else if (this.downKey.isDown)
        {
            this.camera.y -= this.cameraSpeed;
        }
    }
}

const params = new URLSearchParams(document.location.search);
    
let total = parseInt(params.get('t'));

if (!total || total === 0)
{
    // total = 25000;
    // total = 15000;
    total = 10000;
    // total = 5000;
    // total = 1;
}

const game = new Game(
    WebGL(),
    BatchSize(4096),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);

window['game'] = game;

//  ------------------------------------------------
//  iMac M1 - 16GB - Big Sur 11.5.2  - BranchSearch:
//  ------------------------------------------------

/*

10k - worldSize: 32768

delta: 16.644262294300265
dirtyColor: 0
dirtyLocal: 10000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 60.08076430893812
gameFrame: 649
numChildren: 276242
preRenderMs: 0.5
renderMs: 4.599999904632568
rendered: 66
updateMs: 0.7000000476837158
updated: 10002

25k - worldSize: 32768

delta: 16.668333331743877
dirtyColor: 0
dirtyLocal: 25000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 59.99400060566091
gameFrame: 317
numChildren: 291242
preRenderMs: 1.1999998092651367
renderMs: 4.900000095367432
rendered: 74
updateMs: 1.8000001907348633
updated: 25002

50k - worldSize: 32768

delta: 16.671666665871935
dirtyColor: 0
dirtyLocal: 50000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 59.982005401239796
gameFrame: 1836
numChildren: 316242
preRenderMs: 2.5
renderMs: 5.099999904632568
rendered: 85
updateMs: 3.1000001430511475
updated: 50002

100k - worldSize: 32768

delta: 16.675
dirtyColor: 0
dirtyLocal: 100000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 59.97001499250375
gameFrame: 664
numChildren: 366242
preRenderMs: 4.5
renderMs: 6.099999904632568
rendered: 103
updateMs: 5.200000047683716
updated: 100002

//  Using a reference: this._data = Transform2DComponent.data[id] saves us 1.2ms on 100k updates per frame
updateMs: 4.900000095367432

//  Using the prevParentID check in SetDirtyParents - saves us a massive extra 1.1ms on 100k updates per frame
updateMs: 3.8000001907348633

//  These 2 changes have taken the average update cost from 5.2ms to 3.7ms per frame (for 100k sprites) and it will scale horizontally well
//  7.5ms for 200,000 moving sprites :) - without parent check it's 9.8ms (takes the test from 35fps to 40fps)



10k - worldSize: 49152

delta: 16.670491800933586
dirtyColor: 0
dirtyLocal: 10000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 59.986232676350774
gameFrame: 328
numChildren: 609042
preRenderMs: 0.5
renderMs: 9.900000095367432
rendered: 58
updateMs: 0.5
updated: 10002

25k - worldSize: 49152

delta: 16.678688526153564
dirtyColor: 0
dirtyLocal: 25000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 59.9567525007687
gameFrame: 422
numChildren: 624042
preRenderMs: 1.0999999046325684
renderMs: 9.5
rendered: 55
updateMs: 1.5999999046325684
updated: 25002

50k - worldSize: 49152

delta: 16.68166666428248
dirtyColor: 0
dirtyLocal: 50000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 59.94604856486697
gameFrame: 454
numChildren: 649042
preRenderMs: 2.3000001907348633
renderMs: 9.699999809265137
rendered: 66
updateMs: 2.6999998092651367
updated: 50002

100k - worldSize: 49152

delta: 20.68979591739421
dirtyColor: 0
dirtyLocal: 100000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 48.33300453965742
gameFrame: 307
numChildren: 699042
preRenderMs: 4.400000095367432
renderMs: 9.900000095367432
rendered: 82
updateMs: 5.199999809265137
updated: 100002

10k - worldSize: 65536

delta: 17.712280700081273
dirtyColor: 0
dirtyLocal: 10000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 56.458003174905166
gameFrame: 433
numChildren: 1074962
preRenderMs: 0.39999985694885254
renderMs: 15.5
rendered: 64
updateMs: 0.5
updated: 10002

25k - worldSize: 65536

delta: 19.066037735849058
dirtyColor: 0
dirtyLocal: 25000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 52.449282533399305
gameFrame: 345
numChildren: 1089962
preRenderMs: 1
renderMs: 16.200000047683716
rendered: 65
updateMs: 1.3999998569488525
updated: 25002

50k - worldSize: 65536

delta: 21.9195652163547
dirtyColor: 0
dirtyLocal: 50000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 45.62134285646672
gameFrame: 614
numChildren: 1114962
preRenderMs: 2.0999999046325684
renderMs: 16.200000047683716
rendered: 58
updateMs: 2.799999952316284
updated: 50002

100k - worldSize: 65536

delta: 27.72702702960453
dirtyColor: 0
dirtyLocal: 100000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 36.06589335857343
gameFrame: 207
numChildren: 1164962
preRenderMs: 4.400000095367432
renderMs: 17.59999990463257
rendered: 71
updateMs: 5
updated: 100002

*/

//  ------------------------------------------------
//  iMac M1 - 16GB - Big Sur 11.5.2  - LL Iteration:
//  ------------------------------------------------

/*

10k - worldSize: 32768

delta: 16.672131147540984
dirtyColor: 0
dirtyLocal: 10000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 59.9803343166175
gameFrame: 295
numChildren: 276242
preRenderMs: 4.8999998569488525
renderMs: 6
rendered: 64
updateMs: 0.20000004768371582
updated: 10002

25k - worldSize: 32768

delta: 17.91249999829701
dirtyColor: 0
dirtyLocal: 25000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 55.82693650216735
gameFrame: 287
numChildren: 291242
preRenderMs: 4.200000047683716
renderMs: 6.5
rendered: 71
updateMs: 0.7999999523162842
updated: 25002

50k - worldSize: 32768

delta: 16.690000001589457
dirtyColor: 0
dirtyLocal: 50000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 59.91611742988412
gameFrame: 282
numChildren: 316242
preRenderMs: 6
renderMs: 6.700000047683716
rendered: 76
updateMs: 1.7000000476837158
updated: 50002

100k - worldSize: 32768

delta: 19.23461538553238
dirtyColor: 0
dirtyLocal: 100000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 51.98960207710552
gameFrame: 284
numChildren: 366242
preRenderMs: 7.800000190734863
renderMs: 7.400000095367432
rendered: 105
updateMs: 3.0999999046325684
updated: 100002

10k - worldSize: 49152

Can't run at this world size! Errors in ULT reading IS_ROOT - array size error?

*/


//  ---------------------------------------------
//  Windows 10 (GeForce GTX 1660) - BranchSearch:
//  ---------------------------------------------

/*

10k - worldSize: 32768

delta: 16.688333333283662
dirtyColor: 0
dirtyLocal: 10000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 59.922101268529495
gameFrame: 360
numChildren: 276242
preRenderMs: 0.7000000029802322
renderMs: 8.299999997019768
rendered: 64
updateMs: 1
updated: 10002

//  10k after improvements:

delta: 16.671666666368644
dirtyColor: 0
dirtyLocal: 10000
dirtyQuad: 10002
dirtyView: 0
dirtyWorld: 0
fps: 59.982005399452724
gameFrame: 531
numChildren: 276242
preRenderMs: 0.5999999940395355
renderMs: 7.9000000059604645
rendered: 63
updateMs: 0.5999999940395355
updated: 10002

25k - worldSize: 32768

delta: 16.957627118644066
dirtyColor: 0
dirtyLocal: 25000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 58.97051474262869
gameFrame: 430
numChildren: 291242
preRenderMs: 1.699999988079071
renderMs: 10
rendered: 77
updateMs: 2.300000011920929
updated: 25002

//  25k after improvements:

delta: 16.7
dirtyColor: 0
dirtyLocal: 25000
dirtyQuad: 25002
dirtyView: 0
dirtyWorld: 0
fps: 59.880239520958085
gameFrame: 271
numChildren: 291242
preRenderMs: 1.600000023841858
renderMs: 8.199999988079071
rendered: 70
updateMs: 1.5
updated: 25002

50k - worldSize: 32768

delta: 20.38199999988079
dirtyColor: 0
dirtyLocal: 50000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 49.062898636338375
gameFrame: 438
numChildren: 316242
preRenderMs: 3.6000000089406967
renderMs: 11.799999997019768
rendered: 77
updateMs: 4.399999991059303
updated: 50002

//  50k after improvements:

delta: 16.7316666662693
dirtyColor: 0
dirtyLocal: 50000
dirtyQuad: 50002
dirtyView: 0
dirtyWorld: 0
fps: 59.76690905610614
gameFrame: 1726
numChildren: 316242
preRenderMs: 3.4000000059604645
renderMs: 10.400000005960464
rendered: 81
updateMs: 2.699999988079071
updated: 50002

100k - worldSize: 32768

delta: 31.199999999819376
dirtyColor: 0
dirtyLocal: 100000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 32.0512820514676
gameFrame: 258
numChildren: 366242
preRenderMs: 6.899999991059303
renderMs: 14.399999991059303
rendered: 101
updateMs: 9.200000002980232
updated: 100002

//  100k after improvements:

delta: 25.389999999850986
dirtyColor: 0
dirtyLocal: 100000
dirtyQuad: 100002
dirtyView: 0
dirtyWorld: 0
fps: 39.38558487616656
gameFrame: 1510
numChildren: 366242
preRenderMs: 8.199999988079071
renderMs: 10.800000011920929
rendered: 109
updateMs: 5.5
updated: 100002



10k - worldSize: 49152

delta: 22.954545454545453
dirtyColor: 0
dirtyLocal: 10000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 43.56435643564357
gameFrame: 365
numChildren: 609042
preRenderMs: 0.7000000029802322
renderMs: 19.100000008940697
rendered: 59
updateMs: 0.7999999970197678
updated: 10002

25k - worldSize: 49152

delta: 25.72307692315334
dirtyColor: 0
dirtyLocal: 25000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 38.875598086008914
gameFrame: 280
numChildren: 624042
preRenderMs: 1.9000000059604645
renderMs: 19.099999994039536
rendered: 63
updateMs: 3.0999999940395355
updated: 25002

50k - worldSize: 49152

delta: 30.509090909000598
dirtyColor: 0
dirtyLocal: 50000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 32.77711561392301
gameFrame: 246
numChildren: 649042
preRenderMs: 3.5
renderMs: 24.299999997019768
rendered: 68
updateMs: 4.600000008940697
updated: 50002

100k - worldSize: 49152

delta: 43.32083333345751
dirtyColor: 0
dirtyLocal: 100000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 23.083581802376845
gameFrame: 174
numChildren: 699042
preRenderMs: 11.200000002980232
renderMs: 27.200000002980232
rendered: 73
updateMs: 15.100000008940697
updated: 100002

*/

//  ---------------------------------------------
//  Windows 10 (GeForce GTX 1660) - LL Iteration:
//  ---------------------------------------------

/*

10k - worldSize: 32768

delta: 16.921666666616996
dirtyColor: 0
dirtyLocal: 10000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 59.09583374389453
gameFrame: 509
numChildren: 276242
preRenderMs: 5
renderMs: 9.399999991059303
rendered: 64
updateMs: 0.6000000089406967
updated: 10002

25k - worldSize: 32768

delta: 19.856862745156473
dirtyColor: 0
dirtyLocal: 25000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 50.36042263241821
gameFrame: 297
numChildren: 291242
preRenderMs: 6.700000002980232
renderMs: 11.200000002980232
rendered: 71
updateMs: 1.2999999970197678
updated: 25002

50k - worldSize: 32768

delta: 24.44146341448877
dirtyColor: 0
dirtyLocal: 50000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 40.91408043133806
gameFrame: 217
numChildren: 316242
preRenderMs: 8.700000002980232
renderMs: 11
rendered: 82
updateMs: 3
updated: 50002

100k - worldSize: 32768

delta: 32.58064516129032
dirtyColor: 0
dirtyLocal: 100000
dirtyQuad: 0
dirtyView: 0
dirtyWorld: 0
fps: 30.693069306930692
gameFrame: 250
numChildren: 366242
preRenderMs: 13.599999994039536
renderMs: 13
rendered: 112
updateMs: 5.4000000059604645
updated: 100002

10k - worldSize: 49152

Can't run at this world size! Errors in ULT reading IS_ROOT - array size error?

*/
