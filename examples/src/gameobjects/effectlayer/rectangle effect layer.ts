import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';
import { EffectLayer, Rectangle } from '../../../../../phaser-genesis/src/gameobjects';

import { AddChildren } from '../../../../../phaser-genesis/src/display';
import { FXShader } from '../../../../../phaser-genesis/src/renderer/webgl1/shaders/FXShader';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';

const cloudsFragmentShader = `
#define SHADER_NAME CLOUDS_FRAG

/*
 * Original shader from: https://www.shadertoy.com/view/MtjGRK
 */

precision mediump float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uResolution;

#define PI 3.14159265358979323

//Random
float rand(vec2 uv)
{
    float dt = dot(uv, vec2(12.9898, 78.233));
	return fract(sin(mod(dt, PI / 2.0)) * 43758.5453);
}

//Clouds from (https://www.shadertoy.com/view/MlS3z1)
const int iter = 8;

float turbulence(vec2 fragCoord, float octave, int id)
{
    float col = 0.0;
    vec2 xy;
    vec2 frac;
    vec2 tmp1;
    vec2 tmp2;
    float i2;
    float amp;
    float maxOct = octave;
    float time = uTime / 1000.0;
    for (int i = 0; i < iter; i++)
    {
        amp = maxOct / octave;
        i2 = float(i);
        xy = id == 1 || id == 4? (fragCoord + 50.0 * float(id) * time / (4.0 + i2)) / octave : fragCoord / octave;
        frac = fract(xy);
        tmp1 = mod(floor(xy) + uResolution.xy, uResolution.xy);
        tmp2 = mod(tmp1 + uResolution.xy - 1.0, uResolution.xy);
        col += frac.x * frac.y * rand(tmp1) / amp;
        col += frac.x * (1.0 - frac.y) * rand(vec2(tmp1.x, tmp2.y)) / amp;
        col += (1.0 - frac.x) * frac.y * rand(vec2(tmp2.x, tmp1.y)) / amp;
        col += (1.0 - frac.x) * (1.0 - frac.y) * rand(tmp2) / amp;
        octave /= 2.0;
    }
    return (col);
}
//____________________________________________________

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / uResolution.xy;

    vec3 sky = clamp(vec3(0.2, sin(uv.y), 1.0) + 0.3, 0.0, 1.0);

    vec4 color = texture2D(uTexture, vTextureCoord);

    // vec4 skyandtexture = mix(sky, color);

    float cloud1 = turbulence(fragCoord, 128.0, 1);
    float cloud2 = turbulence(fragCoord + 2000.0, 128.0, 1);
    float cloudss = clamp(pow(mix(cloud1, cloud2, 0.5), 30.0) / 9.0, 0.0, 1.0);

	// fragColor = sky + color + vec4(cloudss, 1.0);

    fragColor = color * vec4(sky + cloudss, 1.0);
}

void main(void)
{
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

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

    // Represents the v/y coord(0 to 1) that will not sway.
    float fixedBasePosY = 0.0;

    // Configs for you to get the sway just right.
    float speed = 3.0;
    float verticleDensity = 6.0;
    float swayIntensity = 0.2;

    // Putting it all together.
    float offsetX = sin(uv.y * verticleDensity + (uTime * 0.001) * speed) * swayIntensity;

    // Offsettin the u/x coord.
    uv.x += offsetX * (uv.y - fixedBasePosY);

    gl_FragColor = texture2D(uTexture, uv);
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

const flowerFragmentShader = `
precision mediump float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform float uTime;
uniform vec2 uResolution;

vec2 rotate(vec2 v, float a) {
	float s = sin(a);
	float c = cos(a);
	mat2 m = mat2(c, -s, s, c);
	return m * v;
}

float tw()
{
	return sin(uTime) * 0.5 + 0.5;
}

void main( void ) {
    // vec4 tcolor = texture2D(uTexture, vTextureCoord);

    vec2 uv = gl_FragCoord.xy / uResolution.y * 2.;
	uv.y = uv.y - 0.5;
	uv.x = uv.x - 1.0 - sin(uTime/4.0);
	uv = rotate(uv, uTime * 0.5) * length(uv)/3.;
	uv = 0.3 * uv * length(uv +cos(uTime*uv.x*sin(uv.y)) + 2.0 * tw());
	uv = floor(uv * 20.) / 20.0 + tw();
	
	vec3 color;
	float t = uv.x * 120.0 + 45.0 * uTime;
	for (int i = 0; i < 3; i++) {
		float d = sin(radians(t)) * 0.5 + 0.5;
		color[i] = d;
		t -= 120.;
	}
	gl_FragColor = vec4(color, 1);
}`;

class Demo extends Scene
{
    constructor ()
    {
        super();

        const plasma = new FXShader({ fragmentShader: plasmaFragmentShader, renderToFramebuffer: true });
        const sine = new FXShader({ fragmentShader: sineWaveFragmentShader, renderToFramebuffer: true });
        const clouds = new FXShader({ fragmentShader: cloudsFragmentShader, renderToFramebuffer: true });
        // const flower = new FXShader({ fragmentShader: flowerFragmentShader, renderToFramebuffer: true });

        const world = new StaticWorld(this);

        const layer = new EffectLayer();

        // layer.shaders.push(flower);
        layer.shaders.push(plasma);
        layer.shaders.push(sine);
        layer.shaders.push(clouds);

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
