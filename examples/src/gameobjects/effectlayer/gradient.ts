import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';
import { EffectLayer, Layer, Rectangle, RenderLayer, Sprite } from '../../../../../phaser-genesis/src/gameobjects';

import { AddChildren } from '../../../../../phaser-genesis/src/display';
import { FXShader } from '../../../../../phaser-genesis/src/renderer/webgl1/shaders/FXShader';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { LoadImageFile } from '../../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { On } from '../../../../../phaser-genesis/src/events';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';

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


const gradientFragmentShader = `
precision mediump float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;

uniform vec2 uResolution;

void main (void)
{
    vec4 color = texture2D(uTexture, vTextureCoord);

    vec2 p = 2.0 * (gl_FragCoord.xy / uResolution.xy) - 1.0;

    p.x *= uResolution.x / uResolution.y;

    vec3 col = vec3(0);
	
	col = vec3(1, 0, 0) * exp(-pow(length(p * vec2(0.0, 1.5) - vec2(0.0, -0.5)), 2.0));
	col += vec3(0, 1, 0) * exp(-pow(length(p * vec2(0.0, 1.5) - vec2(0.0, 0.0)), 2.0));
	col += vec3(0, 0, 1) * exp(-pow(length(p * vec2(0.0, 1.5) - vec2(0.0, 0.5)), 2.0));

    gl_FragColor = color * vec4(col, 1.0);
}`;

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await LoadImageFile('bg', 'assets/farm-background.png');

        const floor = new FXShader({ fragmentShader: gradientFragmentShader });

        const world = new StaticWorld(this);

        const fxlayer = new EffectLayer();

        // floor.timeScale = 0.001;

        fxlayer.shaders.push(floor);

        const rect = new Rectangle(400, 300, 750, 550, 0xffffff);
        // const bg = new Sprite(400, 300, 'bg');

        AddChildren(fxlayer, rect);
        // AddChildren(fxlayer, bg);
        AddChildren(world, fxlayer);

    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
