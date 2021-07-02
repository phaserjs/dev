import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';
import { EffectLayer, Rectangle, Sprite } from '../../../../../phaser-genesis/src/gameobjects';

import { AddChildren } from '../../../../../phaser-genesis/src/display';
import { FXShader } from '../../../../../phaser-genesis/src/renderer/webgl1/shaders/FXShader';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { ImageFile } from '../../../../../phaser-genesis/src/loader/files';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { StaticWorld } from '../../../../../phaser-genesis/src/world/StaticWorld';

const fragmentShader = `
precision mediump float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uTexture;

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
    vec4 tcolor = texture2D(uTexture, vTextureCoord);

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
	gl_FragColor = vec4(tcolor.rgb * color, tcolor.a);
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
        const world = new StaticWorld(this);

        await ImageFile('girl', 'assets/amitie1.png').load();
        await ImageFile('lemming', 'assets/lemming.png').load();

        const flower = new FXShader({ fragmentShader, timeScale: 0.005 });

        const layer = new EffectLayer(flower);

        const ami = new Sprite(400, 300, 'girl');
        const lem = new Sprite(500, 500, 'lemming');

        AddChildren(layer, ami);

        AddChildren(world, layer, lem);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
