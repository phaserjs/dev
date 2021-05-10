import * as GLMatrix from 'gl-matrix';
import * as GL_CONST from '../src/renderer/webgl1/GL_CONST';
import * as mat4 from 'gl-matrix/mat4';
import * as quat from 'gl-matrix/quat';
import * as vec3 from 'gl-matrix/vec3';
import * as vec4 from 'gl-matrix/vec4';

import { AddChild, AddChildren } from '../src/display';
import { BackgroundColor, Parent, Scenes, SetWebGL, Size } from '../src/config';
import { Between, FloatBetween } from '../src/math';
import { DownKey, LeftKey, RightKey, UpKey } from '../src/input/keyboard/keys';
import { EffectLayer, Layer, RenderLayer, Sprite } from '../src/gameobjects';
import { Flush, PopFramebuffer, PopShader, PopVertexBuffer, SetFramebuffer, SetShader, SetVertexBuffer } from '../src/renderer/webgl1/renderpass';
import { GL, PackColor } from '../src/renderer/webgl1';

import { Camera3D } from './Camera3D';
import { DrawTexturedQuad } from '../src/renderer/webgl1/draw/DrawTexturedQuad';
import { FXShader } from '../src/renderer/webgl1/shaders/FXShader';
import { Face } from './Face';
import { Game } from '../src/Game';
import { IRenderPass } from '../src/renderer/webgl1/renderpass/IRenderPass';
import { IShader } from '../src/renderer/webgl1/shaders/IShader';
import { ImageFile } from '../src/loader/files/ImageFile';
import { IndexedVertexBuffer } from '../src/renderer/webgl1/buffers/IndexedVertexBuffer';
import { Keyboard } from '../src/input/keyboard';
import { LIGHTS4_FRAG } from './LIGHTS4_FRAG';
import { LIGHTS4_VERT } from './LIGHTS4_VERT';
import { Loader } from '../src/loader/Loader';
import { On } from '../src/events';
import { OrbitCamera } from './OrbitCamera';
import { RenderLayer3D } from '../src/gameobjects3d/renderlayer3d/RenderLayer3D';
import { Scene } from '../src/scenes/Scene';
import { Shader } from '../src/renderer/webgl1/shaders/Shader';
import { StaticWorld } from '../src/world/StaticWorld';
import { VertexBuffer } from '../src/renderer/webgl1/buffers/VertexBuffer';

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
precision highp float;

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


function buildSphere (radius = 1, widthSegments = 3, heightSegments = 3, phiStart = 0, phiLength = Math.PI * 2, thetaStart = 0, thetaLength = Math.PI)
{
    radius = radius || 1;

	widthSegments = Math.max( 3, Math.floor( widthSegments ) || 8 );
	heightSegments = Math.max( 2, Math.floor( heightSegments ) || 6 );

	phiStart = phiStart !== undefined ? phiStart : 0;
	phiLength = phiLength !== undefined ? phiLength : Math.PI * 2;

	thetaStart = thetaStart !== undefined ? thetaStart : 0;
	thetaLength = thetaLength !== undefined ? thetaLength : Math.PI;

	var thetaEnd = Math.min( thetaStart + thetaLength, Math.PI );

	var ix, iy;

	var index = 0;
	var grid = [];

	var vertex = vec3.create();
	var normal = vec3.create();

	// buffers

	var indices = [];
	var vertices = [];
	var normals = [];
	var uvs = [];

	// generate vertices, normals and uvs

	for ( iy = 0; iy <= heightSegments; iy ++ ) {

		var verticesRow = [];

		var v = iy / heightSegments;

		// special case for the poles

		var uOffset = 0;

		if ( iy == 0 && thetaStart == 0 ) {

			uOffset = 0.5 / widthSegments;

		} else if ( iy == heightSegments && thetaEnd == Math.PI ) {

			uOffset = - 0.5 / widthSegments;

		}

		for ( ix = 0; ix <= widthSegments; ix ++ ) {

			var u = ix / widthSegments;

			// vertex

			vertex[0] = - radius * Math.cos( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );
			vertex[1] = radius * Math.cos( thetaStart + v * thetaLength );
			vertex[2] = radius * Math.sin( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );

			vertices.push( vertex[0], vertex[1], vertex[2] );

			// normal

            // normal.copy( vertex ).normalize();
            vec3.normalize(normal, vertex);

			normals.push( normal[0], normal[1], normal[2] );

			// uv

			uvs.push( u + uOffset, 1 - v );

			verticesRow.push( index ++ );

		}

		grid.push( verticesRow );

	}

	// indices

	for ( iy = 0; iy < heightSegments; iy ++ ) {

		for ( ix = 0; ix < widthSegments; ix ++ ) {

			var a = grid[ iy ][ ix + 1 ];
			var b = grid[ iy ][ ix ];
			var c = grid[ iy + 1 ][ ix ];
			var d = grid[ iy + 1 ][ ix + 1 ];

			if ( iy !== 0 || thetaStart > 0 ) indices.push( a, b, d );
			if ( iy !== heightSegments - 1 || thetaEnd < Math.PI ) indices.push( b, c, d );

		}

    }

    return { verts: vertices, normals, uvs, indices };
}

