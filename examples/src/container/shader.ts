import { AddChild, AddChildren, ConsoleTreeChildren } from '../../../../phaser-genesis/src/display/';
import { BackgroundColor, GlobalVar, Parent, Scenes, Size, WebGL } from '../../../../phaser-genesis/src/config';
import { Container, Sprite } from '../../../../phaser-genesis/src/gameobjects/';

import { Game } from '../../../../phaser-genesis/src/Game';
import { IRenderPass } from '../../../../phaser-genesis/src/renderer/webgl1/renderpass/IRenderPass';
import { ImageFile } from '../../../../phaser-genesis/src/loader/files/ImageFile';
import { Loader } from '../../../../phaser-genesis/src/loader/Loader';
import { On } from '../../../../phaser-genesis/src/events';
import { Scene } from '../../../../phaser-genesis/src/scenes/Scene';
import { Shader } from '../../../../phaser-genesis/src/renderer/webgl1/shaders/Shader';
import { StaticWorld } from '../../../../phaser-genesis/src/world/StaticWorld';

const verticalBarsFragmentShader = `
#define SHADER_NAME BARS_FRAG

precision mediump float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uResolution;

#define PI 0.01

void main (void)
{
    vec4 color = texture2D(uTexture, vTextureCoord);

    vec2 p = (gl_FragCoord.xy / uResolution.xy) - 0.5;

    float sx = 0.4 * sin(25.0 * p.y - (uTime * 0.001) * 2.0);

    float dy = 2.0 / (5.0 * abs(p.y - sx));

    gl_FragColor = color * vec4((p.x + 0.5) * dy, 0.5 * dy, dy - 1.65, 0.5);
}`;

const plasmaFragmentShader = `
precision mediump float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uResolution;

const float PI = 3.14159265;
float ptime = uTime * 0.0001;
float alpha = 1.0;
float size = 0.03;
float redShift = 0.5;
float greenShift = 0.5;
float blueShift = 0.9;

void main (void)
{
    vec4 tcolor = texture2D(uTexture, vTextureCoord);

    float color1, color2, color;

    color1 = (sin(dot(gl_FragCoord.xy, vec2(sin(ptime * 3.0), cos(ptime * 3.0))) * 0.02 + ptime * 3.0) + 1.0) / 2.0;
    vec2 center = vec2(640.0 / 2.0, 360.0 / 2.0) + vec2(640.0 / 2.0 * sin(-ptime * 3.0), 360.0 / 2.0 * cos(-ptime * 3.0));
    color2 = (cos(length(gl_FragCoord.xy - center) * size) + 1.0) / 2.0;
    color = (color1 + color2) / 2.0;

    float red = (cos(PI * color / redShift + ptime * 3.0) + 1.0) / 2.0;
    float green = (sin(PI * color / greenShift + ptime * 3.0) + 1.0) / 2.0;
    float blue = (sin(PI * color / blueShift + ptime * 3.0) + 1.0) / 2.0;

    gl_FragColor = tcolor * vec4(red, green, blue, alpha);
}`;

const redFragmentShader = `
precision highp float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;

void main (void)
{
    vec4 color = texture2D(uTexture, vTextureCoord);

    gl_FragColor = color * vec4(1.0, 0.0, 0.0, 1.0);
}`;

const sineWaveFragmentShader = `
#define SHADER_NAME SINEWAVE_FRAG

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

    uv.y += (sin((uv.x + (uTime * 0.0005)) * 10.0) * 0.1) + (sin((uv.x + (uTime * 0.0002)) * 32.0) * 0.01);

    gl_FragColor = texture2D(uTexture, uv);
}`;

class SineShader extends Shader
{
    constructor ()
    {
        super({ fragmentShader: plasmaFragmentShader });
    }

    updateUniforms (renderPass: IRenderPass): void
    {
        this.uniforms.set('uTime', performance.now());
        this.uniforms.set('uResolution', [ 64, 64 ]);
    }
}

class Demo extends Scene
{
    world: StaticWorld;

    constructor ()
    {
        super();

        const loader = new Loader();

        loader.setPath('assets/');

        // loader.add(ImageFile('256', 'f-texture.png'));
        loader.add(ImageFile('64', 'box-item-boxed.png'));

        loader.start().then(() => this.create());
    }

    create ()
    {
        const sineShader = new SineShader();

        console.log(sineShader);

        const world = new StaticWorld(this);

        const parent = new Container(400, 300);

        // const sprite1 = new Sprite(0, 0, '256');

        const sprite2 = new Sprite(0, 0, '64');
        const sprite3 = new Sprite(-120, 90, '64');
        const sprite4 = new Sprite(120, 90, '64');
        const sprite5 = new Sprite(-120, -90, '64');
        const sprite6 = new Sprite(120, -90, '64');

        AddChildren(parent, sprite2, sprite3, sprite4, sprite5, sprite6);

        // AddChildren(parent, sprite1, sprite2);

        AddChild(world, parent);

        parent.shader = sineShader;

        On(world, 'update', () =>
        {
            parent.rotation += 0.01;
        });
    }
}

new Game(
    WebGL(),
    GlobalVar('Phaser4'),
    Size(800, 600),
    Parent('gameParent'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
