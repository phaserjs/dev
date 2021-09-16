import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';
import { EffectLayer, Layer, Rectangle, RenderLayer, Sprite } from '../../../../../phaser-genesis/src/gameobjects';

import { AddChildren } from '../../../../../phaser-genesis/src/display';
import { FXShader } from '../../../../../phaser-genesis/src/renderer/webgl1/shaders/FXShader';
import { Game } from '../../../../../phaser-genesis/src/Game';
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




// https://glslsandbox.com/e#74927.0
const sun = `
#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 resolution;

void main( void ) {
	
	vec3 Color = vec3(sin(time), 0.3, 0.9);
	float col = -0.2;
	vec2 a = (gl_FragCoord.xy * 2.7 - resolution) / min(resolution, resolution.y);
	 col += 0.41 / abs(length(a + vec2( sin(time), sin(time)*cos(time))) - 0.01);
	gl_FragColor = vec4(vec3(Color * col), 1.9);
}
`;

// https://glslsandbox.com/e#74946.0
const checkerboardFragmentShader = `
precision mediump float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uResolution;

void main (void)
{
    vec2 uv = gl_FragCoord.xy / uResolution.xy;

    vec4 color = texture2D(uTexture, uv);

    vec2 offs = vec2(0.0, uTime * 0.1 * -2.0);

    vec2 pos = uv - vec2(0.5, 0.5);

    //  no discard = top and bottom
    //  < 0 = bottom
    //  > 0 = top
    if (pos.y > 0.0)
    {
        discard;
    }

    float horizon = 0.1;
    float fov = 0.5; 

	float scaling = 0.05;
	
	vec3 p = vec3(pos.x, fov, pos.y - horizon);
	vec2 s = vec2(p.x / p.z, p.y / p.z) * scaling;
	
	//  checkboard texture
	float bcolor = sign((mod(s.x + offs.x, 0.1) - 0.05) * (mod(s.y + offs.y, 0.1) - 0.05));

    //  fading
	bcolor *= p.z * p.z * 10.0;
	
	gl_FragColor = color * vec4(vec3(bcolor), 1.0);
}`;

class Demo extends Scene
{
    constructor ()
    {
        super();

        const floor = new FXShader({ fragmentShader: checkerboardFragmentShader });

        const world = new StaticWorld(this);

        const fxlayer = new EffectLayer();

        floor.timeScale = 0.001;

        fxlayer.shaders.push(floor);

        const rect = new Rectangle(400, 300, 800, 600, 0xff00ff);

        AddChildren(fxlayer, rect);
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