function buildPlane (vertices, normals, uvs, indices, numberOfVertices, u, v, w, udir, vdir, width, height, depth, gridX, gridY): number
{
    const segmentWidth = width / gridX;
    const segmentHeight = height / gridY;

    const widthHalf = width / 2;
    const heightHalf = height / 2;
    const depthHalf = depth / 2;

    const gridX1 = gridX + 1;
    const gridY1 = gridY + 1;

    let vertexCounter = 0;

    const vector = vec3.create();

    // generate vertices, normals and uvs

    for (let iy = 0; iy < gridY1; iy++)
    {
        const y = iy * segmentHeight - heightHalf;

        for (let ix = 0; ix < gridX1; ix++)
        {
            const x = ix * segmentWidth - widthHalf;

            // set values to correct vector component

            vector[ u ] = x * udir;
            vector[ v ] = y * vdir;
            vector[ w ] = depthHalf;

            // now apply vector to vertex buffer

            vertices.push(vector[0], vector[1], vector[2]);
            // vertices.push(vec3.clone(vector));

            // set values to correct vector component

            vector[ u ] = 0;
            vector[ v ] = 0;
            vector[ w ] = depth > 0 ? 1 : - 1;

            // now apply vector to normal buffer

            normals.push(vector[0], vector[1], vector[2]);
            // normals.push(vec3.clone(vector));

            // uvs

            uvs.push(ix / gridX);
            uvs.push(1 - ( iy / gridY ));

            // counters

            vertexCounter += 1;
        }
    }

    // indices

    // 1. you need three indices to draw a single face
    // 2. a single segment consists of two faces
    // 3. so we need to generate six (2*3) indices per segment

    for (let iy = 0; iy < gridY; iy++)
    {
        for (let ix = 0; ix < gridX; ix++)
        {
            const a = numberOfVertices + ix + gridX1 * iy;
            const b = numberOfVertices + ix + gridX1 * ( iy + 1 );
            const c = numberOfVertices + ( ix + 1 ) + gridX1 * ( iy + 1 );
            const d = numberOfVertices + ( ix + 1 ) + gridX1 * iy;

            // faces

            indices.push(a, b, d);
            indices.push(b, c, d);
        }
    }

    // update total number of vertices

    numberOfVertices += vertexCounter;

    return numberOfVertices;
}

function getVert (verts, index): number[]
{
    const x = verts[ (index * 3) + 0 ];
    const y = verts[ (index * 3) + 1 ];
    const z = verts[ (index * 3) + 2 ];

    return [ x, y, z ];
}

function getNormal (normals, index): number[]
{
    const x = normals[ (index * 3) + 0 ];
    const y = normals[ (index * 3) + 1 ];
    const z = normals[ (index * 3) + 2 ];

    return [ x, y, z ];
}

