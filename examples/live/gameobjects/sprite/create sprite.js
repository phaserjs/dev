(() => {
  // Users/rich/Documents/GitHub/phaser-genesis/src/config/const.ts
  var CONFIG_DEFAULTS = {
    AUTO: "Auto",
    BACKGROUND_COLOR: "BackgroundColor",
    BANNER: "Banner",
    BATCH_SIZE: "BatchSize",
    CANVAS_CONTEXT: "CanvasContext",
    CANVAS: "Canvas",
    DEFAULT_ORIGIN: "DefaultOrigin",
    GLOBAL_VAR: "GlobalVar",
    MAX_TEXTURES: "MaxTextures",
    PARENT: "Parent",
    RENDERER: "Renderer",
    SCENES: "Scenes",
    SIZE: "Size",
    WEBGL_CONTEXT: "WebGLContext",
    WEBGL: "WebGL",
    WORLD_SIZE: "WorldSize",
    WORLD_WIDTH: "WorldWidth",
    WORLD_HEIGHT: "WorldHeight"
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/ConfigStore.ts
  var ConfigStore = new Map();

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/backgroundcolor/SetBackgroundColor.ts
  function SetBackgroundColor(color) {
    ConfigStore.set(CONFIG_DEFAULTS.BACKGROUND_COLOR, color);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/backgroundcolor/BackgroundColor.ts
  function BackgroundColor(color) {
    return () => {
      SetBackgroundColor(color);
    };
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/banner/SetBanner.ts
  function SetBanner(title = "", version = "", url = "", color = "#fff", background = "linear-gradient(#3e0081 40%, #00bcc3)") {
    ConfigStore.set(CONFIG_DEFAULTS.BANNER, { title, version, url, color, background });
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/batchsize/SetBatchSize.ts
  function SetBatchSize(size) {
    ConfigStore.set(CONFIG_DEFAULTS.BATCH_SIZE, size);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/BindingQueue.ts
  var queue = [];
  var BindingQueue = {
    add: (texture, glConfig) => {
      queue.push({ texture, glConfig });
    },
    get: () => {
      return queue;
    },
    clear: () => {
      queue.length = 0;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/backgroundcolor/GetBackgroundColor.ts
  function GetBackgroundColor() {
    return ConfigStore.get(CONFIG_DEFAULTS.BACKGROUND_COLOR);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/size/GetHeight.ts
  function GetHeight() {
    return ConfigStore.get(CONFIG_DEFAULTS.SIZE).height;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/size/GetResolution.ts
  function GetResolution() {
    return ConfigStore.get(CONFIG_DEFAULTS.SIZE).resolution;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/size/GetWidth.ts
  function GetWidth() {
    return ConfigStore.get(CONFIG_DEFAULTS.SIZE).width;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/renderer/SetRenderer.ts
  function SetRenderer(renderer) {
    ConfigStore.set(CONFIG_DEFAULTS.RENDERER, renderer);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/defaultorigin/SetDefaultOrigin.ts
  function SetDefaultOrigin(x = 0.5, y = x) {
    ConfigStore.set(CONFIG_DEFAULTS.DEFAULT_ORIGIN, { x, y });
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/globalvar/SetGlobalVar.ts
  function SetGlobalVar(name) {
    ConfigStore.set(CONFIG_DEFAULTS.GLOBAL_VAR, name);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/globalvar/GlobalVar.ts
  function GlobalVar(name) {
    return () => {
      SetGlobalVar(name);
    };
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/maxtextures/SetMaxTextures.ts
  function SetMaxTextures(max) {
    ConfigStore.set(CONFIG_DEFAULTS.MAX_TEXTURES, max);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/dom/GetElement.ts
  function GetElement(target) {
    let element;
    if (target) {
      if (typeof target === "string") {
        element = document.getElementById(target);
      } else if (typeof target === "object" && target.nodeType === 1) {
        element = target;
      }
    }
    if (!element) {
      element = document.body;
    }
    return element;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/parent/SetParent.ts
  function SetParent(parentElement) {
    if (parentElement) {
      ConfigStore.set(CONFIG_DEFAULTS.PARENT, GetElement(parentElement));
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/parent/Parent.ts
  function Parent(parentElement) {
    return () => {
      SetParent(parentElement);
    };
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/scenes/SetScenes.ts
  function SetScenes(scenes) {
    ConfigStore.set(CONFIG_DEFAULTS.SCENES, [].concat(scenes));
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/scenes/Scenes.ts
  function Scenes(scenes) {
    return () => {
      SetScenes(scenes);
    };
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/size/SetSize.ts
  function SetSize(width = 800, height = 600, resolution = 1) {
    if (resolution === 0) {
      resolution = window.devicePixelRatio;
    }
    ConfigStore.set(CONFIG_DEFAULTS.SIZE, { width, height, resolution });
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/GL.ts
  var gl;
  var GL = {
    get: () => {
      return gl;
    },
    set: (context) => {
      gl = context;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/renderpass/Draw.ts
  function Draw(renderPass) {
    const count = renderPass.count;
    if (count === 0) {
      return;
    }
    const currentBuffer = renderPass.vertexbuffer.current;
    const currentShader = renderPass.shader.current;
    const renderToFramebuffer = currentShader.shader.renderToFramebuffer;
    if (renderToFramebuffer) {
      renderPass.framebuffer.set(currentShader.shader.framebuffer, true);
    }
    if (count === currentBuffer.batchSize) {
      const type = currentBuffer.isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
      gl.bufferData(gl.ARRAY_BUFFER, currentBuffer.data, type);
    } else {
      const subsize = count * currentBuffer.entryElementSize;
      const view = currentBuffer.vertexViewF32.subarray(0, subsize);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
    }
    if (currentBuffer.indexed) {
      gl.drawElements(gl.TRIANGLES, count * currentBuffer.entryIndexSize, gl.UNSIGNED_SHORT, 0);
    } else {
      gl.drawArrays(gl.TRIANGLES, 0, count * currentBuffer.elementsPerEntry);
    }
    if (renderToFramebuffer) {
      renderPass.framebuffer.pop();
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/renderpass/Flush.ts
  function Flush(renderPass, forceCount) {
    if (forceCount) {
      renderPass.count = forceCount;
    }
    const count = renderPass.count;
    if (count === 0) {
      return false;
    }
    Draw(renderPass);
    renderPass.flush();
    return true;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/renderpass/End.ts
  function End(renderPass) {
    Flush(renderPass);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/textures/GetCompressedTextures.ts
  function GetCompressedTextures(gl2) {
    const extString = "WEBGL_compressed_texture_";
    const wkExtString = "WEBKIT_" + extString;
    const hasExt = (format) => {
      const results = gl2.getExtension(extString + format) || gl2.getExtension(wkExtString + format);
      if (results) {
        const glEnums = {};
        for (const key in results) {
          glEnums[results[key]] = key;
        }
        return glEnums;
      }
    };
    return {
      ETC: hasExt("etc"),
      ETC1: hasExt("etc1"),
      ATC: hasExt("atc"),
      ASTC: hasExt("astc"),
      BPTC: hasExt("bptc"),
      RGTC: hasExt("rgtc"),
      PVRTC: hasExt("pvrtc"),
      S3TC: hasExt("s3tc"),
      S3TCSRGB: hasExt("s3tc_srgb"),
      IMG: true
    };
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/colors/GetRGBArray.ts
  function GetRGBArray(color, output = []) {
    const r = color >> 16 & 255;
    const g = color >> 8 & 255;
    const b = color & 255;
    const a = color > 16777215 ? color >>> 24 : 255;
    output[0] = r / 255;
    output[1] = g / 255;
    output[2] = b / 255;
    output[3] = a / 255;
    return output;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/webglcontext/GetWebGLContext.ts
  function GetWebGLContext() {
    return ConfigStore.get(CONFIG_DEFAULTS.WEBGL_CONTEXT);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/fbo/CreateFramebuffer.ts
  function CreateFramebuffer(texture, attachment) {
    if (!attachment) {
      attachment = gl.COLOR_ATTACHMENT0;
    }
    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, gl.TEXTURE_2D, texture, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return framebuffer;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/textures/CreateGLTexture.ts
  function CreateGLTexture(binding, mipmaps) {
    const { generateMipmap, minFilter, parent, compressed, internalFormat, flipY, unpackPremultiplyAlpha, magFilter, wrapS, wrapT, isPOT } = binding;
    const source = parent.image;
    let width = parent.width;
    let height = parent.height;
    const glTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, glTexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, unpackPremultiplyAlpha);
    if (source) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
      width = source.width;
      height = source.height;
    } else if (compressed && mipmaps) {
      for (let i = 0; i < mipmaps.length; i++) {
        gl.compressedTexImage2D(gl.TEXTURE_2D, i, internalFormat, mipmaps[i].width, mipmaps[i].height, 0, mipmaps[i].data);
      }
    } else {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
    if (generateMipmap && isPOT) {
      gl.generateMipmap(gl.TEXTURE_2D);
    }
    binding.texture = glTexture;
    return glTexture;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/fbo/DeleteFramebuffer.ts
  function DeleteFramebuffer(framebuffer) {
    if (gl && gl.isFramebuffer(framebuffer)) {
      gl.deleteFramebuffer(framebuffer);
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/textures/DeleteGLTexture.ts
  function DeleteGLTexture(texture) {
    if (gl.isTexture(texture)) {
      gl.deleteTexture(texture);
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/math/pow2/IsSizePowerOfTwo.ts
  function IsSizePowerOfTwo(width, height) {
    if (width < 1 || height < 1) {
      return false;
    }
    return (width & width - 1) === 0 && (height & height - 1) === 0;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/textures/SetGLTextureFilterMode.ts
  function SetGLTextureFilterMode(texture, linear = true) {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    const mode = linear ? gl.LINEAR : gl.NEAREST;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mode);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, mode);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/textures/UpdateGLTexture.ts
  function UpdateGLTexture(binding) {
    const source = binding.parent.image;
    const width = source.width;
    const height = source.height;
    if (width > 0 && height > 0) {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, binding.texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, binding.flipY);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    }
    return binding.texture;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/textures/GLTextureBinding.ts
  var GLTextureBinding = class {
    parent;
    texture;
    framebuffer;
    depthbuffer;
    format;
    internalFormat;
    compressed;
    mipmaps;
    isBound = false;
    textureUnit = 0;
    unpackPremultiplyAlpha = true;
    minFilter;
    magFilter;
    wrapS;
    wrapT;
    flipY = false;
    isPOT = false;
    generateMipmap = false;
    constructor(parent, config = {}) {
      this.parent = parent;
      this.isPOT = IsSizePowerOfTwo(parent.width, parent.height);
      const {
        mipmaps = null,
        compressed = false,
        format = "IMG",
        internalFormat = 0,
        texture = null,
        framebuffer = null,
        createFramebuffer = false,
        depthbuffer = null,
        unpackPremultiplyAlpha = true,
        minFilter = this.isPOT ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR,
        magFilter = gl.LINEAR,
        wrapS = gl.CLAMP_TO_EDGE,
        wrapT = gl.CLAMP_TO_EDGE,
        generateMipmap = this.isPOT,
        flipY = false
      } = config;
      this.compressed = compressed;
      this.format = format;
      this.internalFormat = internalFormat;
      this.mipmaps = mipmaps;
      if (compressed) {
        this.minFilter = gl.LINEAR;
      } else {
        this.minFilter = minFilter;
      }
      this.magFilter = magFilter;
      this.wrapS = wrapS;
      this.wrapT = wrapT;
      this.generateMipmap = generateMipmap;
      this.flipY = flipY;
      this.unpackPremultiplyAlpha = unpackPremultiplyAlpha;
      if (texture) {
        this.texture = texture;
      } else {
        CreateGLTexture(this, mipmaps);
      }
      if (framebuffer) {
        this.framebuffer = framebuffer;
      } else if (createFramebuffer) {
        this.framebuffer = CreateFramebuffer(this.texture);
      }
      if (depthbuffer) {
        this.depthbuffer = depthbuffer;
      }
      parent.binding = this;
    }
    setFilter(linear) {
      if (this.texture) {
        SetGLTextureFilterMode(this.texture, linear);
      }
    }
    create() {
      const texture = this.texture;
      if (texture) {
        DeleteGLTexture(texture);
      }
      return CreateGLTexture(this);
    }
    update() {
      const texture = this.texture;
      if (!texture) {
        return CreateGLTexture(this);
      } else {
        return UpdateGLTexture(this);
      }
    }
    bind(index) {
      this.isBound = true;
      this.textureUnit = index;
    }
    unbind() {
      this.isBound = false;
      this.textureUnit = 0;
    }
    destroy() {
      this.unbind();
      DeleteGLTexture(this.texture);
      DeleteFramebuffer(this.framebuffer);
      this.parent = null;
      this.texture = null;
      this.framebuffer = null;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/renderpass/ProcessBindingQueue.ts
  function ProcessBindingQueue() {
    const queue2 = BindingQueue.get();
    queue2.forEach((entry) => {
      const { texture, glConfig } = entry;
      if (!texture.binding) {
        texture.binding = new GLTextureBinding(texture, glConfig);
      }
    });
    BindingQueue.clear();
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/colormatrix/const.ts
  var DEFAULT_COLOR_MATRIX = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  var DEFAULT_COLOR_OFFSET = new Float32Array(4);

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/renderpass/BlendModeStack.ts
  var BlendModeStack = class {
    renderPass;
    stack;
    default;
    index;
    constructor(renderPass) {
      this.renderPass = renderPass;
      this.stack = [];
    }
    get current() {
      return this.stack[this.index];
    }
    add(enable, sfactor, dfactor) {
      const entry = { enable, sfactor, dfactor };
      this.index++;
      if (this.index === this.stack.length) {
        this.stack.push(entry);
      } else {
        this.stack[this.index] = entry;
      }
      return entry;
    }
    bindDefault() {
      this.index = 0;
      this.bind(this.default);
    }
    bind(entry) {
      if (!entry) {
        entry = this.current;
      }
      if (entry.enable) {
        if (!gl.isEnabled(gl.BLEND) || (this.current.sfactor !== entry.sfactor || this.current.dfactor !== entry.dfactor)) {
          gl.enable(gl.BLEND);
          gl.blendFunc(entry.sfactor, entry.dfactor);
        }
      } else {
        gl.disable(gl.BLEND);
      }
    }
    pop() {
      this.index--;
      this.bind();
    }
    set(enable, sfactor, dfactor) {
      const entry = this.add(enable, sfactor, dfactor);
      this.bind(entry);
    }
    setDefault(enable, sfactor, dfactor) {
      const entry = { enable, sfactor, dfactor };
      this.stack[0] = entry;
      this.index = 0;
      this.default = entry;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/color/CompareColorMatrix.ts
  function CompareColorMatrix(srcMatrix, srcOffset, targetMatrix, targetOffset) {
    for (let i = 0; i < srcOffset.length; i++) {
      if (srcOffset[i] !== targetOffset[i]) {
        return false;
      }
    }
    for (let i = 0; i < srcMatrix.length; i++) {
      if (srcMatrix[i] !== targetMatrix[i]) {
        return false;
      }
    }
    return true;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/renderpass/ColorMatrixStack.ts
  var ColorMatrixStack = class {
    renderPass;
    stack;
    default;
    index;
    constructor(renderPass) {
      this.renderPass = renderPass;
      this.stack = [];
    }
    get current() {
      return this.stack[this.index];
    }
    add(colorMatrix, colorOffset) {
      const entry = { colorMatrix, colorOffset };
      this.index++;
      if (this.index === this.stack.length) {
        this.stack.push(entry);
      } else {
        this.stack[this.index] = entry;
      }
      return entry;
    }
    bindDefault() {
      this.index = 0;
      this.bind(this.default);
    }
    bind(entry) {
      if (!entry) {
        entry = this.current;
      }
      const shader = this.renderPass.getCurrentShader();
      Flush(this.renderPass);
      shader.setUniform("uColorMatrix", entry.colorMatrix);
      shader.setUniform("uColorOffset", entry.colorOffset);
    }
    pop() {
      this.index--;
      this.bind();
    }
    set(color) {
      const current = this.current;
      const entry = this.add(color.colorMatrix, color.colorOffset);
      if (!CompareColorMatrix(entry.colorMatrix, entry.colorOffset, current.colorMatrix, current.colorOffset)) {
        this.bind(entry);
      }
    }
    setDefault(colorMatrix, colorOffset) {
      const entry = { colorMatrix, colorOffset };
      this.stack[0] = entry;
      this.index = 0;
      this.default = entry;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/renderpass/FramebufferStack.ts
  var FramebufferStack = class {
    renderPass;
    stack;
    active;
    default;
    index;
    constructor(renderPass) {
      this.renderPass = renderPass;
      this.stack = [];
    }
    get current() {
      return this.stack[this.index];
    }
    add(framebuffer, viewport) {
      const entry = { framebuffer, viewport };
      this.index++;
      if (this.index === this.stack.length) {
        this.stack.push(entry);
      } else {
        this.stack[this.index] = entry;
      }
      return entry;
    }
    bindDefault() {
      this.index = 0;
      this.bind(false, this.default);
    }
    bind(clear = true, entry) {
      if (!entry) {
        entry = this.current;
      }
      const { framebuffer, viewport } = entry;
      if (this.active !== framebuffer) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      }
      if (clear) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      }
      if (viewport) {
        this.renderPass.viewport.set(viewport.x, viewport.y, viewport.width, viewport.height);
      }
      this.active = framebuffer;
    }
    pop() {
      if (this.current.viewport) {
        this.renderPass.viewport.pop();
      }
      this.index--;
      this.bind(false);
    }
    set(framebuffer, clear = true, viewport) {
      const entry = this.add(framebuffer, viewport);
      this.bind(clear, entry);
    }
    setDefault(framebuffer = null, viewport) {
      const entry = { framebuffer, viewport };
      this.stack[0] = entry;
      this.index = 0;
      this.default = entry;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/batchsize/GetBatchSize.ts
  function GetBatchSize() {
    return ConfigStore.get(CONFIG_DEFAULTS.BATCH_SIZE);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/maxtextures/GetMaxTextures.ts
  function GetMaxTextures() {
    return ConfigStore.get(CONFIG_DEFAULTS.MAX_TEXTURES);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/math/mat4/Mat4Ortho.ts
  function Mat4Ortho(matrix, left, right, bottom, top, near, far) {
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);
    matrix.set([
      -2 * lr,
      0,
      0,
      0,
      0,
      -2 * bt,
      0,
      0,
      0,
      0,
      2 * nf,
      0,
      (left + right) * lr,
      (top + bottom) * bt,
      (far + near) * nf,
      1
    ]);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/glsl/MULTI_QUAD_FRAG.ts
  var MULTI_QUAD_FRAG = `#define SHADER_NAME MULTI_QUAD_FRAG
#define numTextures %count%

precision highp float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture[%count%];
uniform mat4 uColorMatrix;
uniform vec4 uColorOffset;

vec4 getSampler (int index, vec2 uv)
{
    for (int i = 0; i < numTextures; ++i)
    {
        vec4 color = texture2D(uTexture[i], uv);

        if (i == index)
        {
            return color * vec4(vTintColor.rgb * vTintColor.a, vTintColor.a);
        }
    }

    //  Return black
    return vec4(0);
}

void main (void)
{
    vec4 color = getSampler(int(vTextureId), vTextureCoord);

    //  Un pre-mult alpha
    if (color.a > 0.0)
    {
        color.rgb /= color.a;
    }

    vec4 result = color * uColorMatrix + (uColorOffset / 255.0);

    //  Pre-mult alpha
    result.rgb *= result.a;

    gl_FragColor = vec4(result.rgb, result.a);
}`;

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/shaders/DefaultQuadAttributes.ts
  var DefaultQuadAttributes = {
    aVertexPosition: { size: 2 },
    aTextureCoord: { size: 2 },
    aTextureId: { size: 1 },
    aTintColor: { size: 4 }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/GL_CONST.ts
  var BYTE = 5120;
  var UNSIGNED_BYTE = 5121;
  var SHORT = 5122;
  var UNSIGNED_SHORT = 5123;
  var FLOAT = 5126;

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/shaders/CreateAttributes.ts
  function CreateAttributes(program, attribs) {
    const attributes = new Map();
    const defaultSettings = {
      size: 1,
      type: FLOAT,
      normalized: false,
      stride: 0
    };
    let offset = 0;
    for (const [name, entry] of Object.entries(attribs)) {
      const index = gl.getAttribLocation(program, name);
      if (index !== -1) {
        gl.enableVertexAttribArray(index);
        const {
          size = defaultSettings.size,
          type = defaultSettings.type,
          normalized = defaultSettings.normalized,
          stride = defaultSettings.stride
        } = entry;
        attributes.set(name, { index, size, type, normalized, stride, offset });
        let typeSize = 4;
        if (type === UNSIGNED_SHORT || type === SHORT) {
          typeSize = 2;
        } else if (type === UNSIGNED_BYTE || type === BYTE) {
          typeSize = 1;
        }
        offset += size * typeSize;
      }
    }
    return attributes;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/fbo/CreateDepthBuffer.ts
  function CreateDepthBuffer(framebuffer, textureWidth, textureHeight) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    const depthBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, textureWidth, textureHeight);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return depthBuffer;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/shaders/DeleteShaders.ts
  function DeleteShaders(...shaders) {
    shaders.forEach((shader) => {
      gl.deleteShader(shader);
    });
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/shaders/CreateProgram.ts
  function CreateProgram(...shaders) {
    const program = gl.createProgram();
    shaders.forEach((shader) => {
      gl.attachShader(program, shader);
    });
    gl.linkProgram(program);
    const status = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!status) {
      const info = gl.getProgramInfoLog(program);
      console.error(`Error linking program: ${info}`);
      gl.deleteProgram(program);
      DeleteShaders(...shaders);
      return null;
    }
    return program;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/shaders/CreateShader.ts
  function CreateShader(source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!status) {
      const info = gl.getShaderInfoLog(shader);
      const sourceLines = source.split("\n").map((line, index) => {
        return `${index}: ${line}`;
      });
      console.error(`Error compiling shader: ${info}`, sourceLines.join("\n"));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/shaders/CreateUniformSetter.ts
  function CreateUniformSetter(uniform, location, isArray = false) {
    switch (uniform.type) {
      case gl.INT:
      case gl.BOOL: {
        if (isArray) {
          return (v) => {
            gl.uniform1iv(location, v);
          };
        } else {
          return (v) => {
            gl.uniform1i(location, v);
          };
        }
      }
      case gl.INT_VEC2:
      case gl.BOOL_VEC2: {
        return (v) => {
          gl.uniform2iv(location, v);
        };
      }
      case gl.INT_VEC3:
      case gl.BOOL_VEC3: {
        return (v) => {
          gl.uniform3iv(location, v);
        };
      }
      case gl.INT_VEC4:
      case gl.BOOL_VEC4: {
        return (v) => {
          gl.uniform4iv(location, v);
        };
      }
      case gl.FLOAT: {
        if (isArray) {
          return (v) => {
            gl.uniform1fv(location, v);
          };
        } else {
          return (v) => {
            gl.uniform1f(location, v);
          };
        }
      }
      case gl.FLOAT_VEC2: {
        return (v) => {
          gl.uniform2fv(location, v);
        };
      }
      case gl.FLOAT_VEC3: {
        return (v) => {
          gl.uniform3fv(location, v);
        };
      }
      case gl.FLOAT_VEC4: {
        return (v) => {
          gl.uniform4fv(location, v);
        };
      }
      case gl.FLOAT_MAT2: {
        return (v) => {
          gl.uniformMatrix2fv(location, false, v);
        };
      }
      case gl.FLOAT_MAT3: {
        return (v) => {
          gl.uniformMatrix3fv(location, false, v);
        };
      }
      case gl.FLOAT_MAT4: {
        return (v) => {
          gl.uniformMatrix4fv(location, false, v);
        };
      }
      case gl.SAMPLER_2D:
      case gl.SAMPLER_CUBE: {
        if (uniform.size > 1) {
          return (v) => {
            gl.uniform1iv(location, v);
          };
        } else {
          return (v) => {
            gl.uniform1i(location, v);
          };
        }
      }
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/shaders/CreateUniforms.ts
  function CreateUniforms(program) {
    const uniforms = new Map();
    const total = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < total; i++) {
      const uniform = gl.getActiveUniform(program, i);
      let name = uniform.name;
      if (name.startsWith("gl_") || name.startsWith("webgl_")) {
        continue;
      }
      const location = gl.getUniformLocation(program, name);
      if (location) {
        let isArray = false;
        if (name.endsWith("[0]")) {
          name = name.slice(0, -3);
          isArray = uniform.size > 1;
        }
        uniforms.set(name, CreateUniformSetter(uniform, location, isArray));
      }
    }
    return uniforms;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/shaders/DefaultQuadUniforms.ts
  var DefaultQuadUniforms = {
    uProjectionMatrix: new Float32Array(16),
    uCameraMatrix: new Float32Array(16),
    uTexture: 0,
    uColorMatrix: new Float32Array([
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ]),
    uColorOffset: new Float32Array(4)
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/glsl/SINGLE_QUAD_FRAG.ts
  var SINGLE_QUAD_FRAG = `#define SHADER_NAME SINGLE_QUAD_FRAG

precision highp float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;
uniform mat4 uColorMatrix;
uniform vec4 uColorOffset;

void main (void)
{
    vec4 color = texture2D(uTexture, vTextureCoord);

    //  Un pre-mult alpha
    if (color.a > 0.0)
    {
        color.rgb /= color.a;
    }

    vec4 result = color * uColorMatrix + (uColorOffset / 255.0);

    //  Pre-mult alpha
    result.rgb *= result.a;

    gl_FragColor = vec4(result.rgb, result.a);
}`;

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/glsl/SINGLE_QUAD_VERT.ts
  var SINGLE_QUAD_VERT = `#define SHADER_NAME SINGLE_QUAD_VERT

precision highp float;

attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute float aTextureId;
attribute vec4 aTintColor;

uniform mat4 uProjectionMatrix;
uniform mat4 uCameraMatrix;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

void main (void)
{
    vTextureCoord = aTextureCoord;
    vTextureId = aTextureId;
    vTintColor = aTintColor;

    gl_Position = uProjectionMatrix * uCameraMatrix * vec4(aVertexPosition, 0.0, 1.0);
}`;

  // Users/rich/Documents/GitHub/phaser-genesis/src/textures/UpdateFrameUVs.ts
  function UpdateFrameUVs(frame2) {
    const { x, y, width, height } = frame2;
    const baseTextureWidth = frame2.texture.width;
    const baseTextureHeight = frame2.texture.height;
    frame2.u0 = x / baseTextureWidth;
    frame2.v0 = y / baseTextureHeight;
    frame2.u1 = (x + width) / baseTextureWidth;
    frame2.v1 = (y + height) / baseTextureHeight;
    return frame2;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/textures/Frame.ts
  var Frame = class {
    texture;
    key;
    x;
    y;
    width;
    height;
    trimmed = false;
    sourceSizeWidth;
    sourceSizeHeight;
    spriteSourceSizeX;
    spriteSourceSizeY;
    spriteSourceSizeWidth;
    spriteSourceSizeHeight;
    pivot;
    u0;
    v0;
    u1;
    v1;
    constructor(texture, key, x, y, width, height) {
      this.texture = texture;
      this.key = key;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.sourceSizeWidth = width;
      this.sourceSizeHeight = height;
      UpdateFrameUVs(this);
    }
    destroy() {
      this.texture = null;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/textures/SetFrameSize.ts
  function SetFrameSize(frame2, width, height) {
    frame2.width = width;
    frame2.height = height;
    frame2.sourceSizeWidth = width;
    frame2.sourceSizeHeight = height;
    return UpdateFrameUVs(frame2);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/textures/Texture.ts
  var Texture = class {
    key = "";
    locked = true;
    width;
    height;
    image;
    binding;
    firstFrame;
    frames;
    data;
    constructor(image, width, height, glConfig) {
      if (image) {
        width = image.width;
        height = image.height;
      }
      this.image = image;
      this.width = width;
      this.height = height;
      this.frames = new Map();
      this.data = {};
      this.addFrame("__BASE", 0, 0, width, height);
      BindingQueue.add(this, glConfig);
    }
    addFrame(key, x, y, width, height) {
      if (this.frames.has(key)) {
        return null;
      }
      const frame2 = new Frame(this, key, x, y, width, height);
      this.frames.set(key, frame2);
      if (!this.firstFrame || this.firstFrame.key === "__BASE") {
        this.firstFrame = frame2;
      }
      return frame2;
    }
    getFrame(key) {
      if (!key) {
        return this.firstFrame;
      }
      if (key instanceof Frame) {
        key = key.key;
      }
      let frame2 = this.frames.get(key);
      if (!frame2) {
        console.warn(`Frame missing: ${key}`);
        frame2 = this.firstFrame;
      }
      return frame2;
    }
    setSize(width, height) {
      this.width = width;
      this.height = height;
      const frame2 = this.frames.get("__BASE");
      SetFrameSize(frame2, width, height);
    }
    update(image, glConfig) {
      this.image = image;
      this.setSize(image.width, image.height);
      BindingQueue.add(this, glConfig);
    }
    destroy() {
      if (this.binding) {
        this.binding.destroy();
      }
      this.frames.clear();
      this.binding = null;
      this.data = null;
      this.image = null;
      this.firstFrame = null;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/shaders/Shader.ts
  var Shader = class {
    program;
    attributes;
    uniforms;
    uniformSetters;
    texture;
    framebuffer;
    renderToFramebuffer = false;
    renderToDepthbuffer = false;
    isActive = false;
    constructor(config) {
      if (config) {
        this.fromConfig(config);
      }
    }
    fromConfig(config) {
      const {
        attributes = DefaultQuadAttributes,
        fragmentShader = SINGLE_QUAD_FRAG,
        height = GetHeight(),
        renderToFramebuffer = false,
        renderToDepthbuffer = false,
        resolution = GetResolution(),
        vertexShader = SINGLE_QUAD_VERT,
        width = GetWidth(),
        uniforms = DefaultQuadUniforms
      } = config;
      this.create(fragmentShader, vertexShader, uniforms, attributes);
      if (renderToFramebuffer) {
        this.renderToFramebuffer = true;
        const texture = new Texture(null, width * resolution, height * resolution);
        const binding = new GLTextureBinding(texture);
        binding.framebuffer = CreateFramebuffer(binding.texture);
        if (renderToDepthbuffer) {
          this.renderToDepthbuffer = true;
          binding.depthbuffer = CreateDepthBuffer(binding.framebuffer, texture.width, texture.height);
        }
        this.texture = texture;
        this.framebuffer = binding.framebuffer;
      }
    }
    create(fragmentShaderSource, vertexShaderSource, uniforms, attribs) {
      const fragmentShader = CreateShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
      const vertexShader = CreateShader(vertexShaderSource, gl.VERTEX_SHADER);
      if (!fragmentShader || !vertexShader) {
        return;
      }
      const program = CreateProgram(fragmentShader, vertexShader);
      if (!program) {
        return;
      }
      const currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);
      gl.useProgram(program);
      this.program = program;
      this.uniformSetters = CreateUniforms(program);
      this.uniforms = new Map();
      for (const [key, value] of Object.entries(uniforms)) {
        if (this.uniformSetters.has(key)) {
          this.uniforms.set(key, value);
        }
      }
      this.attributes = CreateAttributes(program, attribs);
      gl.useProgram(currentProgram);
      this.isActive = false;
    }
    updateUniforms(renderPass) {
    }
    bind(renderPass) {
      const uniforms = this.uniforms;
      uniforms.set("uProjectionMatrix", renderPass.projectionMatrix);
      uniforms.set("uCameraMatrix", renderPass.cameraMatrix);
      this.updateUniforms(renderPass);
      return this.setUniforms(renderPass);
    }
    setUniform(key, value) {
      const uniforms = this.uniforms;
      if (uniforms.has(key)) {
        uniforms.set(key, value);
        const setter = this.uniformSetters.get(key);
        setter(value);
      }
    }
    setUniforms(renderPass) {
      if (!this.program) {
        return false;
      }
      gl.useProgram(this.program);
      this.isActive = true;
      const uniforms = this.uniforms;
      for (const [name, setter] of this.uniformSetters.entries()) {
        setter(uniforms.get(name));
      }
      return true;
    }
    setAttributes(renderPass) {
      if (this.program) {
        const stride = renderPass.vertexbuffer.current.vertexByteSize;
        this.attributes.forEach((attrib) => {
          gl.vertexAttribPointer(attrib.index, attrib.size, attrib.type, attrib.normalized, stride, attrib.offset);
        });
      }
    }
    destroy() {
      DeleteShaders(this.program);
      DeleteGLTexture(this.texture);
      DeleteFramebuffer(this.framebuffer);
      this.uniforms.clear();
      this.uniformSetters.clear();
      this.attributes.clear();
      this.program = null;
      this.texture = null;
      this.framebuffer = null;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/shaders/QuadShader.ts
  var QuadShader = class extends Shader {
    constructor(config = {}) {
      config.attributes = config?.attributes || DefaultQuadAttributes;
      super(config);
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/shaders/MultiTextureQuadShader.ts
  var MultiTextureQuadShader = class extends QuadShader {
    constructor(config = {}) {
      config.fragmentShader = config?.fragmentShader || MULTI_QUAD_FRAG;
      super(config);
    }
    create(fragmentShaderSource, vertexShaderSource, uniforms, attribs) {
      const maxTextures = GetMaxTextures();
      fragmentShaderSource = fragmentShaderSource.replace(/%count%/gi, `${maxTextures}`);
      super.create(fragmentShaderSource, vertexShaderSource, uniforms, attribs);
    }
    bind(renderPass) {
      this.uniforms.set("uTexture", renderPass.textures.textureIndex);
      return super.bind(renderPass);
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/renderpass/ShaderStack.ts
  var ShaderStack = class {
    renderPass;
    stack;
    active;
    default;
    index;
    constructor(renderPass) {
      this.renderPass = renderPass;
      this.stack = [];
    }
    get current() {
      return this.stack[this.index];
    }
    add(shader, textureID) {
      const entry = { shader, textureID };
      this.index++;
      if (this.index === this.stack.length) {
        this.stack.push(entry);
      } else {
        this.stack[this.index] = entry;
      }
      return entry;
    }
    bindDefault() {
      this.index = 0;
      this.bind(this.default);
    }
    bind(entry) {
      if (!entry) {
        entry = this.current;
      }
      if (!entry.shader.isActive) {
        const success = entry.shader.bind(this.renderPass, entry.textureID);
        if (success) {
          entry.shader.setAttributes(this.renderPass);
          if (this.active && this.active !== entry.shader) {
            this.active.isActive = false;
          }
          this.active = entry.shader;
        }
      }
    }
    pop() {
      this.index--;
      this.bind();
    }
    set(shader, textureID) {
      const entry = this.add(shader, textureID);
      this.bind(entry);
    }
    setDefault(shader, textureID) {
      const entry = { shader, textureID };
      this.stack[0] = entry;
      this.index = 0;
      this.default = entry;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/node_modules/bitecs/dist/index.mjs
  var TYPES_ENUM = {
    i8: "i8",
    ui8: "ui8",
    ui8c: "ui8c",
    i16: "i16",
    ui16: "ui16",
    i32: "i32",
    ui32: "ui32",
    f32: "f32",
    f64: "f64",
    eid: "eid"
  };
  var TYPES_NAMES = {
    i8: "Int8",
    ui8: "Uint8",
    ui8c: "Uint8Clamped",
    i16: "Int16",
    ui16: "Uint16",
    i32: "Int32",
    ui32: "Uint32",
    eid: "Uint32",
    f32: "Float32",
    f64: "Float64"
  };
  var TYPES = {
    i8: Int8Array,
    ui8: Uint8Array,
    ui8c: Uint8ClampedArray,
    i16: Int16Array,
    ui16: Uint16Array,
    i32: Int32Array,
    ui32: Uint32Array,
    f32: Float32Array,
    f64: Float64Array,
    eid: Uint32Array
  };
  var UNSIGNED_MAX = {
    uint8: 2 ** 8,
    uint16: 2 ** 16,
    uint32: 2 ** 32
  };
  var roundToMultiple = (mul) => (x) => Math.ceil(x / mul) * mul;
  var roundToMultiple4 = roundToMultiple(4);
  var $storeRef = Symbol("storeRef");
  var $storeSize = Symbol("storeSize");
  var $storeMaps = Symbol("storeMaps");
  var $storeFlattened = Symbol("storeFlattened");
  var $storeBase = Symbol("storeBase");
  var $storeType = Symbol("storeType");
  var $storeArrayCounts = Symbol("storeArrayCount");
  var $storeSubarrays = Symbol("storeSubarrays");
  var $subarrayCursors = Symbol("subarrayCursors");
  var $subarray = Symbol("subarray");
  var $subarrayFrom = Symbol("subarrayFrom");
  var $subarrayTo = Symbol("subarrayTo");
  var $parentArray = Symbol("subStore");
  var $tagStore = Symbol("tagStore");
  var $queryShadow = Symbol("queryShadow");
  var $serializeShadow = Symbol("serializeShadow");
  var $indexType = Symbol("indexType");
  var $indexBytes = Symbol("indexBytes");
  var $isEidType = Symbol("isEidType");
  var stores = {};
  var resize = (ta, size) => {
    const newBuffer = new ArrayBuffer(size * ta.BYTES_PER_ELEMENT);
    const newTa = new ta.constructor(newBuffer);
    newTa.set(ta, 0);
    return newTa;
  };
  var createShadow = (store, key) => {
    if (!ArrayBuffer.isView(store)) {
      const shadowStore = store[$parentArray].slice(0).fill(0);
      store[key] = store.map((_, eid) => {
        const from = store[eid][$subarrayFrom];
        const to = store[eid][$subarrayTo];
        return shadowStore.subarray(from, to);
      });
    } else {
      store[key] = store.slice(0).fill(0);
    }
  };
  var resizeSubarray = (metadata, store, size) => {
    const cursors = metadata[$subarrayCursors];
    let type = store[$storeType];
    const length = store[0].length;
    const indexType = length <= UNSIGNED_MAX.uint8 ? "ui8" : length <= UNSIGNED_MAX.uint16 ? "ui16" : "ui32";
    const arrayCount = metadata[$storeArrayCounts][type];
    const summedLength = Array(arrayCount).fill(0).reduce((a, p) => a + length, 0);
    const array = new TYPES[type](roundToMultiple4(summedLength * size));
    array.set(metadata[$storeSubarrays][type]);
    metadata[$storeSubarrays][type] = array;
    array[$indexType] = TYPES_NAMES[indexType];
    array[$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
    const start = cursors[type];
    let end = 0;
    for (let eid = 0; eid < size; eid++) {
      const from = cursors[type] + eid * length;
      const to = from + length;
      store[eid] = metadata[$storeSubarrays][type].subarray(from, to);
      store[eid][$subarrayFrom] = from;
      store[eid][$subarrayTo] = to;
      store[eid][$subarray] = true;
      store[eid][$indexType] = TYPES_NAMES[indexType];
      store[eid][$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
      end = to;
    }
    cursors[type] = end;
    store[$parentArray] = metadata[$storeSubarrays][type].subarray(start, end);
  };
  var resizeRecursive = (metadata, store, size) => {
    Object.keys(store).forEach((key) => {
      const ta = store[key];
      if (Array.isArray(ta)) {
        resizeSubarray(metadata, ta, size);
        store[$storeFlattened].push(ta);
      } else if (ArrayBuffer.isView(ta)) {
        store[key] = resize(ta, size);
        store[$storeFlattened].push(store[key]);
      } else if (typeof ta === "object") {
        resizeRecursive(metadata, store[key], size);
      }
    });
  };
  var resizeStore = (store, size) => {
    if (store[$tagStore])
      return;
    store[$storeSize] = size;
    store[$storeFlattened].length = 0;
    Object.keys(store[$subarrayCursors]).forEach((k) => {
      store[$subarrayCursors][k] = 0;
    });
    resizeRecursive(store, store, size);
  };
  var resetStoreFor = (store, eid) => {
    if (store[$storeFlattened]) {
      store[$storeFlattened].forEach((ta) => {
        if (ArrayBuffer.isView(ta))
          ta[eid] = 0;
        else
          ta[eid].fill(0);
      });
    }
  };
  var createTypeStore = (type, length) => {
    const totalBytes = length * TYPES[type].BYTES_PER_ELEMENT;
    const buffer = new ArrayBuffer(totalBytes);
    const store = new TYPES[type](buffer);
    store[$isEidType] = type === TYPES_ENUM.eid;
    return store;
  };
  var createArrayStore = (metadata, type, length) => {
    const size = metadata[$storeSize];
    const store = Array(size).fill(0);
    store[$storeType] = type;
    store[$isEidType] = type === TYPES_ENUM.eid;
    const cursors = metadata[$subarrayCursors];
    const indexType = length < UNSIGNED_MAX.uint8 ? "ui8" : length < UNSIGNED_MAX.uint16 ? "ui16" : "ui32";
    if (!length)
      throw new Error("bitECS - Must define component array length");
    if (!TYPES[type])
      throw new Error(`bitECS - Invalid component array property type ${type}`);
    if (!metadata[$storeSubarrays][type]) {
      const arrayCount = metadata[$storeArrayCounts][type];
      const summedLength = Array(arrayCount).fill(0).reduce((a, p) => a + length, 0);
      const array = new TYPES[type](roundToMultiple4(summedLength * size));
      metadata[$storeSubarrays][type] = array;
      array[$indexType] = TYPES_NAMES[indexType];
      array[$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
    }
    const start = cursors[type];
    let end = 0;
    for (let eid = 0; eid < size; eid++) {
      const from = cursors[type] + eid * length;
      const to = from + length;
      store[eid] = metadata[$storeSubarrays][type].subarray(from, to);
      store[eid][$subarrayFrom] = from;
      store[eid][$subarrayTo] = to;
      store[eid][$subarray] = true;
      store[eid][$indexType] = TYPES_NAMES[indexType];
      store[eid][$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
      end = to;
    }
    cursors[type] = end;
    store[$parentArray] = metadata[$storeSubarrays][type].subarray(start, end);
    return store;
  };
  var isArrayType = (x) => Array.isArray(x) && typeof x[0] === "string" && typeof x[1] === "number";
  var createStore = (schema, size) => {
    const $store = Symbol("store");
    if (!schema || !Object.keys(schema).length) {
      stores[$store] = {
        [$storeSize]: size,
        [$tagStore]: true,
        [$storeBase]: () => stores[$store]
      };
      return stores[$store];
    }
    schema = JSON.parse(JSON.stringify(schema));
    const arrayCounts = {};
    const collectArrayCounts = (s) => {
      const keys = Object.keys(s);
      for (const k of keys) {
        if (isArrayType(s[k])) {
          if (!arrayCounts[s[k][0]])
            arrayCounts[s[k][0]] = 0;
          arrayCounts[s[k][0]]++;
        } else if (s[k] instanceof Object) {
          collectArrayCounts(s[k]);
        }
      }
    };
    collectArrayCounts(schema);
    const metadata = {
      [$storeSize]: size,
      [$storeMaps]: {},
      [$storeSubarrays]: {},
      [$storeRef]: $store,
      [$subarrayCursors]: Object.keys(TYPES).reduce((a, type) => ({ ...a, [type]: 0 }), {}),
      [$storeFlattened]: [],
      [$storeArrayCounts]: arrayCounts
    };
    if (schema instanceof Object && Object.keys(schema).length) {
      const recursiveTransform = (a, k) => {
        if (typeof a[k] === "string") {
          a[k] = createTypeStore(a[k], size);
          a[k][$storeBase] = () => stores[$store];
          metadata[$storeFlattened].push(a[k]);
        } else if (isArrayType(a[k])) {
          const [type, length] = a[k];
          a[k] = createArrayStore(metadata, type, length);
          a[k][$storeBase] = () => stores[$store];
          metadata[$storeFlattened].push(a[k]);
        } else if (a[k] instanceof Object) {
          a[k] = Object.keys(a[k]).reduce(recursiveTransform, a[k]);
        }
        return a;
      };
      stores[$store] = Object.assign(Object.keys(schema).reduce(recursiveTransform, schema), metadata);
      stores[$store][$storeBase] = () => stores[$store];
      return stores[$store];
    }
  };
  var SparseSet = () => {
    const dense = [];
    const sparse = [];
    dense.sort = function(comparator) {
      const result = Array.prototype.sort.call(this, comparator);
      for (let i = 0; i < dense.length; i++) {
        sparse[dense[i]] = i;
      }
      return result;
    };
    const has = (val) => dense[sparse[val]] === val;
    const add = (val) => {
      if (has(val))
        return;
      sparse[val] = dense.push(val) - 1;
    };
    const remove = (val) => {
      if (!has(val))
        return;
      const index = sparse[val];
      const swapped = dense.pop();
      if (swapped !== val) {
        dense[index] = swapped;
        sparse[swapped] = index;
      }
    };
    return {
      add,
      remove,
      has,
      sparse,
      dense
    };
  };
  var newEntities = new Map();
  var $entityMasks = Symbol("entityMasks");
  var $entityComponents = Symbol("entityComponents");
  var $entitySparseSet = Symbol("entitySparseSet");
  var $entityArray = Symbol("entityArray");
  var $entityIndices = Symbol("entityIndices");
  var $removedEntities = Symbol("removedEntities");
  var defaultSize = 1e5;
  var globalEntityCursor = 0;
  var globalSize = defaultSize;
  var getGlobalSize = () => globalSize;
  var removed = [];
  var resetGlobals = () => {
    globalSize = defaultSize;
    globalEntityCursor = 0;
    removed.length = 0;
  };
  var getDefaultSize = () => defaultSize;
  var setDefaultSize = (size) => {
    defaultSize = size;
    resetGlobals();
  };
  var getEntityCursor = () => globalEntityCursor;
  var eidToWorld = new Map();
  var addEntity = (world2) => {
    const eid = removed.length > 0 ? removed.shift() : globalEntityCursor++;
    world2[$entitySparseSet].add(eid);
    eidToWorld.set(eid, world2);
    if (globalEntityCursor >= defaultSize) {
      console.error(`bitECS - max entities of ${defaultSize} reached, increase with setDefaultSize function.`);
    }
    world2[$notQueries].forEach((q) => {
      const match = queryCheckEntity(world2, q, eid);
      if (match)
        queryAddEntity(q, eid);
    });
    world2[$entityComponents].set(eid, new Set());
    return eid;
  };
  var removeEntity = (world2, eid) => {
    if (!world2[$entitySparseSet].has(eid))
      return;
    world2[$queries].forEach((q) => {
      queryRemoveEntity(world2, q, eid);
    });
    removed.push(eid);
    world2[$entitySparseSet].remove(eid);
    world2[$entityComponents].delete(eid);
    for (let i = 0; i < world2[$entityMasks].length; i++)
      world2[$entityMasks][i][eid] = 0;
  };
  function Any(...comps) {
    return function QueryAny() {
      return comps;
    };
  }
  function All(...comps) {
    return function QueryAll() {
      return comps;
    };
  }
  function None(...comps) {
    return function QueryNone() {
      return comps;
    };
  }
  var $queries = Symbol("queries");
  var $notQueries = Symbol("notQueries");
  var $queryAny = Symbol("queryAny");
  var $queryAll = Symbol("queryAll");
  var $queryNone = Symbol("queryNone");
  var $queryMap = Symbol("queryMap");
  var $dirtyQueries = Symbol("$dirtyQueries");
  var $queryComponents = Symbol("queryComponents");
  var $enterQuery = Symbol("enterQuery");
  var $exitQuery = Symbol("exitQuery");
  var registerQuery = (world2, query) => {
    const components2 = [];
    const notComponents = [];
    const changedComponents = [];
    query[$queryComponents].forEach((c) => {
      if (typeof c === "function") {
        const [comp, mod] = c();
        if (!world2[$componentMap].has(comp))
          registerComponent(world2, comp);
        if (mod === "not") {
          notComponents.push(comp);
        }
        if (mod === "changed") {
          changedComponents.push(comp);
          components2.push(comp);
        }
      } else {
        if (!world2[$componentMap].has(c))
          registerComponent(world2, c);
        components2.push(c);
      }
    });
    const mapComponents = (c) => world2[$componentMap].get(c);
    const allComponents = components2.concat(notComponents).map(mapComponents);
    const sparseSet = SparseSet();
    const archetypes = [];
    const changed = [];
    const toRemove = [];
    const entered = [];
    const exited = [];
    const generations = allComponents.map((c) => c.generationId).reduce((a, v) => {
      if (a.includes(v))
        return a;
      a.push(v);
      return a;
    }, []);
    const reduceBitflags = (a, c) => {
      if (!a[c.generationId])
        a[c.generationId] = 0;
      a[c.generationId] |= c.bitflag;
      return a;
    };
    const masks = components2.map(mapComponents).reduce(reduceBitflags, {});
    const notMasks = notComponents.map(mapComponents).reduce(reduceBitflags, {});
    const hasMasks = allComponents.reduce(reduceBitflags, {});
    const flatProps = components2.filter((c) => !c[$tagStore]).map((c) => Object.getOwnPropertySymbols(c).includes($storeFlattened) ? c[$storeFlattened] : [c]).reduce((a, v) => a.concat(v), []);
    const shadows = flatProps.map((prop) => {
      const $ = Symbol();
      createShadow(prop, $);
      return prop[$];
    }, []);
    const q = Object.assign(sparseSet, {
      archetypes,
      changed,
      components: components2,
      notComponents,
      changedComponents,
      masks,
      notMasks,
      hasMasks,
      generations,
      flatProps,
      toRemove,
      entered,
      exited,
      shadows
    });
    world2[$queryMap].set(query, q);
    world2[$queries].add(q);
    allComponents.forEach((c) => {
      c.queries.add(q);
    });
    if (notComponents.length)
      world2[$notQueries].add(q);
    for (let eid = 0; eid < getEntityCursor(); eid++) {
      if (!world2[$entitySparseSet].has(eid))
        continue;
      if (queryCheckEntity(world2, q, eid)) {
        queryAddEntity(q, eid);
      }
    }
  };
  var diff = (q, clearDiff) => {
    if (clearDiff)
      q.changed = [];
    const { flatProps, shadows } = q;
    for (let i = 0; i < q.dense.length; i++) {
      const eid = q.dense[i];
      let dirty = false;
      for (let pid = 0; pid < flatProps.length; pid++) {
        const prop = flatProps[pid];
        const shadow = shadows[pid];
        if (ArrayBuffer.isView(prop[eid])) {
          for (let i2 = 0; i2 < prop[eid].length; i2++) {
            if (prop[eid][i2] !== shadow[eid][i2]) {
              dirty = true;
              shadow[eid][i2] = prop[eid][i2];
              break;
            }
          }
        } else {
          if (prop[eid] !== shadow[eid]) {
            dirty = true;
            shadow[eid] = prop[eid];
          }
        }
      }
      if (dirty)
        q.changed.push(eid);
    }
    return q.changed;
  };
  var flatten = (a, v) => a.concat(v);
  var aggregateComponentsFor = (mod) => (x) => x.filter((f) => f.name === mod().constructor.name).reduce(flatten);
  var getAnyComponents = aggregateComponentsFor(Any);
  var getAllComponents = aggregateComponentsFor(All);
  var getNoneComponents = aggregateComponentsFor(None);
  var defineQuery = (...args) => {
    let components2;
    let any, all, none;
    if (Array.isArray(args[0])) {
      components2 = args[0];
    } else {
      any = getAnyComponents(args);
      all = getAllComponents(args);
      none = getNoneComponents(args);
    }
    if (components2 === void 0 || components2[$componentMap] !== void 0) {
      return (world2) => world2 ? world2[$entityArray] : components2[$entityArray];
    }
    const query = function(world2, clearDiff = true) {
      if (!world2[$queryMap].has(query))
        registerQuery(world2, query);
      const q = world2[$queryMap].get(query);
      commitRemovals(world2);
      if (q.changedComponents.length)
        return diff(q, clearDiff);
      return q.dense;
    };
    query[$queryComponents] = components2;
    query[$queryAny] = any;
    query[$queryAll] = all;
    query[$queryNone] = none;
    return query;
  };
  var queryCheckEntity = (world2, q, eid) => {
    const { masks, notMasks, generations } = q;
    let or = 0;
    for (let i = 0; i < generations.length; i++) {
      const generationId = generations[i];
      const qMask = masks[generationId];
      const qNotMask = notMasks[generationId];
      const eMask = world2[$entityMasks][generationId][eid];
      if (qNotMask && (eMask & qNotMask) > 0) {
        return false;
      }
      if (qMask && (eMask & qMask) !== qMask) {
        return false;
      }
    }
    return true;
  };
  var queryAddEntity = (q, eid) => {
    if (q.has(eid))
      return;
    q.add(eid);
    q.entered.push(eid);
  };
  var queryCommitRemovals = (q) => {
    while (q.toRemove.length) {
      q.remove(q.toRemove.pop());
    }
  };
  var commitRemovals = (world2) => {
    world2[$dirtyQueries].forEach(queryCommitRemovals);
    world2[$dirtyQueries].clear();
  };
  var queryRemoveEntity = (world2, q, eid) => {
    if (!q.has(eid))
      return;
    q.toRemove.push(eid);
    world2[$dirtyQueries].add(q);
    q.exited.push(eid);
  };
  var $componentMap = Symbol("componentMap");
  var components = [];
  var defineComponent = (schema) => {
    const component = createStore(schema, getDefaultSize());
    if (schema && Object.keys(schema).length)
      components.push(component);
    return component;
  };
  var incrementBitflag = (world2) => {
    world2[$bitflag] *= 2;
    if (world2[$bitflag] >= 2 ** 31) {
      world2[$bitflag] = 1;
      world2[$entityMasks].push(new Uint32Array(world2[$size]));
    }
  };
  var registerComponent = (world2, component) => {
    if (!component)
      throw new Error(`bitECS - Cannot register null or undefined component`);
    const queries = new Set();
    const notQueries = new Set();
    const changedQueries = new Set();
    world2[$queries].forEach((q) => {
      if (q.components.includes(component)) {
        queries.add(q);
      }
    });
    world2[$componentMap].set(component, {
      generationId: world2[$entityMasks].length - 1,
      bitflag: world2[$bitflag],
      store: component,
      queries,
      notQueries,
      changedQueries
    });
    if (component[$storeSize] < world2[$size]) {
      resizeStore(component, world2[$size]);
    }
    incrementBitflag(world2);
  };
  var hasComponent = (world2, component, eid) => {
    const registeredComponent = world2[$componentMap].get(component);
    if (!registeredComponent)
      return;
    const { generationId, bitflag } = registeredComponent;
    const mask = world2[$entityMasks][generationId][eid];
    return (mask & bitflag) === bitflag;
  };
  var addComponent = (world2, component, eid, reset = true) => {
    if (!world2[$componentMap].has(component))
      registerComponent(world2, component);
    if (hasComponent(world2, component, eid))
      return;
    const c = world2[$componentMap].get(component);
    const { generationId, bitflag, queries, notQueries } = c;
    world2[$entityMasks][generationId][eid] |= bitflag;
    queries.forEach((q) => {
      const match = queryCheckEntity(world2, q, eid);
      if (match)
        queryAddEntity(q, eid);
      else
        queryRemoveEntity(world2, q, eid);
    });
    world2[$entityComponents].get(eid).add(component);
    if (reset)
      resetStoreFor(component, eid);
  };
  var removeComponent = (world2, component, eid, reset = false) => {
    const c = world2[$componentMap].get(component);
    const { generationId, bitflag, queries, notQueries } = c;
    if (!(world2[$entityMasks][generationId][eid] & bitflag))
      return;
    world2[$entityMasks][generationId][eid] &= ~bitflag;
    queries.forEach((q) => {
      const match = queryCheckEntity(world2, q, eid);
      if (match)
        queryAddEntity(q, eid);
      else
        queryRemoveEntity(world2, q, eid);
    });
    world2[$entityComponents].get(eid).delete(component);
    if (reset)
      resetStoreFor(component, eid);
  };
  var $size = Symbol("size");
  var $resizeThreshold = Symbol("resizeThreshold");
  var $bitflag = Symbol("bitflag");
  var $archetypes = Symbol("archetypes");
  var $localEntities = Symbol("localEntities");
  var worlds = [];
  var createWorld = () => {
    const world2 = {};
    resetWorld(world2);
    worlds.push(world2);
    return world2;
  };
  var resetWorld = (world2) => {
    const size = getGlobalSize();
    world2[$size] = size;
    if (world2[$entityArray])
      world2[$entityArray].forEach((eid) => removeEntity(world2, eid));
    world2[$entityMasks] = [new Uint32Array(size)];
    world2[$entityComponents] = new Map();
    world2[$archetypes] = [];
    world2[$entitySparseSet] = SparseSet();
    world2[$entityArray] = world2[$entitySparseSet].dense;
    world2[$bitflag] = 1;
    world2[$componentMap] = new Map();
    world2[$queryMap] = new Map();
    world2[$queries] = new Set();
    world2[$notQueries] = new Set();
    world2[$dirtyQueries] = new Set();
    world2[$localEntities] = new Map();
    return world2;
  };
  var Types = TYPES_ENUM;

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/transform/Transform2DComponent.ts
  var TRANSFORM = {
    IS_ROOT: 0,
    DIRTY: 1,
    X: 2,
    Y: 3,
    ROTATION: 4,
    SCALE_X: 5,
    SCALE_Y: 6,
    SKEW_X: 7,
    SKEW_Y: 8,
    AXIS_ALIGNED: 9,
    FRAME_X1: 10,
    FRAME_Y1: 11,
    FRAME_X2: 12,
    FRAME_Y2: 13,
    LOCAL_A: 14,
    LOCAL_B: 15,
    LOCAL_C: 16,
    LOCAL_D: 17,
    LOCAL_TX: 18,
    LOCAL_TY: 19,
    BOUNDS_X1: 20,
    BOUNDS_Y1: 21,
    BOUNDS_X2: 22,
    BOUNDS_Y2: 23,
    ORIGIN_X: 24,
    ORIGIN_Y: 25,
    WORLD_A: 26,
    WORLD_B: 27,
    WORLD_C: 28,
    WORLD_D: 29,
    WORLD_TX: 30,
    WORLD_TY: 31,
    FRAME_WIDTH: 32,
    FRAME_HEIGHT: 33,
    DIRTY_WORLD: 34,
    IN_VIEW: 35,
    UPDATED: 36
  };
  var Transform2DComponent = defineComponent({
    data: [Types.f32, 37]
  });

  // Users/rich/Documents/GitHub/phaser-genesis/src/GameObjectWorld.ts
  if (window["defaultSize"]) {
    setDefaultSize(parseInt(window["defaultSize"]));
  } else {
    setDefaultSize(1e4);
  }
  var world = createWorld();
  var GameObjectWorld = world;

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/transform/AddTransform2DComponent.ts
  function AddTransform2DComponent(id, x = 0, y = 0, originX = 0, originY = 0) {
    addComponent(GameObjectWorld, Transform2DComponent, id);
    const data = Transform2DComponent.data[id];
    data[TRANSFORM.IS_ROOT] = 0;
    data[TRANSFORM.DIRTY] = 1;
    data[TRANSFORM.X] = x;
    data[TRANSFORM.Y] = y;
    data[TRANSFORM.SCALE_X] = 1;
    data[TRANSFORM.SCALE_Y] = 1;
    data[TRANSFORM.ORIGIN_X] = originX;
    data[TRANSFORM.ORIGIN_Y] = originY;
    data[TRANSFORM.AXIS_ALIGNED] = 1;
    data[TRANSFORM.IN_VIEW] = 1;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/utils/NOOP.ts
  function NOOP() {
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/math/mat4/Matrix4.ts
  var Matrix4 = class {
    data;
    onChange;
    constructor(src) {
      const data = new Float32Array(16);
      this.data = data;
      this.onChange = NOOP;
      if (src) {
        if (Array.isArray(src)) {
          this.fromArray(src);
        } else {
          this.fromArray(src.data);
        }
      } else {
        data[0] = 1;
        data[5] = 1;
        data[10] = 1;
        data[15] = 1;
      }
    }
    set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
      this.data.set([
        m00,
        m01,
        m02,
        m03,
        m10,
        m11,
        m12,
        m13,
        m20,
        m21,
        m22,
        m23,
        m30,
        m31,
        m32,
        m33
      ]);
      this.onChange(this);
      return this;
    }
    toArray(dst = [], index = 0) {
      const data = this.data;
      for (let i = 0; i < 16; i++) {
        dst[index + i] = data[i];
      }
      return dst;
    }
    fromArray(src, index = 0) {
      const data = this.data;
      for (let i = 0; i < 16; i++) {
        data[i] = src[index + i];
      }
      this.onChange(this);
      return this;
    }
    toString() {
      return "[ mat4=" + this.data.join(", ") + " ]";
    }
    destroy() {
      this.onChange = NOOP;
      this.data = null;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/transform/SetBounds.ts
  function SetBounds(id, x, y, right, bottom) {
    const data = Transform2DComponent.data[id];
    data[TRANSFORM.BOUNDS_X1] = x;
    data[TRANSFORM.BOUNDS_Y1] = y;
    data[TRANSFORM.BOUNDS_X2] = right;
    data[TRANSFORM.BOUNDS_Y2] = bottom;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/camera/StaticCamera.ts
  var StaticCamera = class {
    id = addEntity(GameObjectWorld);
    type = "StaticCamera";
    name = "";
    isDirty = true;
    matrix;
    constructor(width, height) {
      const id = this.id;
      AddTransform2DComponent(id, 0, 0, 0, 0);
      this.matrix = new Matrix4();
      this.reset(width, height);
    }
    getBoundsX() {
      return Transform2DComponent.data[this.id][TRANSFORM.BOUNDS_X1];
    }
    getBoundsY() {
      return Transform2DComponent.data[this.id][TRANSFORM.BOUNDS_Y1];
    }
    getBoundsRight() {
      return Transform2DComponent.data[this.id][TRANSFORM.BOUNDS_X2];
    }
    getBoundsBottom() {
      return Transform2DComponent.data[this.id][TRANSFORM.BOUNDS_Y2];
    }
    getMatrix() {
      return this.matrix.data;
    }
    updateBounds() {
      this.isDirty = true;
      return true;
    }
    update() {
      return false;
    }
    reset(width, height) {
      SetBounds(this.id, 0, 0, width, height);
    }
    destroy() {
      const id = this.id;
      removeComponent(GameObjectWorld, Transform2DComponent, id);
      removeEntity(GameObjectWorld, id);
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/renderpass/CreateTempTextures.ts
  function CreateTempTextures() {
    let maxGPUTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    let maxCombinedGPUTextures = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
    console.log("MAX GPU", maxGPUTextures, "MAX COMBINED", maxCombinedGPUTextures);
    const maxConfigTextures = GetMaxTextures();
    if (maxConfigTextures === 0 || maxConfigTextures > maxGPUTextures) {
      SetMaxTextures(maxGPUTextures);
    } else {
      maxGPUTextures = maxConfigTextures;
    }
    const textures = [];
    for (let i = 0; i < maxGPUTextures; i++) {
      const tempTexture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + i);
      gl.bindTexture(gl.TEXTURE_2D, tempTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
      textures.push([i, tempTexture]);
    }
    return textures;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/textures/WhiteTexture.ts
  var instance;
  var WhiteTexture = {
    get: () => {
      return instance;
    },
    set: (texture) => {
      instance = texture;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/renderpass/TextureStack.ts
  var TextureStack = class {
    renderPass;
    textures;
    tempTextures;
    textureIndex;
    maxTextures;
    constructor(renderPass) {
      this.renderPass = renderPass;
    }
    bind(texture, index = 0) {
      const binding = texture.binding;
      binding.bind(index);
      gl.activeTexture(gl.TEXTURE0 + index);
      gl.bindTexture(gl.TEXTURE_2D, binding.texture);
    }
    unbind(index = 0) {
      gl.activeTexture(gl.TEXTURE0 + index);
      gl.bindTexture(gl.TEXTURE_2D, this.tempTextures[index]);
    }
    unbindTexture(texture) {
      const index = texture.binding.textureUnit;
      const binding = texture.binding;
      binding.unbind();
      gl.activeTexture(gl.TEXTURE0 + index);
      gl.bindTexture(gl.TEXTURE_2D, this.tempTextures[index]);
    }
    setWhite() {
      return this.set(WhiteTexture.get());
    }
    set(texture) {
      if (!texture.binding) {
        return -1;
      }
      const binding = texture.binding;
      const textures = this.textures;
      if (!binding.isBound) {
        if (textures.size === this.maxTextures) {
          Flush(this.renderPass);
          this.clear();
        }
        const textureUnit = textures.size;
        gl.activeTexture(gl.TEXTURE0 + textureUnit);
        gl.bindTexture(gl.TEXTURE_2D, binding.texture);
        textures.set(textureUnit, texture);
        binding.bind(textureUnit);
      }
      return binding.textureUnit;
    }
    setDefault() {
      if (this.textures) {
        this.reset();
      }
      const tempTextures = CreateTempTextures();
      this.maxTextures = tempTextures.length;
      this.tempTextures = new Map(tempTextures);
      this.textures = new Map();
      this.textureIndex = [];
      this.tempTextures.forEach((texture, index) => {
        this.textureIndex.push(index);
      });
    }
    clear() {
      this.textures.forEach((texture) => texture.binding.unbind());
      this.textures.clear();
    }
    reset() {
      this.tempTextures.forEach((texture, index) => {
        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_2D, texture);
      });
      this.clear();
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/buffers/DeleteGLBuffer.ts
  function DeleteGLBuffer(buffer) {
    if (gl.isBuffer(buffer)) {
      gl.deleteBuffer(buffer);
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/buffers/VertexBuffer.ts
  var VertexBuffer = class {
    name;
    batchSize;
    dataSize;
    vertexElementSize;
    vertexByteSize;
    entryByteSize;
    bufferByteSize;
    data;
    vertexViewF32;
    vertexBuffer;
    entryElementSize;
    indexed = false;
    isDynamic = false;
    count = 0;
    offset = 0;
    elementsPerEntry;
    isBound = false;
    constructor(config = {}) {
      const {
        name = "VBO",
        batchSize = 1,
        dataSize = 4,
        isDynamic = true,
        elementsPerEntry = 3,
        vertexElementSize = 9
      } = config;
      this.name = name;
      this.batchSize = batchSize;
      this.dataSize = dataSize;
      this.vertexElementSize = vertexElementSize;
      this.isDynamic = isDynamic;
      this.elementsPerEntry = elementsPerEntry;
      this.vertexByteSize = vertexElementSize * dataSize;
      this.entryByteSize = this.vertexByteSize * elementsPerEntry;
      this.bufferByteSize = batchSize * this.entryByteSize;
      this.entryElementSize = this.vertexElementSize * this.elementsPerEntry;
      this.create();
    }
    resize(batchSize) {
      this.batchSize = batchSize;
      this.bufferByteSize = batchSize * this.entryByteSize;
      if (this.vertexBuffer) {
        DeleteGLBuffer(this.vertexBuffer);
      }
      this.create();
    }
    create() {
      const data = new ArrayBuffer(this.bufferByteSize);
      this.data = data;
      this.vertexViewF32 = new Float32Array(data);
      this.vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      const type = this.isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
      gl.bufferData(gl.ARRAY_BUFFER, data, type);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      this.isBound = false;
    }
    add(count) {
      this.count += count;
      this.offset += this.vertexElementSize * count;
    }
    reset() {
      this.count = 0;
      this.offset = 0;
    }
    canContain(count) {
      return this.count + count <= this.batchSize;
    }
    free() {
      return Math.max(0, 1 - this.count / this.batchSize);
    }
    bind() {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    }
    destroy() {
      DeleteGLBuffer(this.vertexBuffer);
      this.data = null;
      this.vertexViewF32 = null;
      this.vertexBuffer = null;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/renderpass/VertexBufferStack.ts
  var VertexBufferStack = class {
    renderPass;
    stack;
    active;
    default;
    index;
    constructor(renderPass) {
      this.renderPass = renderPass;
      this.stack = [];
    }
    get current() {
      return this.stack[this.index];
    }
    add(buffer) {
      this.index++;
      if (this.index === this.stack.length) {
        this.stack.push(buffer);
      } else {
        this.stack[this.index] = buffer;
      }
      return buffer;
    }
    bindDefault() {
      this.index = 0;
      this.bind(this.default);
    }
    bind(buffer) {
      if (!buffer) {
        buffer = this.current;
      }
      if (!buffer.isBound) {
        const indexBuffer = buffer.indexed ? buffer.indexBuffer : null;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.vertexBuffer);
        buffer.isBound = true;
        if (this.active && this.active !== buffer) {
          this.active.isBound = false;
        }
        this.active = buffer;
      }
    }
    pop() {
      this.index--;
      this.bind();
    }
    set(buffer) {
      const entry = this.add(buffer);
      this.bind(entry);
    }
    setDefault(buffer) {
      this.stack[0] = buffer;
      this.index = 0;
      this.default = buffer;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/geom/rectangle/RectangleContains.ts
  function RectangleContains(rect, x, y) {
    if (rect.width <= 0 || rect.height <= 0) {
      return false;
    }
    return rect.x <= x && rect.x + rect.width >= x && rect.y <= y && rect.y + rect.height >= y;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/geom/rectangle/Rectangle.ts
  var Rectangle = class {
    x;
    y;
    width;
    height;
    constructor(x = 0, y = 0, width = 0, height = 0) {
      this.set(x, y, width, height);
    }
    set(x = 0, y = 0, width = 0, height = 0) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      return this;
    }
    contains(x, y) {
      return RectangleContains(this, x, y);
    }
    set right(value) {
      if (value <= this.x) {
        this.width = 0;
      } else {
        this.width = value - this.x;
      }
    }
    get right() {
      return this.x + this.width;
    }
    set bottom(value) {
      if (value <= this.y) {
        this.height = 0;
      } else {
        this.height = value - this.y;
      }
    }
    get bottom() {
      return this.y + this.height;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/geom/rectangle/RectangleEquals.ts
  function RectangleEquals(rect, toCompare) {
    return rect.x === toCompare.x && rect.y === toCompare.y && rect.width === toCompare.width && rect.height === toCompare.height;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/renderpass/ViewportStack.ts
  var ViewportStack = class {
    renderPass;
    stack;
    active;
    default;
    index;
    constructor(renderPass) {
      this.renderPass = renderPass;
      this.stack = [];
    }
    get current() {
      return this.stack[this.index];
    }
    add(x = 0, y = 0, width = 0, height = 0) {
      const entry = new Rectangle(x, y, width, height);
      this.index++;
      if (this.index === this.stack.length) {
        this.stack.push(entry);
      } else {
        this.stack[this.index] = entry;
      }
      return entry;
    }
    bindDefault() {
      this.index = 0;
      this.bind(this.default);
    }
    bind(viewport) {
      if (!viewport) {
        viewport = this.current;
      }
      if (!this.active || !RectangleEquals(this.active, viewport)) {
        gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
        this.active = viewport;
      }
    }
    pop() {
      this.index--;
      this.bind();
    }
    set(x = 0, y = 0, width = 0, height = 0) {
      const entry = this.add(x, y, width, height);
      this.bind(entry);
    }
    setDefault(x = 0, y = 0, width = 0, height = 0) {
      const entry = new Rectangle(x, y, width, height);
      this.stack[0] = entry;
      this.index = 0;
      this.default = entry;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/renderpass/RenderPass.ts
  var RenderPass = class {
    renderer;
    projectionMatrix;
    cameraMatrix;
    count = 0;
    prevCount = 0;
    flushTotal = 0;
    framebuffer;
    vertexbuffer;
    blendMode;
    shader;
    viewport;
    textures;
    colorMatrix;
    quadShader;
    quadCamera;
    current2DCamera;
    constructor(renderer) {
      this.renderer = renderer;
      this.projectionMatrix = new Float32Array(16);
      this.framebuffer = new FramebufferStack(this);
      this.vertexbuffer = new VertexBufferStack(this);
      this.blendMode = new BlendModeStack(this);
      this.shader = new ShaderStack(this);
      this.viewport = new ViewportStack(this);
      this.textures = new TextureStack(this);
      this.colorMatrix = new ColorMatrixStack(this);
      this.reset();
    }
    getCurrentShader() {
      return this.shader.current.shader;
    }
    flush() {
      this.prevCount = this.count;
      this.count = 0;
      this.flushTotal++;
    }
    reset() {
      const gl2 = this.renderer.gl;
      this.quadShader = new QuadShader();
      this.quadCamera = new StaticCamera(this.renderer.width, this.renderer.height);
      this.textures.setDefault();
      this.framebuffer.setDefault();
      this.blendMode.setDefault(true, gl2.ONE, gl2.ONE_MINUS_SRC_ALPHA);
      this.colorMatrix.setDefault(DEFAULT_COLOR_MATRIX, DEFAULT_COLOR_OFFSET);
      this.vertexbuffer.setDefault(new VertexBuffer({ batchSize: GetBatchSize() }));
      this.shader.setDefault(GetMaxTextures() === 1 ? new QuadShader() : new MultiTextureQuadShader());
    }
    resize(width, height) {
      Mat4Ortho(this.projectionMatrix, 0, width, height, 0, -1e3, 1e3);
      this.quadCamera.reset(width, height);
      this.viewport.setDefault(0, 0, width, height);
    }
    isCameraDirty() {
      return this.current2DCamera.isDirty;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/renderpass/Start.ts
  function Start(renderPass) {
    if (!renderPass.current2DCamera) {
      renderPass.current2DCamera = renderPass.quadCamera;
      renderPass.cameraMatrix = renderPass.quadCamera.getMatrix();
    }
    renderPass.count = 0;
    renderPass.flushTotal = 0;
    renderPass.framebuffer.bindDefault();
    renderPass.blendMode.bindDefault();
    renderPass.viewport.bindDefault();
    renderPass.vertexbuffer.bindDefault();
    renderPass.shader.bindDefault();
    renderPass.colorMatrix.bindDefault();
    return renderPass;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/RendererInstance.ts
  var instance2;
  var RendererInstance = {
    get: () => {
      return instance2;
    },
    set: (renderer) => {
      instance2 = renderer;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/WebGLRendererInstance.ts
  var instance3;
  var WebGLRendererInstance = {
    get: () => {
      return instance3;
    },
    set: (renderer) => {
      instance3 = renderer;
      RendererInstance.set(renderer);
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/WebGLRenderer.ts
  var WebGLRenderer = class {
    canvas;
    gl;
    renderPass;
    clearColor = [0, 0, 0, 1];
    width;
    height;
    resolution;
    clearBeforeRender = true;
    optimizeRedraw = true;
    autoResize = true;
    contextLost = false;
    compression;
    constructor() {
      this.width = GetWidth();
      this.height = GetHeight();
      this.resolution = GetResolution();
      this.setBackgroundColor(GetBackgroundColor());
      const canvas = document.createElement("canvas");
      canvas.addEventListener("webglcontextlost", (event) => this.onContextLost(event), false);
      canvas.addEventListener("webglcontextrestored", () => this.onContextRestored(), false);
      this.canvas = canvas;
      this.initContext();
      WebGLRendererInstance.set(this);
      this.renderPass = new RenderPass(this);
      this.resize(this.width, this.height, this.resolution);
      ProcessBindingQueue();
    }
    initContext() {
      const gl2 = this.canvas.getContext("webgl", GetWebGLContext());
      GL.set(gl2);
      this.gl = gl2;
      this.compression = GetCompressedTextures(gl2);
      gl2.disable(gl2.DEPTH_TEST);
      gl2.disable(gl2.CULL_FACE);
    }
    resize(width, height, resolution = 1) {
      const calcWidth = width * resolution;
      const calcHeight = height * resolution;
      this.width = calcWidth;
      this.height = calcHeight;
      this.resolution = resolution;
      const canvas = this.canvas;
      canvas.width = calcWidth;
      canvas.height = calcHeight;
      if (this.autoResize) {
        canvas.style.width = width.toString() + "px";
        canvas.style.height = height.toString() + "px";
      }
      this.renderPass.resize(calcWidth, calcHeight);
    }
    onContextLost(event) {
      event.preventDefault();
      this.contextLost = true;
    }
    onContextRestored() {
      this.contextLost = false;
      this.initContext();
    }
    setBackgroundColor(color) {
      GetRGBArray(color, this.clearColor);
      return this;
    }
    reset() {
    }
    begin(willRedraw) {
      if (this.contextLost) {
        return;
      }
      const gl2 = this.gl;
      gl2.getContextAttributes();
      ProcessBindingQueue();
      if (this.optimizeRedraw && !willRedraw) {
      }
      if (this.clearBeforeRender) {
        const cls = this.clearColor;
        gl2.clearColor(cls[0], cls[1], cls[2], cls[3]);
        gl2.clear(gl2.COLOR_BUFFER_BIT);
      }
      return Start(this.renderPass);
    }
    end() {
      End(this.renderPass);
    }
    destroy() {
      WebGLRendererInstance.set(void 0);
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/webgl/WebGL.ts
  function WebGL() {
    return () => {
      SetRenderer(WebGLRenderer);
    };
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/webglcontext/SetWebGLContext.ts
  function SetWebGLContext(contextAttributes) {
    ConfigStore.set(CONFIG_DEFAULTS.WEBGL_CONTEXT, contextAttributes);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/HierarchyComponent.ts
  var HIERARCHY = {
    WORLD: 0,
    PARENT: 1,
    NEXT: 2,
    PREV: 3,
    FIRST: 4,
    LAST: 5,
    NUM_CHILDREN: 6,
    DEPTH: 7
  };
  var HierarchyComponent = defineComponent({
    data: [Types.ui32, 8]
  });

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/GetLastChildID.ts
  function GetLastChildID(parentID) {
    return HierarchyComponent.data[parentID][HIERARCHY.LAST];
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/GetNumChildren.ts
  function GetNumChildren(id) {
    return HierarchyComponent.data[id][HIERARCHY.NUM_CHILDREN];
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/GetParentID.ts
  function GetParentID(id) {
    return HierarchyComponent.data[id][HIERARCHY.PARENT];
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/display/IsValidParent.ts
  function IsValidParent(parent, child) {
    const childID = child.id;
    const parentID = parent.id;
    return !(parentID === 0 || childID === parentID || parentID === GetParentID(childID));
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/SetNextSiblingID.ts
  function SetNextSiblingID(parentID, childID) {
    HierarchyComponent.data[parentID][HIERARCHY.NEXT] = childID;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/SetPreviousSiblingID.ts
  function SetPreviousSiblingID(parentID, childID) {
    HierarchyComponent.data[parentID][HIERARCHY.PREV] = childID;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/LinkSiblings.ts
  function LinkSiblings(childA, childB) {
    SetNextSiblingID(childA, childB);
    SetPreviousSiblingID(childB, childA);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/GetFirstChildID.ts
  function GetFirstChildID(parentID) {
    return HierarchyComponent.data[parentID][HIERARCHY.FIRST];
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/GetNextSiblingID.ts
  function GetNextSiblingID(id) {
    return HierarchyComponent.data[id][HIERARCHY.NEXT];
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/GetPreviousSiblingID.ts
  function GetPreviousSiblingID(id) {
    return HierarchyComponent.data[id][HIERARCHY.PREV];
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/AddHierarchyComponent.ts
  function AddHierarchyComponent(id) {
    addComponent(GameObjectWorld, HierarchyComponent, id);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/DecreaseNumChildren.ts
  function DecreaseNumChildren(parentID, total = 1) {
    const data = HierarchyComponent.data[parentID];
    data[HIERARCHY.NUM_CHILDREN] -= total;
    if (data[HIERARCHY.NUM_CHILDREN] < 0) {
      data[HIERARCHY.NUM_CHILDREN] = 0;
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/gameobjects/GameObjectCache.ts
  var GameObjectCache = {
    local: [],
    set: function(index, object) {
      this.local[index] = object;
    },
    get: function(index) {
      return this.local[index];
    },
    clear: function() {
      this.local.length = 0;
    },
    remove: function(index) {
      this.local[index] = null;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/GetWorldID.ts
  function GetWorldID(id) {
    return HierarchyComponent.data[id][HIERARCHY.WORLD];
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/GetParents.ts
  function GetParents(id) {
    const results = [];
    let currentParent = GetParentID(id);
    while (currentParent) {
      results.push(currentParent);
      currentParent = GetParentID(currentParent);
    }
    return results;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/DirtyComponent.ts
  var DIRTY = {
    CHILD: 0,
    CHILD_CACHE: 1,
    CHILD_TRANSFORM: 2,
    CHILD_WORLD_TRANSFORM: 3,
    CHILD_COLOR: 4,
    DISPLAY_LIST: 5,
    COLOR: 6
  };
  var DirtyComponent = defineComponent({
    data: [Types.ui8, 7]
  });

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/SetDirtyChild.ts
  function SetDirtyChild(id) {
    DirtyComponent.data[id][DIRTY.CHILD] = 1;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/SetDirtyChildCache.ts
  function SetDirtyChildCache(id) {
    DirtyComponent.data[id][DIRTY.CHILD_CACHE] = 1;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/SetDirtyChildTransform.ts
  function SetDirtyChildTransform(id) {
    DirtyComponent.data[id][DIRTY.CHILD_TRANSFORM] = 1;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/SetDirtyTransform.ts
  function SetDirtyTransform(id) {
    Transform2DComponent.data[id][TRANSFORM.DIRTY] = 1;
    SetDirtyParents(id);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/permissions/PermissionsComponent.ts
  var PERMISSION = {
    VISIBLE: 0,
    VISIBLE_CHILDREN: 1,
    WILL_UPDATE: 2,
    WILL_UPDATE_CHILDREN: 3,
    WILL_RENDER: 4,
    WILL_RENDER_CHILDREN: 5,
    WILL_CACHE_CHILDREN: 6,
    WILL_TRANSFORM_CHILDREN: 7,
    WILL_COLOR_CHILDREN: 8
  };
  var PermissionsComponent = defineComponent({
    data: [Types.ui8, 9]
  });

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/permissions/WillCacheChildren.ts
  function WillCacheChildren(id) {
    return Boolean(PermissionsComponent.data[id][PERMISSION.WILL_CACHE_CHILDREN]);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/permissions/WillTransformChildren.ts
  function WillTransformChildren(id) {
    return Boolean(PermissionsComponent.data[id][PERMISSION.WILL_TRANSFORM_CHILDREN]);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/SetDirtyParents.ts
  function SetDirtyParents(childID) {
    const worldID = GetWorldID(childID);
    const parents = GetParents(childID);
    for (let i = 0; i < parents.length; i++) {
      const id = parents[i];
      SetDirtyChild(id);
      if (WillTransformChildren(id)) {
        SetDirtyTransform(id);
      }
      if (WillCacheChildren(id)) {
        SetDirtyChildCache(id);
      }
      if (id === worldID) {
        SetDirtyChildTransform(id);
      }
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/ClearWorldAndParentID.ts
  function ClearWorldAndParentID(id) {
    const worldID = GetWorldID(id);
    const parentID = GetParentID(id);
    const world2 = GameObjectCache.get(worldID);
    HierarchyComponent.data[id][HIERARCHY.WORLD] = 0;
    HierarchyComponent.data[id][HIERARCHY.PARENT] = 0;
    if (world2 && hasComponent(GameObjectWorld, world2.tag, id)) {
      removeComponent(GameObjectWorld, world2.tag, id);
    }
    DecreaseNumChildren(parentID);
    SetDirtyParents(id);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/MoveNext.ts
  function MoveNext(id, rootID) {
    const firstChild = GetFirstChildID(id);
    if (firstChild > 0) {
      return firstChild;
    } else {
      const sibling = GetNextSiblingID(id);
      if (sibling === 0) {
        const parent = GetParentID(id);
        if (parent === rootID) {
          return 0;
        } else {
          return GetNextSiblingID(parent);
        }
      } else {
        return sibling;
      }
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/DepthFirstSearchFromParentID.ts
  function DepthFirstSearchFromParentID(parentID, removeParent = true) {
    const output = [parentID];
    let next = GetFirstChildID(parentID);
    while (next > 0) {
      output.push(next);
      next = MoveNext(next, parentID);
    }
    if (removeParent) {
      output.shift();
    }
    return output;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/GetChildIDsFromParent.ts
  function GetChildIDsFromParent(parent) {
    let next = GetFirstChildID(parent.id);
    const output = [];
    while (next > 0) {
      output.push(next);
      next = GetNextSiblingID(next);
    }
    return output;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/GetChildrenFromParentID.ts
  function GetChildrenFromParentID(id) {
    const out = [];
    let next = GetFirstChildID(id);
    while (next > 0) {
      out.push(GameObjectCache.get(next));
      next = GetNextSiblingID(next);
    }
    return out;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/GetDepth.ts
  function GetDepth(id) {
    return HierarchyComponent.data[id][HIERARCHY.DEPTH];
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/GetParentGameObject.ts
  function GetParentGameObject(id) {
    return GameObjectCache.get(HierarchyComponent.data[id][HIERARCHY.PARENT]);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/GetWorldFromID.ts
  function GetWorldFromID(childID) {
    const worldID = GetWorldID(childID);
    if (worldID) {
      return GameObjectCache.get(worldID);
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/GetWorldFromParentID.ts
  function GetWorldFromParentID(parentID) {
    const worldID = GetWorldID(parentID);
    return GameObjectCache.get(worldID);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/SetDepth.ts
  function SetDepth(id, depth) {
    HierarchyComponent.data[id][HIERARCHY.DEPTH] = depth;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/SetNumChildren.ts
  function SetNumChildren(parentID, total) {
    HierarchyComponent.data[parentID][HIERARCHY.NUM_CHILDREN] = total;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/SetParentID.ts
  function SetParentID(childID, parentID) {
    HierarchyComponent.data[childID][HIERARCHY.PARENT] = parentID;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/SetWorldID.ts
  function SetWorldID(id, worldID) {
    HierarchyComponent.data[id][HIERARCHY.WORLD] = worldID;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/RemoveWorldTag.ts
  function RemoveWorldTag(id) {
    const world2 = GetWorldFromParentID(id);
    const children = DepthFirstSearchFromParentID(id, false);
    children.map((childID) => {
      removeComponent(GameObjectWorld, world2.tag, childID);
      SetWorldID(childID, 0);
    });
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/SetFirstChildID.ts
  function SetFirstChildID(parentID, childID) {
    HierarchyComponent.data[parentID][HIERARCHY.FIRST] = childID;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/SetLastChildID.ts
  function SetLastChildID(parentID, childID) {
    HierarchyComponent.data[parentID][HIERARCHY.LAST] = childID;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/RemoveChildIDFromCurrentParent.ts
  function RemoveChildIDFromCurrentParent(childID, newParentID) {
    const parentID = GetParentID(childID);
    if (parentID) {
      const firstID = GetFirstChildID(parentID);
      const lastID = GetLastChildID(parentID);
      const nextID = GetNextSiblingID(childID);
      const prevID = GetPreviousSiblingID(childID);
      if (childID === firstID) {
        SetFirstChildID(parentID, nextID);
      }
      if (childID === lastID) {
        SetLastChildID(parentID, prevID);
      }
      if (nextID) {
        SetPreviousSiblingID(nextID, prevID);
      }
      if (prevID) {
        SetNextSiblingID(prevID, nextID);
      }
      SetDirtyParents(childID);
      SetParentID(childID, 0);
      SetNumChildren(parentID, GetNumChildren(parentID) - 1);
    }
    const oldWorld = GetWorldFromID(childID);
    const newWorld = newParentID ? GetWorldFromID(newParentID) : null;
    if (oldWorld && oldWorld !== newWorld) {
      RemoveWorldTag(childID);
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/SetDirtyChildColor.ts
  function SetDirtyChildColor(id) {
    DirtyComponent.data[id][DIRTY.CHILD_COLOR] = 1;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/SetDirtyDisplayList.ts
  function SetDirtyDisplayList(id) {
    DirtyComponent.data[id][DIRTY.DISPLAY_LIST] = 1;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/SetWorldTag.ts
  function SetWorldTag(world2, id) {
    const worldID = world2.id;
    const worldTag = world2.tag;
    const children = DepthFirstSearchFromParentID(id, false);
    children.map((childID) => {
      addComponent(GameObjectWorld, worldTag, childID);
      SetWorldID(childID, worldID);
    });
    SetDirtyDisplayList(worldID);
    SetDirtyChildColor(worldID);
    SetDirtyChildTransform(worldID);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/transform/UpdateRootTransform.ts
  function UpdateRootTransform(id) {
    const worldID = GetWorldID(id);
    let currentParent = GetParentID(id);
    let isRootTransform = true;
    while (currentParent && currentParent !== worldID) {
      if (WillTransformChildren(currentParent)) {
        isRootTransform = false;
        break;
      }
      currentParent = GetParentID(currentParent);
    }
    Transform2DComponent.data[id][TRANSFORM.IS_ROOT] = Number(isRootTransform);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/SetAndUpdateParent.ts
  function SetAndUpdateParent(parentID, childID, addChildren = 1) {
    SetParentID(childID, parentID);
    SetDirtyTransform(childID);
    SetDirtyParents(childID);
    UpdateRootTransform(childID);
    SetNumChildren(parentID, GetNumChildren(parentID) + addChildren);
    const world2 = GetWorldFromParentID(parentID);
    if (world2) {
      SetWorldTag(world2, childID);
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/display/AddChild.ts
  function AddChild(parent, child) {
    if (IsValidParent(parent, child)) {
      const childID = child.id;
      const parentID = parent.id;
      const numChildren = GetNumChildren(parentID);
      RemoveChildIDFromCurrentParent(childID, parentID);
      if (numChildren === 0) {
        SetFirstChildID(parentID, childID);
      } else {
        const lastChild = GetLastChildID(parentID);
        LinkSiblings(lastChild, childID);
      }
      SetLastChildID(parentID, childID);
      SetAndUpdateParent(parentID, childID);
    }
    return child;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/RelinkChildren.ts
  function RelinkChildren(parentID, children) {
    const len = children.length;
    if (len === 0) {
      SetNumChildren(parentID, 0);
      SetFirstChildID(parentID, 0);
      SetLastChildID(parentID, 0);
      return;
    }
    let total = 1;
    let childA = children[0];
    SetFirstChildID(parentID, childA);
    if (len === 1) {
      SetLastChildID(parentID, childA);
      SetNumChildren(parentID, total);
      return;
    }
    for (let i = 1; i < len; i++) {
      const childB = children[i];
      LinkSiblings(childA, childB);
      childA = childB;
      total++;
    }
    SetLastChildID(parentID, childA);
    SetNumChildren(parentID, total);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/display/RemoveChildrenBetween.ts
  function RemoveChildrenBetween(parent, beginIndex = 0, endIndex) {
    const parentID = parent.id;
    if (endIndex === void 0) {
      endIndex = GetNumChildren(parentID);
    }
    const range = endIndex - beginIndex;
    if (range > 0 && range <= endIndex) {
      const children = GetChildIDsFromParent(parent);
      const removed2 = children.splice(beginIndex, range);
      removed2.forEach((childID) => {
        ClearWorldAndParentID(childID);
      });
      RelinkChildren(parentID, children);
      return removed2.map((id) => GameObjectCache.get(id));
    } else {
      return [];
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/SetDirtyWorldDisplayList.ts
  function SetDirtyWorldDisplayList(id) {
    const worldID = GetWorldID(id);
    if (worldID > 0) {
      DirtyComponent.data[worldID][DIRTY.DISPLAY_LIST];
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/display/DestroyChildren.ts
  function DestroyChildren(parent, beginIndex = 0, endIndex) {
    const removed2 = RemoveChildrenBetween(parent, beginIndex, endIndex);
    removed2.forEach((child) => {
      child.destroy();
    });
    SetDirtyWorldDisplayList(parent.id);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/color/ColorComponent.ts
  var ColorComponent = defineComponent({
    r: Types.ui8c,
    g: Types.ui8c,
    b: Types.ui8c,
    a: Types.f32,
    colorMatrix: [Types.f32, 16],
    colorOffset: [Types.f32, 4]
  });

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/color/AddColorComponent.ts
  function AddColorComponent(id) {
    addComponent(GameObjectWorld, ColorComponent, id);
    ColorComponent.r[id] = 255;
    ColorComponent.g[id] = 255;
    ColorComponent.b[id] = 255;
    ColorComponent.a[id] = 1;
    ColorComponent.colorMatrix[id].set(DEFAULT_COLOR_MATRIX);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/SetDirtyColor.ts
  function SetDirtyColor(id) {
    DirtyComponent.data[id][DIRTY.COLOR] = 1;
    const world2 = GetWorldID(id);
    if (world2) {
      DirtyComponent.data[world2][DIRTY.CHILD_COLOR] = 1;
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/AddDirtyComponent.ts
  function AddDirtyComponent(id) {
    addComponent(GameObjectWorld, DirtyComponent, id);
    SetDirtyColor(id);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/ClearDirtyChild.ts
  function ClearDirtyChild(id) {
    DirtyComponent.data[id][DIRTY.CHILD] = 0;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/ClearDirtyColor.ts
  function ClearDirtyColor(id) {
    DirtyComponent.data[id][DIRTY.COLOR] = 0;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/ClearDirtyDisplayList.ts
  function ClearDirtyDisplayList(id) {
    DirtyComponent.data[id][DIRTY.DISPLAY_LIST] = 0;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/ClearDirtyTransform.ts
  function ClearDirtyTransform(id) {
    Transform2DComponent.data[id][TRANSFORM.DIRTY] = 0;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/HasDirtyChildCache.ts
  function HasDirtyChildCache(id) {
    return Boolean(DirtyComponent.data[id][DIRTY.CHILD_CACHE]);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/HasDirtyColor.ts
  function HasDirtyColor(id) {
    return Boolean(DirtyComponent.data[id][DIRTY.COLOR]);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/HasDirtyDisplayList.ts
  function HasDirtyDisplayList(id) {
    return Boolean(DirtyComponent.data[id][DIRTY.DISPLAY_LIST]);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/HasDirtyTransform.ts
  function HasDirtyTransform(id) {
    return Boolean(Transform2DComponent.data[id][TRANSFORM.DIRTY]);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/permissions/SetWillColorChildren.ts
  function SetWillColorChildren(id, value) {
    PermissionsComponent.data[id][PERMISSION.WILL_COLOR_CHILDREN] = Number(value);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/permissions/WillColorChildren.ts
  function WillColorChildren(id) {
    return Boolean(PermissionsComponent.data[id][PERMISSION.WILL_COLOR_CHILDREN]);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/color/Color.ts
  var Color = class {
    id;
    colorMatrixEnabled = false;
    constructor(id, red = 255, green = 255, blue = 255, alpha = 1) {
      AddColorComponent(id);
      this.id = id;
      this.set(red, green, blue, alpha);
    }
    set(red, green, blue, alpha) {
      this.red = red;
      this.green = green;
      this.blue = blue;
      this.alpha = alpha;
    }
    set tint(value) {
      this.red = value >> 16 & 255;
      this.green = value >> 8 & 255;
      this.blue = value & 255;
    }
    get tint() {
      return this.red << 16 | this.green << 8 | this.blue;
    }
    set willColorChildren(value) {
      SetWillColorChildren(this.id, value);
    }
    get willColorChildren() {
      return WillColorChildren(this.id);
    }
    set colorMatrix(value) {
      ColorComponent.colorMatrix[this.id].set(value);
      SetDirtyColor(this.id);
      this.colorMatrixEnabled = true;
    }
    get colorMatrix() {
      return ColorComponent.colorMatrix[this.id];
    }
    set colorOffset(value) {
      ColorComponent.colorOffset[this.id].set(value);
      SetDirtyColor(this.id);
    }
    get colorOffset() {
      return ColorComponent.colorOffset[this.id];
    }
    set red(value) {
      ColorComponent.r[this.id] = value;
      SetDirtyColor(this.id);
    }
    get red() {
      return ColorComponent.r[this.id];
    }
    set green(value) {
      ColorComponent.g[this.id] = value;
      SetDirtyColor(this.id);
    }
    get green() {
      return ColorComponent.g[this.id];
    }
    set blue(value) {
      ColorComponent.b[this.id] = value;
      SetDirtyColor(this.id);
    }
    get blue() {
      return ColorComponent.b[this.id];
    }
    set alpha(value) {
      ColorComponent.a[this.id] = value;
      SetDirtyColor(this.id);
    }
    get alpha() {
      return ColorComponent.a[this.id];
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/permissions/AddPermissionsComponent.ts
  function AddPermissionsComponent(id) {
    addComponent(GameObjectWorld, PermissionsComponent, id);
    PermissionsComponent.data[id].set([1, 1, 1, 1, 1, 1, 1, 1, 1]);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/gameobjects/events/DestroyEvent.ts
  var DestroyEvent = "destroy";

  // Users/rich/Documents/GitHub/phaser-genesis/src/events/Emit.ts
  function Emit(emitter, event, ...args) {
    if (emitter.events.size === 0 || !emitter.events.has(event)) {
      return false;
    }
    const listeners = emitter.events.get(event);
    const handlers = [...listeners];
    for (const ee of handlers) {
      ee.callback.apply(ee.context, args);
      if (ee.once) {
        listeners.delete(ee);
      }
    }
    if (listeners.size === 0) {
      emitter.events.delete(event);
    }
    return true;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/permissions/GetVisible.ts
  function GetVisible(id) {
    return Boolean(PermissionsComponent.data[id][PERMISSION.VISIBLE]);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/permissions/GetVisibleChildren.ts
  function GetVisibleChildren(id) {
    return Boolean(PermissionsComponent.data[id][PERMISSION.VISIBLE_CHILDREN]);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/display/ReparentChildren.ts
  function ReparentChildren(parent, newParent, beginIndex = 0, endIndex) {
    const moved = RemoveChildrenBetween(parent, beginIndex, endIndex);
    moved.forEach((child) => {
      AddChild(newParent, child);
    });
    return moved;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/permissions/SetVisible.ts
  function SetVisible(id, value) {
    PermissionsComponent.data[id][PERMISSION.VISIBLE] = Number(value);
    SetDirtyParents(id);
    SetDirtyDisplayList(GetWorldID(id));
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/permissions/SetVisibleChildren.ts
  function SetVisibleChildren(id, value) {
    PermissionsComponent.data[id][PERMISSION.VISIBLE_CHILDREN] = Number(value);
    SetDirtyParents(id);
    SetDirtyDisplayList(GetWorldID(id));
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/permissions/WillRender.ts
  function WillRender(id) {
    return Boolean(PermissionsComponent.data[id][PERMISSION.VISIBLE]) && Boolean(PermissionsComponent.data[id][PERMISSION.WILL_RENDER]);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/gameobjects/GameObject.ts
  var GameObject = class {
    id = addEntity(GameObjectWorld);
    type = "GameObject";
    name = "";
    events;
    constructor() {
      const id = this.id;
      AddHierarchyComponent(id);
      AddPermissionsComponent(id);
      AddDirtyComponent(id);
      GameObjectCache.set(id, this);
      this.events = new Map();
    }
    isRenderable() {
      return WillRender(this.id);
    }
    beforeUpdate(delta, time) {
    }
    update(delta, time) {
    }
    afterUpdate(delta, time) {
    }
    preRenderGL(renderPass) {
    }
    renderGL(renderPass) {
    }
    renderCanvas(renderer) {
    }
    postRenderGL(renderPass) {
    }
    postRenderCanvas(renderer) {
    }
    set visible(value) {
      SetVisible(this.id, value);
    }
    get visible() {
      return GetVisible(this.id);
    }
    set visibleChildren(value) {
      SetVisibleChildren(this.id, value);
    }
    get visibleChildren() {
      return GetVisibleChildren(this.id);
    }
    set depth(value) {
      SetDepth(this.id, value);
    }
    get depth() {
      return GetDepth(this.id);
    }
    hasParent(id) {
      const parentID = GetParentID(this.id);
      if (id) {
        return parentID === id;
      } else {
        return parentID > 0;
      }
    }
    getParent() {
      return GetParentGameObject(this.id);
    }
    getChildren() {
      return GetChildrenFromParentID(this.id);
    }
    getNumChildren() {
      return GetNumChildren(this.id);
    }
    toString() {
      return `${this.type} id="${this.id}" name="${this.name}"`;
    }
    destroy(reparentChildren) {
      if (reparentChildren) {
        ReparentChildren(this, reparentChildren);
      } else {
        DestroyChildren(this);
      }
      Emit(this, DestroyEvent, this);
      this.events.clear();
      this.events = null;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/defaultorigin/GetDefaultOriginX.ts
  function GetDefaultOriginX() {
    return ConfigStore.get(CONFIG_DEFAULTS.DEFAULT_ORIGIN).x;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/defaultorigin/GetDefaultOriginY.ts
  function GetDefaultOriginY() {
    return ConfigStore.get(CONFIG_DEFAULTS.DEFAULT_ORIGIN).y;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/transform/UpdateExtent.ts
  function UpdateExtent(id, width, height) {
    const data = Transform2DComponent.data[id];
    const x = -data[TRANSFORM.ORIGIN_X] * width;
    const y = -data[TRANSFORM.ORIGIN_Y] * height;
    data[TRANSFORM.FRAME_X1] = x;
    data[TRANSFORM.FRAME_Y1] = y;
    data[TRANSFORM.FRAME_X2] = x + width;
    data[TRANSFORM.FRAME_Y2] = y + height;
    data[TRANSFORM.FRAME_WIDTH] = width;
    data[TRANSFORM.FRAME_HEIGHT] = height;
    data[TRANSFORM.WORLD_A] = x;
    data[TRANSFORM.WORLD_B] = y;
    data[TRANSFORM.WORLD_C] = x + width;
    data[TRANSFORM.WORLD_D] = y + height;
    data[TRANSFORM.WORLD_TX] = width;
    data[TRANSFORM.WORLD_TY] = height;
    SetDirtyTransform(id);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/transform/Origin.ts
  var Origin = class {
    id;
    constructor(id, x = 0, y = 0) {
      this.id = id;
      this.x = x;
      this.y = y;
    }
    set(x, y = x) {
      const id = this.id;
      Transform2DComponent.data[id][TRANSFORM.ORIGIN_X] = x;
      Transform2DComponent.data[id][TRANSFORM.ORIGIN_Y] = y;
      UpdateExtent(id, Transform2DComponent.data[id][TRANSFORM.FRAME_WIDTH], Transform2DComponent.data[id][TRANSFORM.FRAME_HEIGHT]);
      return this;
    }
    set x(value) {
      const id = this.id;
      Transform2DComponent.data[id][TRANSFORM.ORIGIN_X] = value;
      UpdateExtent(id, Transform2DComponent.data[id][TRANSFORM.FRAME_WIDTH], Transform2DComponent.data[id][TRANSFORM.FRAME_HEIGHT]);
    }
    get x() {
      return Transform2DComponent.data[this.id][TRANSFORM.ORIGIN_X];
    }
    set y(value) {
      const id = this.id;
      Transform2DComponent.data[id][TRANSFORM.ORIGIN_Y] = value;
      UpdateExtent(id, Transform2DComponent.data[id][TRANSFORM.FRAME_WIDTH], Transform2DComponent.data[id][TRANSFORM.FRAME_HEIGHT]);
    }
    get y() {
      return Transform2DComponent.data[this.id][TRANSFORM.ORIGIN_Y];
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/renderpass/PopColor.ts
  function PopColor(renderPass, color) {
    if (color.colorMatrixEnabled && color.willColorChildren) {
      renderPass.colorMatrix.pop();
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/transform/Position.ts
  var Position = class {
    id;
    _x;
    _y;
    constructor(id, x = 0, y = 0) {
      this.id = id;
      this.set(x, y);
    }
    set(x, y = x) {
      this.x = x;
      this.y = y;
      return this;
    }
    set x(value) {
      this._x = value;
      const id = this.id;
      Transform2DComponent.data[id][TRANSFORM.X] = value;
      SetDirtyTransform(id);
    }
    get x() {
      return this._x;
    }
    set y(value) {
      this._y = value;
      const id = this.id;
      Transform2DComponent.data[id][TRANSFORM.Y] = value;
      SetDirtyTransform(id);
    }
    get y() {
      return this._y;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/transform/Scale.ts
  var Scale = class {
    id;
    _x;
    _y;
    constructor(id, x = 1, y = 1) {
      this.id = id;
      this.set(x, y);
    }
    set(x, y = x) {
      this.x = x;
      this.y = y;
      return this;
    }
    set x(value) {
      this._x = value;
      const id = this.id;
      Transform2DComponent.data[id][TRANSFORM.SCALE_X] = value;
      SetDirtyTransform(id);
    }
    get x() {
      return this._x;
    }
    set y(value) {
      this._y = value;
      const id = this.id;
      Transform2DComponent.data[id][TRANSFORM.SCALE_Y] = value;
      SetDirtyTransform(id);
    }
    get y() {
      return this._y;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/renderpass/SetColor.ts
  function SetColor(renderPass, color) {
    if (color.colorMatrixEnabled && color.willColorChildren) {
      renderPass.colorMatrix.set(color);
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/transform/Size.ts
  var Size = class {
    id;
    constructor(id, width = 0, height = 0) {
      this.id = id;
      this.set(width, height);
    }
    set(width, height = width) {
      this.width = width;
      this.height = height;
      return this;
    }
    set width(value) {
      UpdateExtent(this.id, value, this.height);
    }
    get width() {
      return Transform2DComponent.data[this.id][TRANSFORM.FRAME_WIDTH];
    }
    set height(value) {
      UpdateExtent(this.id, this.width, value);
    }
    get height() {
      return Transform2DComponent.data[this.id][TRANSFORM.FRAME_HEIGHT];
    }
    set x(value) {
      this.width = value;
    }
    get x() {
      return this.width;
    }
    set y(value) {
      this.height = value;
    }
    get y() {
      return this.height;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/transform/UpdateAxisAligned.ts
  function UpdateAxisAligned(id) {
    const data = Transform2DComponent.data[id];
    const rotation = data[TRANSFORM.ROTATION];
    const skewX = data[TRANSFORM.SKEW_X];
    const skewY = data[TRANSFORM.SKEW_Y];
    data[TRANSFORM.AXIS_ALIGNED] = Number(rotation === 0 && skewX === 0 && skewY === 0);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/transform/Skew.ts
  var Skew = class {
    id;
    _x;
    _y;
    constructor(id, x = 0, y = 0) {
      this.id = id;
      this.set(x, y);
    }
    set(x, y = x) {
      this.x = x;
      this.y = y;
      return this;
    }
    set x(value) {
      this._x = value;
      const id = this.id;
      Transform2DComponent.data[id][TRANSFORM.SKEW_X] = value;
      UpdateAxisAligned(id);
      SetDirtyTransform(id);
    }
    get x() {
      return this._x;
    }
    set y(value) {
      this._y = value;
      const id = this.id;
      Transform2DComponent.data[id][TRANSFORM.SKEW_Y] = value;
      UpdateAxisAligned(id);
      SetDirtyTransform(id);
    }
    get y() {
      return this._y;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/gameobjects/container/Container.ts
  var Container = class extends GameObject {
    type = "Container";
    position;
    scale;
    skew;
    origin;
    size;
    color;
    shader;
    _rotation = 0;
    constructor(x = 0, y = 0) {
      super();
      const id = this.id;
      AddTransform2DComponent(id, x, y, GetDefaultOriginX(), GetDefaultOriginY());
      this.position = new Position(id, x, y);
      this.scale = new Scale(id);
      this.skew = new Skew(id);
      this.size = new Size(id);
      this.origin = new Origin(id, GetDefaultOriginX(), GetDefaultOriginY());
      this.color = new Color(id);
    }
    renderGL(renderPass) {
      if (this.shader) {
        Flush(renderPass);
        renderPass.shader.set(this.shader, 0);
      }
      SetColor(renderPass, this.color);
      this.preRenderGL(renderPass);
    }
    postRenderGL(renderPass) {
      if (this.shader) {
        Flush(renderPass);
        renderPass.shader.pop();
      }
      PopColor(renderPass, this.color);
    }
    set x(value) {
      this.position.x = value;
    }
    get x() {
      return this.position.x;
    }
    set y(value) {
      this.position.y = value;
    }
    get y() {
      return this.position.y;
    }
    set rotation(value) {
      this._rotation = value;
      const id = this.id;
      Transform2DComponent.data[id][TRANSFORM.ROTATION] = value;
      UpdateAxisAligned(id);
      SetDirtyTransform(id);
    }
    get rotation() {
      return this._rotation;
    }
    get alpha() {
      return this.color.alpha;
    }
    set alpha(value) {
      this.color.alpha = value;
    }
    setAlpha(value) {
      this.alpha = value;
      return this;
    }
    setPosition(x, y) {
      this.position.set(x, y);
      return this;
    }
    setScale(x, y) {
      this.scale.set(x, y);
      return this;
    }
    setRotation(value) {
      this.rotation = value;
      return this;
    }
    setSkew(x, y) {
      this.skew.set(x, y);
      return this;
    }
    setOrigin(x, y) {
      this.origin.set(x, y);
      return this;
    }
    getBounds() {
      const data = Transform2DComponent.data[this.id];
      const x = data[TRANSFORM.BOUNDS_X1];
      const y = data[TRANSFORM.BOUNDS_Y1];
      const right = data[TRANSFORM.BOUNDS_X2];
      const bottom = data[TRANSFORM.BOUNDS_Y2];
      return new Rectangle(x, y, right - x, bottom - y);
    }
    destroy(reparentChildren) {
      super.destroy(reparentChildren);
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/textures/TextureManagerInstance.ts
  var instance4;
  var TextureManagerInstance = {
    get: () => {
      return instance4;
    },
    set: (manager) => {
      if (instance4) {
        throw new Error("Cannot instantiate TextureManager more than once");
      }
      instance4 = manager;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/textures/GetTexture.ts
  function GetTexture(key) {
    return TextureManagerInstance.get().get(key);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/ClearSiblings.ts
  function ClearSiblings(childID) {
    SetNextSiblingID(childID, 0);
    SetPreviousSiblingID(childID, 0);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/RemoveChildID.ts
  function RemoveChildID(childID) {
    const parentID = GetParentID(childID);
    const first = GetFirstChildID(parentID);
    const last = GetLastChildID(parentID);
    const prevID = GetPreviousSiblingID(childID);
    const nextID = GetNextSiblingID(childID);
    LinkSiblings(prevID, nextID);
    if (first === childID) {
      SetFirstChildID(parentID, nextID);
    }
    if (last === childID) {
      SetLastChildID(parentID, prevID);
    }
    ClearSiblings(childID);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/display/RemoveChild.ts
  function RemoveChild(parent, child) {
    const childID = child.id;
    const parentID = parent.id;
    if (child.hasParent(parentID)) {
      RemoveChildID(childID);
      DecreaseNumChildren(parentID);
    }
    return child;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/display/RemoveChildren.ts
  function RemoveChildren(parent, ...children) {
    children.forEach((child) => {
      RemoveChild(parent, child);
    });
    return children;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/vertices/QuadVertexComponent.ts
  var QuadVertexComponent = defineComponent({
    values: [Types.f32, 54]
  });

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/vertices/SetQuadColor.ts
  function SetQuadColor(id, red, green, blue, alpha) {
    const data = QuadVertexComponent.values[id];
    data[5] = red;
    data[6] = green;
    data[7] = blue;
    data[8] = alpha;
    data[14] = red;
    data[15] = green;
    data[16] = blue;
    data[17] = alpha;
    data[23] = red;
    data[24] = green;
    data[25] = blue;
    data[26] = alpha;
    data[32] = red;
    data[33] = green;
    data[34] = blue;
    data[35] = alpha;
    data[41] = red;
    data[42] = green;
    data[43] = blue;
    data[44] = alpha;
    data[50] = red;
    data[51] = green;
    data[52] = blue;
    data[53] = alpha;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/vertices/SetQuadPosition.ts
  function SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3) {
    const data = QuadVertexComponent.values[id];
    data[0] = x0;
    data[1] = y0;
    data[9] = x1;
    data[10] = y1;
    data[18] = x2;
    data[19] = y2;
    data[27] = x0;
    data[28] = y0;
    data[36] = x2;
    data[37] = y2;
    data[45] = x3;
    data[46] = y3;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/vertices/SetUV.ts
  function SetUV(id, u0, v0, u1, v1) {
    const data = QuadVertexComponent.values[id];
    data[2] = u0;
    data[3] = v0;
    data[11] = u0;
    data[12] = v1;
    data[20] = u1;
    data[21] = v1;
    data[29] = u0;
    data[30] = v0;
    data[38] = u1;
    data[39] = v1;
    data[47] = u1;
    data[48] = v0;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/vertices/AddQuadVertex.ts
  function AddQuadVertex(id, width = 0, height = 0, flipY = true) {
    addComponent(GameObjectWorld, QuadVertexComponent, id);
    if (width || height) {
      if (flipY) {
        SetUV(id, 0, 1, 1, 0);
      } else {
        SetUV(id, 0, 0, 1, 1);
      }
      SetQuadColor(id, 1, 1, 1, 1);
      SetQuadPosition(id, 0, 0, 0, height, width, height, width, 0);
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/renderpass/GetVertexBufferEntry.ts
  var bufferEntry = {
    buffer: null,
    F32: null,
    offset: 0
  };
  function GetVertexBufferEntry(renderPass, addToCount = 0) {
    const buffer = renderPass.vertexbuffer.current;
    if (renderPass.count + addToCount >= buffer.batchSize) {
      Flush(renderPass);
    }
    bufferEntry.buffer = buffer;
    bufferEntry.F32 = buffer.vertexViewF32;
    bufferEntry.offset = renderPass.count * buffer.entryElementSize;
    renderPass.count += addToCount;
    return bufferEntry;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/vertices/SetQuadTextureIndex.ts
  function SetQuadTextureIndex(id, textureIndex) {
    const data = QuadVertexComponent.values[id];
    if (data[4] !== textureIndex) {
      data[4] = textureIndex;
      data[13] = textureIndex;
      data[22] = textureIndex;
      data[31] = textureIndex;
      data[40] = textureIndex;
      data[49] = textureIndex;
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/draw/BatchTexturedQuadBuffer.ts
  function BatchTexturedQuadBuffer(texture, id, renderPass) {
    const { F32, offset } = GetVertexBufferEntry(renderPass, 2);
    const textureIndex = renderPass.textures.set(texture);
    SetQuadTextureIndex(id, textureIndex);
    F32.set(QuadVertexComponent.values[id], offset);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/transform/SetExtent.ts
  function SetExtent(id, x, y, width, height) {
    const data = Transform2DComponent.data[id];
    data[TRANSFORM.FRAME_X1] = x;
    data[TRANSFORM.FRAME_Y1] = y;
    data[TRANSFORM.FRAME_X2] = x + width;
    data[TRANSFORM.FRAME_Y2] = y + height;
    data[TRANSFORM.FRAME_WIDTH] = width;
    data[TRANSFORM.FRAME_HEIGHT] = height;
    SetDirtyTransform(id);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/textures/SetExtentFromFrame.ts
  function SetExtentFromFrame(child, frame2) {
    const originX = child.origin.x;
    const originY = child.origin.y;
    const sourceSizeWidth = frame2.sourceSizeWidth;
    const sourceSizeHeight = frame2.sourceSizeHeight;
    let x;
    let y;
    let width;
    let height;
    if (frame2.trimmed) {
      x = frame2.spriteSourceSizeX - originX * sourceSizeWidth;
      y = frame2.spriteSourceSizeY - originY * sourceSizeHeight;
      width = frame2.spriteSourceSizeWidth;
      height = frame2.spriteSourceSizeHeight;
    } else {
      x = -originX * sourceSizeWidth;
      y = -originY * sourceSizeHeight;
      width = sourceSizeWidth;
      height = sourceSizeHeight;
    }
    SetExtent(child.id, x, y, width, height);
    return child;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/textures/SetVertexUVsFromFrame.ts
  function SetVertexUVsFromFrame(id, frame2) {
    SetUV(id, frame2.u0, frame2.v0, frame2.u1, frame2.v1);
    return frame2;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/gameobjects/sprite/SetFrame.ts
  function SetFrame(texture, key, ...children) {
    const frame2 = texture.getFrame(key);
    const pivot = frame2.pivot;
    children.forEach((child) => {
      if (!child || frame2 === child.frame) {
        return;
      }
      child.frame = frame2;
      child.hasTexture = true;
      if (pivot) {
        child.origin.set(pivot.x, pivot.y);
      }
      SetExtentFromFrame(child, frame2);
      SetVertexUVsFromFrame(child.id, frame2);
    });
    return children;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/gameobjects/sprite/SetTexture.ts
  function SetTexture(key, frame2, ...children) {
    if (!key) {
      children.forEach((child) => {
        child.texture = null;
        child.frame = null;
        child.hasTexture = false;
      });
    } else {
      let texture;
      if (key instanceof Frame) {
        frame2 = key;
        texture = key.texture;
      } else if (key instanceof Texture) {
        texture = key;
      } else {
        texture = GetTexture(key);
      }
      if (!texture) {
        console.warn(`Invalid Texture key: ${key}`);
      } else {
        children.forEach((child) => {
          child.texture = texture;
        });
        SetFrame(texture, frame2, ...children);
      }
    }
    return children;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/gameobjects/sprite/Sprite.ts
  var Sprite = class extends Container {
    type = "Sprite";
    texture;
    frame;
    hasTexture = false;
    constructor(x, y, texture = "__BLANK", frame2) {
      super(x, y);
      AddQuadVertex(this.id);
      this.setTexture(texture, frame2);
    }
    setTexture(key, frame2) {
      SetTexture(key, frame2, this);
      return this;
    }
    setFrame(key) {
      SetFrame(this.texture, key, this);
      return this;
    }
    isRenderable() {
      return this.visible && this.hasTexture && WillRender(this.id) && this.alpha > 0;
    }
    renderGL(renderPass) {
      const color = this.color;
      if (this.shader) {
        Flush(renderPass);
        renderPass.shader.set(this.shader, 0);
      }
      if (color.colorMatrixEnabled) {
        renderPass.colorMatrix.set(color);
      }
      this.preRenderGL(renderPass);
      BatchTexturedQuadBuffer(this.texture, this.id, renderPass);
      if (color.colorMatrixEnabled && !color.willColorChildren) {
        Flush(renderPass);
        renderPass.colorMatrix.pop();
      }
    }
    renderCanvas(renderer) {
    }
    destroy(reparentChildren) {
      super.destroy(reparentChildren);
      this.texture = null;
      this.frame = null;
      this.hasTexture = false;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/banner/AddBanner.ts
  function AddBanner() {
    const { title, version, url, color, background } = ConfigStore.get(CONFIG_DEFAULTS.BANNER);
    if (title !== "") {
      const str = `${title} ${version}`.trimEnd();
      console.log(`%c${str}%c ${url}`, `padding: 4px 16px; color: ${color}; background: ${background}`, "");
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/globalvar/AddGlobalVar.ts
  function AddGlobalVar(game) {
    const globalVar = ConfigStore.get(CONFIG_DEFAULTS.GLOBAL_VAR);
    if (globalVar && window) {
      window[globalVar] = game;
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/dom/AddToDOM.ts
  function AddToDOM(element, parent) {
    const target = GetElement(parent);
    target.appendChild(element);
    return element;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/parent/AddToParent.ts
  function AddToParent() {
    const parent = ConfigStore.get(CONFIG_DEFAULTS.PARENT);
    const canvas = RendererInstance.get().canvas;
    if (parent && canvas) {
      AddToDOM(canvas, parent);
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/renderer/CreateRenderer.ts
  function CreateRenderer() {
    const renderer = ConfigStore.get(CONFIG_DEFAULTS.RENDERER);
    if (renderer) {
      new renderer();
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/GameInstance.ts
  var instance5;
  var frame = 0;
  var elapsed = 0;
  var GameInstance = {
    get: () => {
      return instance5;
    },
    set: (game) => {
      instance5 = game;
    },
    getFrame: () => {
      return frame;
    },
    setFrame: (current) => {
      frame = current;
    },
    getElapsed: () => {
      return elapsed;
    },
    setElapsed: (current) => {
      elapsed = current;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/scenes/GetScenes.ts
  function GetScenes() {
    return ConfigStore.get(CONFIG_DEFAULTS.SCENES);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/events/EventInstance.ts
  var EventInstance = class {
    callback;
    context;
    once;
    constructor(callback, context, once = false) {
      this.callback = callback;
      this.context = context;
      this.once = once;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/events/On.ts
  function On(emitter, event, callback, context = emitter, once = false) {
    if (typeof callback !== "function") {
      throw new TypeError("Listener not a function");
    }
    const listener = new EventInstance(callback, context, once);
    const listeners = emitter.events.get(event);
    if (!listeners) {
      emitter.events.set(event, new Set([listener]));
    } else {
      listeners.add(listener);
    }
    return listener;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/events/Once.ts
  function Once(emitter, event, callback, context = emitter) {
    return On(emitter, event, callback, context, true);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/scenes/RenderStats.ts
  var RenderStats = {
    fps: 0,
    delta: 0,
    gameFrame: 0,
    numScenes: 0,
    numWorlds: 0,
    numGameObjects: 0,
    numGameObjectsRendered: 0,
    numDirtyLocalTransforms: 0,
    numDirtyWorldTransforms: 0,
    numDirtyVertices: 0,
    numDirtyWorldLists: 0,
    numDirtyCameras: 0
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/scenes/ResetRenderStats.ts
  function ResetRenderStats(gameFrame, scenes) {
    RenderStats.gameFrame = gameFrame;
    RenderStats.numScenes = scenes;
    RenderStats.numWorlds = 0;
    RenderStats.numGameObjects = 0;
    RenderStats.numGameObjectsRendered = 0;
    RenderStats.numDirtyWorldLists = 0;
    RenderStats.numDirtyVertices = 0;
    RenderStats.numDirtyLocalTransforms = 0;
    RenderStats.numDirtyWorldTransforms = 0;
    RenderStats.numDirtyCameras = 0;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/scenes/SceneManagerInstance.ts
  var instance6;
  var SceneManagerInstance = {
    get: () => {
      return instance6;
    },
    set: (manager) => {
      if (instance6) {
        throw new Error("Cannot instantiate SceneManager more than once");
      }
      instance6 = manager;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/world/WorldList.ts
  var WorldList = new Map();

  // Users/rich/Documents/GitHub/phaser-genesis/src/scenes/SceneManager.ts
  var SceneManager = class {
    id = addEntity(GameObjectWorld);
    game;
    scenes = new Map();
    sceneIndex = 0;
    flush;
    constructor() {
      SceneManagerInstance.set(this);
      this.game = GameInstance.get();
      Once(this.game, "boot", () => this.boot());
    }
    boot() {
      const scenes = GetScenes();
      if (scenes) {
        scenes.forEach((scene) => new scene());
      }
    }
    update() {
      const time = this.game.time;
      const delta = time.delta;
      const now = time.lastTick;
      const gameFrame = time.frame;
      ResetRenderStats(gameFrame, this.scenes.size);
      for (const scene of this.scenes.values()) {
        const worlds2 = WorldList.get(scene);
        for (const world2 of worlds2) {
          world2.beforeUpdate(delta, now);
        }
        if (scene.update) {
          scene.update(delta, now);
        }
        for (const world2 of worlds2) {
          world2.update(delta, now);
        }
        for (const world2 of worlds2) {
          world2.afterUpdate(delta, now);
        }
      }
    }
    preRender() {
      const gameFrame = this.game.time.frame;
      for (const scene of this.scenes.values()) {
        const worlds2 = WorldList.get(scene);
        for (const world2 of worlds2) {
          if (world2.preRender(gameFrame)) {
            this.flush = true;
          }
        }
      }
    }
    render(renderPass) {
      for (const scene of this.scenes.values()) {
        const worlds2 = WorldList.get(scene);
        for (const world2 of worlds2) {
          world2.renderGL(renderPass);
        }
      }
      this.flush = false;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/scenes/CreateSceneManager.ts
  function CreateSceneManager() {
    new SceneManager();
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/textures/CreateCanvas.ts
  function CreateCanvas(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext("2d");
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/textures/TextureManager.ts
  var TextureManager = class {
    textures;
    constructor() {
      TextureManagerInstance.set(this);
      this.textures = new Map();
      this.createDefaultTextures();
    }
    createDefaultTextures() {
      this.add("__BLANK", new Texture(CreateCanvas(2, 2).canvas));
      const missing = CreateCanvas(32, 32);
      missing.strokeStyle = "#0f0";
      missing.moveTo(0, 0);
      missing.lineTo(32, 32);
      missing.stroke();
      missing.strokeRect(0.5, 0.5, 31, 31);
      this.add("__MISSING", new Texture(missing.canvas));
      const white = CreateCanvas(2, 2);
      white.fillStyle = "#fff";
      white.fillRect(0, 0, 2, 2);
      const whiteTexture = this.add("__WHITE", new Texture(white.canvas));
      WhiteTexture.set(whiteTexture);
    }
    get(key) {
      const textures = this.textures;
      if (textures.has(key)) {
        return textures.get(key);
      } else {
        return textures.get("__MISSING");
      }
    }
    has(key) {
      return this.textures.has(key);
    }
    add(key, source, glConfig) {
      let texture;
      if (!this.textures.has(key)) {
        if (source instanceof Texture) {
          texture = source;
        } else {
          texture = new Texture(source, 0, 0, glConfig);
        }
        texture.key = key;
        this.textures.set(key, texture);
      }
      return texture;
    }
    update(key, source, glConfig) {
      const texture = this.textures.get(key);
      if (texture) {
        texture.update(source, glConfig);
      }
      return texture;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/textures/CreateTextureManager.ts
  function CreateTextureManager() {
    new TextureManager();
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/dom/DOMContentLoaded.ts
  function DOMContentLoaded(callback) {
    const readyState = document.readyState;
    if (readyState === "complete" || readyState === "interactive") {
      callback();
      return;
    }
    const check = () => {
      document.removeEventListener("deviceready", check, true);
      document.removeEventListener("DOMContentLoaded", check, true);
      window.removeEventListener("load", check, true);
      callback();
    };
    if (!document.body) {
      window.setTimeout(check, 20);
    } else if (window.hasOwnProperty("cordova")) {
      document.addEventListener("deviceready", check, true);
    } else {
      document.addEventListener("DOMContentLoaded", check, true);
      window.addEventListener("load", check, true);
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/events/EventEmitter.ts
  var EventEmitter = class {
    events;
    constructor() {
      this.events = new Map();
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/scenes/GetConfigValue.ts
  function GetConfigValue(config, property, defaultValue) {
    if (Object.prototype.hasOwnProperty.call(config, property)) {
      return config[property];
    } else {
      return defaultValue;
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/scenes/Install.ts
  function Install(scene, config = {}) {
    const sceneManager = SceneManagerInstance.get();
    const size = sceneManager.scenes.size;
    const sceneIndex = sceneManager.sceneIndex;
    const firstScene = size === 0;
    if (typeof config === "string") {
      scene.key = config;
    } else if (config || !config && firstScene) {
      scene.key = GetConfigValue(config, "key", "scene" + sceneIndex.toString());
    }
    if (sceneManager.scenes.has(scene.key)) {
      console.warn("Scene key already in use: " + scene.key);
    } else {
      sceneManager.scenes.set(scene.key, scene);
      sceneManager.flush = true;
      sceneManager.sceneIndex++;
    }
    WorldList.set(scene, []);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/scenes/Scene.ts
  var Scene = class {
    key;
    game;
    events;
    constructor(config) {
      this.game = GameInstance.get();
      this.events = new Map();
      Install(this, config);
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/config/SetConfigDefaults.ts
  function SetConfigDefaults() {
    SetBackgroundColor(0);
    SetBatchSize(2048);
    SetBanner("Phaser", "4.0.0", "https://phaser4.io");
    SetMaxTextures(0);
    SetDefaultOrigin(0.5, 0.5);
    SetSize(800, 600, 1);
    SetWebGLContext({
      antialias: true,
      desynchronized: true,
      preserveDrawingBuffer: true
    });
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/timer/Time.ts
  var Time = class {
    lastTick = 0;
    elapsed = 0;
    delta = 0;
    fps = 60;
    fpsCount = 0;
    frame = 0;
    ms = 0;
    prevFrame = 0;
    constructor() {
      const now = performance.now();
      this.lastTick = now;
      this.prevFrame = now;
    }
    update(time) {
      this.ms = time - this.lastTick;
    }
    updateDelta(time) {
      const now = performance.now();
      const elapsed2 = now - time;
      this.fpsCount++;
      if (now >= this.prevFrame + 1e3) {
        this.fps = this.fpsCount * 1e3 / (now - this.prevFrame);
        this.prevFrame = now;
        this.fpsCount = 0;
      }
      this.lastTick = now;
      this.elapsed += elapsed2;
      this.delta = 1e3 / this.fps;
      this.frame++;
      GameInstance.setFrame(this.frame);
      RenderStats.fps = this.fps;
      RenderStats.delta = 1e3 / this.fps;
      return this.frame;
    }
    resetLastTick() {
      this.lastTick = performance.now();
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/Game.ts
  var Game = class extends EventEmitter {
    id = addEntity(GameObjectWorld);
    time;
    isBooted = false;
    isPaused = false;
    willUpdate = true;
    willRender = true;
    renderStats;
    constructor(...settings) {
      super();
      this.time = new Time();
      GameInstance.set(this);
      SetConfigDefaults();
      DOMContentLoaded(() => this.boot(settings));
    }
    boot(settings) {
      settings.forEach((setting) => setting());
      CreateRenderer();
      CreateTextureManager();
      CreateSceneManager();
      AddBanner();
      AddGlobalVar(this);
      AddToParent();
      this.isBooted = true;
      Emit(this, "boot");
      requestAnimationFrame((now) => this.step(now));
    }
    pause() {
      this.isPaused = true;
    }
    resume() {
      this.isPaused = false;
      this.time.resetLastTick();
    }
    update(delta, time) {
    }
    render(renderPass, delta, time) {
    }
    step(now) {
      const renderer = RendererInstance.get();
      const sceneManager = SceneManagerInstance.get();
      const time = this.time;
      time.update(now);
      if (!this.isPaused) {
        const delta = time.delta;
        if (this.willUpdate) {
          sceneManager.update();
          this.update(delta, now);
          Emit(this, "update", delta, now);
        }
        if (this.willRender) {
          sceneManager.preRender();
          renderer.begin(sceneManager.flush);
          const renderPass = renderer.renderPass;
          sceneManager.render(renderPass);
          this.render(renderPass, delta, now);
          Emit(this, "render", renderPass, delta, now);
          renderer.end();
        }
      }
      time.updateDelta(now);
      Emit(this, "step");
      requestAnimationFrame((now2) => this.step(now2));
    }
    destroy() {
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/loader/CreateFile.ts
  function CreateFile(key, url, skipCache = false) {
    return {
      key,
      url,
      skipCache
    };
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/loader/IsAbsoluteURI.ts
  function IsAbsoluteURI(url) {
    return /^(?:blob:|data:|http:\/\/|https:\/\/|\/\/)/.test(url);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/loader/GetURL.ts
  function GetURL(key, url, extension, loader) {
    if (!url) {
      url = `${key}.${extension}`;
    }
    if (IsAbsoluteURI(url)) {
      return url;
    } else if (loader) {
      return `${loader.baseURL}${loader.path}${url}`;
    } else {
      return url;
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/loader/RequestFile.ts
  async function RequestFile(file, preload, onload, fileData) {
    if (!preload(file)) {
      return Promise.reject(file);
    }
    try {
      const request = new Request(file.url, fileData?.requestInit);
      file.response = await fetch(request);
      if (file.response.ok && await onload(file)) {
        return Promise.resolve(file);
      } else {
        return Promise.reject(file);
      }
    } catch (error) {
      file.error = error;
      return Promise.reject(file);
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/loader/files/ImageFile.ts
  function ImageFile(key, url, fileData = {}) {
    return (loader) => {
      const file = CreateFile(key, GetURL(key, url, "png", loader), fileData?.skipCache);
      const textureManager = TextureManagerInstance.get();
      const preload = () => {
        return textureManager && (!textureManager.has(key) || !textureManager.get(key).locked);
      };
      const onload = async (file2) => {
        const blob = await file2.response.blob();
        let image;
        if (window && "createImageBitmap" in window && !fileData?.getImage) {
          image = await createImageBitmap(blob);
        } else {
          image = await new Promise((resolve, reject) => {
            const url2 = URL.createObjectURL(blob);
            const img = new Image();
            img.onload = () => {
              URL.revokeObjectURL(url2);
              resolve(img);
            };
            img.onerror = () => {
              reject();
            };
            img.src = url2;
            if (img.complete && img.width && img.height) {
              img.onload = null;
              img.onerror = null;
              resolve(img);
            }
          });
        }
        if (!image) {
          return false;
        }
        if (fileData.skipCache) {
          file2.data = image;
        } else if (textureManager.has(key)) {
          file2.data = textureManager.update(key, image, fileData?.glConfig);
        } else {
          file2.data = textureManager.add(key, image, fileData?.glConfig);
        }
        return true;
      };
      return RequestFile(file, preload, onload, fileData);
    };
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/loader/Loader.ts
  var Loader = class extends EventEmitter {
    baseURL = "";
    path = "";
    crossOrigin = "anonymous";
    maxParallelDownloads = -1;
    isLoading = false;
    progress;
    queue;
    inflight;
    completed;
    onComplete;
    onError;
    constructor() {
      super();
      this.reset();
    }
    reset() {
      this.isLoading = false;
      this.queue = new Set();
      this.inflight = new Set();
      this.completed = new Set();
      this.progress = 0;
    }
    add(...file) {
      file.forEach((entity) => {
        this.queue.add(entity);
      });
      return this;
    }
    start() {
      if (this.isLoading) {
        return null;
      }
      return new Promise((resolve, reject) => {
        this.completed.clear();
        this.progress = 0;
        if (this.queue.size > 0) {
          this.isLoading = true;
          this.onComplete = resolve;
          this.onError = reject;
          Emit(this, "start");
          this.nextFile();
        } else {
          this.progress = 1;
          Emit(this, "complete");
          resolve(this);
        }
      });
    }
    nextFile() {
      let limit = this.queue.size;
      if (this.maxParallelDownloads !== -1) {
        limit = Math.min(limit, this.maxParallelDownloads) - this.inflight.size;
      }
      if (limit) {
        const iterator = this.queue.values();
        while (limit > 0) {
          const loadFile = iterator.next().value;
          this.inflight.add(loadFile);
          this.queue.delete(loadFile);
          loadFile(this).then((file) => {
            this.fileComplete(file);
            this.updateProgress(file, loadFile);
          }).catch((file) => {
            this.fileError(file);
            this.updateProgress(file, loadFile);
          });
          limit--;
        }
      } else if (this.inflight.size === 0) {
        this.stop();
      }
    }
    stop() {
      if (!this.isLoading) {
        return;
      }
      this.isLoading = false;
      Emit(this, "complete", this.completed);
      this.onComplete();
      this.completed.clear();
    }
    updateProgress(file, queueEntry) {
      this.inflight.delete(queueEntry);
      this.completed.add(file);
      const totalCompleted = this.completed.size;
      const totalQueued = this.queue.size + this.inflight.size;
      if (totalCompleted > 0) {
        this.progress = totalCompleted / (totalCompleted + totalQueued);
      }
      Emit(this, "progress", this.progress, totalCompleted, totalQueued);
      this.nextFile();
    }
    fileComplete(file) {
      Emit(this, "filecomplete", file);
    }
    fileError(file) {
      Emit(this, "fileerror", file);
    }
    totalFilesToLoad() {
      return this.queue.size + this.inflight.size;
    }
    setBaseURL(url = "") {
      if (url !== "" && url.substr(-1) !== "/") {
        url = url.concat("/");
      }
      this.baseURL = url;
      return this;
    }
    setPath(path = "") {
      if (path !== "" && path.substr(-1) !== "/") {
        path = path.concat("/");
      }
      this.path = path;
      return this;
    }
    setCORS(crossOrigin) {
      this.crossOrigin = crossOrigin;
      return this;
    }
    setMaxParallelDownloads(max) {
      this.maxParallelDownloads = max;
      return this;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/color/UpdateQuadColorSystem.ts
  function UpdateQuadColorSystem(entities) {
    let total = 0;
    const len = entities.length;
    for (let i = 0; i < len; i++) {
      const id = entities[i];
      if (HasDirtyColor(id)) {
        const r = ColorComponent.r[id] / 255;
        const g = ColorComponent.g[id] / 255;
        const b = ColorComponent.b[id] / 255;
        const a = ColorComponent.a[id];
        SetQuadColor(id, r, g, b, a);
        ClearDirtyColor(id);
        total++;
      }
    }
    return total;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/permissions/WillRenderChildren.ts
  function WillRenderChildren(id) {
    return GetVisibleChildren(id) && Boolean(PermissionsComponent.data[id][PERMISSION.WILL_RENDER_CHILDREN]);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/permissions/HasRenderableChildren.ts
  function HasRenderableChildren(id, dirtyCamera) {
    const numChildren = GetNumChildren(id);
    if (numChildren === 0 || !WillRenderChildren(id)) {
      return 0;
    }
    if (dirtyCamera || !WillCacheChildren(id) || WillCacheChildren(id) && HasDirtyChildCache(id)) {
      return numChildren;
    }
    return 0;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/permissions/SetWillCacheChildren.ts
  function SetWillCacheChildren(id, value) {
    PermissionsComponent.data[id][PERMISSION.WILL_CACHE_CHILDREN] = Number(value);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/permissions/SetWillTransformChildren.ts
  function SetWillTransformChildren(id, value) {
    PermissionsComponent.data[id][PERMISSION.WILL_TRANSFORM_CHILDREN] = Number(value);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/permissions/WillUpdate.ts
  function WillUpdate(id) {
    return Boolean(PermissionsComponent.data[id][PERMISSION.WILL_UPDATE]);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/permissions/WillUpdateChildren.ts
  function WillUpdateChildren(id) {
    return Boolean(PermissionsComponent.data[id][PERMISSION.WILL_UPDATE_CHILDREN]);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/ClearDirtyTransforms.ts
  function ClearDirtyTransforms(id) {
    const data = Transform2DComponent.data[id];
    data[TRANSFORM.DIRTY] = 0;
    data[TRANSFORM.DIRTY_WORLD] = 0;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/SetDirtyChildWorldTransform.ts
  function SetDirtyChildWorldTransform(id) {
    DirtyComponent.data[id][DIRTY.CHILD_WORLD_TRANSFORM] = 1;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/transform/UpdateLocalTransform.ts
  function UpdateLocalTransform(worldID, entities, camera, gameFrame) {
    const cx = camera.getBoundsX();
    const cy = camera.getBoundsY();
    const cright = camera.getBoundsRight();
    const cbottom = camera.getBoundsBottom();
    let total = 0;
    let prevParent = 0;
    let dirtyWorld = false;
    const len = entities.length;
    for (let i = 0; i < len; i++) {
      const id = entities[i];
      const data = Transform2DComponent.data[id];
      if (data[TRANSFORM.DIRTY] === 0) {
        continue;
      }
      const isRoot = data[TRANSFORM.IS_ROOT];
      const tx = data[TRANSFORM.X];
      const ty = data[TRANSFORM.Y];
      const rotation = data[TRANSFORM.ROTATION];
      const scaleX = data[TRANSFORM.SCALE_X];
      const scaleY = data[TRANSFORM.SCALE_Y];
      const skewX = data[TRANSFORM.SKEW_X];
      const skewY = data[TRANSFORM.SKEW_Y];
      const axisAligned = data[TRANSFORM.AXIS_ALIGNED];
      const x = data[TRANSFORM.FRAME_X1];
      const y = data[TRANSFORM.FRAME_Y1];
      const right = data[TRANSFORM.FRAME_X2];
      const bottom = data[TRANSFORM.FRAME_Y2];
      let a = scaleX;
      let b = 0;
      let c = 0;
      let d = scaleY;
      if (!axisAligned) {
        a = Math.cos(rotation + skewY) * scaleX;
        b = Math.sin(rotation + skewY) * scaleX;
        c = -Math.sin(rotation - skewX) * scaleY;
        d = Math.cos(rotation - skewX) * scaleY;
      }
      data[TRANSFORM.LOCAL_A] = a;
      data[TRANSFORM.LOCAL_B] = b;
      data[TRANSFORM.LOCAL_C] = c;
      data[TRANSFORM.LOCAL_D] = d;
      data[TRANSFORM.LOCAL_TX] = tx;
      data[TRANSFORM.LOCAL_TY] = ty;
      if (isRoot) {
        data[TRANSFORM.WORLD_A] = a;
        data[TRANSFORM.WORLD_B] = b;
        data[TRANSFORM.WORLD_C] = c;
        data[TRANSFORM.WORLD_D] = d;
        data[TRANSFORM.WORLD_TX] = tx;
        data[TRANSFORM.WORLD_TY] = ty;
        data[TRANSFORM.UPDATED] = gameFrame;
        if (axisAligned) {
          const x0 = x * a + tx;
          const y0 = y * d + ty;
          const x1 = x * a + tx;
          const y1 = bottom * d + ty;
          const x2 = right * a + tx;
          const y2 = bottom * d + ty;
          const x3 = right * a + tx;
          const y3 = y * d + ty;
          data[TRANSFORM.BOUNDS_X1] = x0;
          data[TRANSFORM.BOUNDS_Y1] = y0;
          data[TRANSFORM.BOUNDS_X2] = x2;
          data[TRANSFORM.BOUNDS_Y2] = y2;
          data[TRANSFORM.IN_VIEW] = Number(!(cright < x0 || cbottom < y0 || cx > x2 || cy > y2));
          SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3);
        } else {
          const x0 = x * a + y * c + tx;
          const y0 = x * b + y * d + ty;
          const x1 = x * a + bottom * c + tx;
          const y1 = x * b + bottom * d + ty;
          const x2 = right * a + bottom * c + tx;
          const y2 = right * b + bottom * d + ty;
          const x3 = right * a + y * c + tx;
          const y3 = right * b + y * d + ty;
          const bx = Math.min(x0, x1, x2, x3);
          const by = Math.min(y0, y1, y2, y3);
          const br = Math.max(x0, x1, x2, x3);
          const bb = Math.max(y0, y1, y2, y3);
          data[TRANSFORM.BOUNDS_X1] = bx;
          data[TRANSFORM.BOUNDS_Y1] = by;
          data[TRANSFORM.BOUNDS_X2] = br;
          data[TRANSFORM.BOUNDS_Y2] = bb;
          data[TRANSFORM.IN_VIEW] = Number(!(cright < bx || cbottom < by || cx > br || cy > bb));
          SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3);
        }
        ClearDirtyTransforms(id);
      } else {
        const parentID = GetParentID(id);
        if (parentID !== prevParent) {
          SetDirtyParents(id);
          prevParent = parentID;
        }
        dirtyWorld = true;
      }
      SetDirtyChildTransform(id);
      total++;
    }
    if (dirtyWorld) {
      SetDirtyChildWorldTransform(worldID);
    }
    return total;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/SetDirtyWorldTransform.ts
  function SetDirtyWorldTransform(id) {
    Transform2DComponent.data[id][TRANSFORM.DIRTY_WORLD] = 1;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/transform/CopyLocalToWorld.ts
  function CopyLocalToWorld(source, target) {
    const targetData = Transform2DComponent.data[target];
    const sourceData = Transform2DComponent.data[source];
    targetData[TRANSFORM.WORLD_A] = sourceData[TRANSFORM.LOCAL_A];
    targetData[TRANSFORM.WORLD_B] = sourceData[TRANSFORM.LOCAL_B];
    targetData[TRANSFORM.WORLD_C] = sourceData[TRANSFORM.LOCAL_C];
    targetData[TRANSFORM.WORLD_D] = sourceData[TRANSFORM.LOCAL_D];
    targetData[TRANSFORM.WORLD_TX] = sourceData[TRANSFORM.LOCAL_TX];
    targetData[TRANSFORM.WORLD_TY] = sourceData[TRANSFORM.LOCAL_TY];
    SetDirtyWorldTransform(target);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/transform/CopyWorldToWorld.ts
  function CopyWorldToWorld(source, target) {
    const targetData = Transform2DComponent.data[target];
    const sourceData = Transform2DComponent.data[source];
    targetData[TRANSFORM.WORLD_A] = sourceData[TRANSFORM.WORLD_A];
    targetData[TRANSFORM.WORLD_B] = sourceData[TRANSFORM.WORLD_B];
    targetData[TRANSFORM.WORLD_C] = sourceData[TRANSFORM.WORLD_C];
    targetData[TRANSFORM.WORLD_D] = sourceData[TRANSFORM.WORLD_D];
    targetData[TRANSFORM.WORLD_TX] = sourceData[TRANSFORM.WORLD_TX];
    targetData[TRANSFORM.WORLD_TY] = sourceData[TRANSFORM.WORLD_TY];
    SetDirtyWorldTransform(target);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/transform/MultiplyLocalWithWorld.ts
  function MultiplyLocalWithWorld(parentID, childID) {
    const parentData = Transform2DComponent.data[parentID];
    const childData = Transform2DComponent.data[childID];
    const pa = parentData[TRANSFORM.WORLD_A];
    const pb = parentData[TRANSFORM.WORLD_B];
    const pc = parentData[TRANSFORM.WORLD_C];
    const pd = parentData[TRANSFORM.WORLD_D];
    const ptx = parentData[TRANSFORM.WORLD_TX];
    const pty = parentData[TRANSFORM.WORLD_TY];
    const a = childData[TRANSFORM.LOCAL_A];
    const b = childData[TRANSFORM.LOCAL_B];
    const c = childData[TRANSFORM.LOCAL_C];
    const d = childData[TRANSFORM.LOCAL_D];
    const tx = childData[TRANSFORM.LOCAL_TX];
    const ty = childData[TRANSFORM.LOCAL_TY];
    childData[TRANSFORM.WORLD_A] = a * pa + b * pc;
    childData[TRANSFORM.WORLD_B] = a * pb + b * pd;
    childData[TRANSFORM.WORLD_C] = c * pa + d * pc;
    childData[TRANSFORM.WORLD_D] = c * pb + d * pd;
    childData[TRANSFORM.WORLD_TX] = tx * pa + ty * pc + ptx;
    childData[TRANSFORM.WORLD_TY] = tx * pb + ty * pd + pty;
    SetDirtyWorldTransform(childID);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/transform/UpdateWorldTransform.ts
  function UpdateWorldTransform(id) {
    const parentID = GetParentID(id);
    if (!hasComponent(GameObjectWorld, Transform2DComponent, parentID)) {
      CopyLocalToWorld(id, id);
    } else if (!WillTransformChildren(id)) {
      CopyWorldToWorld(parentID, id);
    } else {
      MultiplyLocalWithWorld(parentID, id);
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/ClearDirtyChildTransform.ts
  function ClearDirtyChildTransform(id) {
    DirtyComponent.data[id][DIRTY.CHILD_TRANSFORM] = 0;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/ClearDirtyWorldTransform.ts
  function ClearDirtyWorldTransform(id) {
    Transform2DComponent.data[id][TRANSFORM.DIRTY_WORLD] = 0;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/HasDirtyWorldTransform.ts
  function HasDirtyWorldTransform(id) {
    return Boolean(Transform2DComponent.data[id][TRANSFORM.DIRTY_WORLD]);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/vertices/SetQuadFromWorld.ts
  function SetQuadFromWorld(id, gameFrame, cx, cy, cright, cbottom) {
    const data = Transform2DComponent.data[id];
    const a = data[TRANSFORM.WORLD_A];
    const b = data[TRANSFORM.WORLD_B];
    const c = data[TRANSFORM.WORLD_C];
    const d = data[TRANSFORM.WORLD_D];
    const tx = data[TRANSFORM.WORLD_TX];
    const ty = data[TRANSFORM.WORLD_TY];
    const x = data[TRANSFORM.FRAME_X1];
    const y = data[TRANSFORM.FRAME_Y1];
    const right = data[TRANSFORM.FRAME_X2];
    const bottom = data[TRANSFORM.FRAME_Y2];
    const x0 = x * a + y * c + tx;
    const y0 = x * b + y * d + ty;
    const x1 = x * a + bottom * c + tx;
    const y1 = x * b + bottom * d + ty;
    const x2 = right * a + bottom * c + tx;
    const y2 = right * b + bottom * d + ty;
    const x3 = right * a + y * c + tx;
    const y3 = right * b + y * d + ty;
    const bx = Math.min(x0, x1, x2, x3);
    const by = Math.min(y0, y1, y2, y3);
    const br = Math.max(x0, x1, x2, x3);
    const bb = Math.max(y0, y1, y2, y3);
    data[TRANSFORM.BOUNDS_X1] = bx;
    data[TRANSFORM.BOUNDS_Y1] = by;
    data[TRANSFORM.BOUNDS_X2] = br;
    data[TRANSFORM.BOUNDS_Y2] = bb;
    data[TRANSFORM.IN_VIEW] = Number(!(cright < bx || cbottom < by || cx > br || cy > bb));
    data[TRANSFORM.UPDATED] = gameFrame;
    SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/vertices/UpdateVertexPositionSystem.ts
  function UpdateVertexPositionSystem(entities, camera, gameFrame) {
    const cx = camera.getBoundsX();
    const cy = camera.getBoundsY();
    const cright = camera.getBoundsRight();
    const cbottom = camera.getBoundsBottom();
    let total = 0;
    const len = entities.length;
    for (let i = 0; i < len; i++) {
      const id = entities[i];
      if (HasDirtyWorldTransform(id)) {
        SetQuadFromWorld(id, gameFrame, cx, cy, cright, cbottom);
        ClearDirtyWorldTransform(id);
        ClearDirtyChildTransform(id);
        total++;
      }
    }
    return total;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/world/events/WorldAfterUpdateEvent.ts
  var WorldAfterUpdateEvent = "afterupdate";

  // Users/rich/Documents/GitHub/phaser-genesis/src/world/events/WorldBeforeUpdateEvent.ts
  var WorldBeforeUpdateEvent = "beforeupdate";

  // Users/rich/Documents/GitHub/phaser-genesis/src/world/events/WorldPostRenderEvent.ts
  var WorldPostRenderEvent = "worldpostrender";

  // Users/rich/Documents/GitHub/phaser-genesis/src/world/events/WorldRenderEvent.ts
  var WorldRenderEvent = "worldrender";

  // Users/rich/Documents/GitHub/phaser-genesis/src/world/events/WorldShutdownEvent.ts
  var WorldShutdownEvent = "worldshutdown";

  // Users/rich/Documents/GitHub/phaser-genesis/src/world/events/WorldUpdateEvent.ts
  var WorldUpdateEvent = "update";

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/transform/IsInView.ts
  function IsInView(id) {
    return Boolean(Transform2DComponent.data[id][TRANSFORM.IN_VIEW]);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/world/RenderChild.ts
  var RENDER_CHILD_TOTAL = 0;
  function GetRenderChildTotal() {
    return RENDER_CHILD_TOTAL;
  }
  function ResetRenderChildTotal() {
    RENDER_CHILD_TOTAL = 0;
  }
  function RenderChild(renderPass, id) {
    const inView = IsInView(id) || WillCacheChildren(id);
    let gameObject;
    if (inView) {
      gameObject = GameObjectCache.get(id);
      gameObject.renderGL(renderPass);
      RENDER_CHILD_TOTAL++;
    }
    const numChildren = HasRenderableChildren(id, renderPass.isCameraDirty());
    if (numChildren) {
      let childID = GetFirstChildID(id);
      for (let i = 0; i < numChildren; i++) {
        if (WillRender(childID)) {
          if (GetNumChildren(childID)) {
            RenderChild(renderPass, childID);
          } else if (IsInView(childID)) {
            const childGameObject = GameObjectCache.get(childID);
            childGameObject.renderGL(renderPass);
            childGameObject.postRenderGL(renderPass);
            RENDER_CHILD_TOTAL++;
          }
        }
        childID = GetNextSiblingID(childID);
      }
    }
    if (inView) {
      gameObject.postRenderGL(renderPass);
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/scenes/events/SceneDestroyEvent.ts
  var SceneDestroyEvent = "destroy";

  // Users/rich/Documents/GitHub/phaser-genesis/src/world/BaseWorld.ts
  var BaseWorld = class extends GameObject {
    type = "BaseWorld";
    tag = defineComponent();
    scene;
    camera;
    is3D = false;
    color;
    totalChildren = 0;
    totalChildrenQuery;
    constructor(scene) {
      super();
      const id = this.id;
      const tag = this.tag;
      this.scene = scene;
      this.totalChildrenQuery = defineQuery([tag]);
      SetWorldID(id, id);
      WorldList.get(scene).push(this);
      this.color = new Color(id);
      Once(scene, SceneDestroyEvent, () => this.destroy());
    }
    getNumChildren() {
      if (HasDirtyDisplayList(this.id)) {
        this.totalChildren = this.totalChildrenQuery(GameObjectWorld).length;
      }
      return this.totalChildren;
    }
    beforeUpdate(delta, time) {
      Emit(this, WorldBeforeUpdateEvent, delta, time, this);
    }
    update(delta, time) {
      if (!WillUpdate(this.id)) {
        return;
      }
      Emit(this, WorldUpdateEvent, delta, time, this);
      super.update(delta, time);
    }
    afterUpdate(delta, time) {
      Emit(this, WorldAfterUpdateEvent, delta, time, this);
    }
    preRender(gameFrame) {
      return true;
    }
    renderGL(renderPass) {
    }
    shutdown() {
      RemoveChildren(this);
      Emit(this, WorldShutdownEvent, this);
    }
    destroy(reparentChildren) {
      super.destroy(reparentChildren);
      this.shutdown();
      if (this.camera) {
        this.camera.destroy();
      }
      this.camera = null;
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/renderpass/SetCamera.ts
  function SetCamera(renderPass, camera) {
    if (renderPass.current2DCamera !== camera) {
      Flush(renderPass);
      renderPass.current2DCamera = camera;
      renderPass.cameraMatrix = camera.getMatrix();
    }
    if (camera.update()) {
      renderPass.getCurrentShader().bind(renderPass);
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/renderer/webgl1/renderpass/Begin.ts
  function Begin(renderPass, camera) {
    renderPass.shader.bindDefault();
    SetCamera(renderPass, camera);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/ClearDirtyChildColor.ts
  function ClearDirtyChildColor(id) {
    DirtyComponent.data[id][DIRTY.CHILD_COLOR] = 0;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/ClearDirtyChildWorldTransform.ts
  function ClearDirtyChildWorldTransform(id) {
    DirtyComponent.data[id][DIRTY.CHILD_WORLD_TRANSFORM] = 0;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/HasDirtyChildColor.ts
  function HasDirtyChildColor(id) {
    return Boolean(DirtyComponent.data[id][DIRTY.CHILD_COLOR]);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/HasDirtyChildTransform.ts
  function HasDirtyChildTransform(id) {
    return Boolean(DirtyComponent.data[id][DIRTY.CHILD_TRANSFORM]);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/dirty/HasDirtyChildWorldTransform.ts
  function HasDirtyChildWorldTransform(id) {
    return Boolean(DirtyComponent.data[id][DIRTY.CHILD_WORLD_TRANSFORM]);
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/hierarchy/MoveNextUpdatable.ts
  function MoveNextUpdatable(id) {
    const firstChild = GetFirstChildID(id);
    if (firstChild > 0 && WillUpdateChildren(id)) {
      return firstChild;
    } else {
      const sibling = GetNextSiblingID(id);
      if (sibling === 0) {
        const parent = GetParentID(id);
        if (parent === GetWorldID(id)) {
          return 0;
        } else {
          return GetNextSiblingID(parent);
        }
      } else {
        return sibling;
      }
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/world/RebuildWorldTransforms.ts
  function RebuildWorldTransforms(entities) {
    let total = 0;
    for (let i = 0; i < entities.length; i++) {
      const id = entities[i];
      const parentID = GetParentID(id);
      if (HasDirtyTransform(id) || HasDirtyChildTransform(parentID)) {
        UpdateWorldTransform(id);
        ClearDirtyTransform(id);
        total++;
      }
    }
    return total;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/transform/SetInViewFromBounds.ts
  function SetInViewFromBounds(id, gameFrame, cx, cy, cright, cbottom) {
    const data = Transform2DComponent.data[id];
    if (data[TRANSFORM.UPDATED] < gameFrame) {
      const bx = data[TRANSFORM.BOUNDS_X1];
      const by = data[TRANSFORM.BOUNDS_Y1];
      const br = data[TRANSFORM.BOUNDS_X2];
      const bb = data[TRANSFORM.BOUNDS_Y2];
      data[TRANSFORM.IN_VIEW] = Number(!(cright < bx || cbottom < by || cx > br || cy > bb));
      data[TRANSFORM.UPDATED] = gameFrame;
    }
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/components/vertices/UpdateInViewSystem.ts
  function UpdateInViewSystem(entities, camera, gameFrame) {
    const cx = camera.getBoundsX();
    const cy = camera.getBoundsY();
    const cright = camera.getBoundsRight();
    const cbottom = camera.getBoundsBottom();
    let total = 0;
    const len = entities.length;
    for (let i = 0; i < len; i++) {
      const id = entities[i];
      if (WillRender(id)) {
        SetInViewFromBounds(id, gameFrame, cx, cy, cright, cbottom);
        total++;
      }
    }
    return total;
  }

  // Users/rich/Documents/GitHub/phaser-genesis/src/camera/WorldCamera.ts
  var WorldCamera = class {
    id = addEntity(GameObjectWorld);
    type = "WorldCamera";
    name = "";
    size;
    position;
    isDirty = true;
    matrix;
    constructor(width, height) {
      const id = this.id;
      AddTransform2DComponent(id, 0, 0, 0, 0);
      this.matrix = new Matrix4();
      this.position = new Position(id, 0, 0);
      this.size = new Size(id, width, height);
      this.reset(width, height);
    }
    set x(value) {
      this.position.x = value;
      this.isDirty = true;
    }
    get x() {
      return this.position.x;
    }
    set y(value) {
      this.position.y = value;
      this.isDirty = true;
    }
    get y() {
      return this.position.y;
    }
    setPosition(x, y) {
      this.position.set(x, y);
      this.isDirty = true;
      return this;
    }
    updateBounds() {
      const id = this.id;
      if (HasDirtyTransform(id)) {
        const x = this.x;
        const y = this.y;
        const w = this.size.width;
        const h = this.size.height;
        const ox = -x + w / 2;
        const oy = -y + h / 2;
        const bx = ox - w / 2;
        const by = oy - h / 2;
        SetBounds(id, bx, by, bx + w, by + h);
        ClearDirtyTransform(id);
        this.isDirty = true;
        return true;
      }
      return false;
    }
    update() {
      if (this.isDirty) {
        const data = this.matrix.data;
        data[12] = this.x;
        data[13] = this.y;
        return true;
      }
      return false;
    }
    getBoundsX() {
      return Transform2DComponent.data[this.id][TRANSFORM.BOUNDS_X1];
    }
    getBoundsY() {
      return Transform2DComponent.data[this.id][TRANSFORM.BOUNDS_Y1];
    }
    getBoundsRight() {
      return Transform2DComponent.data[this.id][TRANSFORM.BOUNDS_X2];
    }
    getBoundsBottom() {
      return Transform2DComponent.data[this.id][TRANSFORM.BOUNDS_Y2];
    }
    getMatrix() {
      return this.matrix.data;
    }
    reset(width, height) {
      this.size.set(width, height);
      this.isDirty = true;
    }
    destroy() {
      const id = this.id;
      removeComponent(GameObjectWorld, Transform2DComponent, id);
      removeEntity(GameObjectWorld, id);
    }
  };

  // Users/rich/Documents/GitHub/phaser-genesis/src/world/StaticWorld.ts
  var StaticWorld = class extends BaseWorld {
    type = "StaticWorld";
    colorQuery;
    transformQuery;
    renderData;
    constructor(scene) {
      super(scene);
      const tag = this.tag;
      this.colorQuery = defineQuery([tag, ColorComponent, QuadVertexComponent]);
      this.transformQuery = defineQuery([tag, Transform2DComponent]);
      const renderer = RendererInstance.get();
      this.camera = new WorldCamera(renderer.width, renderer.height);
      this.renderData = {
        gameFrame: 0,
        dirtyLocal: 0,
        dirtyWorld: 0,
        dirtyQuad: 0,
        dirtyColor: 0,
        dirtyView: 0,
        numChildren: 0,
        rendered: 0,
        renderMs: 0,
        updated: 0,
        updateMs: 0,
        fps: 0,
        delta: 0
      };
      SetWillTransformChildren(this.id, false);
      SetWillCacheChildren(this.id, false);
    }
    preRender(gameFrame) {
      const id = this.id;
      const renderData = this.renderData;
      renderData.gameFrame = gameFrame;
      renderData.rendered = 0;
      ClearDirtyChild(id);
      const camera = this.camera;
      const cameraUpdated = camera.updateBounds();
      const entities = this.transformQuery(GameObjectWorld);
      let dirtyLocal = 0;
      let dirtyWorld = 0;
      let dirtyQuad = 0;
      let dirtyColor = 0;
      let dirtyView = 0;
      if (HasDirtyChildTransform(id)) {
        dirtyLocal = UpdateLocalTransform(id, entities, camera, gameFrame);
        ClearDirtyChildTransform(id);
      }
      if (HasDirtyChildWorldTransform(id)) {
        dirtyWorld = RebuildWorldTransforms(entities);
        dirtyQuad = UpdateVertexPositionSystem(entities, camera, gameFrame);
        ClearDirtyChildWorldTransform(id);
      }
      if (HasDirtyChildColor(id)) {
        dirtyColor = UpdateQuadColorSystem(this.colorQuery(GameObjectWorld));
        ClearDirtyChildColor(id);
      }
      if (HasDirtyDisplayList(id)) {
        this.getNumChildren();
        ClearDirtyDisplayList(id);
      }
      const totalUpdated = dirtyLocal + dirtyQuad;
      if (cameraUpdated && totalUpdated !== entities.length) {
        dirtyView = UpdateInViewSystem(entities, camera, gameFrame);
      }
      renderData.dirtyLocal = dirtyLocal;
      renderData.dirtyWorld = dirtyWorld;
      renderData.dirtyQuad = dirtyQuad;
      renderData.dirtyColor = dirtyColor;
      renderData.dirtyView = dirtyView;
      renderData.rendered = GetRenderChildTotal();
      return true;
    }
    update(delta, time) {
      Emit(this, WorldBeforeUpdateEvent, delta, time);
      const start = performance.now();
      let next = GetFirstChildID(this.id);
      let total = 0;
      while (next > 0) {
        if (WillUpdate(next)) {
          GameObjectCache.get(next).update(delta, time);
          total++;
        }
        next = MoveNextUpdatable(next);
      }
      this.renderData.updated = total;
      this.renderData.updateMs = performance.now() - start;
      Emit(this, WorldUpdateEvent, delta, time);
    }
    renderGL(renderPass) {
      SetColor(renderPass, this.color);
      Emit(this, WorldRenderEvent, this);
      const camera = this.camera;
      const renderData = this.renderData;
      const start = performance.now();
      Begin(renderPass, camera);
      ResetRenderChildTotal();
      let id = GetFirstChildID(this.id);
      while (id > 0) {
        if (WillRender(id)) {
          RenderChild(renderPass, id);
        }
        id = GetNextSiblingID(id);
      }
      camera.isDirty = false;
      PopColor(renderPass, this.color);
      renderData.renderMs = performance.now() - start;
      renderData.numChildren = this.getNumChildren();
      renderData.fps = this.scene.game.time.fps;
      renderData.delta = this.scene.game.time.delta;
      this.scene.game.renderStats = renderData;
      Emit(this, WorldPostRenderEvent, renderPass, this);
    }
  };

  // Users/rich/Documents/GitHub/dev/examples/src/gameobjects/sprite/create sprite.ts
  var Demo = class extends Scene {
    constructor() {
      super();
      const loader = new Loader();
      loader.add(ImageFile("rocket", "assets/rocket.png"));
      loader.start().then(() => {
        const world2 = new StaticWorld(this);
        const rocket = new Sprite(400, 300, "rocket");
        AddChild(world2, rocket);
      });
    }
  };
  new Game(WebGL(), Parent("gameParent"), GlobalVar("Phaser4"), BackgroundColor(5832972), Scenes(Demo));
})();
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
//# sourceMappingURL=create sprite.js.map
