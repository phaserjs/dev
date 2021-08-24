import { BackgroundColor, BatchSize, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';
import { Between, FloatBetween } from '../../../../phaser-genesis/src/math';
import { DownKey, LeftKey, RightKey, UpKey } from '../../../../phaser-genesis/src/input/keyboard/keys';
import { Layer, Sprite } from '../../../../phaser-genesis/src/gameobjects';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Game } from '../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Keyboard } from '../../../../phaser-genesis/src/input/keyboard';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { SetWillUpdateChildren } from '../../../../phaser-genesis/src/components/permissions/SetWillUpdateChildren';
import { SpriteSheetFile } from '../../../../phaser-genesis/src/loader/files/SpriteSheetFile';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';
import { WorldCamera } from '../../../../phaser-genesis/src/camera/WorldCamera';

//  40000 = 1,567,501 sprites
//  20000 = 395,626 sprites
const worldSize = 20000;

class Ball extends Sprite
{
    speedX: number;
    speedY: number;

    constructor ()
    {
        super(Between(-worldSize, worldSize), Between(-worldSize, worldSize), 'balls', Between(0, 5));

        this.speedX = FloatBetween(-4, 4);
        this.speedY = FloatBetween(-4, 4);
    }

    update (): void
    {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < -worldSize)
        {
            this.x = -worldSize;
            this.speedX *= -1;
        }
        else if (this.x > worldSize)
        {
            this.x = worldSize;
            this.speedX *= -1;
        }

        if (this.y < -worldSize)
        {
            this.y = -worldSize;
            this.speedY *= -1;
        }
        else if (this.y > worldSize)
        {
            this.y = worldSize;
            this.speedY *= -1;
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
        await SpriteSheetFile('balls', 'assets/balls.png', { frameWidth: 17 });
        await ImageFile('ball', 'assets/8x8.png');
        await ImageFile('bit', 'assets/1bitblock2.png');

        const world = new StaticWorld(this);
        
        this.world = world;

        this.camera = this.world.camera;

        const layer = new Layer();

        SetWillUpdateChildren(layer.id, false);

        for (let y = -worldSize; y < worldSize; y += 64)
        {
            for (let x = -worldSize; x < worldSize; x += 64)
            {
                AddChild(layer, new Sprite(x, y, 'bit').setAlpha(0.2));
            }
        }

        AddChild(this.world, layer);

        for (let i = 0; i < total; i++)
        {
            const flake = new Ball();

            AddChild(world, flake);
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

        const rs = window.renderStats;

        if (rs)
        {
            msg.innerText = `Frame: ${rs.gameFrame} - Game Objects: ${rs.numChildren} - Rendered: ${rs.rendered} in ${rs.renderMs.toFixed(2)}ms - Updated: ${rs.updated}`;
        }
    }
}

const params = new URLSearchParams(document.location.search);
    
let total = parseInt(params.get('t'));

if (!total || total === 0)
{
    total = 5000;
}

const msg = document.createElement('p');

msg.innerHTML = 'Please wait, generating Sprites';
msg.style.paddingLeft = '150px';

const game = new Game(
    WebGL(),
    BatchSize(4096),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);

const button = document.createElement('button');
button.innerText = 'Pause';
button.onclick = () => {
    game.isPaused = true;
};

document.body.appendChild(msg);
document.body.appendChild(button);
