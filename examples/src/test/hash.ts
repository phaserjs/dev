import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { DownKey, LeftKey, RightKey, UpKey } from '../../../../phaser-genesis/src/input/keyboard/keys';
import { SpatialGridLayer, Sprite } from '../../../../phaser-genesis/src/gameobjects';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Between } from '../../../../phaser-genesis/src/math';
import { Game } from '../../../../phaser-genesis/src/Game';
import { GetRandom } from '../../../../phaser-genesis/src/utils/array/GetRandom';
import { GetTexture } from '../../../../phaser-genesis/src/textures';
import { GetY } from '../../../../phaser-genesis/src/components/transform/GetY';
import { Keyboard } from '../../../../phaser-genesis/src/input/keyboard';
import { LoadAtlasFile } from '../../../../phaser-genesis/src/loader/files/LoadAtlasFile';
import { Mouse } from '../../../../phaser-genesis/src/input/mouse/Mouse';
import { On } from '../../../../phaser-genesis/src/events/On';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { StartStats } from '../../live/libs/stats.js';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { WorldCamera } from '../../../../phaser-genesis/src/camera/WorldCamera';

class Demo extends Scene
{
    leftKey: LeftKey;
    rightKey: RightKey;
    upKey: RightKey;
    downKey: RightKey;

    camera: WorldCamera;
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

        const world = new StaticWorld(this);
        
        this.camera = world.camera;

        const texture = GetTexture('items');

        const frames = Array.from(texture.frames.keys());

        //  Remove __BASE texture
        frames.shift();

        const layer = new SpatialGridLayer(256, 256, false);

        layer.onSortChildren = (a: Sprite, b: Sprite) =>
        {
            return a.y - b.y;
        }

        AddChild(world, layer);

        const mouse = new Mouse();

        const addItem = () =>
        {
            const frame = GetRandom(frames);

            const x = Between(0, 800);
            const y = Between(0, 600);

            AddChild(layer, new Sprite(x, y, 'items', frame).setOrigin(0.5, 1));
        }

        On(mouse, 'pointerdown', () => addItem());

        addItem();

        StartStats(this.game);
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

const game = new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d8d),
    Scenes(Demo)
);

window['game'] = game;
