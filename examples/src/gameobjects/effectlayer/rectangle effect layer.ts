import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';
import { EffectLayer, Layer, Rectangle, RenderLayer, Sprite } from '../../../../../phaser-genesis/src/gameobjects';

import { AddChildren } from '../../../../../phaser-genesis/src/display';
import { FXShader } from '../../../../../phaser-genesis/src/renderer/webgl1/shaders/FXShader';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { On } from '../../../../../phaser-genesis/src/events';
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

const dotsFragmentShader = `
precision mediump float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;

uniform float time;
uniform vec2 resolution;

vec2 rotate(vec2 v, float a)
{
	float s = sin(a);
	float c = cos(a);
	mat2 m = mat2(c, -s, s, c);
	return m * v;
}

float tw()
{
	return sin(time) * 0.25 + 1.25;
}

float circle(vec2 pt, float radius)
{
	return step(length(pt), radius + sin(pt.x * radius * 44.*tw()) * cos(pt.y * radius *44.*tw()));
}

void main( void )
{
    vec4 tcolor = texture2D(uTexture, vTextureCoord);

    vec2 uv = (gl_FragCoord.xy * 2. - resolution) / resolution.y; //* mix(0.067, 3.0, tw());

	vec3 color;
	float t = uv.x * 72. + time * 50. + tw() * 1000.;
	for (int i = 0; i < 3; i++) {
		float d = abs(uv.y - sin(radians(t)) * .3 * float(i) * sin(time));
		color[i] = .05 / (d * d);
		t += 120.;
	}
	uv = rotate(uv, time*1.0);
	color *= circle(uv, 0.45);
	
	gl_FragColor = vec4(tcolor.rgb * color, tcolor.a);
}`;

const starsFragmentShader = `
#ifdef GL_ES
precision highp float;
#endif
 
uniform float time;
uniform vec2 resolution;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;

#define mouse vec2(sin(time)/48., cos(time)/48.)
#define iterations 14
#define formuparam2 0.79
 
#define volsteps 5
#define stepsize 0.390
 
#define zoom 0.900
#define tile   0.850
#define speed2  100.0 
#define brightness 0.003
#define darkmatter 0.400
#define distfading 0.560
#define saturation 0.800


#define transverseSpeed zoom*2.0
#define cloud 0.11 

 
float triangle(float x, float a) { 
	float output2 = 2.0*abs(  2.0*  ( (x/a) - floor( (x/a) + 0.5) ) ) - 1.0;
	return output2;
}
 
float field(in vec3 p) {	
	float strength = 7. + .03 * log(1.e-6 + fract(sin(time) * 4373.11));
	float accum = 0.;
	float prev = 0.;
	float tw = 0.;	

	for (int i = 0; i < 6; ++i) {
		float mag = dot(p, p);
		p = abs(p) / mag + vec3(-.5, -.8 + 0.1*sin(time*0.7 + 2.0), -1.1+0.3*cos(time*0.3));
		float w = exp(-float(i) / 7.);
		accum += w * exp(-strength * pow(abs(mag - prev), 2.3));
		tw += w;
		prev = mag;
	}
	return max(0., 5. * accum / tw - .7);
}



void main() {   
     	vec2 uv2 = 2. * gl_FragCoord.xy / vec2(512) - 1.;
	vec2 uvs = uv2 * vec2(512)  / 512.;
	
	float time2 = time;               
        float speed = speed2;
        speed = .01 * cos(time2*0.02 + 3.1415926/4.0);          
		
    	float formuparam = formuparam2;
	
    		
	vec2 uv = uvs;		       
	
	float a_xz = 0.9;
	float a_yz = -.6;
	float a_xy = 0.9 + time*0.08;	
	
	mat2 rot_xz = mat2(cos(a_xz),sin(a_xz),-sin(a_xz),cos(a_xz));	
	mat2 rot_yz = mat2(cos(a_yz),sin(a_yz),-sin(a_yz),cos(a_yz));		
	mat2 rot_xy = mat2(cos(a_xy),sin(a_xy),-sin(a_xy),cos(a_xy));
	

	float v2 =1.0;	
	vec3 dir=vec3(uv*zoom,1.); 
	vec3 from=vec3(0.0, 0.0,0.0);                               
        from.x -= 5.0*(mouse.x-0.5);
        from.y -= 5.0*(mouse.y-0.5);
               
               
	vec3 forward = vec3(0.,0.,1.);   
	from.x += transverseSpeed*(1.0)*cos(0.01*time) + 0.001*time;
	from.y += transverseSpeed*(1.0)*sin(0.01*time) +0.001*time;
	from.z += 0.003*time;	
	
	dir.xy*=rot_xy;
	forward.xy *= rot_xy;
	dir.xz*=rot_xz;
	forward.xz *= rot_xz;	
	dir.yz*= rot_yz;
	forward.yz *= rot_yz;
	
	from.xy*=-rot_xy;
	from.xz*=rot_xz;
	from.yz*= rot_yz;
	
	float zooom = (time2-3311.)*speed;
	from += forward* zooom;
	float sampleShift = mod( zooom, stepsize );
	 
	float zoffset = -sampleShift;
	sampleShift /= stepsize;
	
	
	float s=0.24;
	float s3 = s + stepsize/2.0;
	vec3 v=vec3(0.);
	float t3 = 0.0;	
	
	vec3 backCol2 = vec3(0.);
	for (int r=0; r<volsteps; r++) {
		vec3 p2=from+(s+zoffset)*dir;
		vec3 p3=from+(s3+zoffset)*dir;
		
		p2 = abs(vec3(tile)-mod(p2,vec3(tile*2.)));
		p3 = abs(vec3(tile)-mod(p3,vec3(tile*2.)));		
		#ifdef cloud
		t3 = field(p3);
		#endif
		
		float pa,a=pa=0.;
		for (int i=0; i<iterations; i++) {
			p2=abs(p2)/dot(p2,p2)-formuparam;
			
			float D = abs(length(p2)-pa);
			a += i > 7 ? min( 12., D) : D;
			pa=length(p2);
		}
		
		
		
		a*=a*a;
		
		float s1 = s+zoffset;
		
		float fade = pow(distfading,max(0.,float(r)-sampleShift));		
			
		v+=fade;
	       	

		
		if( r == 0 )
			fade *= (1. - (sampleShift));
		
		if( r == volsteps-1 )
			fade *= sampleShift;
		v+=vec3(s1,s1*s1,s1*s1*s1*s1)*a*brightness*fade;
		
		backCol2 += mix(.4, 1., v2) * vec3(1.8 * t3 * t3 * t3, 1.4 * t3 * t3, t3) * fade;

		
		s+=stepsize;
		s3 += stepsize;		
	}
		       
	v=mix(vec3(length(v)),v,saturation);	

	vec4 forCol2 = vec4(v*.01,1.);	
	#ifdef cloud
	backCol2 *= cloud;
	#endif	
	backCol2.b *= 1.8;
	backCol2.r *= 0.05;	
	
	backCol2.b = 0.5*mix(backCol2.g, backCol2.b, 0.8);
	backCol2.g = 0.0;
	backCol2.bg = mix(backCol2.gb, backCol2.bg, 0.5*(cos(time*0.01) + 1.0));

    vec4 tcolor = texture2D(uTexture, vTextureCoord);

	gl_FragColor = vec4(tcolor.rgb * (forCol2.rgb + backCol2), tcolor.a);
}`;


