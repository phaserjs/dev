import * as GLMatrix from 'gl-matrix';
import * as GL_CONST from '../src/renderer/webgl1/GL_CONST';
import * as mat4 from 'gl-matrix/mat4';
import * as quat from 'gl-matrix/quat';
import * as vec3 from 'gl-matrix/vec3';
import * as vec4 from 'gl-matrix/vec4';

import { AddChild, AddChildren } from '../src/display';
import { BackgroundColor, Parent, Scenes, SetWebGL, Size } from '../src/config';
import { DownKey, LeftKey, RightKey, UpKey } from '../src/input/keyboard/keys';
import { EffectLayer, Layer, RenderLayer, Sprite } from '../src/gameobjects';
import { Flush, PopFramebuffer, PopShader, PopVertexBuffer, SetFramebuffer, SetShader, SetVertexBuffer } from '../src/renderer/webgl1/renderpass';

import { BatchSingleQuad } from '../src/renderer/webgl1/draw/BatchSingleQuad';
import { Camera3D } from './Camera3D';
import { Cube2 as CubeOBJ } from './3d/cube2';
import { DrawTexturedQuad } from '../src/renderer/webgl1/draw/DrawTexturedQuad';
import { ExpandVertexData } from './ExpandVertexData';
import { FXShader } from '../src/renderer/webgl1/shaders/FXShader';
import { Face } from './Face';
import { GL } from '../src/renderer/webgl1';
import { Game } from '../src/Game';
import { IRenderPass } from '../src/renderer/webgl1/renderpass/IRenderPass';
import { IShader } from '../src/renderer/webgl1/shaders/IShader';
import { IWebGLRenderer } from '../src/renderer/webgl1/IWebGLRenderer';
import { ImageFile } from '../src/loader/files/ImageFile';
import { Keyboard } from '../src/input/keyboard';
import { LIGHTS_FRAG } from './LIGHTS_FRAG';
import { Loader } from '../src/loader/Loader';
import OBJFile from './OBJFile';
import { On } from '../src/events';
import { OrbitCamera } from './OrbitCamera';
import { ParseObj } from './ParseObj';
import { RenderLayer3D } from '../src/gameobjects3d/renderlayer3d/RenderLayer3D';
import { SIMPLE_LIGHTS_VERT } from './SIMPLE_LIGHTS_VERT';
import { Scene } from '../src/scenes/Scene';
import { Shader } from '../src/renderer/webgl1/shaders/Shader';
import { StaticWorld } from '../src/world/StaticWorld';
import { Vertex } from '../src/gameobjects/components';
import { VertexBuffer } from '../src/renderer/webgl1/buffers/VertexBuffer';
import { parseOBJ } from "@thi.ng/geom-io-obj";

// import { Cube as CubeOBJ } from './3d/cube';

// import { Chair as CubeOBJ } from './3d/chair';
// import { Spike as CubeOBJ } from './3d/spike';
// import { Plane as CubeOBJ } from './3d/plane';

// const obj = new OBJFile(CubeOBJ);
// const data = obj.parse();

// console.log('OBJFile');
// console.log(data.models[0]);

// const data2 = ParseObj(CubeOBJ);

// console.log('ParseObj');
// console.log(data2);

// const model = parseOBJ(CubeOBJ, { groups: false, tessellate: true });
// console.log(model);

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

class Cube extends RenderLayer3D
{
    shader: IShader;
    faces: Face[] = [];
    buffer: VertexBuffer;

    constructor (shader: IShader)
    {
        super();

        this.buffer = new VertexBuffer({ batchSize: 2048, vertexElementSize: 7, elementsPerEntry: 3 });

        this.shader = shader;

        // this.buffer.vertexBuffer['__SPECTOR_Metadata'] = { name: 'Cube' };
        // this.texture.binding.framebuffer['__SPECTOR_Metadata'] = { name: 'CubeFramebuffer' };
        // this.texture.binding.depthbuffer['__SPECTOR_Metadata'] = { name: 'CubeDepthbuffer' };
        // this.texture.binding.texture['__SPECTOR_Metadata'] = { name: 'CubeTexture' };

        const colors = [
            0xff0000, 0xff0000,
            0xffff00, 0xffff00,
            0xff00ff, 0xff00ff,
            0x00ff00, 0x00ff00,
            0x00ffff, 0x00ffff,
            0x0000ff, 0x0000ff
        ];

        const verts = [];
		const normals = [];
        const uvs = [];
        const indices = [];

        const width = 2;
        const height = 2;
        const depth = 2;

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

        // const { verts, normals, indices, uvs } = buildSphere(2, 12, 12);

        // console.log(verts);
        // console.log(normals);
        // console.log(indices);

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

            const f = new Face(
                { x: v1[0], y: v1[1], z: v1[2] },
                { x: v2[0], y: v2[1], z: v2[2] },
                { x: v3[0], y: v3[1], z: v3[2] },
                { x: n1[0], y: n1[1], z: n1[2] },
                { x: n2[0], y: n2[1], z: n2[2] },
                { x: n3[0], y: n3[1], z: n3[2] },
                1
            );

            f.setColor(colors[i / 3]);
            // f.setColor(0x3d3dbb);

            this.faces.push(f);
        }