function getCube (layer: BallWorld, x: number = 0, y: number = 0, z: number = 0, width: number = 1, height: number = 1, depth: number = 1, color?: number): boolean
{
    const colors = [
        0xff0000,
        0xffff00,
        0xff00ff,
        0x00ff00,
        0x00ffff,
        0x0000ff,
        0x9D9D9D,
        0xffffff,
        0xBE2633,
        0xE06F8B,
        0x493C2B,
        0xA46422,
        0xEB8931,
        0xF7E26B,
        0x2F484E,
        0x44891A,
        0xA3CE27,
        0x1B2632,
        0x005784,
        0x31A2F2,
        0xB2DCEF,
        0x1D2B53,
        0x7E2553,
        0x008751,
        0xAB5236,
        0x5F574F,
        0xC2C3C7,
        0xFFF1E8,
        0xFF004D,
        0xFFA300,
        0xFFEC27,
        0x00E436,
        0x29ADFF,
        0x83769C,
        0xFF77A8,
        0xFFCCAA
    ];

    const verts = [];
    const normals = [];
    const uvs = [];
    const indices = [];

    const widthSegments = 1;
    const heightSegments = 1;
    const depthSegments = 1;

    let numberOfVertices = 0;

    numberOfVertices = buildPlane(verts, normals, uvs, indices, numberOfVertices, 2, 1, 0, -1, -1, depth, height, width, depthSegments, heightSegments); // px
    numberOfVertices = buildPlane(verts, normals, uvs, indices, numberOfVertices, 2, 1, 0, 1, -1, depth, height, - width, depthSegments, heightSegments); // nx
    numberOfVertices = buildPlane(verts, normals, uvs, indices, numberOfVertices, 0, 2, 1, 1, 1, width, depth, height, widthSegments, depthSegments); // py
    numberOfVertices = buildPlane(verts, normals, uvs, indices, numberOfVertices, 0, 2, 1, 1, -1, width, depth, - height, widthSegments, depthSegments); // ny
    numberOfVertices = buildPlane(verts, normals, uvs, indices, numberOfVertices, 0, 1, 2, 1, -1, width, height, depth, widthSegments, heightSegments); // pz
    numberOfVertices = buildPlane(verts, normals, uvs, indices, numberOfVertices, 0, 1, 2, -1, -1, width, height, - depth, widthSegments, heightSegments); // nz

    const F32 = layer.buffer.vertexViewF32;
    const U32 = layer.buffer.vertexViewU32;

    let offset = layer.buffer.offset;

    if (layer.buffer.canContain(indices.length))
    {
        let vcolor;

        if (!color)
        {
            vcolor = PackColor(colors[ Between(0, colors.length) ], 1);
        }
        else
        {
            vcolor = PackColor(color, 1);
        }

        for (let i = 0; i < indices.length; i += 3)
        {
            const i1 = indices[i + 0];
            const i2 = indices[i + 1];
            const i3 = indices[i + 2];

            const v1 = getVert(verts, i1);
            const v2 = getVert(verts, i2);
            const v3 = getVert(verts, i3);

            const n1 = getNormal(normals, i1);
            const n2 = getNormal(normals, i2);
            const n3 = getNormal(normals, i3);

            // let vcolor;

            // if (!color)
            // {
            //     vcolor = PackColor(colors[i / 3], 1);
            // }
            // else
            // {
            //     vcolor = PackColor(color, 1);
            // }

            F32[offset + 0] = v1[0] + x;
            F32[offset + 1] = v1[1] + y;
            F32[offset + 2] = v1[2] + z;
            F32[offset + 3] = n1[0];
            F32[offset + 4] = n1[1];
            F32[offset + 5] = n1[2];
            U32[offset + 6] = vcolor;

            F32[offset + 7] = v2[0] + x;
            F32[offset + 8] = v2[1] + y;
            F32[offset + 9] = v2[2] + z;
            F32[offset + 10] = n2[0];
            F32[offset + 11] = n2[1];
            F32[offset + 12] = n2[2];
            U32[offset + 13] = vcolor;

            F32[offset + 14] = v3[0] + x;
            F32[offset + 15] = v3[1] + y;
            F32[offset + 16] = v3[2] + z;
            F32[offset + 17] = n3[0];
            F32[offset + 18] = n3[1];
            F32[offset + 19] = n3[2];
            U32[offset + 20] = vcolor;

            offset += 21;
        }

        layer.buffer.add(indices.length);

        return true;
    }

    return false;
}

