import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';
import { EffectLayer, Rectangle } from '../../../../../phaser-genesis/src/gameobjects';

import { AddChildren } from '../../../../../phaser-genesis/src/display';
import { FXShader } from '../../../../../phaser-genesis/src/renderer/webgl1/shaders/FXShader';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';

const wigglesFragmentShader = `
//  Original shader from https://www.shadertoy.com/view/NljGWd

#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
uniform sampler2D backbuffer;


#define iTime time/10.

struct View {
    vec2 pos;
    mat2 ori;
};

// https://www.shadertoy.com/view/4djSRW
float Hash11(in float x) {
    x = fract(x * 0.1031);
    x *= x + 33.33;
    x *= x + x;
    return fract(x);
}

vec3 Hash23(in vec2 p) {
	vec3 p3 = fract(p.xyx * vec3(0.1031, 0.103, 0.0973));
    p3 += dot(p3, p3.yxz + 33.33);
    return fract((p3.xxy + p3.yzz) * p3.zyx);
}

vec2 Hash12(in float t) {
	vec3 p3 = fract(t * vec3(0.1031, 0.1030, 0.0973));
	p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.xx + p3.yz) * p3.zy);
}

View getView(in float t) {
    float id = floor(t), local = fract(t);
    vec2 a = Hash12(id), b = Hash12(id + 1.0), c = Hash12(id + 2.0);
    vec2 mid1 = 0.5 * (a + b), mid2 = 0.5 * (b + c);

    vec2 pos = mix(mix(mid1, b, local), mix(b, mid2, local), local);
    vec2 dir = normalize(mid1 * (local - 1.0) + (1.0 - 2.0 * local) * b + mid2 * local);

    return View(pos, mat2(dir.y, -dir.x, dir));
}

void main( void ) {

    float diffusion = 1.;	// iMouse.z > 0.0 ? mix(0.0, 3.0, iMouse.x / iResolution.x) : 1.0;
    gl_FragColor = texture2D( backbuffer, gl_FragCoord.xy / resolution.xy, diffusion);

    vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y * 4.0;
    float unit = 8.0 / resolution.y;

    View view = getView(iTime * 0.1);
    uv -= view.pos * 50.0 - 25.0;
    uv *= view.ori;

    vec2 cell = floor(uv+.5);
    uv = uv - cell;

    float freq1 = Hash11(dot(cell, vec2(393.84, 673.48))) * 30.0 - 15.0;
    float freq2 = Hash11(dot(cell, vec2(492.843, 596.395))) * 30.0 - 15.0;
    float phase = Hash11(dot(cell, vec2(348.46, 183.37)));
    float amp = Hash11(dot(cell, vec2(275.35, 741.69))) * 0.4;
    uv -= vec2(cos(iTime * freq1 + phase), sin(iTime * freq2 + phase)) * amp;

    gl_FragColor = vec4(mix(gl_FragColor.rgb, Hash23(cell), smoothstep(unit, 0.0, length(uv) - 0.1)), 1.0);
}`;

class Demo extends Scene
{
    constructor ()
    {
        super();

        // const backbuffer = 

        const wiggles = new FXShader({
            fragmentShader: wigglesFragmentShader,
            uniforms: {
                backbuffer: 1
            }
        });

        const world = new StaticWorld(this);

        const layer = new EffectLayer();

        wiggles.timeScale = 0.001;

        layer.shaders.push(wiggles);

        const rect = new Rectangle(400, 300, 512, 512);

        AddChildren(layer, rect);

        AddChildren(world, layer);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
