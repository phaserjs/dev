import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '../../../../../phaser-genesis/src/config';

import { AddChild } from '../../../../../phaser-genesis/src/display';
import { EffectLayer } from '../../../../../phaser-genesis/src/gameobjects';
import { FXShader } from '../../../../../phaser-genesis/src/renderer/webgl1/shaders/FXShader';
import { Game } from '../../../../../phaser-genesis/src/Game';
import { Scene } from '../../../../../phaser-genesis/src/scenes/Scene';
import { World } from '../../../../../phaser-genesis/src/world/World';

const fragmentShader = `
/*
 * Original shader from: https://www.shadertoy.com/view/fdy3WG
 */
precision mediump float;

// glslsandbox uniforms
uniform float time;
uniform vec2 resolution;

// shadertoy emulation
#define iTime time
#define iResolution vec3(resolution,1.)

// --------[ Original ShaderToy begins here ]---------- //
#define R(p,a,r)mix(a*dot(p,a),p,cos(r))+sin(r)*cross(p,a)
#define H(h)(cos((h)*6.3+vec3(0,23,21))*.5+.5)
void mainImage(out vec4 O, vec2 C)
{
    O-=O;
    vec3 p,r=iResolution,
    d=normalize(vec3((C-.5*r.xy)/r.y,1));
    float g=0.,e,s;
    for(float i=0.;i<99.;++i)
    {
        p=g*d;
        p.z-=.6;
        p=R(p,normalize(vec3(1,2,3)),iTime*.3);
        s=4.;
        for(int j=0;j<8;++j)
            p=abs(p),p=p.x<p.y?p.zxy:p.zyx,
            s*=e=1.8/min(dot(p,p),1.3),
            p=p*e-vec3(12.0+sin(p.y*0.5),3,40.0+sin(time*0.2+p.x*0.1)*10.0);
        g+=e=length(p.xz)/s;
        O.rgb+=mix(r/r,H(log(s)),.7)*.08*exp(-i*i*e);
    }
 }
// --------[ Original ShaderToy ends here ]---------- //

void main(void)
{
    mainImage(gl_FragColor, gl_FragCoord.xy);
    gl_FragColor.a = 1.;
}
`;

class Demo extends Scene
{
    constructor ()
    {
        super();

        const world = new World(this);
        
        const debug = new FXShader({ fragmentShader });

        const fxlayer = new EffectLayer();

        fxlayer.shaders.push(debug);

        AddChild(world, fxlayer);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
