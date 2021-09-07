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
import { StartStats } from '../../live/libs/stats.js';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { WillUpdateChildren } from '../../../../phaser-genesis/src/components/permissions/WillUpdateChildren';
import { WorldCamera } from '../../../../phaser-genesis/src/camera/WorldCamera';

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

        StartStats(this.game);
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
    total = 25000;
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
