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
//  10000 = 97,970 sprites

//  (worldSize * 2) / 64 squared

const worldSize = 10000;

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

        msg.innerText = `Running. Press the button to start a 10 second capture.`;
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

        if (capture)
        {
            if (startFrame === 0)
            {
                startFrame = rs.gameFrame;
                totalSprites = rs.numChildren;
            }

            renderMS.push(rs.renderMs);
            updateMS.push(rs.updateMs);
            fps.push(rs.fps);

            if (performance.now() >= endTime)
            {
                endCapture(rs.gameFrame);
            }

            // msg.innerText = `Frame: ${rs.gameFrame} - Game Objects: ${rs.numChildren} - Rendered: ${rs.rendered} in ${rs.renderMs.toFixed(2)}ms - Updated: ${rs.updated}`;
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

const ts = (worldSize * 2) / 64;

msg.innerHTML = `Please wait, generating ${ts * ts} Sprites`;
msg.style.paddingLeft = '50px';

const game = new Game(
    WebGL(),
    BatchSize(4096),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x0a0a0a),
    Scenes(Demo)
);

let capture = false;
const renderMS = [];
const updateMS = [];
const fps = [];
let startTime = 0;
let endTime = 0;
let startFrame = 0;
let totalSprites = 0;

const button = document.createElement('button');

button.innerText = 'Start Capture';

button.onclick = () => {

    if (!capture)
    {
        capture = true;
        startTime = performance.now();
        endTime = startTime + 10000;
    
        msg.innerText = `Capturing. Please wait 10 seconds.`;
    }

};

function endCapture (endFrame: number)
{
    msg.innerText = `Results are in the console`;

    capture = false;
    game.isPaused = true;

    //  Average renderMS
    let renderTotal = 0;
    let renderMin = Number.MAX_SAFE_INTEGER;
    let renderMax = 0;

    renderMS.forEach(value => {

        renderTotal += value;

        if (value > renderMax)
        {
            renderMax = value;
        }
        
        if (value < renderMin)
        {
            renderMin = value;
        }

    });

    const renderAvg = renderTotal / renderMS.length;

    //  Average updateMS
    let updateTotal = 0;
    let updateMin = Number.MAX_SAFE_INTEGER;
    let updateMax = 0;

    updateMS.forEach(value => {

        updateTotal += value;

        if (value > updateMax)
        {
            updateMax = value;
        }
        
        if (value < updateMin)
        {
            updateMin = value;
        }

    });

    const updateAvg = updateTotal / updateMS.length;

    //  Average updateMS
    let fpsTotal = 0;
    let fpsMin = Number.MAX_SAFE_INTEGER;
    let fpsMax = 0;

    fps.forEach(value => {

        fpsTotal += value;

        if (value > fpsMax)
        {
            fpsMax = value;
        }
        
        if (value < fpsMin)
        {
            fpsMin = value;
        }

    });

    const fpsAvg = fpsTotal / fps.length;

    const totalFrames = endFrame - startFrame;

    console.log('Total Sprites:', totalSprites);
    console.log('Updating Sprites:', total);
    console.log('Static Sprites:', totalSprites - total);

    console.log('');

    console.log('Start Frame:', startFrame);
    console.log('End Frame:', endFrame);
    console.log('Total Frames:', totalFrames);
    console.log('Time per Frame:', (endTime - startTime) / totalFrames);

    console.log('');

    console.log('Start Time:', startTime);
    console.log('End Time:', endTime);
    console.log('Duration:', endTime - startTime, 'ms');

    console.log('');

    console.log('Average Render Time:', renderAvg, 'ms per frame');
    console.log('Min Render Time:', renderMin, 'ms');
    console.log('Max Render Time:', renderMax, 'ms');

    console.log('');

    console.log('Average Update Time:', updateAvg, 'ms per frame');
    console.log('Min Update Time:', updateMin, 'ms');
    console.log('Max Update Time:', updateMax, 'ms');

    console.log('');

    console.log('Average FPS Rate:', fpsAvg);
    console.log('Min FPS Rate:', fpsMin);
    console.log('Max FPS Rate:', fpsMax);
}

document.body.appendChild(msg);
document.body.appendChild(button);
