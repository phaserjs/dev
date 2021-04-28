import { AddChild, AddChildren } from '../src/display';
import { BackgroundColor, Parent, Scenes, SetWebGL, Size } from '../src/config';
import { EffectLayer, Layer, Sprite } from '../src/gameobjects';
import { FXShader, QuadShader } from '../src/renderer/webgl1/shaders';

import { Game } from '../src/Game';
import { ImageFile } from '../src/loader/files/ImageFile';
import { Loader } from '../src/loader/Loader';
import { On } from '../src/events';
import { Scene } from '../src/scenes/Scene';
import { Shader } from '../src/renderer/webgl1/shaders/Shader';
import { StaticWorld } from '../src/world/StaticWorld';

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

const sineWaveFragmentShader = `
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
    uv.y += (sin((uv.x + (uTime * 0.0005)) * 5.0) * 0.1) + (sin((uv.x + (uTime * 0.0002)) * 32.0) * 0.01);
    gl_FragColor = texture2D(uTexture, uv);
}`;

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        const loader = new Loader();

        loader.setPath('/phaser4-examples/public/assets/');
        // loader.setPath('/examples/public/assets/');

        loader.add(ImageFile('bg', 'checker.png'));
        loader.add(ImageFile('logo', 'logo.png'));

        loader.start().then(() => {

            const sine = new FXShader({
                fragmentShader: sineWaveFragmentShader
            });

            const plasma = new FXShader({
                fragmentShader: plasmaFragmentShader
            });

            const bg = new Sprite(400, 300, 'bg');

            const layer = new EffectLayer(sine, plasma);

            const logo = new Sprite(400, 300, 'logo');

            AddChildren(layer, logo);

            AddChildren(world, bg, layer);

        });
    }
}

export default function (): void
{
    new Game(
        SetWebGL(),
        Size(800, 600),
        Parent('gameParent'),
        BackgroundColor(0x2d2d2d),
        Scenes(Demo)
    );
}
