import { BackgroundColor, BatchSize, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { Between, Clamp } from '../../../../phaser-genesis/src/math';
import { DownKey, LeftKey, RightKey, UpKey } from '../../../../phaser-genesis/src/input/keyboard/keys';
import { GetTexture, Texture } from '../../../../phaser-genesis/src/textures';
import { SpatialGridLayer, Sprite } from '../../../../phaser-genesis/src/gameobjects';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { AnimatedSprite } from '../../../../phaser-genesis/src/gameobjects/animatedsprite/AnimatedSprite';
import { CreateAnimationFromAtlas } from '../../../../phaser-genesis/src/animation/CreateAnimationFromAtlas';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetRandom } from '../../../../phaser-genesis/src/utils/array/GetRandom';
import { Keyboard } from '../../../../phaser-genesis/src/input/keyboard';
import { LoadAtlasFile } from '../../../../phaser-genesis/src/loader/files/LoadAtlasFile';
import { LoadImageFile } from '../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { Mouse } from '../../../../phaser-genesis/src/input/mouse/Mouse';
import { On } from '../../../../phaser-genesis/src/events/On';
import { Play } from '../../../../phaser-genesis/src/animation/Play';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StartStats } from '../../live/libs/stats.js';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { WorldCamera } from '../../../../phaser-genesis/src/camera/WorldCamera';

let worldX = 0;
let worldY = 0;
let worldWidth = 1024;
let worldHeight = 1024;

class Fireball extends AnimatedSprite
{
    speedX: number;
    speedY: number;

    constructor (fireballAnimation)
    {
        super(Between(0, worldWidth), Between(0, worldHeight), 'fireball');

        this.speedX = Between(1, 8);
        this.speedY = Between(1, 8);

        this.rotation = Math.PI - Math.atan2(this.speedY, this.speedX);

        Play(fireballAnimation, { repeat: -1, frameRate: 1 }, this);
    }

    update (delta: number, now: number): void
    {
        super.update(delta, now);

        this.x -= this.speedX;
        this.y += this.speedY;

        if (this.x < 0)
        {
            this.x = worldWidth;
        }

        if (this.y > worldHeight)
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

    grassLayer: SpatialGridLayer;
    itemsLayer: SpatialGridLayer;

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
        await LoadAtlasFile('items', 'assets/land.png', 'assets/land.json');
        await LoadImageFile('grass', 'assets/textures/grass-plain.png');
        await LoadAtlasFile('fireball', 'assets/fireball.png', 'assets/fireball.json');

        const world = new StaticWorld(this);
        
        this.grassLayer = new SpatialGridLayer(256, 256, false);
        this.itemsLayer = new SpatialGridLayer(256, 256, false);

        // this.itemsLayer.onSortChildren = (a: Sprite, b: Sprite) =>
        // {
        //     return a.y - b.y;
        // }

        AddChild(world, this.grassLayer);
        AddChild(world, this.itemsLayer);

        this.world = world;

        this.camera = this.world.camera;

        this.texture = GetTexture('items');

        this.addLand();

        const fireballAnimation = CreateAnimationFromAtlas({ key: 'fire', texture: 'fireball', prefix: 'trail_', start: 0, end: 12, zeroPad: 2 });

        for (let i = 0; i < total; i++)
        {
            const fireball = new Fireball(fireballAnimation);

            AddChild(world, fireball);
        }
        
        const mouse = new Mouse();

        On(mouse, 'pointerdown', () => {

            this.addLand();

        });

        // this.camera.setPosition(-(worldWidth / 2), -(worldHeight / 2));

        StartStats(this.game);
    }

    addLand ()
    {
        const wx = worldX;
        const wy = worldY;
        
        console.log('addLand', wx, wy);

        //  Grass texture is 512 x 512

        AddChild(this.grassLayer, new Sprite(wx, wy, 'grass').setOrigin(0, 0));

        // const frames = Array.from(this.texture.frames.keys());

        //  Remove __BASE texture
        // frames.shift();

        // console.log(frames);

        const frames = [
            'SmallChest1',
            'SmallChest2',
            'SmallChest4',
            'SmallChest5',
            'SmallChest6',
            'SmallChest7',
            'SmallChest8',
            'SmallChest9',
            'SmallChest10',
        ];

        AddChild(this.itemsLayer, new Sprite(wx + 128, wy + 128, 'items', 'SmallChest1').setOrigin(0.5, 1));
        AddChild(this.itemsLayer, new Sprite(wx + 336, wy + 128, 'items', 'SmallChest2').setOrigin(0.5, 1));
        AddChild(this.itemsLayer, new Sprite(wx + 128, wy + 336, 'items', 'SmallChest4').setOrigin(0.5, 1));
        AddChild(this.itemsLayer, new Sprite(wx + 336, wy + 336, 'items', 'SmallChest5').setOrigin(0.5, 1));

        /*
        for (let y = 0; y < 2; y++)
        {
            for (let x = 0; x < 2; x++)
            {
                const frame = GetRandom(frames);

                AddChild(this.itemsLayer, new Sprite(wx, ry, 'items', frame).setOrigin(0.5, 1));


                // const rx = Between(wx + 128, wx + 384);
                // const ry = Between(wy + 128, wy + 384);

                // const s = AddChild(this.itemsLayer, new Sprite(rx, ry, 'items', frame).setOrigin(0.5, 1));

                const s = AddChild(this.itemsLayer, new Sprite(rx, ry, 'items', frame).setOrigin(0.5, 1));

                // s.alpha = 0.5;

                console.log(s.frame.key, s.x, s.y);
            }
        }
        */

        worldX += 512;
        // worldX += 1024;
        // worldWidth += 1024;
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
    // total = 10000;
    total = 10;
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
