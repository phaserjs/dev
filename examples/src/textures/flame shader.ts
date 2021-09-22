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

const fragmentShader = `
precision mediump float;

uniform float time;
uniform vec2 resolution;

// FLAME MASK SHAPING
#define FLAME_SIZE 2.2
#define FLAME_WIDTH 1.3
#define DISPLACEMENT_STRENGTH 0.3
#define DISPLACEMENT_FREQUENCY 5.0
#define DISPLACEMENT_EXPONENT 1.5
#define DISPLACEMENT_SPEED 5.0
#define TEAR_EXPONENT 0.7
#define BASE_SHARPNESS 4.0

// NOISE
#define NOISE_SCALE 3.0
#define NOISE_SPEED -2.7
#define NOISE_GAIN 0.5
#define NOISE_MULT 0.35

// FLAME BLENDING
#define FALLOFF_MIN 0.2
#define FALLOFF_MAX 1.3
#define FALLOFF_EXPONENT 0.9

// COLOR
#define BACKGROUND_MIN 0.0
#define BACKGROUND_MAX 0.15
#define BACKGROUND_COLOR_MIN vec4(1.0, 0.0, 0.0, 1.0)
#define BACKGROUND_COLOR_MAX vec4(1.0, 0.3, 0.0, 1.0)
#define RIM_COLOR vec4(1.0, 0.9, 0.0, 1.0)

vec3 permute (vec3 x)
{ 
    return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise (vec2 v)
{
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;

    return 130.0 * dot(m, g);
}

void main (void)
{
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    float pixelWidth = abs(float(gl_FragCoord.x) * float(resolution.xy));
    
   	float aspect = resolution.x / resolution.y;
    uv.x *= aspect;
    vec2 p = uv - vec2(0.5 * aspect, 0.5);
    
    //  Shape our base flame mask. First we squish a circle and displace it, then we turn it into a teardrop shape.
    p *= FLAME_SIZE;
    p.x *= FLAME_WIDTH;
    
    float flameDisplacement = max(0.0, sin(time * DISPLACEMENT_SPEED + (p.y * DISPLACEMENT_FREQUENCY)) * DISPLACEMENT_STRENGTH * pow(uv.y - 0.1, DISPLACEMENT_EXPONENT));
    p.x += flameDisplacement;

    //  Teardrop shaping
    p.x += p.x / pow((1.0 - p.y), TEAR_EXPONENT);
    
    //  Create our base flame mask, it looks a bit like a spooky ghost
    float gradient = length(p);
    float base = 1.0 - pow(gradient, BASE_SHARPNESS);
    
	//  Create our noise mask, which we will use to create the flickering part of the flame
    float up0 = snoise((uv * NOISE_SCALE) + vec2(0.0, time * NOISE_SPEED)) * NOISE_MULT + NOISE_GAIN;
	float up1 = 0.5 + snoise((uv * NOISE_SCALE) + vec2(0.0, time * NOISE_SPEED)) * NOISE_MULT + NOISE_GAIN;
    
    //  Define a gradient that we can use to make the flame fall off at the top, and apply it to BOTH the flame mask and the noise together
    float flame = (base * up0 * up1);
    
    float falloff = smoothstep(FALLOFF_MIN, FALLOFF_MAX, pow(uv.y, FALLOFF_EXPONENT));
    flame = clamp(flame - falloff, -0.0, 1.0);
   
    //  Time to give it some color! we will do this with two masks, a background mask, and a rim light mask
    float background = smoothstep(BACKGROUND_MIN, BACKGROUND_MAX, flame);
    
    //  First we calculate our background color and multiply it by the background mask
    vec4 color = mix(BACKGROUND_COLOR_MIN, BACKGROUND_COLOR_MAX, uv.y) * background;
    
    vec3 dark = mix(vec3(0.0), vec3(1.0, 0.4, 0.0), smoothstep(0.25, flame, pixelWidth));
    vec3 light = mix(dark, vec3(1.0, 0.8, 0.0), smoothstep(0.7, flame, pixelWidth));
    
    //  Now we apply the rim light. We mix over our current color using the rim light mask
    color = mix(color, RIM_COLOR, vec4(light, 0.0));
  
	gl_FragColor = vec4(color.rgb, 1.0) * color.a;
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
        await LoadImageFile('bg', 'assets/checker.png');

        const world = new World(this);
        
        // AddChild(world, new Sprite(0, 0, 'bg').setOrigin(0, 0));
        // AddChild(world, new Sprite(512, 0, 'bg').setOrigin(0, 0));
        // AddChild(world, new Sprite(0, 512, 'bg').setOrigin(0, 0));
        // AddChild(world, new Sprite(512, 512, 'bg').setOrigin(0, 0));

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

            SetUniform(fx, 'time', performance.now() * 0.001);

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
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
