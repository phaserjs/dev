import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../phaser-genesis/src/display';
import { DrawShaderQuad } from '../../../../phaser-genesis/src/renderer/webgl1/draw/DrawShaderQuad';
import { Game } from '../../../../phaser-genesis/src/Game';
import { LoadImageFile } from '../../../../phaser-genesis/src/loader/files/LoadImageFile';
import { On } from '../../../../phaser-genesis/src/events/On';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Sprite } from '../../../../phaser-genesis/src/gameobjects';
import { TextureShader } from '../../../../phaser-genesis/src/renderer/webgl1/shaders/TextureShader';
import { World } from '../../../../phaser-genesis/src/world/World';

const fragmentShader = `
precision mediump float;

uniform vec2 resolution;

vec4 sphere (float r, float g, float b)
{
    float size = 30.0;

    vec2 pos = vec2(resolution.x / 2.0, resolution.y / 2.0);

    float dist = length(gl_FragCoord.xy - pos);

    float intensity = pow(size / dist, 2.0);

    return vec4(r, g, b, 1.0) * intensity;
}

void main ()
{
    vec4 color = sphere(1.0, 0.5, 0.25);

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
