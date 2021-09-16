import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';
import { EffectLayer, Rectangle, Sprite } from '../../../../../phaser-genesis/src/gameobjects';

import { AddChildren } from '../../../../../phaser-genesis/src/display';
import { DownKey } from '../../../../../phaser-genesis/src/input/keyboard/keys/DownKey';
import { FXShader } from '../../../../../phaser-genesis/src/renderer/webgl1/shaders/FXShader';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { Keyboard } from '../../../../../phaser-genesis/src/input/keyboard/Keyboard';
import { LeftKey } from '../../../../../phaser-genesis/src/input/keyboard/keys/LeftKey';
import { LoadImageFile } from '../../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { RightKey } from '../../../../../phaser-genesis/src/input/keyboard/keys/RightKey';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { UpKey } from '../../../../../phaser-genesis/src/input/keyboard/keys/UpKey';
import { World } from '../../../../../phaser-genesis/src/world/World';
import { WorldCamera } from '../../../../../phaser-genesis/src/camera/WorldCamera';

// https://glslsandbox.com/e#74886.0 - twirl
// https://glslsandbox.com/e#74870.0 - atari
// https://glslsandbox.com/e#74835.0 - wavy
// https://glslsandbox.com/e#74812.0 - sphere
// https://glslsandbox.com/e#74800.0 - snow
// https://glslsandbox.com/e#74719.0 - water
// https://glslsandbox.com/e#74464.3 - horizontal gradient
// https://glslsandbox.com/e#74456.0 - vertical gradient
// https://glslsandbox.com/e#74049.1 - lightning (multi)
// https://glslsandbox.com/e#74048.0 - lightning (single)
// https://glslsandbox.com/e#73988.0 - wave 1
// https://glslsandbox.com/e#73991.4 - wave 2
// https://glslsandbox.com/e#73884.0 - electric lines
// https://glslsandbox.com/e#72942.0 - glowing snake

// https://www.shadertoy.com/view/4ljGD1 - music waves
// https://www.shadertoy.com/view/Md23DV - 2d tut
// https://www.shadertoy.com/view/Ms3XWN - iq pacman (glow)
// https://www.shadertoy.com/view/4tdSWr - lovely clouds
// https://www.shadertoy.com/view/XsjGDt - circle
// https://www.shadertoy.com/view/Mdf3zr - edge glow


const debugFragmentShader = `
/*
 * Original shader from:https://www.shadertoy.com/view/ldX3Rr
 */

// Created by inigo quilez - iq/2013
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

precision mediump float;

uniform vec2 uResolution;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;

#define iResolution vec3(uResolution, 0.1)

void mainImage (out vec4 fragColor, in vec2 fragCoord)
{
    vec4 color = texture2D(uTexture, vTextureCoord);

    vec2 p = 1.1 * (2.0 * fragCoord - iResolution.xy) / min(iResolution.y, iResolution.x);

    float h = dot(p,p);
    float d = abs(p.y)-h;
    float a = d-.23;
    float b = h-1.00;
    float c = sign(a*b*(p.y+p.x + (p.y-p.x)*sign(d)));
		
    c = mix( c, 0.0, smoothstep(0.98,1.00,h) );
    c = mix( c, 0.6, smoothstep(1.00,1.02,h) );
    
	// fragColor = color * vec4(c, c, c, 1.0);

    fragColor = vec4(c, c, c, 1.0);
}

void main(void)
{
    mainImage(gl_FragColor, gl_FragCoord.xy);

    gl_FragColor.a = 1.;
}`;

class Demo extends Scene
{
    leftKey: LeftKey;
    rightKey: RightKey;
    upKey: RightKey;
    downKey: RightKey;

    camera: WorldCamera;
    world: World;

    cameraSpeed: number = 8;

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
        await LoadImageFile('bg', 'assets/farm-background.png');

        const debug = new FXShader({ fragmentShader: debugFragmentShader });

        const world = new World(this);

        this.camera = world.camera;

        const fxlayer = new EffectLayer();

        fxlayer.shaders.push(debug);

        const rect = new Rectangle(400, 300, 800, 600, 0xffffff);

        // AddChildren(fxlayer, rect);

        // AddChildren(fxlayer, rect);

        AddChildren(world, fxlayer);

        // const test1 = new Sprite(0, 0, fxlayer.texture);

        // AddChildren(world, test1);

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

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