function getSphere (layer: BallWorld, x: number = 0, y: number = 0, z: number = 0, radius: number = 1, widthSegments: number = 1, heightSegments: number = 1, color?: number): boolean
{
    const colors = [
        0xff0000,
        0xffff00,
        0xff00ff,
        0x00ff00,
        0x00ffff,
        0x0000ff,
        0x9D9D9D,
        0xffffff,
        0xBE2633,
        0xE06F8B,
        0x493C2B,
        0xA46422,
        0xEB8931,
        0xF7E26B,
        0x2F484E,
        0x44891A,
        0xA3CE27,
        0x1B2632,
        0x005784,
        0x31A2F2,
        0xB2DCEF,
        0x1D2B53,
        0x7E2553,
        0x008751,
        0xAB5236,
        0x5F574F,
        0xC2C3C7,
        0xFFF1E8,
        0xFF004D,
        0xFFA300,
        0xFFEC27,
        0x00E436,
        0x29ADFF,
        0x83769C,
        0xFF77A8,
        0xFFCCAA
    ];

    const { verts, normals, uvs, indices } = buildSphere(radius, widthSegments, heightSegments);

    const F32 = layer.buffer.vertexViewF32;
    const U32 = layer.buffer.vertexViewU32;

    let offset = layer.buffer.offset;

    if (layer.buffer.canContain(indices.length))
    {
        let vcolor;

        if (!color)
        {
            vcolor = PackColor(colors[ Between(0, colors.length) ], 1);
        }
        else
        {
            vcolor = PackColor(color, 1);
        }

        for (let i = 0; i < indices.length; i += 3)
        {
            const i1 = indices[i + 0];
            const i2 = indices[i + 1];
            const i3 = indices[i + 2];

            const v1 = getVert(verts, i1);
            const v2 = getVert(verts, i2);
            const v3 = getVert(verts, i3);

            const n1 = getNormal(normals, i1);
            const n2 = getNormal(normals, i2);
            const n3 = getNormal(normals, i3);

            // let vcolor;

            // if (!color)
            // {
            //     vcolor = PackColor(colors[i / 3], 1);
            // }
            // else
            // {
            //     vcolor = PackColor(color, 1);
            // }

            F32[offset + 0] = v1[0] + x;
            F32[offset + 1] = v1[1] + y;
            F32[offset + 2] = v1[2] + z;
            F32[offset + 3] = n1[0];
            F32[offset + 4] = n1[1];
            F32[offset + 5] = n1[2];
            U32[offset + 6] = vcolor;

            F32[offset + 7] = v2[0] + x;
            F32[offset + 8] = v2[1] + y;
            F32[offset + 9] = v2[2] + z;
            F32[offset + 10] = n2[0];
            F32[offset + 11] = n2[1];
            F32[offset + 12] = n2[2];
            U32[offset + 13] = vcolor;

            F32[offset + 14] = v3[0] + x;
            F32[offset + 15] = v3[1] + y;
            F32[offset + 16] = v3[2] + z;
            F32[offset + 17] = n3[0];
            F32[offset + 18] = n3[1];
            F32[offset + 19] = n3[2];
            U32[offset + 20] = vcolor;

            offset += 21;
        }

        layer.buffer.add(indices.length);

        return true;
    }

    return false;
}

class BallWorld extends RenderLayer3D
{
    shader: IShader;
    buffer: VertexBuffer;

    constructor (shader: IShader)
    {
        super();

        this.buffer = new VertexBuffer({ batchSize: 4096 * 256, vertexElementSize: 7, elementsPerEntry: 3, isDynamic: false });

        this.shader = shader;

        //  floor
        getCube(this, 0, -4, 0, 140, 0.1, 140, 0x1d1d1d);

        for (let i = 0; i < 1024; i++)
        {
            const x = FloatBetween(-70, 70);
            const z = FloatBetween(-70, 70);
            const r = FloatBetween(0.1, 1.5);

            const w = 0.1 + FloatBetween(0.1, 2);
            const h = 0.1 + FloatBetween(0.1, 8);
            const d = 0.1 + FloatBetween(0.1, 2);

            const ws = Between(12, 48);

            const y = -4 + (h / 2);

            if (Math.random() > 0.25)
            {
                const success = getCube(this, x, y, z, w, h, d);
                console.log('cube', i, success, this.buffer.free() + '%');
            }
            else
            {
                const success = getSphere(this, x, y, z, r, ws, ws);
                console.log('sphere', i, success, this.buffer.free() + '%');
            }
        }

        console.log('total verts', this.buffer.count);
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        const shader = this.shader;
        const gl = renderPass.renderer.gl;

        Flush(renderPass);

        SetFramebuffer(renderPass, this.framebuffer, true);
        SetVertexBuffer(renderPass, this.buffer);
        SetShader(renderPass, shader, 0);

        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);

        Flush(renderPass, this.buffer.count);

        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);

        PopFramebuffer(renderPass);
        PopVertexBuffer(renderPass);
        PopShader(renderPass);

        DrawTexturedQuad(renderPass, this.texture);
    }
}

class TestShader extends Shader
{
    camera: Camera3D;
    normalMatrix: mat4;

