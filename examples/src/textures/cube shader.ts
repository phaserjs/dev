import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { Between } from '../../../../phaser-genesis/src/math/Between';
import { CursorKeyCameraControls } from '../../../../phaser-genesis/src/camera/controls/CursorKeyCameraControls';
import { DrawShaderQuad } from '../../../../phaser-genesis/src/renderer/webgl1/draw/DrawShaderQuad';
import { Game } from '../../../../phaser-genesis/src/Game';
import { LoadImageFile } from '../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { On } from '../../../../phaser-genesis/src/events/On';
import { ParallaxLayer } from '../../../../phaser-genesis/src/gameobjects/parallaxlayer/ParallaxLayer';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { SetUniform } from '../../../../phaser-genesis/src/renderer/webgl1/shaders/SetUniform';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';
import { TextureShader } from '../../../../phaser-genesis/src/renderer/webgl1/shaders/TextureShader';
import { World } from '../../../../phaser-genesis/src/world/World';

const fragmentShader = `
precision mediump float;

// Plasma Cube by adelciotto

uniform vec2 resolution;
uniform float time;

const float PI = 3.1415926535; 
const float MIN_DIST = 0.0; 
const float MAX_DIST = 100.0; 
const float EPSILON = 0.001;
const float GAMMA_CORRECTION = 0.4545; 
const int MAX_MARCHING_STEPS = 48;

float t = 0.0; 

mat2 rotate(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, s, - s, c);
}

float cubeSDF(vec3 p) {
    p.xz *= rotate(t);
    p.yx *= rotate(t * 0.6);
    p.zx *= rotate(t * 0.4);
    // p.y += sin(t * 0.2);
    vec3 d = abs(p) - vec3(1.0);
    float dist = length(max(d, 0.0)) + min(max(d.x, max(d.y, d.z)), 0.0);
    return dist - 0.1;
}

vec4 estimateNormal(vec3 p) {
    return normalize(
        vec4(
            cubeSDF(vec3(p.x + EPSILON, p.yz)) - cubeSDF(vec3(p.x - EPSILON, p.yz)),
            cubeSDF(vec3(p.x, p.y + EPSILON, p.z)) - cubeSDF(vec3(p.x, p.y - EPSILON, p.z)),
            cubeSDF(vec3(p.xy, p.z + EPSILON)) - cubeSDF(vec3(p.xy, p.z - EPSILON)),
            0.0
        )
    );
}

// modified plasma effect from https://www.bidouille.org/prog/plasma
vec4 plasma(vec3 p, float scale) {
    p *= scale;
    
    float time = t * 0.3;
    float v1 = sin(p.x + time);
    float v2 = sin(p.y + time);
    float v3 = sin(p.z + time);
    float v4 = sin(p.x + p.y + p.z + time);
    float v5 = sin(length(p) + 1.7 * time);
    float v = v1 + v2 + v3 + v4 + v5;

    //  uncomment for single shade cube
    // v = time;
    
    v *= 2.0;
    vec4 col = vec4(sin(v * PI), sin(v * PI + 2.0 * PI / 3.0), sin(v * PI + 4.0 * PI / 3.0), 1.0);
    return col * 0.5 + 0.5;
}

void main (void)
{
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 uv = vec2(fragCoord - 0.5 * resolution.xy);
    uv = 2.0 * uv.xy / resolution.y;
    
    // t = time;
    t = time + 0.25 * sin(uv.x * 1.76 + uv.y + time);
    
    vec3 camPos = vec3(0, 0, -5.25);
    vec3 at = vec3(0, 0, 0);
    vec3 camForward = normalize(at - camPos);
    vec3 camRight = normalize(cross(vec3(0.0, 1.0, 0.0), camForward));
    vec3 camUp = normalize(cross(camForward, camRight));
    vec3 rayDir = normalize(uv.x * camRight + uv.y * camUp + camForward * 2.0);
    
    float depth = MIN_DIST;
    vec4 col = vec4(0.0);
    for(int i = 0; i < MAX_MARCHING_STEPS; i ++ ) {
        vec3 p = camPos + depth * rayDir;
        float dist = cubeSDF(p);
        if (dist < EPSILON) {
            vec4 light = normalize(vec4(sin(t) * 1.0, cos(t * 0.5) + 0.5, - 0.5, 1.0));
            vec4 norm = estimateNormal(p);
            vec4 directional = vec4(1.80, 1.27, 0.99, 0.5) * max(dot(norm, light), 0.0);
            vec4 ambient = vec4(0.02, 0.02, 0.02, 1.0);
            vec4 diffuse = plasma(p, 1.0) * (directional + ambient);
            col = diffuse;
            break;
        }
        depth += dist;
        if (depth >= MAX_DIST) {
            break;
        }
    }
    
    col = pow(col, vec4(GAMMA_CORRECTION, GAMMA_CORRECTION, GAMMA_CORRECTION, 1.0));

    gl_FragColor = vec4(smoothstep(0.0, 1.0, col.rgb), 1.0) * col.a;
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
        
        const fx = new TextureShader({
            fragmentShader,
            width: 256,
            height: 256,
            uniforms: {
                time: 0,
                resolution: [ 256, 256 ]
            }
        });

        new CursorKeyCameraControls(world, 16, 16);

        let sx = 1.0;
        let sy = 1.0;

        for (let i = 0; i < 8; i++)
        {
            sx -= 0.1;
            sy -= 0.1;

            const layer = AddChild(world, new ParallaxLayer(world.camera, sx, sy));

            for (let i = 0; i < 256; i++)
            {
                const x = Between(-4000, 4000);
                const y = Between(-4000, 4000);
    
                AddChild(layer, new Sprite(x, y, fx.texture).setScale(1.5 - sx));
            }
        }

        On(world, 'render', (renderPass) => {

            SetUniform(fx, 'time', performance.now() * 0.001);

            DrawShaderQuad(renderPass, fx);

        });
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x161616),
    Scenes(Demo)
);
