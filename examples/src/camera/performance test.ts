import { BackgroundColor, BatchSize, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { DownKey, LeftKey, RightKey, UpKey } from '../../../../phaser-genesis/src/input/keyboard/keys';
import { GetTexture, Texture } from '../../../../phaser-genesis/src/textures';
import { SpatialGridLayer, Sprite, Text } from '../../../../phaser-genesis/src/gameobjects';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { AnimatedSprite } from '../../../../phaser-genesis/src/gameobjects/animatedsprite/AnimatedSprite';
import { Animation } from '../../../../phaser-genesis/src/animation/Animation';
import { Between } from '../../../../phaser-genesis/src/math';
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
import { SetBackgroundStyle } from '../../../../phaser-genesis/src/gameobjects/text/SetBackgroundStyle';
import { SetLineSpacing } from '../../../../phaser-genesis/src/gameobjects/text/SetLineSpacing';
import { SetPadding } from '../../../../phaser-genesis/src/gameobjects/text/SetPadding';
import { StartStats } from '../../live/libs/stats.js';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { World } from '../../../../phaser-genesis/src/world/World';
import { WorldCamera } from '../../../../phaser-genesis/src/camera/WorldCamera';

let worldWidth = 512;
let worldHeight = 512;
let gridSize = 512;
let gridWidth = 0;

// let gridSize = 32;

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
    world: World;
    texture: Texture;

    grassLayer: SpatialGridLayer;
    itemsLayer: SpatialGridLayer;

    cameraSpeed: number = 16;
    fireballAnimation: Animation;
    stats: Text;

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
        await LoadImageFile('32', 'assets/32x32.png');
        await LoadImageFile('322', 'assets/drawcursor.png');

        const world = new World(this);
        
        this.grassLayer = new SpatialGridLayer(256, 256, false);
        this.itemsLayer = new SpatialGridLayer(256, 256, false);

        this.itemsLayer.onSortChildren = (a: Sprite, b: Sprite) =>
        {
            return a.y - b.y;
        }

        AddChild(world, this.grassLayer);
        AddChild(world, this.itemsLayer);

        this.world = world;

        this.camera = this.world.camera;

        this.texture = GetTexture('items');

        this.fireballAnimation = CreateAnimationFromAtlas({ key: 'fire', texture: 'fireball', prefix: 'trail_', start: 0, end: 12, zeroPad: 2 });

        this.addGrid();

        this.stats = new Text(0, 0, 'Click to expand the World\nCursors to scroll').setOrigin(0, 0);

        SetPadding(8, 8, 8, 8, this.stats);
        SetLineSpacing(20, this.stats);
        SetBackgroundStyle('rgba(0, 0, 150, 0.8)', 6, this.stats);

        AddChild(world, this.stats);

        const mouse = new Mouse();

        On(mouse, 'pointerdown', () => {

            if (window['game'].renderStats.numChildren > 1500000)
            {
                return;
            }

            this.addGrid();

            const total = window['game'].renderStats.numChildren;

            this.stats.setText([
                'Click to expand the World',
                `World size: ${worldWidth} x ${worldHeight}`,
                `Total sprites: ${total}`
            ]);
        });

        On(world, 'worldprerender', () =>
        {
            this.stats.x = this.camera.getBoundsX() + 16;
            this.stats.y = this.camera.getBoundsBottom() - 108;
        });

        this.camera.setPosition(0, 50);

        StartStats(this.game);
    }

    addGrid ()
    {
        const startX = (gridWidth * gridSize);
        const startY = (gridWidth * gridSize);

        gridWidth++;

        for (let i = 0; i < gridWidth; i++)
        {
            this.addLand(startX, gridSize * i);
            // AddChild(this.grassLayer, new Sprite(startX, gridSize * i, '32').setOrigin(0, 0));
        }

        for (let i = 0; i < gridWidth - 1; i++)
        {
            this.addLand(gridSize * i, startY);
            // AddChild(this.grassLayer, new Sprite(gridSize * i, startY, '322').setOrigin(0, 0));
        }

        for (let i = 0; i < 32; i++)
        {
            const fireball = new Fireball(this.fireballAnimation);

            AddChild(this.world, fireball);
        }

        worldWidth += 512;
        worldHeight += 512;
    }

    addLand (wx, wy)
    {
        //  Grass texture is 512 x 512
        AddChild(this.grassLayer, new Sprite(wx, wy, 'grass').setOrigin(0, 0));

        const frames = Array.from(this.texture.frames.keys());

        //  Remove __BASE texture
        frames.shift();

        for (let y = 0; y < 12; y++)
        {
            for (let x = 0; x < 12; x++)
            {
                const frame = GetRandom(frames);

                // const rx = Between(wx + 48, wx + 464);
                // const ry = Between(wy + 48, wy + 464);

                const rx = Between(wx + 16, wx + 498);
                const ry = Between(wy + 16, wy + 498);

                AddChild(this.itemsLayer, new Sprite(rx, ry, 'items', frame).setOrigin(0.5, 1).setScale(0.35, 0.35));
            }
        }
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
    total = 16;
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
