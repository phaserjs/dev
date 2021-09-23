import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { DrawShaderQuad } from '../../../../phaser-genesis/src/renderer/webgl1/draw/DrawShaderQuad';
import { Game } from '../../../../phaser-genesis/src/Game';
import { LoadImageFile } from '../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { On } from '../../../../phaser-genesis/src/events/On';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { SetUniform } from '../../../../phaser-genesis/src/renderer/webgl1/shaders/SetUniform';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';
import { TextureShader } from '../../../../phaser-genesis/src/renderer/webgl1/shaders/TextureShader';
import { World } from '../../../../phaser-genesis/src/world/World';

const part = `
float f = 1./6.; //  NB: 1./2. crash WebGL driver on Linux/chrome ! 

void mainImage( out vec4 O, vec2 U )
{
    U = abs(U+U - (O.xy=iResolution.xy)) / O.y;
    O += 1. - 2.*pow((  pow(2.*U.x, f) 
                      + pow(U.x + U.y*1.7, f) 
                      + pow(abs(U.x - U.y*1.7), f)
                     )/3., 1./f) -O;
}



vec3 rgb2hsv(vec3 c)
{
    vec4 k = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, k.wz), vec4(c.gb, k.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c)
{
    vec4 k = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + k.xyz) * 6.0 - k.www);
    return c.z * mix(k.xxx, clamp(p - k.xxx, 0.0, 1.0), c.y);
}

float saturate(float x)
{
	return clamp(x, 0.,1.);
}

vec2 hash21(float p) //1 in 2 out hash function
{
	vec3 p3 = fract(vec3(p) * vec3(.1031, .1030, .0973));
	p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.xx+p3.yz)*p3.zy) * 2. - 1.;

}

vec2 rotateUV(vec2 uv, float rotation)
{
    return vec2(
        cos(rotation) * uv.x + sin(rotation) * uv.y,
        cos(rotation) * uv.y - sin(rotation) * uv.x
    );
}

vec3 drawflare(vec2 p, float intensity, float rnd, float speed, int id)
{
    float flarehueoffset = (1. / 32.) * float(id) * 0.1;
    float lingrad = distance(vec2(0.), p); //linear radial gradient
    float expgrad = 1. / exp(lingrad * (fract(rnd) * 0.66 + 0.33)); //exponential radial gradient
    vec3 colgrad = hsv2rgb(vec3( fract( (expgrad * 8.) + (speed) + flarehueoffset), pow(1.-abs(expgrad*2.-1.), 0.45), 20.0 * expgrad * intensity)); //rainbow spectrum effect
    float blades = length(p * sin(3.0 * atan(p.x, p.y))); //draw 6 blades
    float comp = pow(1.-saturate(blades), 12.); // sharpen effect
    comp += saturate(expgrad-0.9) * 3.;
    comp = pow(comp * expgrad, 8. + (1.-intensity) * 5.); // compose and sharpen effect
    return vec3(comp) * colgrad; // apply color
}

float dist(vec3 a, vec3 b) { return abs(a.x - b.x) + abs(a.y - b.y) + abs(a.z - b.z); }

vec3 saturate(vec3 x)
{
    return clamp(x, vec3(0.0), vec3(1.0));
}

`;

const fragmentShader = `
precision mediump float;

uniform vec2 resolution;

const vec2 light_dir = vec2(0.1, 1.0);
const float PI = 3.1415926535897932384626433832795;

float udLine (vec2 p, vec2 a, vec2 b)
{
	vec2 pa = p - a, ba = b - a;

    return length(pa - ba * dot(pa, ba) / dot(ba, ba));
}

float glyph_dist (in vec2 pt)
{
	float rad = 1.0 - length(pt);

    //  rad + 1.0 = darker
    return rad;
}

vec2 gradient (vec2 pt, float dist)
{
	float dfdu = glyph_dist(pt + vec2(1.01, 0.0)) - dist / 1.01;
	float dfdv = glyph_dist(pt + vec2(0.0, 0.01)) - dist / 1.01;

    return normalize(vec2(dfdu, -dfdv));
}

float bevelShade (vec2 pt)
{
	return clamp(1.0 * dot(gradient(pt, glyph_dist(pt)), light_dir) * 0.5 + 0.5, 0.0, 1.0);
}

void main ()
{
	vec2 uv = gl_FragCoord.xy / resolution.xy;

    float aspect = resolution.x / resolution.y;

    vec2 pt = (uv * 2.0 - 1.0) * vec2(aspect, 1.0) * 1.0;

    vec2 glintPos = vec2(0.0, 0.01);

    float dist = distance(pt, glintPos);

    float bevelMul = 1.8760002;
    float lineMul = 1.06;

    //  change these 2 to modify flare shape
    float line1Mul = -1.0;
    float line2Mul = -1.0;

    float bevelExp = 0.772;
    float lineExp = 4.0;
    float glareMul = 0.95;

    float line1 = udLine(pt, glintPos, glintPos + vec2(1, +1)) * line1Mul;
    float line2 = udLine(pt, glintPos, glintPos + vec2(1, -1)) * line2Mul;

    float bevel = bevelShade(glintPos) * bevelMul;

    float lines = 1.0 + (line1 + line2) * lineMul;

    float glare = pow(bevel, bevelExp) * pow(lines, lineExp);

    vec4 color = vec4(0) + glare * glareMul;

	gl_FragColor = vec4(color.rgb, 1.0) * color.a;
}
`;

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await LoadImageFile('bg', 'assets/checker.png');

        const world = new World(this);
        
        AddChild(world, new Sprite(0, 0, 'bg').setOrigin(0, 0).setAlpha(0.1));
        AddChild(world, new Sprite(512, 0, 'bg').setOrigin(0, 0).setAlpha(0.1));
        AddChild(world, new Sprite(0, 512, 'bg').setOrigin(0, 0).setAlpha(0.1));
        AddChild(world, new Sprite(512, 512, 'bg').setOrigin(0, 0).setAlpha(0.1));

        const fx = new TextureShader({
            fragmentShader,
            width: 256,
            height: 256,
            uniforms: {
                time: 0,
                resolution: [ 256, 256 ]
            }
        });

        const sprite1 = new Sprite(200, 200, fx.texture);
        const sprite2 = new Sprite(400, 300, fx.texture);
        const sprite3 = new Sprite(600, 400, fx.texture);

        On(world, 'render', (renderPass) => {

            DrawShaderQuad(renderPass, fx);

        });

        AddChild(world, sprite1);
        AddChild(world, sprite2);
        AddChild(world, sprite3);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x000000),
    Scenes(Demo)
);
