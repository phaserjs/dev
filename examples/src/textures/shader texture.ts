import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { DrawShaderQuad } from '../../../../phaser-genesis/src/renderer/webgl1/draw/DrawShaderQuad';
import { Game } from '../../../../phaser-genesis/src/Game';
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

float circle(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(dist,dist)*4.0);
}

void main (void)
{
	vec2 st = gl_FragCoord.xy / resolution;

    float pct = 0.0;

    // a. The DISTANCE from the pixel to the center
    pct = distance(st, vec2(0.5));

    // b. The LENGTH of the vector from the pixel to the center
    // vec2 toCenter = vec2(0.5)-st;
    // pct = length(toCenter);

    // c. The SQUARE ROOT of the vector from the pixel to the center
    // vec2 tC = vec2(0.5)-st;
    // pct = sqrt(tC.x*tC.x+tC.y*tC.y);

    // vec3 color = vec3(pct);

    vec3 color = vec3(circle(st, 0.8));

    // float alpha = 1.0;

    gl_FragColor = vec4(color, pct);
}`;

class Demo extends Scene
{
    constructor ()
    {
        super();

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