    constructor ()
    {
        super({
            fragmentShader: LIGHTS4_FRAG,
            vertexShader: LIGHTS4_VERT,
            attributes: {
                aVertexPosition: { size: 3, type: GL_CONST.FLOAT, normalized: false, offset: 0 },
                aVertexNormal: { size: 3, type: GL_CONST.FLOAT, normalized: false, offset: 12 },
                aVertexColor: { size: 4, type: GL_CONST.UNSIGNED_BYTE, normalized: true, offset: 24 }
            },
            uniforms: {
                uProjectionMatrix: new Float32Array(),
                uCameraMatrix: new Float32Array(),
                uNormalMatrix: new Float32Array(),

                uShininess: 30.0,
                uLightDirection: vec3.fromValues(0, -1, -2),

                uLightAmbient: vec4.fromValues(0.2, 0.2, 0.2, 1),
                uLightDiffuse: vec4.fromValues(1, 1, 1, 1),
                uLightSpecular: vec4.fromValues(1, 1, 1, 1),

                uMaterialAmbient: vec4.fromValues(1, 1, 1, 1),
                uMaterialDiffuse: vec4.fromValues(46/256, 99/256, 191/256, 1),
                uMaterialSpecular: vec4.fromValues(1, 1, 1, 1)
            }
        });

        this.camera = new Camera3D();

        this.normalMatrix = mat4.create();
    }

    updateUniforms ()
    {
        this.camera.refresh();

        const uniforms = this.uniforms;

        uniforms.set('uProjectionMatrix', this.camera.projectionMatrix);
        uniforms.set('uCameraMatrix', this.camera.viewMatrix);

        const normalMatrix = this.normalMatrix;

        mat4.invert(normalMatrix, this.camera.viewMatrix);
        mat4.transpose(normalMatrix, normalMatrix);

        uniforms.set('uNormalMatrix', normalMatrix);
    }
}

class Demo extends Scene
{
    leftKey: LeftKey;
    rightKey: RightKey;
    upKey: UpKey;
    downKey: DownKey;

    constructor ()
    {
        super();

        const world = new StaticWorld(this);

        const loader = new Loader();

        if (window.location.href.includes('192.168.0.100/phaser-genesis/'))
        {
            loader.setPath('/phaser4-examples/public/assets/');
        }
        else
        {
            loader.setPath('/examples/public/assets/');
        }

        loader.add(ImageFile('bg', 'farm-background.png'));
        loader.add(ImageFile('logo', 'logo.png'));
        loader.add(ImageFile('bg2', 'http://192.168.0.100/phaser3-examples/public/assets/skies/space3.png'));

        loader.start().then(() => {

            const keyboard = new Keyboard();

            this.leftKey = new LeftKey();
            this.rightKey = new RightKey();
            this.upKey = new UpKey();
            this.downKey = new DownKey();

            keyboard.addKeys(this.leftKey, this.rightKey, this.upKey, this.downKey);

            const sine = new FXShader({ fragmentShader: sineWaveFragmentShader });
            const plasma = new FXShader({ fragmentShader: plasmaFragmentShader });

            const effectLayer1 = new EffectLayer(plasma);
            const effectLayer2 = new EffectLayer(sine);

            const shader = new TestShader();
            const camera = shader.camera;
            const ballWorld = new BallWorld(shader);

            const bg = new Sprite(400, 300, 'bg2');
            const logo = new Sprite(400, 100, 'logo').setScale(0.5);

            AddChildren(effectLayer1, bg);
            AddChildren(effectLayer2, logo);

            AddChildren(world, effectLayer1, ballWorld, effectLayer2);

            // AddChildren(world, bg, ballWorld, logo);

            camera.setPosition([ 0, -1, -10 ]);
            camera.setNearClippingPlane(0.001);

            On(this, 'update', (delta, time) => {

                const pos = camera.getPosition();

                if (this.leftKey.isDown)
                {
                    if (this.leftKey.shiftKey)
                    {
                        camera.pitch(0.025);
                    }
                    else
                    {
                        camera.yaw(0.025);
                    }
                }
                else if (this.rightKey.isDown)
                {
                    if (this.rightKey.shiftKey)
                    {
                        camera.pitch(-0.025);
                    }
                    else
                    {
                        camera.yaw(-0.025);
                    }
                }

                if (this.upKey.isDown)
                {
                    if (this.upKey.shiftKey)
                    {
                        camera.pos[1] += 0.04;
                    }

                    camera.moveForward(-0.05);
                }
                else if (this.downKey.isDown)
                {
                    if (this.downKey.shiftKey)
                    {
                        camera.pos[1] -= 0.04;
                    }

                    camera.moveForward(0.05);
                }

            });
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
