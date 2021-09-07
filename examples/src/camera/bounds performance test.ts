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
import { SetWillUpdateChildren } from '../../../../phaser-genesis/src/components/permissions/SetWillUpdateChildren';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { WillUpdateChildren } from '../../../../phaser-genesis/src/components/permissions/WillUpdateChildren';
import { WorldCamera } from '../../../../phaser-genesis/src/camera/WorldCamera';

// import { StartStats } from '../../live/libs/stats.js';

// const worldSize = 131072;
// const worldSize = 98304;
// const worldSize = 65536;
const worldSize = 49152;
// const worldSize = 32768;
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

//  Windows 10 (GeForce GTX 1660) - BranchSearch:

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

//  Windows 10 (GeForce GTX 1660) - LL Iteration:

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
