import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';
import { EffectLayer, Sprite } from '../../../../../phaser-genesis/src/gameobjects';

import { AddChildren } from '../../../../../phaser-genesis/src/display';
import { FXShader } from '../../../../../phaser-genesis/src/renderer/webgl1/shaders/FXShader';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../../phaser-genesis/src/loader/Loader';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { Shader } from '../../../../../phaser-genesis/src/renderer/webgl1/shaders/Shader';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';

const blurXFragmentShader = `
precision mediump float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;

void main (void)
{
    vec4 sum = vec4(0.0);
    float blur = 0.001953125;

    sum += texture2D(uTexture, vec2(vTextureCoord.x - 4.0 * blur, vTextureCoord.y)) * 0.05;
    sum += texture2D(uTexture, vec2(vTextureCoord.x - 3.0 * blur, vTextureCoord.y)) * 0.09;
    sum += texture2D(uTexture, vec2(vTextureCoord.x - 2.0 * blur, vTextureCoord.y)) * 0.12;
    sum += texture2D(uTexture, vec2(vTextureCoord.x - blur, vTextureCoord.y)) * 0.15;
    sum += texture2D(uTexture, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;
    sum += texture2D(uTexture, vec2(vTextureCoord.x + blur, vTextureCoord.y)) * 0.15;
    sum += texture2D(uTexture, vec2(vTextureCoord.x + 2.0 * blur, vTextureCoord.y)) * 0.12;
    sum += texture2D(uTexture, vec2(vTextureCoord.x + 3.0 * blur, vTextureCoord.y)) * 0.09;
    sum += texture2D(uTexture, vec2(vTextureCoord.x + 4.0 * blur, vTextureCoord.y)) * 0.05;

    gl_FragColor = sum;
}`;

const blurYFragmentShader = `
precision mediump float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;

void main (void)
{
    vec4 sum = vec4(0.0);
    float blur = 0.001953125;

    sum += texture2D(uTexture, vec2(vTextureCoord.x, vTextureCoord.y - 4.0 * blur)) * 0.05;
    sum += texture2D(uTexture, vec2(vTextureCoord.x, vTextureCoord.y - 3.0 * blur)) * 0.09;
    sum += texture2D(uTexture, vec2(vTextureCoord.x, vTextureCoord.y - 2.0 * blur)) * 0.12;
    sum += texture2D(uTexture, vec2(vTextureCoord.x, vTextureCoord.y - blur)) * 0.15;
    sum += texture2D(uTexture, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;
    sum += texture2D(uTexture, vec2(vTextureCoord.x, vTextureCoord.y + blur)) * 0.15;
    sum += texture2D(uTexture, vec2(vTextureCoord.x, vTextureCoord.y + 2.0 * blur)) * 0.12;
    sum += texture2D(uTexture, vec2(vTextureCoord.x, vTextureCoord.y + 3.0 * blur)) * 0.09;
    sum += texture2D(uTexture, vec2(vTextureCoord.x, vTextureCoord.y + 4.0 * blur)) * 0.05;

    gl_FragColor = sum;
}`;

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.preload();
    }

    async preload ()
    {
        const loader = new Loader();

        loader.add(
            ImageFile('background', 'assets/farm-background.png'),
            ImageFile('ayu', 'assets/ayu.png'),
            ImageFile('logo', 'assets/logo.png'),
            ImageFile('rocket', 'assets/rocket.png'),
            ImageFile('farm', 'assets/farm-logo.png'),
            ImageFile('star', 'assets/star.png'),
            ImageFile('bubble', 'assets/bubble256.png')
        );

        await loader.start();

        this.create();
    }

    create ()
    {
        const world = new StaticWorld(this);

        const blurX = new Shader({ fragmentShader: blurXFragmentShader, renderToFramebuffer: true });
        const blurY = new Shader({ fragmentShader: blurYFragmentShader, renderToFramebuffer: true });

        const layer = new EffectLayer();

        layer.shaders.push(blurX, blurY);

        const bg = new Sprite(400, 300, 'background');
        const logo = new Sprite(200, 300, 'logo');
        const ayu = new Sprite(600, 300, 'ayu');
        const farm = new Sprite(200, 150, 'farm');
        const rocket = new Sprite(150, 500, 'rocket');
        const bubble = new Sprite(400, 450, 'bubble');
        const star = new Sprite(650, 500, 'star');

        AddChildren(layer, ayu, logo, rocket, farm, bubble);

        AddChildren(world, bg, layer, star);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