const flowerFragmentShader = `
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

        const plasma = new FXShader({ fragmentShader: plasmaFragmentShader });
        const sine = new FXShader({ fragmentShader: sineWaveFragmentShader });
        const clouds = new FXShader({ fragmentShader: cloudsFragmentShader });
        const flower = new FXShader({ fragmentShader: flowerFragmentShader });
        const dots = new FXShader({ fragmentShader: dotsFragmentShader });
        const stars = new FXShader({ fragmentShader: starsFragmentShader });

        const world = new StaticWorld(this);

        const baselayer = new Layer();
        const renderlayer = new RenderLayer();
        const fxlayer = new EffectLayer();

        dots.timeScale = 0.001;
        stars.timeScale = 0.001;
        flower.timeScale = 0.001;

        fxlayer.shaders.push(flower);
        // fxlayer.shaders.push(plasma);
        // fxlayer.shaders.push(stars);
        fxlayer.shaders.push(sine);
        // fxlayer.shaders.push(clouds);
        // fxlayer.shaders.push(dots);

        const rect = new Rectangle(400, 300, 512, 512, 0xff00ff);
        const rect2 = new Rectangle(400, 300, 256, 256, 0xffff00);

        On(world, 'update', () => {

            rect.rotation += 0.01;
            rect2.rotation -= 0.005;

        });

        //  Updates: YES
        // AddChildren(baselayer, rect, rect2);
        // AddChildren(world, baselayer);

        //  Updates: YES (SetDirtyTransform call SetDirtyParents)
        // AddChildren(renderlayer, rect, rect2);
        // AddChildren(world, renderlayer);

        //  Updates: YES
        AddChildren(fxlayer, rect, rect2);
        AddChildren(world, fxlayer);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