        //  @thing/geom
        /*
        const faces = model.objects[0].groups[0].faces;
        const verts = model.vertices;
        const normals = model.normals;

        for (let i = 0; i < faces.length; i++)
        {
            const face = faces[i];

            const v1 = verts[face.v[0]];
            const v2 = verts[face.v[1]];
            const v3 = verts[face.v[2]];

            const n1 = normals[face.n[0]];
            const n2 = normals[face.n[1]];
            const n3 = normals[face.n[2]];

            const f = new Face(
                { x: v1[0], y: v1[1], z: v1[2] },
                { x: v2[0], y: v2[1], z: v2[2] },
                { x: v3[0], y: v3[1], z: v3[2] },
                { x: n1[0], y: n1[1], z: n1[2] },
                { x: n2[0], y: n2[1], z: n2[2] },
                { x: n3[0], y: n3[1], z: n3[2] },
                1
            );

            f.setColor(colors[i]);
            // f.setColor(0x3d3dbb);

            this.faces.push(f);
        }
        */

        /*
        //  ParseOBJ
        const model = data.models[0];
        const verts = model.vertices;
        const normals = model.vertexNormals;

        for (let i = 0; i < model.faces.length; i++)
        {
            const face = model.faces[i];

            const v1 = face.vertices[0];
            const v2 = face.vertices[1];
            const v3 = face.vertices[2];

            const f = new Face(
                verts[v1.vertexIndex],
                verts[v2.vertexIndex],
                verts[v3.vertexIndex],
                normals[v1.vertexNormalIndex],
                normals[v2.vertexNormalIndex],
                normals[v3.vertexNormalIndex]
            );

            f.setColor(colors[i]);

            this.faces.push(f);
        }
        */

        console.log(this.faces);
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        const shader = this.shader;
        const gl = renderPass.renderer.gl;

        Flush(renderPass);

        SetFramebuffer(renderPass, this.framebuffer, true);
        SetVertexBuffer(renderPass, this.buffer);
        SetShader(renderPass, shader, 0);

        // let offset = shader.count * buffer.entryElementSize;
        let offset = 0;

        const F32 = this.buffer.vertexViewF32;
        const U32 = this.buffer.vertexViewU32;

        this.faces.forEach(face =>
        {
            offset = face.addToBuffer(F32, U32, offset);

            renderPass.count += 3;
        });

        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);

        Flush(renderPass);

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
    // camera: Camera3D;
    camera: OrbitCamera;
    normalMatrix: mat4;

    constructor ()
    {
        super({
            fragmentShader: LIGHTS_FRAG,
            vertexShader: SIMPLE_LIGHTS_VERT,
            attributes: {
                aVertexPosition: { size: 3, type: GL_CONST.FLOAT, normalized: false, offset: 0 },
                aVertexNormal: { size: 3, type: GL_CONST.FLOAT, normalized: false, offset: 12 },
                aVertexColor: { size: 4, type: GL_CONST.UNSIGNED_BYTE, normalized: true, offset: 24 }
            },
            uniforms: {
                uProjectionMatrix: new Float32Array(),
                uCameraMatrix: new Float32Array(),
                uNormalMatrix: new Float32Array(),
                uLightDirection: vec3.fromValues(-10, 30, 50),
                uLightColor: vec3.fromValues(1, 1, 1, 1)
            }
        });

        // this.framebuffer['__SPECTOR_Metadata'] = { name: 'TestShaderFramebuffer' };
        this.program['__SPECTOR_Metadata'] = { name: 'TestShaderProgram' };

        //   TODO - LightPosition

        // this.camera = new Camera3D();
        this.camera = new OrbitCamera();

        this.camera.setFarthestDistance(100);
        this.camera.setClosestDistance(1);
        this.camera.setOrbitPoint(0, -1, 0);
        this.camera.setDistance(5);

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

        loader.add(ImageFile('bg', 'checker.png'));
        loader.add(ImageFile('logo', 'logo.png'));

        loader.start().then(() => {

            const sine = new FXShader({
                fragmentShader: sineWaveFragmentShader
            });

            const plasma = new FXShader({
                fragmentShader: plasmaFragmentShader
            });

            const keyboard = new Keyboard();

            this.leftKey = new LeftKey();
            this.rightKey = new RightKey();
            this.upKey = new UpKey();
            this.downKey = new DownKey();

            keyboard.addKeys(this.leftKey, this.rightKey, this.upKey, this.downKey);

            const shader = new TestShader();
            const camera = shader.camera;

            const layer = new EffectLayer(sine);

            const bg = new Sprite(400, 300, 'bg');
            const cube = new Cube(shader);
            const logo = new Sprite(400, 300, 'logo');

            AddChildren(layer, cube);

            // AddChildren(world, bg, cube);
            // AddChildren(world, bg, cube, logo);
            AddChildren(world, bg, layer, logo);

            // camera.setPosition()

            On(this, 'update', (delta, time) => {

                if (this.leftKey.isDown)
                {
                    // camera.yaw(0.05);
                    camera.pitch(0.05);
                    // camera.roll(0.05);
                }
                else if (this.rightKey.isDown)
                {
                    // camera.yaw(-0.05);
                    camera.pitch(-0.05);
                    // camera.roll(-0.05);
                }

                if (this.upKey.isDown)
                {
                    camera.yaw(-0.05);
                    // camera.moveForward(0.05);
                    // camera.moveIn(0.05);
                }
                else if (this.downKey.isDown)
                {
                    camera.yaw(0.05);
                    // camera.moveForward(-0.05);
                    // camera.moveOut(0.05);
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
