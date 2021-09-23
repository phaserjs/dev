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

// https://www.shadertoy.com/view/lsjcRt - blue zelda flame
// https://www.shadertoy.com/view/XsXSWS - fires (5 flames)
// https://www.shadertoy.com/view/Xd2BRc - cartoon flame
// https://www.shadertoy.com/view/3t2yWz - toon flame
// https://www.shadertoy.com/view/4tXXRn - flame in the wind
// https://www.shadertoy.com/view/7tXXDH - simplex flames (complex)
// https://www.shadertoy.com/view/4t33D2 - light flares
// https://www.shadertoy.com/view/tdj3W3 - curl noise
// https://www.shadertoy.com/view/ld2cW1 - light map?
// https://www.shadertoy.com/view/Wt23D3 - 3d plasma cube :)
// https://www.shadertoy.com/view/lt33RH - pixel implode / explode effect

const fragmentShaderCircle = `
precision mediump float;

uniform float time;
uniform vec2 resolution;

float circle (in vec2 uv, in float radius)
{
    vec2 dist = uv - vec2(0.5);

	return 1.0 - smoothstep(radius - (radius * 0.01), radius + (radius * 0.01), dot(dist, dist) * 4.0);
}

void main (void)
{
	vec2 uv = gl_FragCoord.xy / resolution;

    float pct = distance(uv, vec2(0.5));

    vec3 color = vec3(circle(uv, 0.8));

    gl_FragColor = vec4(color, 1.0);
}`;

const fragmentShader = `
precision mediump float;

uniform vec2 resolution;

void main ()
{
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    vec4 red = vec4(1.0, 0.0, 0.0, 1.0);
    vec4 green = vec4(0.0, 0.0, 0.0, 0.0);

    vec4 color = mix(red, green, uv.x);

    gl_FragColor = vec4(color.rgb, 1.0) * color.a;
}
`;

const fragmentShaderPlot = `
precision mediump float;

#define PI 3.14159265359

uniform vec2 resolution;

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.04, pct, st.y) -
          smoothstep( pct, pct+0.04, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    vec4 color = vec4(0.0);

    vec3 pct = vec3(st.x);

    pct.r = smoothstep(0.0,1.0, st.x);
    pct.g = sin(st.x*PI);
    pct.b = pow(st.x,0.5);

    // Plot transition lines for each channel
    color = mix(color,vec4(1.0,0.0,0.0,1.0),plot(st,pct.r));
    color = mix(color,vec4(0.0,1.0,0.0,1.0),plot(st,pct.g));
    color = mix(color,vec4(0.0,0.0,1.0,1.0),plot(st,pct.b));

    gl_FragColor = vec4(color.rgb, 1.0) * color.a;
}
`;

const fragmentShaderFire = `
/*
 * Original shader from:https://www.shadertoy.com/view/MdX3zr
 */

precision mediump float;

// glslsandbox uniforms
uniform float time;
uniform vec2 resolution;

// shadertoy emulation
#define iTime time
#define iResolution vec3(resolution ,900000000000.0)

// --------[ Original ShaderToy begins here ]---------- //
float noise(vec3 p) //Thx to Las^Mercury
{
	vec3 i = floor(p);
	vec4 a = dot(i, vec3(1., 57., 21.)) + vec4(0., 57., 21., 78.);
	vec3 f = cos((p-i)*acos(-1.))*(-.5)+.5;
	a = mix(sin(cos(a)*a),sin(cos(1.+a)*(1.+a)), f.x);
	a.xy = mix(a.xz, a.yw, f.y);
	return mix(a.x, a.y, f.z);
}

float sphere(vec3 p, vec4 spr)
{
	return length(spr.xyz-p) - spr.w;
}

float flame(vec3 p)
{
	float d = sphere(p*vec3(1.,.5,1.), vec4(.0,-1.,.0,1.));
	return d + (noise(p+vec3(.0,iTime*2.,.0)) + noise(p*3.)*.5)*.25*(p.y) ;
}

float scene(vec3 p)
{
	return min(100.-length(p) , abs(flame(p)) );
}

vec4 raymarch(vec3 org, vec3 dir)
{
	float d = 0.0, glow = 0.0, eps = 0.02;
	vec3  p = org;
	bool glowed = false;
    
	for(int i=0; i<64; i++)
	{
		d = scene(p) + eps;
		p += d * dir;
		if( d>eps )
		{
			if(flame(p) < .0)
				glowed=true;
			if(glowed)
       			glow = float(i)/64.;
		}
	}
	return vec4(p,glow);
}

void main (void)
{
	vec2 v = -1.0 + 2.0 * gl_FragCoord.xy / iResolution.xy;
	v.x *= iResolution.x / iResolution.y;
	
	vec3 org = vec3(0., -2., 4.);
	vec3 dir = normalize(vec3(v.x*1.6, -v.y, -1.5));
	
	vec4 p = raymarch(org, dir);
	float glow = p.w;
	
	vec4 col = mix(vec4(1.,.5,.1,1.), vec4(0.1,.5,1.,1.), p.y*.02+.4);
	
	gl_FragColor = mix(vec4(0.), col, pow(glow*2.,4.));
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
            fragmentShader: fragmentShaderFire,
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
