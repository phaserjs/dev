(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __pow = Math.pow;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // ../phaser-genesis/src/config/const.ts
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
    WORLD_SIZE: "WorldSize"
  };

  // ../phaser-genesis/src/config/ConfigStore.ts
  var ConfigStore = new Map();

  // ../phaser-genesis/src/config/backgroundcolor/SetBackgroundColor.ts
  function SetBackgroundColor(color) {
    ConfigStore.set(CONFIG_DEFAULTS.BACKGROUND_COLOR, color);
  }

  // ../phaser-genesis/src/config/backgroundcolor/BackgroundColor.ts
  function BackgroundColor(color) {
    return () => {
      SetBackgroundColor(color);
    };
  }

  // ../phaser-genesis/src/config/banner/SetBanner.ts
  function SetBanner(title = "", version = "", url = "", color = "#fff", background = "linear-gradient(#3e0081 40%, #00bcc3)") {
    ConfigStore.set(CONFIG_DEFAULTS.BANNER, { title, version, url, color, background });
  }

  // ../phaser-genesis/src/config/batchsize/SetBatchSize.ts
  function SetBatchSize(size) {
    ConfigStore.set(CONFIG_DEFAULTS.BATCH_SIZE, size);
  }

  // ../phaser-genesis/src/config/size/GetHeight.ts
  function GetHeight() {
    return ConfigStore.get(CONFIG_DEFAULTS.SIZE).height;
  }

  // ../phaser-genesis/src/config/size/GetResolution.ts
  function GetResolution() {
    return ConfigStore.get(CONFIG_DEFAULTS.SIZE).resolution;
  }

  // ../phaser-genesis/src/config/size/GetWidth.ts
  function GetWidth() {
    return ConfigStore.get(CONFIG_DEFAULTS.SIZE).width;
  }

  // ../phaser-genesis/src/config/size/SetSize.ts
  function SetSize(width = 800, height = 600, resolution = 1) {
    if (resolution === 0) {
      resolution = window.devicePixelRatio;
    }
    ConfigStore.set(CONFIG_DEFAULTS.SIZE, { width, height, resolution });
  }

  // ../phaser-genesis/src/renderer/BindingQueue.ts
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

  // ../phaser-genesis/src/config/backgroundcolor/GetBackgroundColor.ts
  function GetBackgroundColor() {
    return ConfigStore.get(CONFIG_DEFAULTS.BACKGROUND_COLOR);
  }

  // ../phaser-genesis/src/config/renderer/SetRenderer.ts
  function SetRenderer(renderer) {
    ConfigStore.set(CONFIG_DEFAULTS.RENDERER, renderer);
  }

  // ../phaser-genesis/src/config/defaultorigin/SetDefaultOrigin.ts
  function SetDefaultOrigin(x = 0.5, y = x) {
    ConfigStore.set(CONFIG_DEFAULTS.DEFAULT_ORIGIN, { x, y });
  }

  // ../phaser-genesis/src/config/globalvar/SetGlobalVar.ts
  function SetGlobalVar(name) {
    ConfigStore.set(CONFIG_DEFAULTS.GLOBAL_VAR, name);
  }

  // ../phaser-genesis/src/config/globalvar/GlobalVar.ts
  function GlobalVar(name) {
    return () => {
      SetGlobalVar(name);
    };
  }

  // ../phaser-genesis/src/config/maxtextures/SetMaxTextures.ts
  function SetMaxTextures(max) {
    ConfigStore.set(CONFIG_DEFAULTS.MAX_TEXTURES, max);
  }

  // ../phaser-genesis/src/dom/GetElement.ts
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

  // ../phaser-genesis/src/config/parent/SetParent.ts
  function SetParent(parentElement) {
    if (parentElement) {
      ConfigStore.set(CONFIG_DEFAULTS.PARENT, GetElement(parentElement));
    }
  }

  // ../phaser-genesis/src/config/parent/Parent.ts
  function Parent(parentElement) {
    return () => {
      SetParent(parentElement);
    };
  }

  // ../phaser-genesis/src/config/scenes/SetScenes.ts
  function SetScenes(scenes) {
    ConfigStore.set(CONFIG_DEFAULTS.SCENES, [].concat(scenes));
  }

  // ../phaser-genesis/src/config/scenes/Scenes.ts
  function Scenes(scenes) {
    return () => {
      SetScenes(scenes);
    };
  }

  // ../phaser-genesis/src/renderer/webgl1/GL.ts
  var gl;
  var GL = {
    get: () => {
      return gl;
    },
    set: (context) => {
      gl = context;
    }
  };

  // ../phaser-genesis/src/renderer/webgl1/renderpass/Draw.ts
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
      const subsize = currentBuffer.indexed ? count * currentBuffer.entryElementSize : count * currentBuffer.vertexElementSize;
      const view = currentBuffer.vertexViewF32.subarray(0, subsize);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
    }
    if (currentBuffer.indexed) {
      gl.drawElements(gl.TRIANGLES, count * currentBuffer.entryIndexSize, gl.UNSIGNED_SHORT, 0);
    } else {
      gl.drawArrays(gl.TRIANGLES, 0, count);
    }
    if (renderToFramebuffer) {
      renderPass.framebuffer.pop();
    }
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/Flush.ts
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

  // ../phaser-genesis/src/renderer/webgl1/renderpass/End.ts
  function End(renderPass) {
    Flush(renderPass);
  }

  // ../phaser-genesis/src/renderer/webgl1/colors/GetRGBArray.ts
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

  // ../phaser-genesis/src/config/webglcontext/GetWebGLContext.ts
  function GetWebGLContext() {
    return ConfigStore.get(CONFIG_DEFAULTS.WEBGL_CONTEXT);
  }

  // ../phaser-genesis/src/renderer/webgl1/fbo/CreateFramebuffer.ts
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

  // ../phaser-genesis/src/renderer/webgl1/textures/CreateGLTexture.ts
  function CreateGLTexture(binding) {
    const { parent, flipY, unpackPremultiplyAlpha, minFilter, magFilter, wrapS, wrapT, generateMipmap, isPOT } = binding;
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

  // ../phaser-genesis/src/renderer/webgl1/fbo/DeleteFramebuffer.ts
  function DeleteFramebuffer(framebuffer) {
    if (gl && gl.isFramebuffer(framebuffer)) {
      gl.deleteFramebuffer(framebuffer);
    }
  }

  // ../phaser-genesis/src/renderer/webgl1/textures/DeleteGLTexture.ts
  function DeleteGLTexture(texture) {
    if (gl.isTexture(texture)) {
      gl.deleteTexture(texture);
    }
  }

  // ../phaser-genesis/src/math/pow2/IsSizePowerOfTwo.ts
  function IsSizePowerOfTwo(width, height) {
    if (width < 1 || height < 1) {
      return false;
    }
    return (width & width - 1) === 0 && (height & height - 1) === 0;
  }

  // ../phaser-genesis/src/renderer/webgl1/textures/SetGLTextureFilterMode.ts
  function SetGLTextureFilterMode(texture, linear = true) {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    const mode = linear ? gl.LINEAR : gl.NEAREST;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mode);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, mode);
  }

  // ../phaser-genesis/src/renderer/webgl1/textures/UpdateGLTexture.ts
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

  // ../phaser-genesis/src/renderer/webgl1/textures/GLTextureBinding.ts
  var GLTextureBinding = class {
    constructor(parent, config = {}) {
      __publicField(this, "parent");
      __publicField(this, "texture");
      __publicField(this, "framebuffer");
      __publicField(this, "depthbuffer");
      __publicField(this, "isBound", false);
      __publicField(this, "textureUnit", 0);
      __publicField(this, "unpackPremultiplyAlpha", true);
      __publicField(this, "minFilter");
      __publicField(this, "magFilter");
      __publicField(this, "wrapS");
      __publicField(this, "wrapT");
      __publicField(this, "flipY", false);
      __publicField(this, "isPOT", false);
      __publicField(this, "generateMipmap", false);
      this.parent = parent;
      this.isPOT = IsSizePowerOfTwo(parent.width, parent.height);
      const {
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
      this.minFilter = minFilter;
      this.magFilter = magFilter;
      this.wrapS = wrapS;
      this.wrapT = wrapT;
      this.generateMipmap = generateMipmap;
      this.flipY = flipY;
      this.unpackPremultiplyAlpha = unpackPremultiplyAlpha;
      if (texture) {
        this.texture = texture;
      } else {
        CreateGLTexture(this);
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

  // ../phaser-genesis/src/renderer/webgl1/renderpass/ProcessBindingQueue.ts
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

  // ../phaser-genesis/src/renderer/webgl1/renderpass/BlendModeStack.ts
  var BlendModeStack = class {
    constructor(renderPass) {
      __publicField(this, "renderPass");
      __publicField(this, "stack");
      __publicField(this, "default");
      __publicField(this, "index");
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

  // ../phaser-genesis/src/renderer/webgl1/renderpass/FramebufferStack.ts
  var FramebufferStack = class {
    constructor(renderPass) {
      __publicField(this, "renderPass");
      __publicField(this, "stack");
      __publicField(this, "active");
      __publicField(this, "default");
      __publicField(this, "index");
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

  // ../phaser-genesis/src/config/batchsize/GetBatchSize.ts
  function GetBatchSize() {
    return ConfigStore.get(CONFIG_DEFAULTS.BATCH_SIZE);
  }

  // ../phaser-genesis/src/config/maxtextures/GetMaxTextures.ts
  function GetMaxTextures() {
    return ConfigStore.get(CONFIG_DEFAULTS.MAX_TEXTURES);
  }

  // ../phaser-genesis/src/renderer/webgl1/buffers/DeleteGLBuffer.ts
  function DeleteGLBuffer(buffer) {
    if (gl.isBuffer(buffer)) {
      gl.deleteBuffer(buffer);
    }
  }

  // ../phaser-genesis/src/renderer/webgl1/buffers/VertexBuffer.ts
  var VertexBuffer = class {
    constructor(config = {}) {
      __publicField(this, "name");
      __publicField(this, "batchSize");
      __publicField(this, "dataSize");
      __publicField(this, "vertexElementSize");
      __publicField(this, "vertexByteSize");
      __publicField(this, "entryByteSize");
      __publicField(this, "bufferByteSize");
      __publicField(this, "data");
      __publicField(this, "vertexViewF32");
      __publicField(this, "vertexViewU32");
      __publicField(this, "vertexBuffer");
      __publicField(this, "indexed", false);
      __publicField(this, "isDynamic", false);
      __publicField(this, "count", 0);
      __publicField(this, "offset", 0);
      __publicField(this, "elementsPerEntry");
      __publicField(this, "isBound", false);
      const {
        name = "VBO",
        batchSize = 1,
        dataSize = 4,
        isDynamic = true,
        elementsPerEntry = 4,
        vertexElementSize = 6
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
      this.vertexViewU32 = new Uint32Array(data);
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
      this.vertexViewU32 = null;
      this.vertexBuffer = null;
    }
  };

  // ../phaser-genesis/src/renderer/webgl1/buffers/IndexedVertexBuffer.ts
  var IndexedVertexBuffer = class extends VertexBuffer {
    constructor(config = {}) {
      super(config);
      __publicField(this, "indexSize");
      __publicField(this, "entryElementSize");
      __publicField(this, "entryIndexSize");
      __publicField(this, "index");
      __publicField(this, "indexBuffer");
      __publicField(this, "indexLayout");
      const {
        indexSize = 4,
        entryIndexSize = 6,
        indexLayout = null
      } = config;
      this.indexed = true;
      this.indexSize = indexSize;
      this.entryIndexSize = entryIndexSize;
      this.entryElementSize = this.vertexElementSize * this.elementsPerEntry;
      const seededIndexBuffer = [];
      if (indexLayout) {
        this.indexLayout = indexLayout;
        for (let i = 0; i < this.batchSize * indexSize; i += indexSize) {
          for (let c = 0; c < indexLayout.length; c++) {
            seededIndexBuffer.push(i + indexLayout[c]);
          }
        }
      }
      this.create();
      this.createIndexBuffer(seededIndexBuffer);
    }
    createIndexBuffer(seededIndex) {
      this.index = new Uint16Array(seededIndex);
      this.indexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.index, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      seededIndex = [];
    }
    bind() {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    }
    destroy() {
      super.destroy();
      DeleteGLBuffer(this.indexBuffer);
      this.index = null;
      this.indexLayout = null;
      this.indexBuffer = null;
    }
  };

  // ../phaser-genesis/src/utils/base64/Base64ToArrayBuffer.ts
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var lookup = new Uint8Array(256);
  for (let i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }

  // ../phaser-genesis/src/utils/NOOP.ts
  function NOOP() {
  }

  // ../phaser-genesis/src/math/mat4/Matrix4.ts
  var Matrix4 = class {
    constructor(src) {
      __publicField(this, "data");
      __publicField(this, "onChange");
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
      const data = this.data;
      data[0] = m00;
      data[1] = m01;
      data[2] = m02;
      data[3] = m03;
      data[4] = m10;
      data[5] = m11;
      data[6] = m12;
      data[7] = m13;
      data[8] = m20;
      data[9] = m21;
      data[10] = m22;
      data[11] = m23;
      data[12] = m30;
      data[13] = m31;
      data[14] = m32;
      data[15] = m33;
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

  // ../phaser-genesis/src/math/mat4/Mat4Ortho.ts
  function Mat4Ortho(left, right, bottom, top, near, far, out = new Matrix4()) {
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);
    return out.set(-2 * lr, 0, 0, 0, 0, -2 * bt, 0, 0, 0, 0, 2 * nf, 0, (left + right) * lr, (top + bottom) * bt, (far + near) * nf, 1);
  }

  // ../phaser-genesis/src/renderer/webgl1/shaders/CheckShaderMaxIfStatements.ts
  var fragTemplate = [
    "precision mediump float;",
    "void main(void){",
    "float test = 0.1;",
    "%forloop%",
    "gl_FragColor = vec4(0.0);",
    "}"
  ].join("\n");
  function GenerateSrc(maxIfs) {
    let src = "";
    for (let i = 0; i < maxIfs; ++i) {
      if (i > 0) {
        src += "\nelse ";
      }
      if (i < maxIfs - 1) {
        src += `if(test == ${i}.0){}`;
      }
    }
    return src;
  }
  function CheckShaderMaxIfStatements(maxIfs) {
    const shader = gl.createShader(gl.FRAGMENT_SHADER);
    while (true) {
      const fragmentSrc = fragTemplate.replace(/%forloop%/gi, GenerateSrc(maxIfs));
      gl.shaderSource(shader, fragmentSrc);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        maxIfs = maxIfs / 2 | 0;
      } else {
        break;
      }
    }
    return maxIfs;
  }

  // ../phaser-genesis/src/renderer/webgl1/GL_CONST.ts
  var BYTE = 5120;
  var UNSIGNED_BYTE = 5121;
  var SHORT = 5122;
  var UNSIGNED_SHORT = 5123;
  var FLOAT = 5126;

  // ../phaser-genesis/src/renderer/webgl1/shaders/CreateAttributes.ts
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

  // ../phaser-genesis/src/renderer/webgl1/shaders/DeleteShaders.ts
  function DeleteShaders(...shaders) {
    shaders.forEach((shader) => {
      gl.deleteShader(shader);
    });
  }

  // ../phaser-genesis/src/renderer/webgl1/shaders/CreateProgram.ts
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

  // ../phaser-genesis/src/renderer/webgl1/shaders/CreateShader.ts
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

  // ../phaser-genesis/src/renderer/webgl1/shaders/CreateUniformSetter.ts
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

  // ../phaser-genesis/src/renderer/webgl1/shaders/CreateUniforms.ts
  function CreateUniforms(program) {
    const uniforms = new Map();
    const total = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < total; i++) {
      const uniform = gl.getActiveUniform(program, i);
      let name = uniform.name;
      if (name.startsWith("gl_") || name.startsWith("webgl_")) {
        continue;
      }
      const location = gl.getUniformLocation(program, uniform.name);
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

  // ../phaser-genesis/src/renderer/webgl1/shaders/DefaultQuadAttributes.ts
  var DefaultQuadAttributes = {
    aVertexPosition: { size: 2 },
    aTextureCoord: { size: 2 },
    aTextureId: { size: 1 },
    aTintColor: { size: 4, type: UNSIGNED_BYTE, normalized: true }
  };

  // ../phaser-genesis/src/renderer/webgl1/shaders/DefaultQuadUniforms.ts
  var DefaultQuadUniforms = {
    uProjectionMatrix: new Float32Array(),
    uCameraMatrix: new Float32Array(),
    uTexture: 0
  };

  // ../phaser-genesis/src/renderer/webgl1/fbo/CreateDepthBuffer.ts
  function CreateDepthBuffer(framebuffer, textureWidth, textureHeight) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    const depthBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, textureWidth, textureHeight);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return depthBuffer;
  }

  // ../phaser-genesis/src/renderer/webgl1/glsl/SINGLE_QUAD_FRAG.ts
  var SINGLE_QUAD_FRAG = `#define SHADER_NAME SINGLE_QUAD_FRAG

precision highp float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;

void main (void)
{
    vec4 color = texture2D(uTexture, vTextureCoord);

    gl_FragColor = color * vec4(vTintColor.bgr * vTintColor.a, vTintColor.a);
}`;

  // ../phaser-genesis/src/renderer/webgl1/glsl/SINGLE_QUAD_VERT.ts
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

  // ../phaser-genesis/node_modules/bitecs/dist/index.es.js
  var TYPES_ENUM = {
    i8: "i8",
    ui8: "ui8",
    ui8c: "ui8c",
    i16: "i16",
    ui16: "ui16",
    i32: "i32",
    ui32: "ui32",
    f32: "f32",
    f64: "f64"
  };
  var TYPES_NAMES = {
    i8: "Int8",
    ui8: "Uint8",
    ui8c: "Uint8Clamped",
    i16: "Int16",
    ui16: "Uint16",
    i32: "Int32",
    ui32: "Uint32",
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
    f64: Float64Array
  };
  var UNSIGNED_MAX = {
    uint8: __pow(2, 8),
    uint16: __pow(2, 16),
    uint32: __pow(2, 32)
  };
  var $storeRef = Symbol("storeRef");
  var $storeSize = Symbol("storeSize");
  var $storeMaps = Symbol("storeMaps");
  var $storeFlattened = Symbol("storeFlattened");
  var $storeBase = Symbol("storeBase");
  var $storeType = Symbol("storeType");
  var $storeArrayCounts = Symbol("storeArrayCount");
  var $storeSubarrays = Symbol("storeSubarrays");
  var $storeCursor = Symbol("storeCursor");
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
  var stores = {};
  var resize = (ta, size) => {
    const newBuffer = new ArrayBuffer(size * ta.BYTES_PER_ELEMENT);
    const newTa = new ta.constructor(newBuffer);
    newTa.set(ta, 0);
    return newTa;
  };
  var createShadow = (store, key) => {
    if (!ArrayBuffer.isView(store)) {
      const shadow = store[$parentArray].slice(0);
      for (const k in store[key]) {
        const from = store[key][k][$subarrayFrom];
        const to = store[key][k][$subarrayTo];
        store[key][k] = shadow.subarray(from, to);
      }
    } else {
      store[key] = store.slice(0);
    }
  };
  var resizeSubarray = (metadata, store, size) => {
    const cursors = metadata[$subarrayCursors];
    const type = store[$storeType];
    const length = store[0].length;
    const indexType = length <= UNSIGNED_MAX.uint8 ? "ui8" : length <= UNSIGNED_MAX.uint16 ? "ui16" : "ui32";
    const arrayCount = metadata[$storeArrayCounts][type];
    const summedLength = Array(arrayCount).fill(0).reduce((a, p) => a + length, 0);
    const array = new TYPES[type](summedLength * size);
    array.set(metadata[$storeSubarrays][type]);
    metadata[$storeSubarrays][type] = array;
    createShadow(metadata[$storeSubarrays][type], $queryShadow);
    createShadow(metadata[$storeSubarrays][type], $serializeShadow);
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
      store[eid][$queryShadow] = metadata[$storeSubarrays][type][$queryShadow].subarray(from, to);
      store[eid][$serializeShadow] = metadata[$storeSubarrays][type][$serializeShadow].subarray(from, to);
      store[eid][$subarray] = true;
      store[eid][$indexType] = array[$indexType];
      store[eid][$indexBytes] = array[$indexBytes];
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
        store[key][$queryShadow] = resize(ta[$queryShadow], size);
        store[key][$serializeShadow] = resize(ta[$serializeShadow], size);
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
    return new TYPES[type](buffer);
  };
  var createArrayStore = (metadata, type, length) => {
    const size = metadata[$storeSize];
    const store = Array(size).fill(0);
    store[$storeType] = type;
    const cursors = metadata[$subarrayCursors];
    const indexType = length < UNSIGNED_MAX.uint8 ? "ui8" : length < UNSIGNED_MAX.uint16 ? "ui16" : "ui32";
    if (!length)
      throw new Error("\u274C Must define a length for component array.");
    if (!TYPES[type])
      throw new Error(`\u274C Invalid component array property type ${type}.`);
    if (!metadata[$storeSubarrays][type]) {
      const arrayCount = metadata[$storeArrayCounts][type];
      const summedLength = Array(arrayCount).fill(0).reduce((a, p) => a + length, 0);
      const array = new TYPES[type](summedLength * size);
      metadata[$storeSubarrays][type] = array;
      createShadow(metadata[$storeSubarrays][type], $queryShadow);
      createShadow(metadata[$storeSubarrays][type], $serializeShadow);
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
      store[eid][$queryShadow] = metadata[$storeSubarrays][type][$queryShadow].subarray(from, to);
      store[eid][$serializeShadow] = metadata[$storeSubarrays][type][$serializeShadow].subarray(from, to);
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
      [$storeCursor]: 0,
      [$subarrayCursors]: Object.keys(TYPES).reduce((a, type) => __spreadProps(__spreadValues({}, a), {
        [type]: 0
      }), {}),
      [$storeFlattened]: [],
      [$storeArrayCounts]: arrayCounts
    };
    if (schema instanceof Object && Object.keys(schema).length) {
      const recursiveTransform = (a, k) => {
        if (typeof a[k] === "string") {
          a[k] = createTypeStore(a[k], size);
          createShadow(a[k], $queryShadow);
          createShadow(a[k], $serializeShadow);
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
    dense.count = () => dense.length;
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
  var resized = false;
  var setSerializationResized = (v) => {
    resized = v;
  };
  var newEntities = new Map();
  var $entityMasks = Symbol("entityMasks");
  var $entitySparseSet = Symbol("entitySparseSet");
  var $entityArray = Symbol("entityArray");
  var $entityIndices = Symbol("entityIndices");
  var defaultSize = 1e5;
  var globalEntityCursor = 0;
  var globalSize = defaultSize;
  var threshold = globalSize - globalSize / 5;
  var resizeThreshold = () => threshold;
  var getGlobalSize = () => globalSize;
  var removed = [];
  var getDefaultSize = () => defaultSize;
  var getEntityCursor = () => globalEntityCursor;
  var eidToWorld = new Map();
  var addEntity = (world3) => {
    const eid = removed.length > 0 ? removed.shift() : globalEntityCursor++;
    world3[$entitySparseSet].add(eid);
    eidToWorld.set(eid, world3);
    if (globalEntityCursor >= resizeThreshold()) {
      const size = globalSize;
      const amount = Math.ceil(size / 2 / 4) * 4;
      const newSize = size + amount;
      globalSize = newSize;
      resizeWorlds(newSize);
      resizeComponents(newSize);
      setSerializationResized(true);
      console.info(`\u{1F47E} bitECS - resizing all worlds from ${size} to ${size + amount}`);
    }
    return eid;
  };
  var removeEntity = (world3, eid) => {
    if (!world3[$entitySparseSet].has(eid))
      return;
    world3[$queries].forEach((q) => {
      queryRemoveEntity(world3, q, eid);
    });
    removed.push(eid);
    world3[$entitySparseSet].remove(eid);
    for (let i = 0; i < world3[$entityMasks].length; i++)
      world3[$entityMasks][i][eid] = 0;
  };
  function Changed(c) {
    return function QueryChanged() {
      return c;
    };
  }
  var $queries = Symbol("queries");
  var $queryMap = Symbol("queryMap");
  var $dirtyQueries = Symbol("$dirtyQueries");
  var $queryComponents = Symbol("queryComponents");
  var registerQuery = (world3, query) => {
    const components2 = [];
    const notComponents = [];
    const changedComponents = [];
    query[$queryComponents].forEach((c) => {
      if (typeof c === "function") {
        const comp = c();
        if (!world3[$componentMap].has(comp))
          registerComponent(world3, comp);
        if (c.name === "QueryNot") {
          notComponents.push(comp);
        }
        if (c.name === "QueryChanged") {
          changedComponents.push(comp);
          components2.push(comp);
        }
      } else {
        if (!world3[$componentMap].has(c))
          registerComponent(world3, c);
        components2.push(c);
      }
    });
    const mapComponents = (c) => world3[$componentMap].get(c);
    const sparseSet = SparseSet();
    const archetypes = [];
    const changed = [];
    const toRemove = [];
    const entered = [];
    const exited = [];
    const generations = components2.concat(notComponents).map(mapComponents).map((c) => c.generationId).reduce((a, v) => {
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
    const notMasks = notComponents.map(mapComponents).reduce((a, c) => {
      if (!a[c.generationId]) {
        a[c.generationId] = 0;
        a[c.generationId] |= c.bitflag;
      }
      return a;
    }, {});
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
      generations,
      flatProps,
      toRemove,
      entered,
      exited,
      shadows
    });
    world3[$queryMap].set(query, q);
    world3[$queries].add(q);
    for (let eid = 0; eid < getEntityCursor(); eid++) {
      if (!world3[$entitySparseSet].has(eid))
        continue;
      if (queryCheckEntity(world3, q, eid)) {
        queryAddEntity(q, eid);
      }
    }
  };
  var diff = (q, clearDiff) => {
    if (clearDiff)
      q.changed.length = 0;
    const {
      flatProps,
      shadows
    } = q;
    for (let i = 0; i < q.dense.count(); i++) {
      const eid = q.dense[i];
      let dirty = false;
      for (let pid = 0; pid < flatProps.length; pid++) {
        const prop = flatProps[pid];
        const shadow = shadows[pid];
        if (ArrayBuffer.isView(prop[eid])) {
          for (let i2 = 0; i2 < prop[eid].length; i2++) {
            if (prop[eid][i2] !== prop[eid][$queryShadow][i2]) {
              dirty = true;
              prop[eid][$queryShadow][i2] = prop[eid][i2];
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
  var defineQuery = (components2) => {
    if (components2 === void 0 || components2[$componentMap] !== void 0) {
      return (world3) => world3 ? world3[$entityArray] : components2[$entityArray];
    }
    const query = function(world3, clearDiff = true) {
      if (!world3[$queryMap].has(query))
        registerQuery(world3, query);
      const q = world3[$queryMap].get(query);
      queryCommitRemovals(q);
      if (q.changedComponents.length)
        return diff(q, clearDiff);
      return q.dense;
    };
    query[$queryComponents] = components2;
    return query;
  };
  var queryCheckEntity = (world3, q, eid) => {
    const {
      masks,
      notMasks,
      generations
    } = q;
    for (let i = 0; i < generations.length; i++) {
      const generationId = generations[i];
      const qMask = masks[generationId];
      const qNotMask = notMasks[generationId];
      const eMask = world3[$entityMasks][generationId][eid];
      if (qNotMask && (eMask & qNotMask) !== 0) {
        return false;
      }
      if (qMask && (eMask & qMask) !== qMask) {
        return false;
      }
    }
    return true;
  };
  var queryCheckComponent = (world3, q, component) => {
    const {
      generationId,
      bitflag
    } = world3[$componentMap].get(component);
    const {
      masks
    } = q;
    const mask = masks[generationId];
    return (mask & bitflag) === bitflag;
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
  var commitRemovals = (world3) => {
    world3[$dirtyQueries].forEach(queryCommitRemovals);
    world3[$dirtyQueries].clear();
  };
  var queryRemoveEntity = (world3, q, eid) => {
    if (!q.has(eid))
      return;
    q.toRemove.push(eid);
    world3[$dirtyQueries].add(q);
    q.exited.push(eid);
  };
  var $componentMap = Symbol("componentMap");
  var components = [];
  var resizeComponents = (size) => {
    components.forEach((component) => resizeStore(component, size));
  };
  var defineComponent = (schema) => {
    const component = createStore(schema, getDefaultSize());
    if (schema && Object.keys(schema).length)
      components.push(component);
    return component;
  };
  var incrementBitflag = (world3) => {
    world3[$bitflag] *= 2;
    if (world3[$bitflag] >= __pow(2, 32)) {
      world3[$bitflag] = 1;
      world3[$entityMasks].push(new Uint32Array(world3[$size]));
    }
  };
  var registerComponent = (world3, component) => {
    if (!component)
      throw new Error(`\u{1F47E} bitECS - cannot register component as it is null or undefined.`);
    world3[$componentMap].set(component, {
      generationId: world3[$entityMasks].length - 1,
      bitflag: world3[$bitflag],
      store: component
    });
    if (component[$storeSize] < world3[$size]) {
      resizeStore(component, world3[$size]);
    }
    incrementBitflag(world3);
  };
  var hasComponent = (world3, component, eid) => {
    const registeredComponent = world3[$componentMap].get(component);
    if (!registeredComponent)
      return;
    const {
      generationId,
      bitflag
    } = registeredComponent;
    const mask = world3[$entityMasks][generationId][eid];
    return (mask & bitflag) === bitflag;
  };
  var addComponent = (world3, component, eid, reset = false) => {
    if (!Number.isInteger(eid)) {
      component = world3;
      world3 = eidToWorld.get(eid);
      reset = eid || reset;
    }
    if (!world3[$componentMap].has(component))
      registerComponent(world3, component);
    if (hasComponent(world3, component, eid))
      return;
    const {
      generationId,
      bitflag
    } = world3[$componentMap].get(component);
    world3[$entityMasks][generationId][eid] |= bitflag;
    world3[$queries].forEach((q) => {
      if (!queryCheckComponent(world3, q, component))
        return;
      const match = queryCheckEntity(world3, q, eid);
      if (match)
        queryAddEntity(q, eid);
    });
    if (reset)
      resetStoreFor(component, eid);
  };
  var removeComponent = (world3, component, eid, reset = true) => {
    if (!Number.isInteger(eid)) {
      component = world3;
      world3 = eidToWorld.get(eid);
      reset = eid || reset;
    }
    const {
      generationId,
      bitflag
    } = world3[$componentMap].get(component);
    if (!(world3[$entityMasks][generationId][eid] & bitflag))
      return;
    world3[$queries].forEach((q) => {
      if (!queryCheckComponent(world3, q, component))
        return;
      const match = queryCheckEntity(world3, q, eid);
      if (match)
        queryRemoveEntity(world3, q, eid);
    });
    world3[$entityMasks][generationId][eid] &= ~bitflag;
    if (reset)
      resetStoreFor(component, eid);
  };
  var $size = Symbol("size");
  var $resizeThreshold = Symbol("resizeThreshold");
  var $bitflag = Symbol("bitflag");
  var $archetypes = Symbol("archetypes");
  var worlds = [];
  var resizeWorlds = (size) => {
    worlds.forEach((world3) => {
      world3[$size] = size;
      for (let i = 0; i < world3[$entityMasks].length; i++) {
        const masks = world3[$entityMasks][i];
        world3[$entityMasks][i] = resize(masks, size);
      }
      world3[$resizeThreshold] = world3[$size] - world3[$size] / 5;
    });
  };
  var createWorld = () => {
    const world3 = {};
    resetWorld(world3);
    worlds.push(world3);
    return world3;
  };
  var resetWorld = (world3) => {
    const size = getGlobalSize();
    world3[$size] = size;
    world3[$entityMasks] = [new Uint32Array(size)];
    world3[$archetypes] = [];
    if (world3[$entityArray])
      world3[$entityArray].forEach((eid) => removeEntity(world3, eid));
    world3[$entitySparseSet] = SparseSet();
    world3[$entityArray] = world3[$entitySparseSet].dense;
    world3[$bitflag] = 1;
    world3[$componentMap] = new Map();
    world3[$queryMap] = new Map();
    world3[$queries] = new Set();
    world3[$dirtyQueries] = new Set();
    return world3;
  };
  var defineSystem = (fn1, fn2) => {
    const update = fn2 !== void 0 ? fn2 : fn1;
    const create = fn2 !== void 0 ? fn1 : void 0;
    const init = new Set();
    const system = (world3, ...args) => {
      if (create && !init.has(world3)) {
        create(world3, ...args);
        init.add(world3);
      }
      update(world3, ...args);
      commitRemovals(world3);
      return world3;
    };
    Object.defineProperty(system, "name", {
      value: (update.name || "AnonymousSystem") + "_internal",
      configurable: true
    });
    return system;
  };
  var Types = TYPES_ENUM;

  // ../phaser-genesis/src/components/vertices/QuadVertexComponent.ts
  var QuadVertex = defineComponent({
    tl: Types.ui32,
    bl: Types.ui32,
    br: Types.ui32,
    tr: Types.ui32
  });
  var QuadVertexComponent = QuadVertex;

  // ../phaser-genesis/src/components/transform/Extent2DComponent.ts
  var Extent2D = defineComponent({
    x: Types.f32,
    y: Types.f32,
    width: Types.f32,
    height: Types.f32,
    right: Types.f32,
    bottom: Types.f32
  });
  var Extent2DComponent = Extent2D;

  // ../phaser-genesis/src/components/dirty/DirtyComponent.ts
  var Dirty = defineComponent({
    frame: Types.ui32,
    transform: Types.ui32,
    update: Types.ui32,
    childCache: Types.ui32,
    postRender: Types.ui32,
    bounds: Types.ui32,
    texture: Types.ui32,
    textureFrame: Types.ui32,
    child: Types.ui32,
    displayList: Types.ui32
  });
  var DirtyComponent = Dirty;

  // ../phaser-genesis/src/GameObjectWorld.ts
  var world = createWorld();
  var GameObjectWorld = world;

  // ../phaser-genesis/src/components/dirty/AddDirtyComponent.ts
  function AddDirtyComponent(id) {
    addComponent(GameObjectWorld, DirtyComponent, id);
    DirtyComponent.frame[id] = 0;
    DirtyComponent.transform[id] = 1;
    DirtyComponent.update[id] = 1;
    DirtyComponent.childCache[id] = 0;
    DirtyComponent.postRender[id] = 0;
    DirtyComponent.bounds[id] = 1;
    DirtyComponent.texture[id] = 0;
    DirtyComponent.textureFrame[id] = 0;
    DirtyComponent.child[id] = 0;
    DirtyComponent.displayList[id] = 0;
  }

  // ../phaser-genesis/src/components/dirty/ClearDirtyDisplayList.ts
  function ClearDirtyDisplayList(id) {
    DirtyComponent.displayList[id] = 0;
  }

  // ../phaser-genesis/src/components/dirty/HasDirtyChildCache.ts
  function HasDirtyChildCache(id) {
    return Boolean(DirtyComponent.childCache[id]);
  }

  // ../phaser-genesis/src/components/dirty/HasDirtyDisplayList.ts
  function HasDirtyDisplayList(id) {
    return Boolean(DirtyComponent.displayList[id]);
  }

  // ../phaser-genesis/src/components/dirty/SetDirtyChildCache.ts
  function SetDirtyChildCache(id) {
    DirtyComponent.childCache[id] = 1;
  }

  // ../phaser-genesis/src/components/dirty/SetDirtyDisplayList.ts
  function SetDirtyDisplayList(id) {
    DirtyComponent.displayList[id] = 1;
  }

  // ../phaser-genesis/src/GameInstance.ts
  var instance;
  var frame = 0;
  var elapsed = 0;
  var GameInstance = {
    get: () => {
      return instance;
    },
    set: (game) => {
      instance = game;
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

  // ../phaser-genesis/src/components/hierarchy/HierarchyComponent.ts
  var Hierarchy = defineComponent({
    worldID: Types.ui32,
    parentID: Types.ui32,
    numChildren: Types.ui32,
    depth: Types.ui32
  });
  var HierarchyComponent = Hierarchy;

  // ../phaser-genesis/src/components/hierarchy/AddHierarchyComponent.ts
  function AddHierarchyComponent(id) {
    addComponent(GameObjectWorld, HierarchyComponent, id);
  }

  // ../phaser-genesis/src/gameobjects/GameObjectCache.ts
  var GameObjectCache = new Map();

  // ../phaser-genesis/src/components/hierarchy/ClearWorldAndParentID.ts
  function ClearWorldAndParentID(id) {
    const worldID = GetWorldID(id);
    const parentID = GetParentID(id);
    const world3 = GameObjectCache.get(worldID);
    HierarchyComponent.worldID[id] = 0;
    HierarchyComponent.parentID[id] = 0;
    if (world3 && hasComponent(GameObjectWorld, world3.tag, id)) {
      removeComponent(GameObjectWorld, world3.tag, id);
    }
    UpdateNumChildren(parentID);
    SetDirtyParents(id);
  }

  // ../phaser-genesis/src/components/bounds/BoundsComponent.ts
  var Bounds = defineComponent({
    x: Types.f32,
    y: Types.f32,
    width: Types.f32,
    height: Types.f32,
    right: Types.f32,
    bottom: Types.f32
  });
  var BoundsComponent = Bounds;

  // ../phaser-genesis/src/components/color/ColorComponent.ts
  var Color = defineComponent({
    alpha: Types.f32,
    tint: Types.ui32
  });
  var ColorComponent = Color;

  // ../phaser-genesis/src/components/color/AddColorComponent.ts
  function AddColorComponent(id) {
    addComponent(GameObjectWorld, ColorComponent, id);
    ColorComponent.alpha[id] = 1;
    ColorComponent.tint[id] = 16777215;
  }

  // ../phaser-genesis/src/components/vertices/AddQuadVertex.ts
  function AddQuadVertex(id, width = 0, height = 0, flipY = true) {
    addComponent(GameObjectWorld, QuadVertexComponent, id);
    if (width || height) {
      QuadVertexComponent.tl[id] = AddVertex(0, 0, 0, 0, 1);
      QuadVertexComponent.bl[id] = AddVertex(0, height, 0, 0, 0);
      QuadVertexComponent.br[id] = AddVertex(width, height, 0, 1, 0);
      QuadVertexComponent.tr[id] = AddVertex(width, 0, 0, 1, 1);
    } else {
      QuadVertexComponent.tl[id] = AddVertex();
      QuadVertexComponent.bl[id] = AddVertex();
      QuadVertexComponent.br[id] = AddVertex();
      QuadVertexComponent.tr[id] = AddVertex();
    }
  }

  // ../phaser-genesis/src/components/vertices/VertexComponent.ts
  var Vertex = defineComponent({
    x: Types.f32,
    y: Types.f32,
    z: Types.f32,
    u: Types.f32,
    v: Types.f32,
    texture: Types.ui8,
    tint: Types.ui32,
    alpha: Types.f32,
    color: Types.ui32,
    offset: Types.f32
  });
  var VertexComponent = Vertex;

  // ../phaser-genesis/src/components/vertices/VertexWorld.ts
  var world2 = createWorld();
  var VertexWorld = world2;

  // ../phaser-genesis/src/components/vertices/AddVertex.ts
  function AddVertex(x = 0, y = 0, z = 0, u = 0, v = 0) {
    const vertexID = addEntity(VertexWorld);
    addComponent(VertexWorld, VertexComponent, vertexID);
    VertexComponent.x[vertexID] = x;
    VertexComponent.y[vertexID] = y;
    VertexComponent.z[vertexID] = z;
    VertexComponent.u[vertexID] = u;
    VertexComponent.v[vertexID] = v;
    VertexComponent.alpha[vertexID] = 1;
    VertexComponent.tint[vertexID] = 16777215;
    VertexComponent.color[vertexID] = 4294967295;
    return vertexID;
  }

  // ../phaser-genesis/src/components/vertices/SetUV.ts
  function SetUV(id, u, v) {
    VertexComponent.u[id] = u;
    VertexComponent.v[id] = v;
  }

  // ../phaser-genesis/src/components/transform/WorldMatrix2DComponent.ts
  var WorldMatrix2D = defineComponent({
    a: Types.f32,
    b: Types.f32,
    c: Types.f32,
    d: Types.f32,
    tx: Types.f32,
    ty: Types.f32
  });
  var WorldMatrix2DComponent = WorldMatrix2D;

  // ../phaser-genesis/src/components/vertices/UpdateVertexPositionSystem.ts
  var changedWorldExtentQuery = defineQuery([
    Changed(WorldMatrix2DComponent),
    Changed(Extent2DComponent)
  ]);
  var entities;
  var updateVertexPositionSystem = defineSystem((world3) => {
    for (let i = 0; i < entities.length; i++) {
      const id = entities[i];
      const a = WorldMatrix2DComponent.a[id];
      const b = WorldMatrix2DComponent.b[id];
      const c = WorldMatrix2DComponent.c[id];
      const d = WorldMatrix2DComponent.d[id];
      const tx = WorldMatrix2DComponent.tx[id];
      const ty = WorldMatrix2DComponent.ty[id];
      const x = Extent2DComponent.x[id];
      const y = Extent2DComponent.y[id];
      const right = Extent2DComponent.right[id];
      const bottom = Extent2DComponent.bottom[id];
      const v1 = QuadVertexComponent.tl[id];
      const v2 = QuadVertexComponent.bl[id];
      const v3 = QuadVertexComponent.br[id];
      const v4 = QuadVertexComponent.tr[id];
      const x0 = x * a + y * c + tx;
      const y0 = x * b + y * d + ty;
      const x1 = x * a + bottom * c + tx;
      const y1 = x * b + bottom * d + ty;
      const x2 = right * a + bottom * c + tx;
      const y2 = right * b + bottom * d + ty;
      const x3 = right * a + y * c + tx;
      const y3 = right * b + y * d + ty;
      VertexComponent.x[v1] = x0;
      VertexComponent.y[v1] = y0;
      VertexComponent.x[v2] = x1;
      VertexComponent.y[v2] = y1;
      VertexComponent.x[v3] = x2;
      VertexComponent.y[v3] = y2;
      VertexComponent.x[v4] = x3;
      VertexComponent.y[v4] = y3;
      BoundsComponent.x[id] = Math.min(x0, x1, x2, x3);
      BoundsComponent.y[id] = Math.min(y0, y1, y2, y3);
      BoundsComponent.right[id] = Math.max(x0, x1, x2, x3);
      BoundsComponent.bottom[id] = Math.max(y0, y1, y2, y3);
      BoundsComponent.width[id] = BoundsComponent.right[id] - BoundsComponent.x[id];
      BoundsComponent.height[id] = BoundsComponent.bottom[id] - BoundsComponent.y[id];
    }
    return world3;
  });
  var UpdateVertexPositionSystem = (world3) => {
    entities = changedWorldExtentQuery(world3);
    updateVertexPositionSystem(world3);
    return entities;
  };

  // ../phaser-genesis/src/renderer/webgl1/colors/PackColor.ts
  function PackColor(rgb, alpha) {
    const ua = (alpha * 255 | 0) & 255;
    return (ua << 24 | rgb) >>> 0;
  }

  // ../phaser-genesis/src/renderer/webgl1/colors/PackColors.ts
  function PackColors(vertices) {
    vertices.forEach((vertex) => {
      vertex.packColor();
    });
  }

  // ../phaser-genesis/src/components/color/PackQuadColorsSystem.ts
  var changedColorQuery = defineQuery([Changed(ColorComponent), QuadVertexComponent]);
  var packQuadColorsSystem = defineSystem((world3) => {
    const entities3 = changedColorQuery(world3);
    for (let i = 0; i < entities3.length; i++) {
      const id = entities3[i];
      const v1 = QuadVertexComponent.tl[id];
      const v2 = QuadVertexComponent.bl[id];
      const v3 = QuadVertexComponent.br[id];
      const v4 = QuadVertexComponent.tr[id];
      const color = PackColor(ColorComponent.tint[id], ColorComponent.alpha[id]);
      VertexComponent.color[v1] = color;
      VertexComponent.color[v2] = color;
      VertexComponent.color[v3] = color;
      VertexComponent.color[v4] = color;
    }
    return world3;
  });
  var PackQuadColorsSystem = packQuadColorsSystem;

  // ../phaser-genesis/src/components/color/SetAlpha.ts
  function SetAlpha(id, value) {
    ColorComponent.alpha[id] = value;
    SetDirtyParents(id);
  }

  // ../phaser-genesis/src/components/color/SetTint.ts
  function SetTint(id, value) {
    ColorComponent.tint[id] = value;
    SetDirtyParents(id);
  }

  // ../phaser-genesis/src/components/permissions/PermissionsComponent.ts
  var Permissions = defineComponent({
    visible: Types.ui8,
    visibleChildren: Types.ui8,
    willUpdate: Types.ui8,
    willUpdateChildren: Types.ui8,
    willRender: Types.ui8,
    willRenderChildren: Types.ui8,
    willCacheChildren: Types.ui8,
    willTransformChildren: Types.ui8
  });
  var PermissionsComponent = Permissions;

  // ../phaser-genesis/src/components/permissions/AddPermissionsComponent.ts
  function AddPermissionsComponent(id) {
    addComponent(GameObjectWorld, PermissionsComponent, id);
    PermissionsComponent.visible[id] = 1;
    PermissionsComponent.visibleChildren[id] = 1;
    PermissionsComponent.willUpdate[id] = 1;
    PermissionsComponent.willUpdateChildren[id] = 1;
    PermissionsComponent.willRender[id] = 1;
    PermissionsComponent.willRenderChildren[id] = 1;
    PermissionsComponent.willCacheChildren[id] = 0;
    PermissionsComponent.willTransformChildren[id] = 1;
  }

  // ../phaser-genesis/src/components/permissions/WillCacheChildren.ts
  function WillCacheChildren(id) {
    return Boolean(PermissionsComponent.willCacheChildren[id]);
  }

  // ../phaser-genesis/src/components/permissions/WillRender.ts
  function WillRender(id) {
    return Boolean(PermissionsComponent.visible[id]) && Boolean(PermissionsComponent.willRender[id]);
  }

  // ../phaser-genesis/src/components/permissions/WillRenderChildren.ts
  function WillRenderChildren(id) {
    return Boolean(PermissionsComponent.visibleChildren[id]) && Boolean(PermissionsComponent.willRenderChildren[id]);
  }

  // ../phaser-genesis/src/components/permissions/WillUpdate.ts
  function WillUpdate(id) {
    return Boolean(PermissionsComponent.willUpdate[id]);
  }

  // ../phaser-genesis/src/components/permissions/WillUpdateChildren.ts
  function WillUpdateChildren(id) {
    return Boolean(PermissionsComponent.willUpdateChildren[id]);
  }

  // ../phaser-genesis/src/components/transform/LocalMatrix2DComponent.ts
  var LocalMatrix2D = defineComponent({
    a: Types.f32,
    b: Types.f32,
    c: Types.f32,
    d: Types.f32,
    tx: Types.f32,
    ty: Types.f32,
    dirty: Types.ui32
  });
  var LocalMatrix2DComponent = LocalMatrix2D;

  // ../phaser-genesis/src/components/transform/Transform2DComponent.ts
  var Transform2D = defineComponent({
    x: Types.f32,
    y: Types.f32,
    rotation: Types.f32,
    scaleX: Types.f32,
    scaleY: Types.f32,
    skewX: Types.f32,
    skewY: Types.f32,
    originX: Types.f32,
    originY: Types.f32
  });
  var Transform2DComponent = Transform2D;

  // ../phaser-genesis/src/components/transform/AddTransform2DComponent.ts
  function AddTransform2DComponent(id, x = 0, y = 0, originX = 0, originY = 0) {
    addComponent(GameObjectWorld, Transform2DComponent, id);
    addComponent(GameObjectWorld, Extent2DComponent, id);
    addComponent(GameObjectWorld, LocalMatrix2DComponent, id);
    addComponent(GameObjectWorld, WorldMatrix2DComponent, id);
    Transform2DComponent.x[id] = x;
    Transform2DComponent.y[id] = y;
    Transform2DComponent.scaleX[id] = 1;
    Transform2DComponent.scaleY[id] = 1;
    Transform2DComponent.originX[id] = originX;
    Transform2DComponent.originY[id] = originY;
    LocalMatrix2DComponent.a[id] = 1;
    LocalMatrix2DComponent.d[id] = 1;
    LocalMatrix2DComponent.tx[id] = x;
    LocalMatrix2DComponent.ty[id] = y;
    WorldMatrix2DComponent.a[id] = 1;
    WorldMatrix2DComponent.d[id] = 1;
    WorldMatrix2DComponent.tx[id] = x;
    WorldMatrix2DComponent.ty[id] = y;
  }

  // ../phaser-genesis/src/components/transform/GetVertices.ts
  function GetVertices(worldTransform, transformExtent) {
    const { a, b, c, d, tx, ty } = worldTransform;
    const { x, y, right, bottom } = transformExtent;
    const x0 = x * a + y * c + tx;
    const y0 = x * b + y * d + ty;
    const x1 = x * a + bottom * c + tx;
    const y1 = x * b + bottom * d + ty;
    const x2 = right * a + bottom * c + tx;
    const y2 = right * b + bottom * d + ty;
    const x3 = right * a + y * c + tx;
    const y3 = right * b + y * d + ty;
    return { x0, y0, x1, y1, x2, y2, x3, y3 };
  }

  // ../phaser-genesis/src/components/transform/InvalidateLocalMatrix2DComponent.ts
  function InvalidateLocalMatrix2DComponent(id) {
    if (hasComponent(GameObjectWorld, LocalMatrix2DComponent, id)) {
      LocalMatrix2DComponent.dirty[id]++;
    }
  }

  // ../phaser-genesis/src/components/transform/UpdateExtent.ts
  function UpdateExtent(id, width, height) {
    const x = -Transform2DComponent.originX[id] * width;
    const y = -Transform2DComponent.originY[id] * height;
    Extent2DComponent.x[id] = x;
    Extent2DComponent.y[id] = y;
    Extent2DComponent.width[id] = width;
    Extent2DComponent.height[id] = height;
    Extent2DComponent.right[id] = x + width;
    Extent2DComponent.bottom[id] = y + height;
    SetDirtyTransform(id);
  }

  // ../phaser-genesis/src/components/transform/Origin.ts
  var Origin = class {
    constructor(id, x = 0, y = 0) {
      __publicField(this, "id");
      this.id = id;
      this.x = x;
      this.y = y;
    }
    set(x, y = x) {
      const id = this.id;
      Transform2DComponent.originX[id] = x;
      Transform2DComponent.originY[id] = y;
      UpdateExtent(id, Extent2DComponent.width[id], Extent2DComponent.height[id]);
      return this;
    }
    set x(value) {
      const id = this.id;
      Transform2DComponent.originX[id] = value;
      UpdateExtent(id, Extent2DComponent.width[id], Extent2DComponent.height[id]);
    }
    get x() {
      return Transform2DComponent.originX[this.id];
    }
    set y(value) {
      const id = this.id;
      Transform2DComponent.originY[id] = value;
      UpdateExtent(id, Extent2DComponent.width[id], Extent2DComponent.height[id]);
    }
    get y() {
      return Transform2DComponent.originY[this.id];
    }
  };

  // ../phaser-genesis/src/components/transform/Position.ts
  var Position = class {
    constructor(id, x = 0, y = 0) {
      __publicField(this, "id");
      this.id = id;
      this.x = x;
      this.y = y;
    }
    set(x, y = x) {
      this.x = x;
      this.y = y;
      return this;
    }
    set x(value) {
      Transform2DComponent.x[this.id] = value;
    }
    get x() {
      return Transform2DComponent.x[this.id];
    }
    set y(value) {
      Transform2DComponent.y[this.id] = value;
    }
    get y() {
      return Transform2DComponent.y[this.id];
    }
  };

  // ../phaser-genesis/src/gameobjects/DIRTY_CONST.ts
  var DIRTY_CONST = {
    CLEAR: 0,
    TRANSFORM: 1,
    UPDATE: 2,
    CHILD_CACHE: 4,
    POST_RENDER: 8,
    COLORS: 16,
    BOUNDS: 32,
    TEXTURE: 64,
    FRAME: 128,
    ALPHA: 256,
    CHILD: 512,
    DEFAULT: 1 + 2 + 16 + 32,
    USER1: 536870912,
    USER2: 1073741824,
    USER3: 2147483648,
    USER4: 4294967296
  };

  // ../phaser-genesis/src/components/transform/UpdateVertices.ts
  function UpdateVertices(vertices, worldTransform, transformExtent) {
    const { x0, y0, x1, y1, x2, y2, x3, y3 } = GetVertices(worldTransform, transformExtent);
    vertices[0].setPosition(x0, y0);
    vertices[1].setPosition(x1, y1);
    vertices[2].setPosition(x2, y2);
    vertices[3].setPosition(x3, y3);
  }

  // ../phaser-genesis/src/components/transform/PreRenderVertices.ts
  function PreRenderVertices(gameObject) {
    const vertices = gameObject.vertices;
    if (gameObject.isDirty(DIRTY_CONST.COLORS)) {
      PackColors(vertices);
      gameObject.clearDirty(DIRTY_CONST.COLORS);
    }
    if (gameObject.isDirty(DIRTY_CONST.TRANSFORM)) {
      UpdateVertices(vertices, gameObject.worldTransform, gameObject.transformExtent);
      gameObject.clearDirty(DIRTY_CONST.TRANSFORM);
    }
    return gameObject;
  }

  // ../phaser-genesis/src/components/transform/Scale.ts
  var Scale = class {
    constructor(id, x = 1, y = 1) {
      __publicField(this, "id");
      this.id = id;
      this.x = x;
      this.y = y;
    }
    set(x, y = x) {
      this.x = x;
      this.y = y;
      return this;
    }
    set x(value) {
      Transform2DComponent.scaleX[this.id] = value;
    }
    get x() {
      return Transform2DComponent.scaleX[this.id];
    }
    set y(value) {
      Transform2DComponent.scaleY[this.id] = value;
    }
    get y() {
      return Transform2DComponent.scaleY[this.id];
    }
  };

  // ../phaser-genesis/src/components/transform/Size.ts
  var Size2 = class {
    constructor(id, width = 0, height = 0) {
      __publicField(this, "id");
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
      return Extent2DComponent.width[this.id];
    }
    set height(value) {
      UpdateExtent(this.id, this.width, value);
    }
    get height() {
      return Extent2DComponent.height[this.id];
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

  // ../phaser-genesis/src/components/transform/Skew.ts
  var Skew = class {
    constructor(id, x = 0, y = 0) {
      __publicField(this, "id");
      this.id = id;
      this.x = x;
      this.y = y;
    }
    set(x, y = x) {
      this.x = x;
      this.y = y;
      return this;
    }
    set x(value) {
      Transform2DComponent.skewX[this.id] = value;
    }
    get x() {
      return Transform2DComponent.skewX[this.id];
    }
    set y(value) {
      Transform2DComponent.skewY[this.id] = value;
    }
    get y() {
      return Transform2DComponent.skewY[this.id];
    }
  };

  // ../phaser-genesis/src/components/transform/UpdateLocalTransform2DSystem.ts
  var changedLocalTransformQuery = defineQuery([Changed(Transform2DComponent)]);
  var entities2;
  var updateLocalTransformSystem = defineSystem((world3) => {
    let prevParent = 0;
    for (let i = 0; i < entities2.length; i++) {
      const id = entities2[i];
      const x = Transform2DComponent.x[id];
      const y = Transform2DComponent.y[id];
      const rotation = Transform2DComponent.rotation[id];
      const scaleX = Transform2DComponent.scaleX[id];
      const scaleY = Transform2DComponent.scaleY[id];
      const skewX = Transform2DComponent.skewX[id];
      const skewY = Transform2DComponent.skewY[id];
      LocalMatrix2DComponent.a[id] = Math.cos(rotation + skewY) * scaleX;
      LocalMatrix2DComponent.b[id] = Math.sin(rotation + skewY) * scaleX;
      LocalMatrix2DComponent.c[id] = -Math.sin(rotation - skewX) * scaleY;
      LocalMatrix2DComponent.d[id] = Math.cos(rotation - skewX) * scaleY;
      LocalMatrix2DComponent.tx[id] = x;
      LocalMatrix2DComponent.ty[id] = y;
      if (GetParentID(id) !== prevParent) {
        SetDirtyParents(id);
        prevParent = GetParentID(id);
      }
    }
    return world3;
  });
  var UpdateLocalTransform2DSystem = (world3) => {
    entities2 = changedLocalTransformQuery(world3);
    updateLocalTransformSystem(world3);
    return entities2;
  };

  // ../phaser-genesis/src/components/transform/CopyLocalToWorld.ts
  function CopyLocalToWorld(source, target) {
    WorldMatrix2DComponent.a[target] = LocalMatrix2DComponent.a[source];
    WorldMatrix2DComponent.b[target] = LocalMatrix2DComponent.b[source];
    WorldMatrix2DComponent.c[target] = LocalMatrix2DComponent.c[source];
    WorldMatrix2DComponent.d[target] = LocalMatrix2DComponent.d[source];
    WorldMatrix2DComponent.tx[target] = LocalMatrix2DComponent.tx[source];
    WorldMatrix2DComponent.ty[target] = LocalMatrix2DComponent.ty[source];
  }

  // ../phaser-genesis/src/components/transform/CopyWorldToWorld.ts
  function CopyWorldToWorld(source, target) {
    WorldMatrix2DComponent.a[target] = WorldMatrix2DComponent.a[source];
    WorldMatrix2DComponent.b[target] = WorldMatrix2DComponent.b[source];
    WorldMatrix2DComponent.c[target] = WorldMatrix2DComponent.c[source];
    WorldMatrix2DComponent.d[target] = WorldMatrix2DComponent.d[source];
    WorldMatrix2DComponent.tx[target] = WorldMatrix2DComponent.tx[source];
    WorldMatrix2DComponent.ty[target] = WorldMatrix2DComponent.ty[source];
  }

  // ../phaser-genesis/src/components/transform/MultiplyLocalWithWorld.ts
  function MultiplyLocalWithWorld(parentID, id) {
    const pa = WorldMatrix2DComponent.a[parentID];
    const pb = WorldMatrix2DComponent.b[parentID];
    const pc = WorldMatrix2DComponent.c[parentID];
    const pd = WorldMatrix2DComponent.d[parentID];
    const ptx = WorldMatrix2DComponent.tx[parentID];
    const pty = WorldMatrix2DComponent.ty[parentID];
    const a = LocalMatrix2DComponent.a[id];
    const b = LocalMatrix2DComponent.b[id];
    const c = LocalMatrix2DComponent.c[id];
    const d = LocalMatrix2DComponent.d[id];
    const tx = LocalMatrix2DComponent.tx[id];
    const ty = LocalMatrix2DComponent.ty[id];
    WorldMatrix2DComponent.a[id] = a * pa + b * pc;
    WorldMatrix2DComponent.b[id] = a * pb + b * pd;
    WorldMatrix2DComponent.c[id] = c * pa + d * pc;
    WorldMatrix2DComponent.d[id] = c * pb + d * pd;
    WorldMatrix2DComponent.tx[id] = tx * pa + ty * pc + ptx;
    WorldMatrix2DComponent.ty[id] = tx * pb + ty * pd + pty;
  }

  // ../phaser-genesis/src/components/permissions/WillTransformChildren.ts
  function WillTransformChildren(id) {
    return Boolean(PermissionsComponent.willTransformChildren[id]);
  }

  // ../phaser-genesis/src/components/transform/UpdateWorldTransform.ts
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

  // ../phaser-genesis/src/components/transform/UpdateWorldTransform2DSystem.ts
  var changedWorldTransformQuery = defineQuery([Changed(LocalMatrix2DComponent)]);
  var updateWorldTransformSystem = defineSystem((world3) => {
    const entities3 = changedWorldTransformQuery(world3);
    for (let i = 0; i < entities3.length; i++) {
      const id = entities3[i];
      const gameObject = GameObjectCache.get(id);
      const parent = gameObject.parent;
      if (!parent) {
        CopyLocalToWorld(id, id);
      } else if (!WillTransformChildren(id)) {
        CopyWorldToWorld(parent.id, id);
      } else {
        MultiplyLocalWithWorld(parent.id, id);
      }
    }
    return world3;
  });

  // ../phaser-genesis/src/renderer/webgl1/draw/AddVertexToBatch.ts
  function AddVertexToBatch(id, offset, textureIndex, F32, U32) {
    VertexComponent.offset[id] = offset;
    F32[offset + 0] = VertexComponent.x[id];
    F32[offset + 1] = VertexComponent.y[id];
    F32[offset + 2] = VertexComponent.u[id];
    F32[offset + 3] = VertexComponent.v[id];
    F32[offset + 4] = textureIndex;
    U32[offset + 5] = VertexComponent.color[id];
    return offset + 6;
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/GetVertexBufferEntry.ts
  function GetVertexBufferEntry(renderPass, addToCount = 0) {
    const buffer = renderPass.vertexbuffer.current;
    if (renderPass.count + addToCount >= buffer.batchSize) {
      Flush(renderPass);
    }
    const offset = buffer.indexed ? renderPass.count * buffer.entryElementSize : renderPass.count * buffer.vertexElementSize;
    renderPass.count += addToCount;
    return {
      buffer,
      F32: buffer.vertexViewF32,
      U32: buffer.vertexViewU32,
      offset
    };
  }

  // ../phaser-genesis/src/renderer/webgl1/draw/BatchTexturedQuad.ts
  function BatchTexturedQuad(texture, id, renderPass) {
    const textureIndex = renderPass.textures.set(texture);
    const { F32, U32, offset } = GetVertexBufferEntry(renderPass, 1);
    let vertOffset = AddVertexToBatch(QuadVertexComponent.tl[id], offset, textureIndex, F32, U32);
    vertOffset = AddVertexToBatch(QuadVertexComponent.bl[id], vertOffset, textureIndex, F32, U32);
    vertOffset = AddVertexToBatch(QuadVertexComponent.br[id], vertOffset, textureIndex, F32, U32);
    AddVertexToBatch(QuadVertexComponent.tr[id], vertOffset, textureIndex, F32, U32);
  }

  // ../phaser-genesis/src/config/defaultorigin/GetDefaultOriginX.ts
  function GetDefaultOriginX() {
    return ConfigStore.get(CONFIG_DEFAULTS.DEFAULT_ORIGIN).x;
  }

  // ../phaser-genesis/src/config/defaultorigin/GetDefaultOriginY.ts
  function GetDefaultOriginY() {
    return ConfigStore.get(CONFIG_DEFAULTS.DEFAULT_ORIGIN).y;
  }

  // ../phaser-genesis/src/components/bounds/AddBoundsComponent.ts
  function AddBoundsComponent(id) {
    addComponent(GameObjectWorld, BoundsComponent, id);
  }

  // ../phaser-genesis/src/display/RemoveChildrenBetween.ts
  function RemoveChildrenBetween(parent, beginIndex = 0, endIndex) {
    const children = GameObjectTree.get(parent.id);
    if (endIndex === void 0) {
      endIndex = children.length;
    }
    const range = endIndex - beginIndex;
    if (range > 0 && range <= endIndex) {
      const removed2 = children.splice(beginIndex, range);
      removed2.forEach((childID) => {
        ClearWorldAndParentID(childID);
      });
      return removed2.map((id) => GameObjectCache.get(id));
    } else {
      return [];
    }
  }

  // ../phaser-genesis/src/display/DestroyChildren.ts
  function DestroyChildren(parent, beginIndex = 0, endIndex) {
    const removed2 = RemoveChildrenBetween(parent, beginIndex, endIndex);
    removed2.forEach((child) => {
      child.destroy();
    });
    SetDirtyWorldDisplayList(parent.id);
  }

  // ../phaser-genesis/src/gameobjects/events/DestroyEvent.ts
  var DestroyEvent = "destroy";

  // ../phaser-genesis/src/events/Emit.ts
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

  // ../phaser-genesis/src/gameobjects/GameObjectTree.ts
  var GameObjectTree = new Map();

  // ../phaser-genesis/src/components/hierarchy/GetParentID.ts
  function GetParentID(id) {
    return HierarchyComponent.parentID[id];
  }

  // ../phaser-genesis/src/display/IsValidParent.ts
  function IsValidParent(parent, child) {
    return !(child.id === parent.id || parent.id === GetParentID(child.id));
  }

  // ../phaser-genesis/src/display/GetChildIndex.ts
  function GetChildIndex(child) {
    const childID = child.id;
    return GameObjectTree.get(GetParentID(childID)).indexOf(childID);
  }

  // ../phaser-genesis/src/display/RemoveChildAt.ts
  function RemoveChildAt(parent, index) {
    const children = GameObjectTree.get(parent.id);
    if (index >= 0 && index < children.length) {
      const removedID = children.splice(index, 1)[0];
      if (removedID) {
        ClearWorldAndParentID(removedID);
        return GameObjectCache.get(removedID);
      }
    }
  }

  // ../phaser-genesis/src/display/RemoveChild.ts
  function RemoveChild(parent, child) {
    if (parent && child.hasParent(parent.id)) {
      RemoveChildAt(parent, GetChildIndex(child));
    }
    return child;
  }

  // ../phaser-genesis/src/display/SetWorld.ts
  function SetWorld(world3, ...entries) {
    const worldID = world3.id;
    const worldTag = world3.tag;
    entries.forEach((entry) => {
      addComponent(GameObjectWorld, worldTag, entry.id);
      HierarchyComponent.worldID[entry.id] = worldID;
      const children = DepthFirstSearchFromParentID(entry.id);
      children.map((id) => {
        addComponent(GameObjectWorld, worldTag, id);
        HierarchyComponent.worldID[id] = worldID;
      });
    });
    SetDirtyDisplayList(worldID);
    return entries;
  }

  // ../phaser-genesis/src/display/AddChildAt.ts
  function AddChildAt(parent, child, index = -1) {
    if (IsValidParent(parent, child)) {
      const childID = child.id;
      const parentID = parent.id;
      const world3 = GetWorldFromParentID(parentID);
      const children = GameObjectTree.get(parentID);
      if (index === -1) {
        index = children.length;
      }
      if (index >= 0 && index <= children.length) {
        RemoveChild(child.getParent(), child);
        children.splice(index, 0, childID);
        InvalidateLocalMatrix2DComponent(child.id);
        if (world3) {
          SetWorld(world3, child);
        }
        SetParentID(childID, parentID);
        SetDirtyParents(childID);
      }
    }
    return child;
  }

  // ../phaser-genesis/src/display/SetParent.ts
  function SetParent2(parent, ...children) {
    children.forEach((child) => {
      AddChildAt(parent, child);
    });
    return children;
  }

  // ../phaser-genesis/src/display/ReparentChildren.ts
  function ReparentChildren(parent, newParent, beginIndex = 0, endIndex) {
    const moved = RemoveChildrenBetween(parent, beginIndex, endIndex);
    SetParent2(newParent, ...moved);
    return moved;
  }

  // ../phaser-genesis/src/gameobjects/GameObject.ts
  var GameObject = class {
    constructor() {
      __publicField(this, "id", addEntity(GameObjectWorld));
      __publicField(this, "type", "GameObject");
      __publicField(this, "name", "");
      __publicField(this, "events");
      const id = this.id;
      AddHierarchyComponent(id);
      AddPermissionsComponent(id);
      AddDirtyComponent(id);
      GameObjectCache.set(id, this);
      GameObjectTree.set(id, []);
      this.events = new Map();
    }
    isRenderable() {
      return WillRender(this.id);
    }
    beforeUpdate(delta, time) {
    }
    update(delta, time) {
      this.beforeUpdate(delta, time);
      if (WillUpdateChildren(this.id)) {
        const children = GameObjectTree.get(this.id);
        for (let i = 0; i < children.length; i++) {
          const childID = children[i];
          if (WillUpdate(childID)) {
            GameObjectCache.get(childID).update(delta, time);
          }
        }
      }
      this.afterUpdate(delta, time);
    }
    afterUpdate(delta, time) {
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
      PermissionsComponent.visible[this.id] = Number(value);
      SetDirtyParents(this.id);
    }
    get visible() {
      return Boolean(PermissionsComponent.visible[this.id]);
    }
    set visibleChildren(value) {
      PermissionsComponent.visibleChildren[this.id] = Number(value);
      SetDirtyParents(this.id);
    }
    get visibleChildren() {
      return Boolean(PermissionsComponent.visibleChildren[this.id]);
    }
    set depth(value) {
      HierarchyComponent.depth[this.id] = value;
    }
    get depth() {
      return HierarchyComponent.depth[this.id];
    }
    hasParent(id) {
      if (id) {
        return HierarchyComponent.parentID[this.id] === id;
      } else {
        return HierarchyComponent.parentID[this.id] > 0;
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

  // ../phaser-genesis/src/geom/rectangle/RectangleContains.ts
  function RectangleContains(rect, x, y) {
    if (rect.width <= 0 || rect.height <= 0) {
      return false;
    }
    return rect.x <= x && rect.x + rect.width >= x && rect.y <= y && rect.y + rect.height >= y;
  }

  // ../phaser-genesis/src/geom/rectangle/Rectangle.ts
  var Rectangle = class {
    constructor(x = 0, y = 0, width = 0, height = 0) {
      __publicField(this, "x");
      __publicField(this, "y");
      __publicField(this, "width");
      __publicField(this, "height");
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

  // ../phaser-genesis/src/gameobjects/container/Container.ts
  var Container = class extends GameObject {
    constructor(x = 0, y = 0) {
      super();
      __publicField(this, "type", "Container");
      __publicField(this, "position");
      __publicField(this, "scale");
      __publicField(this, "skew");
      __publicField(this, "origin");
      __publicField(this, "size");
      __publicField(this, "shader");
      const id = this.id;
      AddTransform2DComponent(id, x, y, GetDefaultOriginX(), GetDefaultOriginY());
      AddColorComponent(id);
      AddBoundsComponent(id);
      this.position = new Position(id, x, y);
      this.scale = new Scale(id);
      this.skew = new Skew(id);
      this.size = new Size2(id);
      this.origin = new Origin(id, GetDefaultOriginX(), GetDefaultOriginY());
    }
    renderGL(renderPass) {
      if (this.shader) {
        Flush(renderPass);
        renderPass.shader.set(this.shader, 0);
      }
    }
    postRenderGL(renderPass) {
      if (this.shader) {
        Flush(renderPass);
        renderPass.shader.pop();
      }
    }
    getBounds() {
      return new Rectangle();
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
      Transform2DComponent.rotation[this.id] = value;
    }
    get rotation() {
      return Transform2DComponent.rotation[this.id];
    }
    get alpha() {
      return ColorComponent.alpha[this.id];
    }
    set alpha(value) {
      SetAlpha(this.id, value);
    }
    destroy(reparentChildren) {
      super.destroy(reparentChildren);
    }
  };

  // ../phaser-genesis/src/textures/TextureManagerInstance.ts
  var instance2;
  var TextureManagerInstance = {
    get: () => {
      return instance2;
    },
    set: (manager) => {
      instance2 = manager;
    }
  };

  // ../phaser-genesis/src/textures/GetTexture.ts
  function GetTexture(key) {
    return TextureManagerInstance.get().get(key);
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/Begin.ts
  function Begin(renderPass, camera2D) {
    renderPass.current2DCamera = camera2D;
    renderPass.cameraMatrix = camera2D.matrix;
    renderPass.shader.bindDefault();
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/Start.ts
  function Start(renderPass) {
    renderPass.current2DCamera = renderPass.quadCamera;
    renderPass.cameraMatrix = renderPass.quadCamera.matrix;
    renderPass.count = 0;
    renderPass.flushTotal = 0;
    renderPass.framebuffer.bindDefault();
    renderPass.blendMode.bindDefault();
    renderPass.viewport.bindDefault();
    renderPass.vertexbuffer.bindDefault();
    renderPass.shader.bindDefault();
  }

  // ../phaser-genesis/src/gameobjects/rectangle/Rectangle.ts
  var Rectangle2 = class extends Container {
    constructor(x, y, width = 64, height = 64, color = 16777215) {
      super(x, y);
      __publicField(this, "type", "Rectangle");
      __publicField(this, "texture");
      __publicField(this, "frame");
      const id = this.id;
      AddQuadVertex(id);
      this.texture = GetTexture("__WHITE");
      this.frame = this.texture.getFrame();
      this.frame.copyToExtent(this);
      this.frame.copyToVertices(id);
      this.size.set(width, height);
      this.color = color;
    }
    setColor(color) {
      this.color = color;
      return this;
    }
    isRenderable() {
      return this.visible && WillRender(this.id) && this.alpha > 0;
    }
    renderGL(renderPass) {
      BatchTexturedQuad(this.texture, this.id, renderPass);
    }
    renderCanvas(renderer) {
      PreRenderVertices(this);
    }
    get color() {
      return ColorComponent.tint[this.id];
    }
    set color(value) {
      SetTint(this.id, value);
    }
    destroy(reparentChildren) {
      super.destroy(reparentChildren);
      this.texture = null;
      this.frame = null;
    }
  };

  // ../phaser-genesis/src/textures/CreateCanvas.ts
  function CreateCanvas(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext("2d");
  }

  // ../phaser-genesis/src/components/hierarchy/DepthFirstSearchFromParentID.ts
  function DepthFirstSearchFromParentID(parentID) {
    const stack = [parentID];
    const output = [];
    while (stack.length > 0) {
      const node = stack.shift();
      output.push(node);
      const nodeChildren = GameObjectTree.get(node);
      const numChildren = nodeChildren.length;
      if (numChildren > 0) {
        for (let i = numChildren - 1; i >= 0; i--) {
          stack.unshift(nodeChildren[i]);
        }
      }
    }
    output.shift();
    return output;
  }

  // ../phaser-genesis/src/components/hierarchy/GetChildrenFromParentID.ts
  function GetChildrenFromParentID(id) {
    const out = [];
    GameObjectTree.get(id).forEach((childID) => {
      out.push(GameObjectCache.get(childID));
    });
    return out;
  }

  // ../phaser-genesis/src/components/hierarchy/GetNumChildren.ts
  function GetNumChildren(id) {
    return HierarchyComponent.numChildren[id];
  }

  // ../phaser-genesis/src/components/hierarchy/GetParentGameObject.ts
  function GetParentGameObject(id) {
    return GameObjectCache.get(HierarchyComponent.parentID[id]);
  }

  // ../phaser-genesis/src/components/hierarchy/GetWorldID.ts
  function GetWorldID(id) {
    return HierarchyComponent.worldID[id];
  }

  // ../phaser-genesis/src/components/hierarchy/GetWorldFromParentID.ts
  function GetWorldFromParentID(parentID) {
    const worldID = GetWorldID(parentID);
    return GameObjectCache.get(worldID);
  }

  // ../phaser-genesis/src/components/hierarchy/UpdateNumChildren.ts
  function UpdateNumChildren(id) {
    HierarchyComponent.numChildren[id] = GameObjectTree.get(id).length;
  }

  // ../phaser-genesis/src/components/hierarchy/SetParentID.ts
  function SetParentID(childID, parentID) {
    HierarchyComponent.parentID[childID] = parentID;
    UpdateNumChildren(parentID);
  }

  // ../phaser-genesis/src/components/hierarchy/SetWorldID.ts
  function SetWorldID(id, worldID) {
    HierarchyComponent.worldID[id] = worldID;
  }

  // ../phaser-genesis/src/components/dirty/SetDirtyParents.ts
  function SetDirtyParents(childID) {
    let currentParent = GetParentID(childID);
    while (currentParent) {
      if (WillCacheChildren(currentParent)) {
        SetDirtyChildCache(currentParent);
      }
      currentParent = GetParentID(currentParent);
    }
    SetDirtyDisplayList(GetWorldID(childID));
  }

  // ../phaser-genesis/src/components/dirty/SetDirtyTransform.ts
  function SetDirtyTransform(id) {
    DirtyComponent.transform[id] = 1;
  }

  // ../phaser-genesis/src/components/dirty/SetDirtyWorldDisplayList.ts
  function SetDirtyWorldDisplayList(id) {
    const worldID = HierarchyComponent.worldID[id];
    DirtyComponent.displayList[worldID] = 1;
  }

  // ../phaser-genesis/src/components/transform/SetExtent.ts
  function SetExtent(id, x, y, width, height) {
    Extent2DComponent.x[id] = x;
    Extent2DComponent.y[id] = y;
    Extent2DComponent.width[id] = width;
    Extent2DComponent.height[id] = height;
    Extent2DComponent.right[id] = x + width;
    Extent2DComponent.bottom[id] = y + height;
    SetDirtyTransform(id);
  }

  // ../phaser-genesis/src/textures/Frame.ts
  var Frame = class {
    constructor(texture, key, x, y, width, height) {
      __publicField(this, "texture");
      __publicField(this, "key");
      __publicField(this, "x");
      __publicField(this, "y");
      __publicField(this, "width");
      __publicField(this, "height");
      __publicField(this, "trimmed", false);
      __publicField(this, "sourceSizeWidth");
      __publicField(this, "sourceSizeHeight");
      __publicField(this, "spriteSourceSizeX");
      __publicField(this, "spriteSourceSizeY");
      __publicField(this, "spriteSourceSizeWidth");
      __publicField(this, "spriteSourceSizeHeight");
      __publicField(this, "pivot");
      __publicField(this, "u0");
      __publicField(this, "v0");
      __publicField(this, "u1");
      __publicField(this, "v1");
      this.texture = texture;
      this.key = key;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.sourceSizeWidth = width;
      this.sourceSizeHeight = height;
      this.updateUVs();
    }
    setPivot(x, y) {
      this.pivot = { x, y };
    }
    setSize(width, height) {
      this.width = width;
      this.height = height;
      this.sourceSizeWidth = width;
      this.sourceSizeHeight = height;
      this.updateUVs();
    }
    setSourceSize(width, height) {
      this.sourceSizeWidth = width;
      this.sourceSizeHeight = height;
    }
    setTrim(width, height, x, y, w, h) {
      this.trimmed = true;
      this.sourceSizeWidth = width;
      this.sourceSizeHeight = height;
      this.spriteSourceSizeX = x;
      this.spriteSourceSizeY = y;
      this.spriteSourceSizeWidth = w;
      this.spriteSourceSizeHeight = h;
    }
    getExtent(originX, originY) {
      const sourceSizeWidth = this.sourceSizeWidth;
      const sourceSizeHeight = this.sourceSizeHeight;
      let left;
      let right;
      let top;
      let bottom;
      if (this.trimmed) {
        left = this.spriteSourceSizeX - originX * sourceSizeWidth;
        right = left + this.spriteSourceSizeWidth;
        top = this.spriteSourceSizeY - originY * sourceSizeHeight;
        bottom = top + this.spriteSourceSizeHeight;
      } else {
        left = -originX * sourceSizeWidth;
        right = left + sourceSizeWidth;
        top = -originY * sourceSizeHeight;
        bottom = top + sourceSizeHeight;
      }
      return { left, right, top, bottom };
    }
    copyToExtent(child) {
      const originX = child.origin.x;
      const originY = child.origin.y;
      const sourceSizeWidth = this.sourceSizeWidth;
      const sourceSizeHeight = this.sourceSizeHeight;
      let x;
      let y;
      let width;
      let height;
      if (this.trimmed) {
        x = this.spriteSourceSizeX - originX * sourceSizeWidth;
        y = this.spriteSourceSizeY - originY * sourceSizeHeight;
        width = this.spriteSourceSizeWidth;
        height = this.spriteSourceSizeHeight;
      } else {
        x = -originX * sourceSizeWidth;
        y = -originY * sourceSizeHeight;
        width = sourceSizeWidth;
        height = sourceSizeHeight;
      }
      SetExtent(child.id, x, y, width, height);
      return this;
    }
    copyToVertices(id) {
      const { u0, u1, v0, v1 } = this;
      SetUV(QuadVertexComponent.tl[id], u0, v0);
      SetUV(QuadVertexComponent.bl[id], u0, v1);
      SetUV(QuadVertexComponent.br[id], u1, v1);
      SetUV(QuadVertexComponent.tr[id], u1, v0);
      return this;
    }
    updateUVs() {
      const { x, y, width, height } = this;
      const baseTextureWidth = this.texture.width;
      const baseTextureHeight = this.texture.height;
      this.u0 = x / baseTextureWidth;
      this.v0 = y / baseTextureHeight;
      this.u1 = (x + width) / baseTextureWidth;
      this.v1 = (y + height) / baseTextureHeight;
    }
    destroy() {
      this.texture = null;
    }
  };

  // ../phaser-genesis/src/textures/Texture.ts
  var Texture = class {
    constructor(image, width, height, glConfig) {
      __publicField(this, "key", "");
      __publicField(this, "width");
      __publicField(this, "height");
      __publicField(this, "image");
      __publicField(this, "binding");
      __publicField(this, "firstFrame");
      __publicField(this, "frames");
      __publicField(this, "data");
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
      frame2.setSize(width, height);
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

  // ../phaser-genesis/src/renderer/webgl1/shaders/Shader.ts
  var Shader = class {
    constructor(config) {
      __publicField(this, "program");
      __publicField(this, "attributes");
      __publicField(this, "uniforms");
      __publicField(this, "uniformSetters");
      __publicField(this, "texture");
      __publicField(this, "framebuffer");
      __publicField(this, "renderToFramebuffer", false);
      __publicField(this, "renderToDepthbuffer", false);
      __publicField(this, "isActive", false);
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
        texture.binding = binding;
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
        this.uniforms.set(key, value);
      }
      this.attributes = CreateAttributes(program, attribs);
      gl.useProgram(currentProgram);
      this.isActive = false;
    }
    updateUniforms(renderPass) {
    }
    bind(renderPass) {
      const uniforms = this.uniforms;
      uniforms.set("uProjectionMatrix", renderPass.projectionMatrix.data);
      uniforms.set("uCameraMatrix", renderPass.cameraMatrix.data);
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

  // ../phaser-genesis/src/renderer/webgl1/shaders/QuadShader.ts
  var QuadShader = class extends Shader {
    constructor(config = {}) {
      const shaderConfig = config;
      shaderConfig.attributes = !shaderConfig.attributes ? DefaultQuadAttributes : shaderConfig.attributes;
      super(shaderConfig);
    }
    bind(renderPass) {
      const uniforms = this.uniforms;
      uniforms.set("uProjectionMatrix", renderPass.projectionMatrix.data);
      uniforms.set("uCameraMatrix", renderPass.cameraMatrix.data);
      return super.bind(renderPass);
    }
  };

  // ../phaser-genesis/src/renderer/webgl1/glsl/MULTI_QUAD_FRAG.ts
  var MULTI_QUAD_FRAG = `#define SHADER_NAME MULTI_QUAD_FRAG
#define numTextures %count%

precision highp float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture[%count%];

vec4 getSampler (int index, vec2 uv)
{
    for (int i = 0; i < numTextures; ++i)
    {
        vec4 color = texture2D(uTexture[i], uv);

        if (i == index)
        {
            return color;
        }
    }

    //  Return black
    return vec4(0);
}

void main (void)
{
    vec4 color = getSampler(int(vTextureId), vTextureCoord);

    gl_FragColor = color * vec4(vTintColor.bgr * vTintColor.a, vTintColor.a);
}`;

  // ../phaser-genesis/src/renderer/webgl1/shaders/MultiTextureQuadShader.ts
  var MultiTextureQuadShader = class extends QuadShader {
    constructor(config = {}) {
      if (!config.fragmentShader) {
        config.fragmentShader = MULTI_QUAD_FRAG;
      }
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

  // ../phaser-genesis/src/renderer/webgl1/renderpass/ShaderStack.ts
  var ShaderStack = class {
    constructor(renderPass) {
      __publicField(this, "renderPass");
      __publicField(this, "stack");
      __publicField(this, "active");
      __publicField(this, "default");
      __publicField(this, "index");
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

  // ../phaser-genesis/src/math/vec3/Vec3.ts
  var Vec3 = class {
    constructor(x = 0, y = 0, z = 0) {
      __publicField(this, "x");
      __publicField(this, "y");
      __publicField(this, "z");
      this.set(x, y, z);
    }
    set(x = 0, y = 0, z = 0) {
      this.x = x;
      this.y = y;
      this.z = z;
      return this;
    }
    toArray(dst = [], index = 0) {
      const { x, y, z } = this;
      dst[index] = x;
      dst[index + 1] = y;
      dst[index + 2] = z;
      return dst;
    }
    fromArray(src, index = 0) {
      return this.set(src[index], src[index + 1], src[index + 2]);
    }
    toString() {
      const { x, y, z } = this;
      return `{ x=${x}, y=${y}, z=${z} }`;
    }
  };

  // ../phaser-genesis/src/math/mat4/Mat4Identity.ts
  function Mat4Identity(matrix2 = new Matrix4()) {
    return matrix2.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  // ../phaser-genesis/src/math/mat2d/Matrix2D.ts
  var Matrix2D = class {
    constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
      __publicField(this, "a");
      __publicField(this, "b");
      __publicField(this, "c");
      __publicField(this, "d");
      __publicField(this, "tx");
      __publicField(this, "ty");
      this.set(a, b, c, d, tx, ty);
    }
    set(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
      this.tx = tx;
      this.ty = ty;
      return this;
    }
    identity() {
      return this.set();
    }
    toArray() {
      const { a, b, c, d, tx, ty } = this;
      return [a, b, c, d, tx, ty];
    }
    fromArray(src) {
      return this.set(src[0], src[1], src[2], src[3], src[4], src[5]);
    }
  };

  // ../phaser-genesis/src/math/const.ts
  var MATH_CONST = {
    PI2: Math.PI * 2,
    HALF_PI: Math.PI * 0.5,
    EPSILON: 1e-6,
    DEG_TO_RAD: Math.PI / 180,
    RAD_TO_DEG: 180 / Math.PI,
    MIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER || -9007199254740991,
    MAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER || 9007199254740991
  };

  // ../phaser-genesis/src/camera/StaticCamera.ts
  var StaticCamera = class {
    constructor() {
      __publicField(this, "world");
      __publicField(this, "matrix");
      __publicField(this, "renderer");
      __publicField(this, "type");
      __publicField(this, "width");
      __publicField(this, "height");
      __publicField(this, "bounds");
      __publicField(this, "dirtyRender");
      __publicField(this, "worldTransform");
      this.dirtyRender = true;
      const game = GameInstance.get();
      this.renderer = game.renderer;
      this.matrix = Mat4Identity();
      this.bounds = new Rectangle();
      this.worldTransform = new Matrix2D();
      this.reset();
    }
    reset() {
      const renderer = this.renderer;
      if (renderer) {
        const width = renderer.width;
        const height = renderer.height;
        this.width = width;
        this.height = height;
      }
      this.bounds.set(0, 0, this.width, this.height);
    }
    destroy() {
      this.world = null;
      this.worldTransform = null;
      this.renderer = null;
      this.matrix = null;
      this.bounds = null;
    }
  };

  // ../phaser-genesis/src/renderer/webgl1/renderpass/CreateTempTextures.ts
  function CreateTempTextures() {
    let maxGPUTextures = CheckShaderMaxIfStatements(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
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

  // ../phaser-genesis/src/renderer/webgl1/renderpass/TextureStack.ts
  var TextureStack = class {
    constructor(renderPass) {
      __publicField(this, "renderPass");
      __publicField(this, "textures");
      __publicField(this, "tempTextures");
      __publicField(this, "textureIndex");
      __publicField(this, "maxTextures");
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

  // ../phaser-genesis/src/renderer/webgl1/renderpass/VertexBufferStack.ts
  var VertexBufferStack = class {
    constructor(renderPass) {
      __publicField(this, "renderPass");
      __publicField(this, "stack");
      __publicField(this, "active");
      __publicField(this, "default");
      __publicField(this, "index");
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

  // ../phaser-genesis/src/geom/rectangle/RectangleEquals.ts
  function RectangleEquals(rect, toCompare) {
    return rect.x === toCompare.x && rect.y === toCompare.y && rect.width === toCompare.width && rect.height === toCompare.height;
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/ViewportStack.ts
  var ViewportStack = class {
    constructor(renderPass) {
      __publicField(this, "renderPass");
      __publicField(this, "stack");
      __publicField(this, "active");
      __publicField(this, "default");
      __publicField(this, "index");
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

  // ../phaser-genesis/src/renderer/webgl1/renderpass/RenderPass.ts
  var RenderPass = class {
    constructor(renderer) {
      __publicField(this, "renderer");
      __publicField(this, "projectionMatrix");
      __publicField(this, "cameraMatrix");
      __publicField(this, "count", 0);
      __publicField(this, "prevCount", 0);
      __publicField(this, "flushTotal", 0);
      __publicField(this, "framebuffer");
      __publicField(this, "vertexbuffer");
      __publicField(this, "blendMode");
      __publicField(this, "shader");
      __publicField(this, "viewport");
      __publicField(this, "textures");
      __publicField(this, "quadShader");
      __publicField(this, "quadBuffer");
      __publicField(this, "quadCamera");
      __publicField(this, "current2DCamera");
      this.renderer = renderer;
      this.projectionMatrix = new Matrix4();
      this.framebuffer = new FramebufferStack(this);
      this.vertexbuffer = new VertexBufferStack(this);
      this.blendMode = new BlendModeStack(this);
      this.shader = new ShaderStack(this);
      this.viewport = new ViewportStack(this);
      this.textures = new TextureStack(this);
      this.reset();
    }
    flush() {
      this.prevCount = this.count;
      this.count = 0;
      this.flushTotal++;
    }
    reset() {
      const gl2 = this.renderer.gl;
      const indexLayout = [0, 1, 2, 2, 3, 0];
      this.quadShader = new QuadShader();
      this.quadBuffer = new IndexedVertexBuffer({ name: "quad", isDynamic: false, indexLayout });
      this.quadCamera = new StaticCamera();
      this.textures.setDefault();
      this.framebuffer.setDefault();
      this.blendMode.setDefault(true, gl2.ONE, gl2.ONE_MINUS_SRC_ALPHA);
      this.vertexbuffer.setDefault(new IndexedVertexBuffer({ name: "sprite", batchSize: GetBatchSize(), indexLayout }));
      if (GetMaxTextures() === 1) {
        this.shader.setDefault(new QuadShader());
      } else {
        this.shader.setDefault(new MultiTextureQuadShader());
      }
    }
    resize(width, height) {
      Mat4Ortho(0, width, height, 0, -1e3, 1e3, this.projectionMatrix);
      this.quadCamera.reset();
      this.viewport.setDefault(0, 0, width, height);
    }
  };

  // ../phaser-genesis/src/renderer/webgl1/WebGLRendererInstance.ts
  var instance3;
  var WebGLRendererInstance = {
    get: () => {
      return instance3;
    },
    set: (renderer) => {
      instance3 = renderer;
    }
  };

  // ../phaser-genesis/src/world/WorldList.ts
  var WorldList = new Map();

  // ../phaser-genesis/src/renderer/webgl1/WebGLRenderer.ts
  var WebGLRenderer = class {
    constructor() {
      __publicField(this, "canvas");
      __publicField(this, "gl");
      __publicField(this, "renderPass");
      __publicField(this, "clearColor", [0, 0, 0, 1]);
      __publicField(this, "width");
      __publicField(this, "height");
      __publicField(this, "resolution");
      __publicField(this, "clearBeforeRender", true);
      __publicField(this, "optimizeRedraw", true);
      __publicField(this, "autoResize", true);
      __publicField(this, "contextLost", false);
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
    render(willRedraw, scenes) {
      if (this.contextLost) {
        return;
      }
      const gl2 = this.gl;
      const renderPass = this.renderPass;
      gl2.getContextAttributes();
      ProcessBindingQueue();
      if (this.optimizeRedraw && !willRedraw) {
      }
      if (this.clearBeforeRender) {
        const cls = this.clearColor;
        gl2.clearColor(cls[0], cls[1], cls[2], cls[3]);
        gl2.clear(gl2.COLOR_BUFFER_BIT);
      }
      Start(renderPass);
      for (const scene of scenes.values()) {
        const worlds2 = WorldList.get(scene);
        for (const world3 of worlds2) {
          if (world3.runRender) {
            world3.renderGL(renderPass);
          }
          world3.postRenderGL(renderPass);
        }
      }
      End(renderPass);
    }
    destroy() {
      WebGLRendererInstance.set(void 0);
    }
  };

  // ../phaser-genesis/src/config/webgl/WebGL.ts
  function WebGL() {
    return () => {
      SetRenderer(WebGLRenderer);
    };
  }

  // ../phaser-genesis/src/config/webglcontext/SetWebGLContext.ts
  function SetWebGLContext(contextAttributes) {
    ConfigStore.set(CONFIG_DEFAULTS.WEBGL_CONTEXT, contextAttributes);
  }

  // ../phaser-genesis/src/config/worldsize/SetWorldSize.ts
  function SetWorldSize(size) {
    ConfigStore.set(CONFIG_DEFAULTS.WORLD_SIZE, size);
  }

  // ../phaser-genesis/src/display/AddChildren.ts
  function AddChildren(parent, ...children) {
    children.forEach((child) => {
      AddChildAt(parent, child);
    });
    return children;
  }

  // ../phaser-genesis/src/display/RemoveChildren.ts
  function RemoveChildren(parent, ...children) {
    children.forEach((child) => {
      RemoveChild(parent, child);
    });
    return children;
  }

  // ../phaser-genesis/src/events/EventEmitter.ts
  var EventEmitter = class {
    constructor() {
      __publicField(this, "events");
      this.events = new Map();
    }
  };

  // ../phaser-genesis/src/events/EventInstance.ts
  var EventInstance = class {
    constructor(callback, context, once = false) {
      __publicField(this, "callback");
      __publicField(this, "context");
      __publicField(this, "once");
      this.callback = callback;
      this.context = context;
      this.once = once;
    }
  };

  // ../phaser-genesis/src/events/Off.ts
  function Off(emitter, event, callback, context, once) {
    const events = emitter.events;
    const listeners = events.get(event);
    if (!callback) {
      events.delete(event);
    } else if (callback instanceof EventInstance) {
      listeners.delete(callback);
    } else {
      const hasContext = !context;
      const hasOnce = once !== void 0;
      for (const listener of listeners) {
        if (listener.callback === callback && (hasContext && listener.context === context) && (hasOnce && listener.once === once)) {
          listeners.delete(listener);
        }
      }
    }
    if (listeners.size === 0) {
      events.delete(event);
    }
    return emitter;
  }

  // ../phaser-genesis/src/events/On.ts
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

  // ../phaser-genesis/src/events/Once.ts
  function Once(emitter, event, callback, context = emitter) {
    return On(emitter, event, callback, context, true);
  }

  // ../phaser-genesis/src/math/easing/Linear.ts
  var Linear_exports = {};
  __export(Linear_exports, {
    Linear: () => Linear
  });
  function Linear(v) {
    return v;
  }

  // ../phaser-genesis/src/motion/tween/TweenProperty.ts
  var TweenProperty = class {
    constructor(name, end) {
      __publicField(this, "name");
      __publicField(this, "start");
      __publicField(this, "end");
      __publicField(this, "modifier");
      this.name = name;
      if (typeof end === "string") {
        this.modifier = end.substr(0, 1);
        this.end = parseFloat(end.substring(1));
      } else {
        this.end = end;
      }
    }
    getEnd(start) {
      const modifier = this.modifier;
      const end = this.end;
      if (modifier === "+") {
        return start + end;
      } else if (modifier === "-") {
        return start - end;
      } else {
        return end;
      }
    }
    to(target) {
      const current = target[this.name];
      const end = this.getEnd(current);
      this.start = current;
      this.end = end;
    }
    from(target) {
      const current = target[this.name];
      const end = this.getEnd(current);
      this.start = end;
      this.end = current;
      target[this.name] = end;
    }
    update(target, v) {
      target[this.name] = this.start + (this.end - this.start) * v;
    }
  };

  // ../phaser-genesis/src/gameobjects/events/UpdateEvent.ts
  var UpdateEvent = "update";

  // ../phaser-genesis/src/motion/tween/nano/NanoTween.ts
  var NanoTween = class {
    constructor(target, emitter, autoStart = true) {
      __publicField(this, "target");
      __publicField(this, "state", { running: false, repeat: false, hold: false, delay: false, yoyo: false, yoyoing: false, autoStart: true, reversed: false });
      __publicField(this, "init", { duration: 0, repeat: 0, repeatDelay: 0, hold: 0, delay: 0 });
      __publicField(this, "counters", { repeat: 0, delay: 0, progress: 0, elapsed: 0 });
      __publicField(this, "ease", Linear);
      __publicField(this, "listener");
      __publicField(this, "emitter");
      __publicField(this, "properties", []);
      if (!emitter) {
        emitter = GameInstance.get();
      }
      this.target = target;
      this.state.autoStart = autoStart;
      this.emitter = emitter;
    }
    to(duration, properties = null) {
      return this.add(duration, properties, false);
    }
    from(duration, properties = null) {
      return this.add(duration, properties, true);
    }
    add(duration, props, reversed) {
      const state = this.state;
      const init = this.init;
      if (state.running) {
        return this;
      }
      const properties = this.properties;
      for (const [name, value] of Object.entries(props)) {
        properties.push(new TweenProperty(name, value));
      }
      init.duration = duration;
      state.reversed = reversed;
      if (state.autoStart) {
        this.start();
      }
      return this;
    }
    start() {
      const state = this.state;
      if (state.running) {
        return this;
      }
      const target = this.target;
      const properties = this.properties;
      properties.forEach((property) => {
        if (state.reversed) {
          property.from(target);
        } else {
          property.to(target);
        }
      });
      state.running = true;
      this.listener = On(this.emitter, UpdateEvent, (delta) => this.update(delta));
      return this;
    }
    restart() {
      const state = this.state;
      const init = this.init;
      const counters = this.counters;
      if (!state) {
        throw "Cannot restart destroyed tween";
      }
      counters.delay = init.delay;
      counters.elapsed = 0;
      counters.progress = 0;
      counters.repeat = init.repeat;
      state.yoyoing = false;
      state.running = true;
      return this;
    }
    update(delta) {
      const state = this.state;
      const init = this.init;
      const counters = this.counters;
      if (!state.running) {
        return false;
      }
      if (counters.delay > 0) {
        counters.delay -= delta;
        if (counters.delay <= 0) {
          counters.elapsed = Math.abs(counters.delay) - delta;
          counters.delay = 0;
        } else {
          return false;
        }
      }
      counters.elapsed += delta;
      const progress = Math.min(counters.elapsed / init.duration, 1);
      counters.progress = progress;
      const v = state.yoyoing ? this.ease(1 - progress) : this.ease(progress);
      const target = this.target;
      const properties = this.properties;
      properties.forEach((property) => {
        property.update(target, v);
      });
      if (progress < 1) {
        return false;
      }
      const diff2 = counters.elapsed - init.duration;
      if (state.yoyo && !state.yoyoing) {
        counters.elapsed = diff2;
        counters.delay = init.hold - diff2;
        state.yoyoing = true;
        return false;
      }
      if (counters.repeat > 0) {
        counters.repeat--;
        counters.elapsed = diff2;
        counters.delay = init.repeatDelay - diff2;
        state.yoyoing = false;
        return false;
      }
      this.destroy();
      return true;
    }
    delay(duration) {
      const delay = duration;
      this.init.delay = delay;
      this.counters.delay = delay;
      return this;
    }
    hold(duration) {
      this.init.hold = duration;
      return this;
    }
    yoyo(value = true) {
      this.state.yoyo = value;
      return this;
    }
    repeat(repeatCount = 1, delay = 0) {
      const init = this.init;
      if (repeatCount === -1) {
        repeatCount = Number.MAX_SAFE_INTEGER;
      }
      this.state.repeat = repeatCount > 0;
      this.counters.repeat = repeatCount;
      init.repeat = repeatCount;
      init.repeatDelay = delay;
      return this;
    }
    easing(f) {
      this.ease = f;
      return this;
    }
    destroy() {
      Off(this.emitter, UpdateEvent, this.listener);
      this.properties.length = 0;
      this.target = null;
      this.ease = null;
      this.emitter = null;
      this.state = null;
      this.init = null;
      this.counters = null;
    }
  };

  // ../phaser-genesis/src/motion/tween/nano/AddTween.ts
  function AddTween(target, emitter = null, autoStart = true) {
    return new NanoTween(target, emitter, autoStart);
  }

  // ../phaser-genesis/src/math/easing/index.ts
  var easing_exports = {};
  __export(easing_exports, {
    Back: () => back_exports,
    Bounce: () => bounce_exports,
    Circular: () => circular_exports,
    Cubic: () => cubic_exports,
    Elastic: () => elastic_exports,
    Expo: () => expo_exports,
    GetEase: () => GetEase_exports,
    Linear: () => Linear_exports,
    Quadratic: () => quadratic_exports,
    Quartic: () => quartic_exports,
    Quintic: () => quintic_exports,
    Sine: () => sine_exports,
    Stepped: () => Stepped_exports
  });

  // ../phaser-genesis/src/math/easing/back/index.ts
  var back_exports = {};
  __export(back_exports, {
    In: () => In,
    InOut: () => InOut,
    Out: () => Out
  });

  // ../phaser-genesis/src/math/easing/back/In.ts
  function In(v, overshoot = 1.70158) {
    return v * v * ((overshoot + 1) * v - overshoot);
  }

  // ../phaser-genesis/src/math/easing/back/InOut.ts
  function InOut(v, overshoot = 1.70158) {
    const s = overshoot * 1.525;
    if ((v *= 2) < 1) {
      return 0.5 * (v * v * ((s + 1) * v - s));
    } else {
      return 0.5 * ((v -= 2) * v * ((s + 1) * v + s) + 2);
    }
  }

  // ../phaser-genesis/src/math/easing/back/Out.ts
  function Out(v, overshoot = 1.70158) {
    return --v * v * ((overshoot + 1) * v + overshoot) + 1;
  }

  // ../phaser-genesis/src/math/easing/bounce/index.ts
  var bounce_exports = {};
  __export(bounce_exports, {
    In: () => In2,
    InOut: () => InOut2,
    Out: () => Out2
  });

  // ../phaser-genesis/src/math/easing/bounce/In.ts
  function In2(v) {
    v = 1 - v;
    if (v < 1 / 2.75) {
      return 1 - 7.5625 * v * v;
    } else if (v < 2 / 2.75) {
      return 1 - (7.5625 * (v -= 1.5 / 2.75) * v + 0.75);
    } else if (v < 2.5 / 2.75) {
      return 1 - (7.5625 * (v -= 2.25 / 2.75) * v + 0.9375);
    } else {
      return 1 - (7.5625 * (v -= 2.625 / 2.75) * v + 0.984375);
    }
  }

  // ../phaser-genesis/src/math/easing/bounce/InOut.ts
  function InOut2(v) {
    let reverse = false;
    if (v < 0.5) {
      v = 1 - v * 2;
      reverse = true;
    } else {
      v = v * 2 - 1;
    }
    if (v < 1 / 2.75) {
      v = 7.5625 * v * v;
    } else if (v < 2 / 2.75) {
      v = 7.5625 * (v -= 1.5 / 2.75) * v + 0.75;
    } else if (v < 2.5 / 2.75) {
      v = 7.5625 * (v -= 2.25 / 2.75) * v + 0.9375;
    } else {
      v = 7.5625 * (v -= 2.625 / 2.75) * v + 0.984375;
    }
    if (reverse) {
      return (1 - v) * 0.5;
    } else {
      return v * 0.5 + 0.5;
    }
  }

  // ../phaser-genesis/src/math/easing/bounce/Out.ts
  function Out2(v) {
    if (v < 1 / 2.75) {
      return 7.5625 * v * v;
    } else if (v < 2 / 2.75) {
      return 7.5625 * (v -= 1.5 / 2.75) * v + 0.75;
    } else if (v < 2.5 / 2.75) {
      return 7.5625 * (v -= 2.25 / 2.75) * v + 0.9375;
    } else {
      return 7.5625 * (v -= 2.625 / 2.75) * v + 0.984375;
    }
  }

  // ../phaser-genesis/src/math/easing/circular/index.ts
  var circular_exports = {};
  __export(circular_exports, {
    In: () => In3,
    InOut: () => InOut3,
    Out: () => Out3
  });

  // ../phaser-genesis/src/math/easing/circular/In.ts
  function In3(v) {
    return 1 - Math.sqrt(1 - v * v);
  }

  // ../phaser-genesis/src/math/easing/circular/InOut.ts
  function InOut3(v) {
    if ((v *= 2) < 1) {
      return -0.5 * (Math.sqrt(1 - v * v) - 1);
    } else {
      return 0.5 * (Math.sqrt(1 - (v -= 2) * v) + 1);
    }
  }

  // ../phaser-genesis/src/math/easing/circular/Out.ts
  function Out3(v) {
    return Math.sqrt(1 - --v * v);
  }

  // ../phaser-genesis/src/math/easing/cubic/index.ts
  var cubic_exports = {};
  __export(cubic_exports, {
    In: () => In4,
    InOut: () => InOut4,
    Out: () => Out4
  });

  // ../phaser-genesis/src/math/easing/cubic/In.ts
  function In4(v) {
    return v * v * v;
  }

  // ../phaser-genesis/src/math/easing/cubic/InOut.ts
  function InOut4(v) {
    if ((v *= 2) < 1) {
      return 0.5 * v * v * v;
    } else {
      return 0.5 * ((v -= 2) * v * v + 2);
    }
  }

  // ../phaser-genesis/src/math/easing/cubic/Out.ts
  function Out4(v) {
    return --v * v * v + 1;
  }

  // ../phaser-genesis/src/math/easing/elastic/index.ts
  var elastic_exports = {};
  __export(elastic_exports, {
    In: () => In5,
    InOut: () => InOut5,
    Out: () => Out5
  });

  // ../phaser-genesis/src/math/easing/elastic/In.ts
  function In5(v, amplitude = 0.1, period = 0.1) {
    if (v === 0) {
      return 0;
    } else if (v === 1) {
      return 1;
    } else {
      let s = period / 4;
      if (amplitude < 1) {
        amplitude = 1;
      } else {
        s = period * Math.asin(1 / amplitude) / (2 * Math.PI);
      }
      return -(amplitude * Math.pow(2, 10 * (v -= 1)) * Math.sin((v - s) * (2 * Math.PI) / period));
    }
  }

  // ../phaser-genesis/src/math/easing/elastic/InOut.ts
  function InOut5(v, amplitude = 0.1, period = 0.1) {
    if (v === 0) {
      return 0;
    } else if (v === 1) {
      return 1;
    } else {
      let s = period / 4;
      if (amplitude < 1) {
        amplitude = 1;
      } else {
        s = period * Math.asin(1 / amplitude) / (2 * Math.PI);
      }
      if ((v *= 2) < 1) {
        return -0.5 * (amplitude * Math.pow(2, 10 * (v -= 1)) * Math.sin((v - s) * (2 * Math.PI) / period));
      } else {
        return amplitude * Math.pow(2, -10 * (v -= 1)) * Math.sin((v - s) * (2 * Math.PI) / period) * 0.5 + 1;
      }
    }
  }

  // ../phaser-genesis/src/math/easing/elastic/Out.ts
  function Out5(v, amplitude = 0.1, period = 0.1) {
    if (v === 0) {
      return 0;
    } else if (v === 1) {
      return 1;
    } else {
      let s = period / 4;
      if (amplitude < 1) {
        amplitude = 1;
      } else {
        s = period * Math.asin(1 / amplitude) / (2 * Math.PI);
      }
      return amplitude * Math.pow(2, -10 * v) * Math.sin((v - s) * (2 * Math.PI) / period) + 1;
    }
  }

  // ../phaser-genesis/src/math/easing/expo/index.ts
  var expo_exports = {};
  __export(expo_exports, {
    In: () => In6,
    InOut: () => InOut6,
    Out: () => Out6
  });

  // ../phaser-genesis/src/math/easing/expo/In.ts
  function In6(v) {
    return Math.pow(2, 10 * (v - 1)) - 1e-3;
  }

  // ../phaser-genesis/src/math/easing/expo/InOut.ts
  function InOut6(v) {
    if (v == 0) {
      return 0;
    }
    if (v == 1) {
      return 1;
    }
    if ((v *= 2) < 1) {
      return 0.5 * Math.pow(2, 10 * (v - 1));
    } else {
      return 0.5 * (2 - Math.pow(2, -10 * (v - 1)));
    }
  }

  // ../phaser-genesis/src/math/easing/expo/Out.ts
  function Out6(v) {
    return 1 - Math.pow(2, -10 * v);
  }

  // ../phaser-genesis/src/math/easing/GetEase.ts
  var GetEase_exports = {};
  __export(GetEase_exports, {
    GetEase: () => GetEase
  });

  // ../phaser-genesis/src/math/easing/quadratic/index.ts
  var quadratic_exports = {};
  __export(quadratic_exports, {
    In: () => In7,
    InOut: () => InOut7,
    Out: () => Out7
  });

  // ../phaser-genesis/src/math/easing/quadratic/In.ts
  function In7(v) {
    return v * v;
  }

  // ../phaser-genesis/src/math/easing/quadratic/InOut.ts
  function InOut7(v) {
    if ((v *= 2) < 1) {
      return 0.5 * v * v;
    } else {
      return -0.5 * (--v * (v - 2) - 1);
    }
  }

  // ../phaser-genesis/src/math/easing/quadratic/Out.ts
  function Out7(v) {
    return v * (2 - v);
  }

  // ../phaser-genesis/src/math/easing/quartic/index.ts
  var quartic_exports = {};
  __export(quartic_exports, {
    In: () => In8,
    InOut: () => InOut8,
    Out: () => Out8
  });

  // ../phaser-genesis/src/math/easing/quartic/In.ts
  function In8(v) {
    return v * v * v * v;
  }

  // ../phaser-genesis/src/math/easing/quartic/InOut.ts
  function InOut8(v) {
    if ((v *= 2) < 1) {
      return 0.5 * v * v * v * v;
    } else {
      return -0.5 * ((v -= 2) * v * v * v - 2);
    }
  }

  // ../phaser-genesis/src/math/easing/quartic/Out.ts
  function Out8(v) {
    return -(--v * v * v * v - 1);
  }

  // ../phaser-genesis/src/math/easing/quintic/index.ts
  var quintic_exports = {};
  __export(quintic_exports, {
    In: () => In9,
    InOut: () => InOut9,
    Out: () => Out9
  });

  // ../phaser-genesis/src/math/easing/quintic/In.ts
  function In9(v) {
    return v * v * v * v * v;
  }

  // ../phaser-genesis/src/math/easing/quintic/InOut.ts
  function InOut9(v) {
    if ((v *= 2) < 1) {
      return 0.5 * v * v * v * v * v;
    } else {
      return 0.5 * ((v -= 2) * v * v * v * v + 2);
    }
  }

  // ../phaser-genesis/src/math/easing/quintic/Out.ts
  function Out9(v) {
    return (v = v - 1) * v * v * v * v + 1;
  }

  // ../phaser-genesis/src/math/easing/sine/index.ts
  var sine_exports = {};
  __export(sine_exports, {
    In: () => In10,
    InOut: () => InOut10,
    Out: () => Out10
  });

  // ../phaser-genesis/src/math/easing/sine/In.ts
  function In10(v) {
    if (v === 0) {
      return 0;
    } else if (v === 1) {
      return 1;
    } else {
      return 1 - Math.cos(v * Math.PI / 2);
    }
  }

  // ../phaser-genesis/src/math/easing/sine/InOut.ts
  function InOut10(v) {
    if (v === 0) {
      return 0;
    } else if (v === 1) {
      return 1;
    } else {
      return 0.5 * (1 - Math.cos(Math.PI * v));
    }
  }

  // ../phaser-genesis/src/math/easing/sine/Out.ts
  function Out10(v) {
    if (v === 0) {
      return 0;
    } else if (v === 1) {
      return 1;
    } else {
      return Math.sin(v * Math.PI / 2);
    }
  }

  // ../phaser-genesis/src/math/easing/Stepped.ts
  var Stepped_exports = {};
  __export(Stepped_exports, {
    Stepped: () => Stepped
  });
  function Stepped(v, steps = 1) {
    if (v <= 0) {
      return 0;
    } else if (v >= 1) {
      return 1;
    } else {
      return ((steps * v | 0) + 1) * (1 / steps);
    }
  }

  // ../phaser-genesis/src/math/easing/GetEase.ts
  var EaseMap = new Map([
    ["power0", Linear],
    ["power1", Out7],
    ["power2", Out4],
    ["power3", Out8],
    ["power4", Out9],
    ["linear", Linear],
    ["quad", Out7],
    ["cubic", Out4],
    ["quart", Out8],
    ["quint", Out9],
    ["sine", Out10],
    ["expo", Out6],
    ["circ", Out3],
    ["elastic", Out5],
    ["back", Out],
    ["bounce", Out2],
    ["stepped", Stepped],
    ["quad.in", In7],
    ["cubic.in", In4],
    ["quart.in", In8],
    ["quint.in", In9],
    ["sine.in", In10],
    ["expo.in", In6],
    ["circ.in", In3],
    ["elastic.in", In5],
    ["back.in", In],
    ["bounce.in", In2],
    ["quad.out", Out7],
    ["cubic.out", Out4],
    ["quart.out", Out8],
    ["quint.out", Out9],
    ["sine.out", Out10],
    ["expo.out", Out6],
    ["circ.out", Out3],
    ["elastic.out", Out5],
    ["back.out", Out],
    ["bounce.out", Out2],
    ["quad.inout", InOut7],
    ["cubic.inout", InOut4],
    ["quart.inout", InOut8],
    ["quint.inout", InOut9],
    ["sine.inout", InOut10],
    ["expo.inout", InOut6],
    ["circ.inout", InOut3],
    ["elastic.inout", InOut5],
    ["back.inout", InOut],
    ["bounce.inout", InOut2]
  ]);
  function GetEase(name) {
    name = name.toLowerCase();
    name = name.replace("ease", "");
    if (EaseMap.has(name)) {
      return EaseMap.get(name);
    } else {
      return Linear;
    }
  }

  // ../phaser-genesis/src/math/mat2d/Mat2dEquals.ts
  function Mat2dEquals(a, b) {
    return a.a === b.a && a.b === b.b && a.c === b.c && a.d === b.d && a.tx === b.tx && a.ty === b.ty;
  }

  // ../phaser-genesis/src/math/vec3/Vec3Backward.ts
  function Vec3Backward() {
    return new Vec3(0, 0, -1);
  }

  // ../phaser-genesis/src/math/vec3/Vec3Down.ts
  function Vec3Down() {
    return new Vec3(0, -1, 0);
  }

  // ../phaser-genesis/src/math/vec3/Vec3Forward.ts
  function Vec3Forward() {
    return new Vec3(0, 0, 1);
  }

  // ../phaser-genesis/src/math/vec3/Vec3Left.ts
  function Vec3Left() {
    return new Vec3(-1, 0, 0);
  }

  // ../phaser-genesis/src/math/vec3/Vec3Right.ts
  function Vec3Right() {
    return new Vec3(1, 0, 0);
  }

  // ../phaser-genesis/src/math/vec3/Vec3Up.ts
  function Vec3Up() {
    return new Vec3(0, 1, 0);
  }

  // ../phaser-genesis/src/math/vec3/Vec3Zero.ts
  function Vec3Zero() {
    return new Vec3(0, 0, 0);
  }

  // ../phaser-genesis/src/math/vec3/const.ts
  var UP = Vec3Up();
  var DOWN = Vec3Down();
  var LEFT = Vec3Left();
  var RIGHT = Vec3Right();
  var FORWARD = Vec3Forward();
  var BACKWARD = Vec3Backward();
  var ZERO = Vec3Zero();

  // ../phaser-genesis/src/math/vec3/Vec3Project.ts
  var tempMatrix1 = new Matrix4();
  var tempMatrix2 = new Matrix4();

  // ../phaser-genesis/src/math/vec3/Vec3Unproject.ts
  var matrix = new Matrix4();
  var screenSource = new Vec3();

  // ../phaser-genesis/src/dom/AddToDOM.ts
  function AddToDOM(element, parent) {
    const target = GetElement(parent);
    target.appendChild(element);
    return element;
  }

  // ../phaser-genesis/src/dom/DOMContentLoaded.ts
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

  // ../phaser-genesis/src/config/banner/GetBanner.ts
  function GetBanner() {
    const { title, version, url, color, background } = ConfigStore.get(CONFIG_DEFAULTS.BANNER);
    if (title !== "") {
      const str = version !== "" ? title + " " + version : title;
      console.log(`%c${str}%c ${url}`, `padding: 4px 16px; color: ${color}; background: ${background}`, "");
    }
  }

  // ../phaser-genesis/src/config/globalvar/GetGlobalVar.ts
  function GetGlobalVar() {
    return ConfigStore.get(CONFIG_DEFAULTS.GLOBAL_VAR);
  }

  // ../phaser-genesis/src/config/parent/GetParent.ts
  function GetParent() {
    return ConfigStore.get(CONFIG_DEFAULTS.PARENT);
  }

  // ../phaser-genesis/src/scenes/RenderStatsComponent.ts
  var RenderStats = defineComponent({
    gameFrame: Types.ui32,
    numScenes: Types.ui8,
    numWorlds: Types.ui8,
    numGameObjects: Types.ui32,
    numGameObjectsRendered: Types.ui32,
    numDirtyLocalTransforms: Types.ui32,
    numDirtyWorldTransforms: Types.ui32,
    numDirtyVertices: Types.ui32,
    numDirtyWorldLists: Types.ui8,
    numDirtyCameras: Types.ui32
  });
  var RenderStatsComponent = RenderStats;

  // ../phaser-genesis/src/scenes/AddRenderStatsComponent.ts
  function AddRenderStatsComponent(id) {
    addComponent(GameObjectWorld, RenderStatsComponent, id);
  }

  // ../phaser-genesis/src/scenes/GetConfigValue.ts
  function GetConfigValue(config, property, defaultValue) {
    if (Object.prototype.hasOwnProperty.call(config, property)) {
      return config[property];
    } else {
      return defaultValue;
    }
  }

  // ../phaser-genesis/src/scenes/SceneManagerInstance.ts
  var instance4;
  var SceneManagerInstance = {
    get: () => {
      return instance4;
    },
    set: (manager) => {
      if (instance4) {
        throw new Error("SceneManager should not be instantiated more than once");
      }
      instance4 = manager;
    }
  };

  // ../phaser-genesis/src/scenes/GetRenderStatsAsObject.ts
  function GetRenderStatsAsObject(obj) {
    const id = SceneManagerInstance.get().id;
    if (!obj) {
      obj = { fps: 0, delta: 0, gameFrame: 0, numScenes: 0, numWorlds: 0, numGameObjects: 0, numGameObjectsRendered: 0, numDirtyLocalTransforms: 0, numDirtyWorldTransforms: 0, numDirtyVertices: 0, numDirtyWorldLists: 0, numDirtyCameras: 0 };
    }
    obj.gameFrame = RenderStatsComponent.gameFrame[id];
    obj.numScenes = RenderStatsComponent.numScenes[id];
    obj.numWorlds = RenderStatsComponent.numWorlds[id];
    obj.numGameObjects = RenderStatsComponent.numGameObjects[id];
    obj.numGameObjectsRendered = RenderStatsComponent.numGameObjectsRendered[id];
    obj.numDirtyLocalTransforms = RenderStatsComponent.numDirtyLocalTransforms[id];
    obj.numDirtyWorldTransforms = RenderStatsComponent.numDirtyWorldTransforms[id];
    obj.numDirtyVertices = RenderStatsComponent.numDirtyVertices[id];
    obj.numDirtyWorldLists = RenderStatsComponent.numDirtyWorldLists[id];
    obj.numDirtyCameras = RenderStatsComponent.numDirtyCameras[id];
    return obj;
  }

  // ../phaser-genesis/src/scenes/Install.ts
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

  // ../phaser-genesis/src/scenes/ResetRenderStats.ts
  function ResetRenderStats(id, gameFrame, scenes, worlds2, transforms) {
    RenderStatsComponent.gameFrame[id] = gameFrame;
    RenderStatsComponent.numScenes[id] = scenes;
    RenderStatsComponent.numWorlds[id] = worlds2;
    RenderStatsComponent.numGameObjects[id] = 0;
    RenderStatsComponent.numGameObjectsRendered[id] = 0;
    RenderStatsComponent.numDirtyWorldLists[id] = 0;
    RenderStatsComponent.numDirtyVertices[id] = 0;
    RenderStatsComponent.numDirtyLocalTransforms[id] = transforms;
    RenderStatsComponent.numDirtyWorldTransforms[id] = 0;
    RenderStatsComponent.numDirtyCameras[id] = 0;
  }

  // ../phaser-genesis/src/scenes/Scene.ts
  var Scene = class {
    constructor(config) {
      __publicField(this, "key");
      __publicField(this, "game");
      __publicField(this, "events");
      this.game = GameInstance.get();
      this.events = new Map();
      Install(this, config);
    }
  };

  // ../phaser-genesis/src/config/scenes/GetScenes.ts
  function GetScenes() {
    return ConfigStore.get(CONFIG_DEFAULTS.SCENES);
  }

  // ../phaser-genesis/src/scenes/SceneManager.ts
  var SceneManager = class {
    constructor() {
      __publicField(this, "id", addEntity(GameObjectWorld));
      __publicField(this, "game");
      __publicField(this, "scenes", new Map());
      __publicField(this, "sceneIndex", 0);
      __publicField(this, "flush");
      __publicField(this, "changedMatrixQuery", defineQuery([Changed(LocalMatrix2DComponent)]));
      this.game = GameInstance.get();
      SceneManagerInstance.set(this);
      AddRenderStatsComponent(this.id);
      Once(this.game, "boot", () => this.boot());
    }
    boot() {
      this.changedMatrixQuery(GameObjectWorld);
      UpdateLocalTransform2DSystem(GameObjectWorld);
      PackQuadColorsSystem(GameObjectWorld);
      UpdateVertexPositionSystem(GameObjectWorld);
      GetScenes().forEach((scene) => new scene());
    }
    update(delta, time, gameFrame) {
      let sceneTotal = 0;
      let worldTotal = 0;
      for (const scene of this.scenes.values()) {
        const worlds2 = WorldList.get(scene);
        for (const world3 of worlds2) {
          world3.beforeUpdate(delta, time);
          world3.update(delta, time);
          world3.afterUpdate(delta, time);
          worldTotal++;
        }
        sceneTotal++;
      }
      const localTransforms = UpdateLocalTransform2DSystem(GameObjectWorld);
      ResetRenderStats(this.id, gameFrame, sceneTotal, worldTotal, localTransforms.length);
    }
    preRender(gameFrame) {
      const dirtyTransforms = this.changedMatrixQuery(GameObjectWorld);
      let dirtyWorld = false;
      for (const scene of this.scenes.values()) {
        const worlds2 = WorldList.get(scene);
        for (const world3 of worlds2) {
          if (world3.preRender(gameFrame, dirtyTransforms)) {
            dirtyWorld = true;
          }
        }
      }
      PackQuadColorsSystem(GameObjectWorld);
      const updatedEntities = UpdateVertexPositionSystem(GameObjectWorld);
      RenderStatsComponent.numDirtyVertices[this.id] = updatedEntities.length * 4;
      if (dirtyWorld) {
        this.flush = true;
      }
    }
    getRenderList() {
      let output = [];
      for (const scene of this.scenes.values()) {
        const worlds2 = WorldList.get(scene);
        for (const world3 of worlds2) {
          output = output.concat(world3.getRenderList());
        }
      }
      return output;
    }
    updateWorldStats(numGameObjects, numRendered, numDisplayLists, numWorldTransforms) {
      const id = this.id;
      RenderStatsComponent.numGameObjects[id] += numGameObjects;
      RenderStatsComponent.numGameObjectsRendered[id] += numRendered;
      RenderStatsComponent.numDirtyWorldLists[id] += numDisplayLists;
      RenderStatsComponent.numDirtyWorldTransforms[id] += numWorldTransforms;
    }
  };

  // ../phaser-genesis/src/config/renderer/GetRenderer.ts
  function GetRenderer() {
    return ConfigStore.get(CONFIG_DEFAULTS.RENDERER);
  }

  // ../phaser-genesis/src/config/SetConfigDefaults.ts
  function SetConfigDefaults() {
    SetBackgroundColor(0);
    SetBatchSize(4096);
    SetBanner("Phaser", "4.0.0", "https://phaser4.io");
    SetMaxTextures(0);
    SetDefaultOrigin(0.5, 0.5);
    SetSize(800, 600, 1);
    SetWebGLContext({
      antialias: true,
      desynchronized: true,
      preserveDrawingBuffer: true
    });
    SetWorldSize(512);
  }

  // ../phaser-genesis/src/textures/TextureManager.ts
  var TextureManager = class {
    constructor() {
      __publicField(this, "textures");
      this.textures = new Map();
      this.createDefaultTextures();
      TextureManagerInstance.set(this);
    }
    createDefaultTextures() {
      this.add("__BLANK", new Texture(CreateCanvas(32, 32).canvas));
      const missing = CreateCanvas(32, 32);
      missing.strokeStyle = "#0f0";
      missing.moveTo(0, 0);
      missing.lineTo(32, 32);
      missing.stroke();
      missing.strokeRect(0.5, 0.5, 31, 31);
      this.add("__MISSING", new Texture(missing.canvas));
      const white = CreateCanvas(32, 32);
      white.fillStyle = "#fff";
      white.fillRect(0, 0, 32, 32);
      this.add("__WHITE", new Texture(white.canvas));
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
      const textures = this.textures;
      if (!textures.has(key)) {
        if (source instanceof Texture) {
          texture = source;
        } else {
          texture = new Texture(source, 0, 0, glConfig);
        }
        texture.key = key;
        textures.set(key, texture);
      }
      return texture;
    }
  };

  // ../phaser-genesis/src/Game.ts
  var Game = class extends EventEmitter {
    constructor(...settings) {
      super();
      __publicField(this, "id", addEntity(GameObjectWorld));
      __publicField(this, "VERSION", "4.0.0-beta1");
      __publicField(this, "isBooted", false);
      __publicField(this, "isPaused", false);
      __publicField(this, "willUpdate", true);
      __publicField(this, "willRender", true);
      __publicField(this, "lastTick", 0);
      __publicField(this, "elapsed", 0);
      __publicField(this, "delta", 0);
      __publicField(this, "fps", 0);
      __publicField(this, "frame", 0);
      __publicField(this, "framems", 0);
      __publicField(this, "frames", 0);
      __publicField(this, "prevFrame", 0);
      __publicField(this, "renderStats");
      __publicField(this, "renderer");
      __publicField(this, "textureManager");
      __publicField(this, "sceneManager");
      GameInstance.set(this);
      SetConfigDefaults();
      DOMContentLoaded(() => this.boot(settings));
    }
    boot(settings) {
      settings.forEach((setting) => setting());
      const renderer = GetRenderer();
      this.textureManager = new TextureManager();
      this.renderer = new renderer();
      this.sceneManager = new SceneManager();
      const parent = GetParent();
      if (parent) {
        AddToDOM(this.renderer.canvas, parent);
      }
      const globalVar = GetGlobalVar();
      if (globalVar && window) {
        window[globalVar] = this;
      }
      this.isBooted = true;
      GetBanner();
      Emit(this, "boot");
      const now = performance.now();
      this.lastTick = now;
      this.prevFrame = now;
      this.renderStats = GetRenderStatsAsObject();
      this.step(now);
    }
    pause() {
      this.isPaused = true;
    }
    resume() {
      this.isPaused = false;
      this.lastTick = performance.now();
    }
    step(time) {
      const renderer = this.renderer;
      const sceneManager = this.sceneManager;
      this.framems = time - this.lastTick;
      if (!this.isPaused) {
        if (this.willUpdate) {
          sceneManager.update(this.delta, time, this.frame);
        }
        Emit(this, "update", this.framems, time);
        if (this.willRender) {
          sceneManager.preRender(this.frame);
          renderer.render(sceneManager.flush, sceneManager.scenes);
          sceneManager.flush = false;
        }
      }
      const now = performance.now();
      const delta = now - time;
      this.frames++;
      if (now >= this.prevFrame + 1e3) {
        this.fps = this.frames * 1e3 / (now - this.prevFrame);
        this.prevFrame = now;
        this.frames = 0;
      }
      this.lastTick = now;
      this.elapsed += delta;
      this.delta = delta;
      GetRenderStatsAsObject(this.renderStats);
      this.renderStats.fps = this.fps;
      this.renderStats.delta = delta;
      Emit(this, "step");
      this.frame++;
      GameInstance.setFrame(this.frame);
      GameInstance.setElapsed(this.elapsed);
      requestAnimationFrame((now2) => this.step(now2));
    }
    destroy() {
    }
  };

  // ../phaser-genesis/src/world/events/WorldAfterUpdateEvent.ts
  var WorldAfterUpdateEvent = "afterupdate";

  // ../phaser-genesis/src/world/events/WorldBeforeUpdateEvent.ts
  var WorldBeforeUpdateEvent = "beforeupdate";

  // ../phaser-genesis/src/world/events/WorldPostRenderEvent.ts
  var WorldPostRenderEvent = "worldpostrender";

  // ../phaser-genesis/src/world/events/WorldRenderEvent.ts
  var WorldRenderEvent = "worldrender";

  // ../phaser-genesis/src/world/events/WorldShutdownEvent.ts
  var WorldShutdownEvent = "worldshutdown";

  // ../phaser-genesis/src/world/events/WorldUpdateEvent.ts
  var WorldUpdateEvent = "update";

  // ../phaser-genesis/src/world/RenderDataComponent.ts
  var RenderData = defineComponent({
    gameFrame: Types.ui32,
    dirtyFrame: Types.ui32,
    numRendered: Types.ui32,
    numRenderable: Types.ui32
  });
  var RenderDataComponent = RenderData;

  // ../phaser-genesis/src/world/AddRenderDataComponent.ts
  function AddRenderDataComponent(id) {
    addComponent(GameObjectWorld, RenderDataComponent, id);
  }

  // ../phaser-genesis/src/world/CheckDirtyTransforms.ts
  function CheckDirtyTransforms(worldID, list) {
    for (let i = 0; i < list.length; i++) {
      if (GetWorldID(list[i]) === worldID) {
        return true;
      }
    }
    return false;
  }

  // ../phaser-genesis/src/config/worldsize/GetWorldSize.ts
  function GetWorldSize() {
    return ConfigStore.get(CONFIG_DEFAULTS.WORLD_SIZE);
  }

  // ../phaser-genesis/src/world/RebuildWorldList.ts
  function RebuildWorldList(world3, parent) {
    if (WillRender(parent)) {
      if (world3.id !== parent) {
        world3.addToRenderList(parent, 0);
      }
      const children = GameObjectTree.get(parent);
      for (let i = 0; i < children.length; i++) {
        const nodeID = children[i];
        if (WillRender(nodeID)) {
          if (GetNumChildren(nodeID) > 0 && WillRenderChildren(nodeID)) {
            if (!WillCacheChildren(nodeID) || HasDirtyChildCache(nodeID)) {
              RebuildWorldList(world3, nodeID);
            } else {
              world3.addToRenderList(nodeID, 0);
              world3.addToRenderList(nodeID, 1);
            }
          } else if (!WillCacheChildren(nodeID)) {
            world3.addToRenderList(nodeID, 0);
            world3.addToRenderList(nodeID, 1);
          }
        }
      }
      if (world3.id !== parent) {
        world3.addToRenderList(parent, 1);
      }
    }
  }

  // ../phaser-genesis/src/world/RebuildWorldTransforms.ts
  function RebuildWorldTransforms(world3, parent, transformList, forceUpdate) {
    if (WillRender(parent)) {
      if (!forceUpdate && transformList.indexOf(parent) > -1) {
        forceUpdate = true;
      }
      if (forceUpdate && hasComponent(GameObjectWorld, Transform2DComponent, parent)) {
        UpdateWorldTransform(parent);
      }
      const children = GameObjectTree.get(parent);
      for (let i = 0; i < children.length; i++) {
        const nodeID = children[i];
        if (WillRender(nodeID)) {
          if (GetNumChildren(nodeID) > 0) {
            if (WillRenderChildren(nodeID) && WillTransformChildren(nodeID)) {
              RebuildWorldTransforms(world3, nodeID, transformList, forceUpdate);
            }
          } else if (forceUpdate || transformList.indexOf(nodeID) > -1) {
            UpdateWorldTransform(nodeID);
          }
        }
      }
    }
  }

  // ../phaser-genesis/src/world/ResetWorldRenderData.ts
  function ResetWorldRenderData(id, gameFrame) {
    RenderDataComponent.gameFrame[id] = gameFrame;
    RenderDataComponent.dirtyFrame[id] = 0;
    RenderDataComponent.numRendered[id] = 0;
    RenderDataComponent.numRenderable[id] = 0;
  }

  // ../phaser-genesis/src/scenes/events/SceneDestroyEvent.ts
  var SceneDestroyEvent = "destroy";

  // ../phaser-genesis/src/world/BaseWorld.ts
  var BaseWorld = class extends GameObject {
    constructor(scene) {
      super();
      __publicField(this, "tag", defineComponent());
      __publicField(this, "scene");
      __publicField(this, "sceneManager");
      __publicField(this, "camera");
      __publicField(this, "forceRefresh", false);
      __publicField(this, "is3D", false);
      __publicField(this, "runRender", false);
      __publicField(this, "renderList");
      __publicField(this, "listLength");
      __publicField(this, "totalChildren");
      __publicField(this, "totalChildrenQuery");
      __publicField(this, "dirtyWorldQuery");
      this.scene = scene;
      this.sceneManager = SceneManagerInstance.get();
      this.totalChildren = 0;
      this.totalChildrenQuery = defineQuery([this.tag]);
      this.dirtyWorldQuery = defineQuery([this.tag, Changed(WorldMatrix2DComponent)]);
      this.dirtyWorldQuery(GameObjectWorld);
      this.renderList = new Uint32Array(GetWorldSize() * 4);
      this.listLength = 0;
      const id = this.id;
      AddRenderDataComponent(id);
      SetWorldID(id, id);
      WorldList.get(scene).push(this);
      Once(scene, SceneDestroyEvent, () => this.destroy());
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
    addToRenderList(id, renderType) {
      let len = this.listLength;
      const list = this.renderList;
      list[len] = id;
      list[len + 1] = renderType;
      this.listLength += 2;
      len += 2;
      if (len === list.length) {
        const newList = new Uint32Array(len + GetWorldSize() * 4);
        newList.set(list, 0);
        this.renderList = newList;
      }
    }
    getRenderList() {
      const list = this.renderList;
      const output = [];
      for (let i = 0; i < this.listLength; i += 2) {
        const eid = list[i];
        const type = list[i + 1];
        if (type === 0) {
          output.push(GameObjectCache.get(eid));
        }
      }
      return output;
    }
    preRender(gameFrame, transformList) {
      const sceneManager = this.sceneManager;
      if (!this.isRenderable()) {
        this.runRender = false;
        sceneManager.updateWorldStats(this.totalChildren, 0, 0, 0);
        return false;
      }
      const id = this.id;
      const dirtyDisplayList = HasDirtyDisplayList(id);
      ResetWorldRenderData(id, gameFrame);
      let isDirty = false;
      if (dirtyDisplayList) {
        this.listLength = 0;
        RebuildWorldList(this, id);
        ClearDirtyDisplayList(id);
        isDirty = true;
        this.totalChildren = this.totalChildrenQuery(GameObjectWorld).length;
      }
      if (dirtyDisplayList || CheckDirtyTransforms(id, transformList)) {
        RebuildWorldTransforms(this, id, transformList, false);
        isDirty = true;
      }
      this.camera.dirtyRender = false;
      this.runRender = this.listLength > 0;
      const dirtyWorld = this.dirtyWorldQuery(GameObjectWorld).length;
      sceneManager.updateWorldStats(this.totalChildren, this.listLength / 4, Number(dirtyDisplayList), dirtyWorld);
      return isDirty;
    }
    getTotalChildren() {
      if (HasDirtyDisplayList(this.id)) {
        this.totalChildren = this.totalChildrenQuery(GameObjectWorld).length;
      }
      return this.totalChildren;
    }
    renderGL(renderPass) {
      Emit(this, WorldRenderEvent, this);
      const currentCamera = renderPass.current2DCamera;
      const camera = this.camera;
      if (!currentCamera || !Mat2dEquals(camera.worldTransform, currentCamera.worldTransform)) {
        Flush(renderPass);
      }
      Begin(renderPass, camera);
      const list = this.renderList;
      for (let i = 0; i < this.listLength; i += 2) {
        const eid = list[i];
        const type = list[i + 1];
        const entry = GameObjectCache.get(eid);
        if (type === 1) {
          entry.postRenderGL(renderPass);
        } else {
          entry.renderGL(renderPass);
        }
      }
    }
    postRenderGL(renderPass) {
      if (!this.runRender) {
        Begin(renderPass, this.camera);
      }
      Emit(this, WorldPostRenderEvent, renderPass, this);
    }
    shutdown() {
      RemoveChildren(this);
      Emit(this, WorldShutdownEvent, this);
      ResetWorldRenderData(this.id, 0);
      if (this.camera) {
        this.camera.reset();
      }
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

  // ../phaser-genesis/src/world/StaticWorld.ts
  var StaticWorld = class extends BaseWorld {
    constructor(scene) {
      super(scene);
      this.camera = new StaticCamera();
    }
  };

  // examples/src/gameobjects/rectangle/transforming rectangles.ts
  var Demo = class extends Scene {
    constructor() {
      super();
      const world3 = new StaticWorld(this);
      const rect1 = new Rectangle2(272, 100, 128, 128, 16711680);
      const rect2 = new Rectangle2(400, 300, 128, 128, 65280);
      const rect3 = new Rectangle2(528, 300, 128, 128, 255);
      AddChildren(world3, rect1, rect2, rect3);
      AddTween(rect1).to(3e3, { y: 500, rotation: 1 }).easing(easing_exports.Quartic.InOut).yoyo().repeat(-1);
      AddTween(rect2.scale).to(1e3, { x: 0.1, y: 2 }).easing(easing_exports.Quartic.InOut).yoyo().repeat(-1);
      AddTween(rect3.skew).to(2e3, { x: 2, y: 4 }).easing(easing_exports.Sine.InOut).yoyo().repeat(-1);
    }
  };
  new Game(WebGL(), Parent("gameParent"), GlobalVar("Phaser4"), BackgroundColor(2960685), Scenes(Demo));
})();
/**
 * @author       Niklas von Hertzen (https://github.com/niklasvh/base64-arraybuffer)
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
//# sourceMappingURL=transforming rectangles.js.map
