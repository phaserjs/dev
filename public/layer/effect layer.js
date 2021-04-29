(() => {
  // node_modules/@phaserjs/phaser/config/const.js
  var CONFIG_DEFAULTS = {
    BACKGROUND_COLOR: "BackgroundColor",
    BATCH_SIZE: "BatchSize",
    DEFAULT_ORIGIN: "DefaultOrigin",
    MAX_TEXTURES: "MaxTextures",
    PARENT: "Parent",
    SIZE: "Size",
    SCENES: "Scenes",
    RENDERER: "Renderer",
    AUTO: "Auto",
    WEBGL: "WebGL",
    CANVAS: "Canvas",
    WEBGL_CONTEXT: "WebGLContext",
    CANVAS_CONTEXT: "CanvasContext",
    BANNER: "Banner"
  };

  // node_modules/@phaserjs/phaser/config/ConfigStore.js
  var ConfigStore = new Map();

  // node_modules/@phaserjs/phaser/config/backgroundcolor/SetBackgroundColor.js
  function SetBackgroundColor(color) {
    ConfigStore.set(CONFIG_DEFAULTS.BACKGROUND_COLOR, color);
  }

  // node_modules/@phaserjs/phaser/config/backgroundcolor/BackgroundColor.js
  function BackgroundColor(color) {
    return () => {
      SetBackgroundColor(color);
    };
  }

  // node_modules/@phaserjs/phaser/config/banner/SetBanner.js
  function SetBanner(title = "", version = "", url = "", color = "#fff", background = "linear-gradient(#3e0081 40%, #00bcc3)") {
    ConfigStore.set(CONFIG_DEFAULTS.BANNER, {title, version, url, color, background});
  }

  // node_modules/@phaserjs/phaser/config/batchsize/SetBatchSize.js
  function SetBatchSize(size) {
    ConfigStore.set(CONFIG_DEFAULTS.BATCH_SIZE, size);
  }

  // node_modules/@phaserjs/phaser/config/size/GetHeight.js
  function GetHeight() {
    return ConfigStore.get(CONFIG_DEFAULTS.SIZE).height;
  }

  // node_modules/@phaserjs/phaser/config/size/GetResolution.js
  function GetResolution() {
    return ConfigStore.get(CONFIG_DEFAULTS.SIZE).resolution;
  }

  // node_modules/@phaserjs/phaser/config/size/GetWidth.js
  function GetWidth() {
    return ConfigStore.get(CONFIG_DEFAULTS.SIZE).width;
  }

  // node_modules/@phaserjs/phaser/config/size/SetSize.js
  function SetSize(width = 800, height = 600, resolution = 1) {
    if (resolution === 0) {
      resolution = window.devicePixelRatio;
    }
    ConfigStore.set(CONFIG_DEFAULTS.SIZE, {width, height, resolution});
  }

  // node_modules/@phaserjs/phaser/config/size/Size.js
  function Size(width = 800, height = 600, resolution = 1) {
    return () => {
      SetSize(width, height, resolution);
    };
  }

  // node_modules/@phaserjs/phaser/renderer/BindingQueue.js
  var queue = [];
  var BindingQueue = {
    add: (texture, glConfig) => {
      queue.push({texture, glConfig});
    },
    get: () => {
      return queue;
    },
    clear: () => {
      queue.length = 0;
    }
  };

  // node_modules/@phaserjs/phaser/config/backgroundcolor/GetBackgroundColor.js
  function GetBackgroundColor() {
    return ConfigStore.get(CONFIG_DEFAULTS.BACKGROUND_COLOR);
  }

  // node_modules/@phaserjs/phaser/config/renderer/SetRenderer.js
  function SetRenderer(renderer) {
    ConfigStore.set(CONFIG_DEFAULTS.RENDERER, renderer);
  }

  // node_modules/@phaserjs/phaser/config/defaultorigin/SetDefaultOrigin.js
  function SetDefaultOrigin(x = 0.5, y = x) {
    ConfigStore.set(CONFIG_DEFAULTS.DEFAULT_ORIGIN, {x, y});
  }

  // node_modules/@phaserjs/phaser/config/maxtextures/SetMaxTextures.js
  function SetMaxTextures(max) {
    ConfigStore.set(CONFIG_DEFAULTS.MAX_TEXTURES, max);
  }

  // node_modules/@phaserjs/phaser/dom/GetElement.js
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

  // node_modules/@phaserjs/phaser/config/parent/SetParent.js
  function SetParent(parentElement) {
    if (parentElement) {
      ConfigStore.set(CONFIG_DEFAULTS.PARENT, GetElement(parentElement));
    }
  }

  // node_modules/@phaserjs/phaser/config/parent/Parent.js
  function Parent(parentElement) {
    return () => {
      SetParent(parentElement);
    };
  }

  // node_modules/@phaserjs/phaser/config/scenes/SetScenes.js
  function SetScenes(scenes) {
    ConfigStore.set(CONFIG_DEFAULTS.SCENES, [].concat(scenes));
  }

  // node_modules/@phaserjs/phaser/config/scenes/Scenes.js
  function Scenes(scenes) {
    return () => {
      SetScenes(scenes);
    };
  }

  // node_modules/@phaserjs/phaser/geom/rectangle/RectangleContains.js
  function RectangleContains(rect, x, y) {
    if (rect.width <= 0 || rect.height <= 0) {
      return false;
    }
    return rect.x <= x && rect.x + rect.width >= x && rect.y <= y && rect.y + rect.height >= y;
  }

  // node_modules/@phaserjs/phaser/geom/rectangle/Rectangle.js
  var Rectangle = class {
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

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/AddViewport.js
  function AddViewport(renderPass, x = 0, y = 0, width = 0, height = 0) {
    const viewport = new Rectangle(x, y, width, height);
    renderPass.viewportStack.push(viewport);
    return viewport;
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/GL.js
  var gl;
  var GL = {
    get: () => {
      return gl;
    },
    set: (context) => {
      gl = context;
    }
  };

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/BindViewport.js
  function BindViewport(renderPass, viewport) {
    if (!viewport) {
      viewport = renderPass.currentViewport;
      if (!viewport) {
        return;
      }
    }
    const glv = gl.getParameter(gl.VIEWPORT);
    if (glv[0] !== viewport.x || glv[1] !== viewport.y || glv[2] !== viewport.width || glv[3] !== viewport.height) {
      gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
    }
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/SetViewport.js
  function SetViewport(renderPass, x = 0, y = 0, width = 0, height = 0) {
    const entry = AddViewport(renderPass, x, y, width, height);
    BindViewport(renderPass, entry);
    renderPass.currentViewport = entry;
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/BindFramebuffer.js
  function BindFramebuffer(renderPass, clear = true, entry) {
    if (!entry) {
      entry = renderPass.currentFramebuffer;
    }
    const {framebuffer, viewport} = entry;
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    if (clear) {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    if (viewport) {
      SetViewport(renderPass, viewport.x, viewport.y, viewport.width, viewport.height);
    }
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/PopViewport.js
  function PopViewport(renderPass) {
    const stack = renderPass.viewportStack;
    if (stack.length > 1) {
      stack.pop();
    }
    renderPass.currentViewport = stack[stack.length - 1];
    BindViewport(renderPass);
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/PopFramebuffer.js
  function PopFramebuffer(renderPass) {
    const stack = renderPass.framebufferStack;
    if (stack.length > 1) {
      if (renderPass.currentFramebuffer.viewport) {
        PopViewport(renderPass);
      }
      stack.pop();
    }
    renderPass.currentFramebuffer = stack[stack.length - 1];
    BindFramebuffer(renderPass, false);
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/AddFramebuffer.js
  function AddFramebuffer(renderPass, framebuffer, viewport) {
    const entry = {framebuffer, viewport};
    renderPass.framebufferStack.push(entry);
    return entry;
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/SetFramebuffer.js
  function SetFramebuffer(renderPass, framebuffer, clear = true, viewport) {
    const entry = AddFramebuffer(renderPass, framebuffer, viewport);
    BindFramebuffer(renderPass, clear, entry);
    renderPass.currentFramebuffer = entry;
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/Draw.js
  function Draw(renderPass) {
    const count = renderPass.count;
    if (count === 0) {
      return;
    }
    const currentBuffer = renderPass.currentVertexBuffer;
    const currentShader = renderPass.currentShader;
    const renderToFramebuffer = currentShader.shader.renderToFramebuffer;
    if (renderToFramebuffer) {
      SetFramebuffer(renderPass, currentShader.shader.framebuffer, true);
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
      PopFramebuffer(renderPass);
    }
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/Flush.js
  function Flush(renderPass, forceCount) {
    if (forceCount) {
      renderPass.count = forceCount;
    }
    const count = renderPass.count;
    if (count === 0) {
      return false;
    }
    Draw(renderPass);
    renderPass.prevCount = count;
    renderPass.count = 0;
    renderPass.flushTotal++;
    return true;
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/End.js
  function End(renderPass) {
    Flush(renderPass);
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/colors/GetRGBArray.js
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

  // node_modules/@phaserjs/phaser/config/webglcontext/GetWebGLContext.js
  function GetWebGLContext() {
    return ConfigStore.get(CONFIG_DEFAULTS.WEBGL_CONTEXT);
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/textures/CreateGLTexture.js
  function CreateGLTexture(binding) {
    const {parent, flipY, unpackPremultiplyAlpha, minFilter, magFilter, wrapS, wrapT, generateMipmap, isPOT} = binding;
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

  // node_modules/@phaserjs/phaser/renderer/webgl1/fbo/DeleteFramebuffer.js
  function DeleteFramebuffer(framebuffer) {
    if (gl && gl.isFramebuffer(framebuffer)) {
      gl.deleteFramebuffer(framebuffer);
    }
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/textures/DeleteGLTexture.js
  function DeleteGLTexture(texture) {
    if (gl.isTexture(texture)) {
      gl.deleteTexture(texture);
    }
  }

  // node_modules/@phaserjs/phaser/math/pow2/IsSizePowerOfTwo.js
  function IsSizePowerOfTwo(width, height) {
    if (width < 1 || height < 1) {
      return false;
    }
    return (width & width - 1) === 0 && (height & height - 1) === 0;
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/textures/SetGLTextureFilterMode.js
  function SetGLTextureFilterMode(texture, linear = true) {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    const mode = linear ? gl.LINEAR : gl.NEAREST;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mode);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, mode);
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/textures/UpdateGLTexture.js
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

  // node_modules/@phaserjs/phaser/renderer/webgl1/textures/GLTextureBinding.js
  var GLTextureBinding = class {
    constructor(parent, config = {}) {
      this.index = 0;
      this.indexCounter = -1;
      this.dirtyIndex = true;
      this.unpackPremultiplyAlpha = true;
      this.flipY = false;
      this.isPOT = false;
      this.generateMipmap = false;
      this.parent = parent;
      this.isPOT = IsSizePowerOfTwo(parent.width, parent.height);
      const {
        texture = null,
        framebuffer = null,
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
      if (framebuffer) {
        this.framebuffer = framebuffer;
      }
      if (depthbuffer) {
        this.depthbuffer = depthbuffer;
      }
      if (texture) {
        this.texture = texture;
      } else {
        CreateGLTexture(this);
      }
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
    setIndex(index) {
      this.dirtyIndex = index !== this.index;
      this.index = index;
    }
    destroy() {
      DeleteGLTexture(this.texture);
      DeleteFramebuffer(this.framebuffer);
      this.parent = null;
      this.texture = null;
      this.framebuffer = null;
    }
  };

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/ProcessBindingQueue.js
  function ProcessBindingQueue() {
    const queue2 = BindingQueue.get();
    queue2.forEach((entry) => {
      const {texture, glConfig} = entry;
      if (!texture.binding) {
        texture.binding = new GLTextureBinding(texture, glConfig);
      }
    });
    BindingQueue.clear();
  }

  // node_modules/@phaserjs/phaser/config/maxtextures/GetMaxTextures.js
  function GetMaxTextures() {
    return ConfigStore.get(CONFIG_DEFAULTS.MAX_TEXTURES);
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/shaders/CheckShaderMaxIfStatements.js
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

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/CreateTempTextures.js
  function CreateTempTextures(renderPass) {
    let maxGPUTextures = CheckShaderMaxIfStatements(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
    const maxConfigTextures = GetMaxTextures();
    if (maxConfigTextures === 0 || maxConfigTextures > 0 && maxConfigTextures > maxGPUTextures) {
      SetMaxTextures(maxGPUTextures);
    } else if (maxConfigTextures > 0 && maxConfigTextures < maxGPUTextures) {
      maxGPUTextures = Math.max(8, maxConfigTextures);
    }
    const tempTextures = renderPass.tempTextures;
    if (tempTextures.length) {
      tempTextures.forEach((texture) => {
        gl.deleteTexture(texture);
      });
    }
    const index = [];
    for (let texturesIndex = 0; texturesIndex < maxGPUTextures; texturesIndex++) {
      const tempTexture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + texturesIndex);
      gl.bindTexture(gl.TEXTURE_2D, tempTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
      tempTextures[texturesIndex] = tempTexture;
      index.push(texturesIndex);
    }
    renderPass.maxTextures = maxGPUTextures;
    renderPass.textureIndex = index;
    renderPass.currentActiveTexture = 1;
  }

  // node_modules/@phaserjs/phaser/config/batchsize/GetBatchSize.js
  function GetBatchSize() {
    return ConfigStore.get(CONFIG_DEFAULTS.BATCH_SIZE);
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/buffers/DeleteGLBuffer.js
  function DeleteGLBuffer(buffer) {
    if (gl.isBuffer(buffer)) {
      gl.deleteBuffer(buffer);
    }
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/buffers/VertexBuffer.js
  var VertexBuffer = class {
    constructor(config = {}) {
      this.indexed = false;
      this.isDynamic = false;
      this.count = 0;
      this.offset = 0;
      const {
        batchSize = 1,
        dataSize = 4,
        isDynamic = true,
        elementsPerEntry = 4,
        vertexElementSize = 6
      } = config;
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

  // node_modules/@phaserjs/phaser/renderer/webgl1/buffers/IndexedVertexBuffer.js
  var IndexedVertexBuffer = class extends VertexBuffer {
    constructor(config = {}) {
      super(config);
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

  // node_modules/@phaserjs/phaser/utils/base64/Base64ToArrayBuffer.js
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var lookup = new Uint8Array(256);
  for (let i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }

  // node_modules/@phaserjs/phaser/utils/NOOP.js
  function NOOP() {
  }

  // node_modules/@phaserjs/phaser/math/mat4/Matrix4.js
  var Matrix4 = class {
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

  // node_modules/@phaserjs/phaser/math/mat4/Mat4Ortho.js
  function Mat4Ortho(left, right, bottom, top, near, far, out = new Matrix4()) {
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);
    return out.set(-2 * lr, 0, 0, 0, 0, -2 * bt, 0, 0, 0, 0, 2 * nf, 0, (left + right) * lr, (top + bottom) * bt, (far + near) * nf, 1);
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/shaders/CreateAttributes.js
  function CreateAttributes(program, config) {
    const attributes = new Map();
    const defaultSettings = {
      size: 1,
      type: gl.FLOAT,
      normalized: false,
      stride: 0,
      offset: 0
    };
    const total = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < total; i++) {
      const attrib = gl.getActiveAttrib(program, i);
      if (!attrib) {
        break;
      }
      const name = attrib.name;
      const index = gl.getAttribLocation(program, name);
      gl.enableVertexAttribArray(index);
      const setting = config.hasOwnProperty(name) ? config[name] : {};
      const {
        size = defaultSettings.size,
        type = defaultSettings.type,
        normalized = defaultSettings.normalized,
        stride = defaultSettings.stride,
        offset = defaultSettings.offset
      } = setting;
      attributes.set(name, {index, size, type, normalized, stride, offset});
    }
    return attributes;
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/shaders/DeleteShaders.js
  function DeleteShaders(...shaders) {
    shaders.forEach((shader) => {
      gl.deleteShader(shader);
    });
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/shaders/CreateProgram.js
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

  // node_modules/@phaserjs/phaser/renderer/webgl1/shaders/CreateShader.js
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

  // node_modules/@phaserjs/phaser/renderer/webgl1/shaders/CreateUniformSetter.js
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

  // node_modules/@phaserjs/phaser/renderer/webgl1/shaders/CreateUniforms.js
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
        if (name.substr(-3) === "[0]") {
          name = name.substr(0, name.length - 3);
          isArray = uniform.size > 1;
        }
        uniforms.set(name, CreateUniformSetter(uniform, location, isArray));
      }
    }
    return uniforms;
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/GL_CONST.js
  var UNSIGNED_BYTE = 5121;
  var FLOAT = 5126;

  // node_modules/@phaserjs/phaser/renderer/webgl1/shaders/DefaultQuadAttributes.js
  var DefaultQuadAttributes = {
    aVertexPosition: {size: 2, type: FLOAT, normalized: false, offset: 0},
    aTextureCoord: {size: 2, type: FLOAT, normalized: false, offset: 8},
    aTextureId: {size: 1, type: FLOAT, normalized: false, offset: 16},
    aTintColor: {size: 4, type: UNSIGNED_BYTE, normalized: true, offset: 20}
  };

  // node_modules/@phaserjs/phaser/renderer/webgl1/shaders/DefaultQuadUniforms.js
  var DefaultQuadUniforms = {
    uProjectionMatrix: new Float32Array(),
    uCameraMatrix: new Float32Array(),
    uTexture: 0
  };

  // node_modules/@phaserjs/phaser/renderer/webgl1/fbo/CreateDepthBuffer.js
  function CreateDepthBuffer(framebuffer, textureWidth, textureHeight) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    const depthBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, textureWidth, textureHeight);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return depthBuffer;
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/fbo/CreateFramebuffer.js
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

  // node_modules/@phaserjs/phaser/renderer/webgl1/glsl/SINGLE_QUAD_FRAG.js
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

  // node_modules/@phaserjs/phaser/renderer/webgl1/glsl/SINGLE_QUAD_VERT.js
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

  // node_modules/@phaserjs/phaser/textures/Frame.js
  var Frame = class {
    constructor(texture, key, x, y, width, height) {
      this.trimmed = false;
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
      this.pivot = {x, y};
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
      return {left, right, top, bottom};
    }
    setExtent(child) {
      const transform = child.transform;
      const originX = transform.origin.x;
      const originY = transform.origin.y;
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
      transform.setExtent(x, y, width, height);
    }
    updateUVs() {
      const {x, y, width, height} = this;
      const baseTextureWidth = this.texture.width;
      const baseTextureHeight = this.texture.height;
      this.u0 = x / baseTextureWidth;
      this.v0 = y / baseTextureHeight;
      this.u1 = (x + width) / baseTextureWidth;
      this.v1 = (y + height) / baseTextureHeight;
    }
  };

  // node_modules/@phaserjs/phaser/textures/Texture.js
  var Texture = class {
    constructor(image, width, height, glConfig) {
      this.key = "";
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
      this.data = null;
      this.image = null;
      this.firstFrame = null;
    }
  };

  // node_modules/@phaserjs/phaser/renderer/webgl1/shaders/Shader.js
  var Shader = class {
    constructor(config) {
      this.renderToFramebuffer = false;
      this.renderToDepthbuffer = false;
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
    }
    updateUniforms(renderPass) {
    }
    bind(renderPass) {
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
      const uniforms = this.uniforms;
      for (const [name, setter] of this.uniformSetters.entries()) {
        setter(uniforms.get(name));
      }
      return true;
    }
    setAttributes(renderPass) {
      if (this.program) {
        const stride = renderPass.currentVertexBuffer.vertexByteSize;
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

  // node_modules/@phaserjs/phaser/renderer/webgl1/shaders/QuadShader.js
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

  // node_modules/@phaserjs/phaser/renderer/webgl1/glsl/MULTI_QUAD_FRAG.js
  var MULTI_QUAD_FRAG = `#define SHADER_NAME MULTI_QUAD_FRAG

precision highp float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture[%count%];

void main (void)
{
    vec4 color;

    %forloop%

    gl_FragColor = color * vec4(vTintColor.bgr * vTintColor.a, vTintColor.a);
}`;

  // node_modules/@phaserjs/phaser/renderer/webgl1/shaders/MultiTextureQuadShader.js
  var MultiTextureQuadShader = class extends QuadShader {
    constructor(config = {}) {
      if (!config.fragmentShader) {
        config.fragmentShader = MULTI_QUAD_FRAG;
      }
      super(config);
    }
    create(fragmentShaderSource, vertexShaderSource, uniforms, attribs) {
      const maxTextures = GetMaxTextures();
      let src = "";
      for (let i = 1; i < maxTextures; i++) {
        if (i > 1) {
          src += "\n	else ";
        }
        if (i < maxTextures - 1) {
          src += `if (vTextureId < ${i}.5)`;
        }
        src += "\n	{";
        src += `
		color = texture2D(uTexture[${i}], vTextureCoord);`;
        src += "\n	}";
      }
      fragmentShaderSource = fragmentShaderSource.replace(/%count%/gi, `${maxTextures}`);
      fragmentShaderSource = fragmentShaderSource.replace(/%forloop%/gi, src);
      super.create(fragmentShaderSource, vertexShaderSource, uniforms, attribs);
    }
    bind(renderPass) {
      this.uniforms.set("uTexture", renderPass.textureIndex);
      return super.bind(renderPass);
    }
  };

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/SetDefaultBlendMode.js
  function SetDefaultBlendMode(renderPass, enable, sfactor, dfactor) {
    const entry = {enable, sfactor, dfactor};
    renderPass.blendModeStack[0] = entry;
    renderPass.currentBlendMode = entry;
    renderPass.defaultBlendMode = entry;
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/SetDefaultFramebuffer.js
  function SetDefaultFramebuffer(renderPass, framebuffer = null, viewport) {
    const entry = {framebuffer, viewport};
    renderPass.framebufferStack[0] = entry;
    renderPass.currentFramebuffer = entry;
    renderPass.defaultFramebuffer = entry;
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/SetDefaultShader.js
  function SetDefaultShader(renderPass, shader, textureID) {
    const entry = {shader, textureID};
    renderPass.shaderStack[0] = entry;
    renderPass.currentShader = entry;
    renderPass.defaultShader = entry;
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/SetDefaultVertexBuffer.js
  function SetDefaultVertexBuffer(renderPass, buffer) {
    renderPass.vertexBufferStack[0] = buffer;
    renderPass.currentVertexBuffer = buffer;
    renderPass.defaultVertexBuffer = buffer;
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/SetDefaultViewport.js
  function SetDefaultViewport(renderPass, x = 0, y = 0, width = 0, height = 0) {
    const entry = new Rectangle(x, y, width, height);
    renderPass.viewportStack[0] = entry;
    renderPass.currentViewport = entry;
    renderPass.defaultViewport = entry;
  }

  // node_modules/@phaserjs/phaser/GameInstance.js
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

  // node_modules/@phaserjs/phaser/math/mat4/Mat4Identity.js
  function Mat4Identity(matrix = new Matrix4()) {
    return matrix.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  // node_modules/@phaserjs/phaser/math/mat2d/Matrix2D.js
  var Matrix2D = class {
    constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
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
      const {a, b, c, d, tx, ty} = this;
      return [a, b, c, d, tx, ty];
    }
    fromArray(src) {
      return this.set(src[0], src[1], src[2], src[3], src[4], src[5]);
    }
  };

  // node_modules/@phaserjs/phaser/math/vec2/Vec2Callback.js
  var Vec2Callback = class {
    constructor(onChange, x = 0, y = 0) {
      this._x = x;
      this._y = y;
      this.onChange = onChange;
    }
    destroy() {
      this.onChange = NOOP;
    }
    set(x = 0, y = 0) {
      this._x = x;
      this._y = y;
      if (this.onChange) {
        this.onChange(this);
      }
      return this;
    }
    get x() {
      return this._x;
    }
    set x(value) {
      const prev = this._x;
      this._x = value;
      if (prev !== value) {
        this.onChange(this);
      }
    }
    get y() {
      return this._y;
    }
    set y(value) {
      const prev = this._y;
      this._y = value;
      if (prev !== value) {
        this.onChange(this);
      }
    }
    toArray(dst = [], index = 0) {
      const {x, y} = this;
      dst[index] = x;
      dst[index + 1] = y;
      return dst;
    }
    fromArray(src, index = 0) {
      return this.set(src[index], src[index + 1]);
    }
    toString() {
      const {x, y} = this;
      return `{ x=${x}, y=${y} }`;
    }
  };

  // node_modules/@phaserjs/phaser/math/const.js
  var MATH_CONST = {
    PI2: Math.PI * 2,
    HALF_PI: Math.PI * 0.5,
    EPSILON: 1e-6,
    DEG_TO_RAD: Math.PI / 180,
    RAD_TO_DEG: 180 / Math.PI,
    MIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER || -9007199254740991,
    MAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER || 9007199254740991
  };

  // node_modules/@phaserjs/phaser/camera/StaticCamera.js
  var StaticCamera = class {
    constructor() {
      this.type = "StaticCamera";
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

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/RenderPass.js
  var RenderPass = class {
    constructor(renderer) {
      this.count = 0;
      this.prevCount = 0;
      this.flushTotal = 0;
      this.maxTextures = 0;
      this.currentActiveTexture = 0;
      this.startActiveTexture = 0;
      this.tempTextures = [];
      this.textureIndex = [];
      this.framebufferStack = [];
      this.currentFramebuffer = null;
      this.defaultFramebuffer = null;
      this.vertexBufferStack = [];
      this.currentVertexBuffer = null;
      this.defaultVertexBuffer = null;
      this.shaderStack = [];
      this.currentShader = null;
      this.defaultShader = null;
      this.viewportStack = [];
      this.currentViewport = null;
      this.defaultViewport = null;
      this.blendModeStack = [];
      this.currentBlendMode = null;
      this.defaultBlendMode = null;
      this.renderer = renderer;
      this.projectionMatrix = new Matrix4();
      this.reset();
    }
    reset() {
      const gl2 = this.renderer.gl;
      const indexLayout = [0, 1, 2, 2, 3, 0];
      this.quadShader = new QuadShader();
      this.quadBuffer = new IndexedVertexBuffer({isDynamic: false, indexLayout});
      this.quadCamera = new StaticCamera();
      CreateTempTextures(this);
      SetDefaultFramebuffer(this);
      SetDefaultBlendMode(this, true, gl2.ONE, gl2.ONE_MINUS_SRC_ALPHA);
      SetDefaultVertexBuffer(this, new IndexedVertexBuffer({batchSize: GetBatchSize(), indexLayout}));
      SetDefaultShader(this, new MultiTextureQuadShader());
    }
    resize(width, height) {
      Mat4Ortho(0, width, height, 0, -1e3, 1e3, this.projectionMatrix);
      this.quadCamera.reset();
      SetDefaultViewport(this, 0, 0, width, height);
    }
  };

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/AddShader.js
  function AddShader(renderPass, shader, textureID) {
    const stackEntry = {shader, textureID};
    renderPass.shaderStack.push(stackEntry);
    return stackEntry;
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/AddVertexBuffer.js
  function AddVertexBuffer(renderPass, buffer) {
    renderPass.vertexBufferStack.push(buffer);
    return buffer;
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/BindShader.js
  function BindShader(renderPass, entry) {
    if (!entry) {
      entry = renderPass.currentShader;
    }
    const success = entry.shader.bind(renderPass, entry.textureID);
    if (success) {
      entry.shader.setAttributes(renderPass);
    }
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/Begin.js
  function Begin(renderPass, camera2D) {
    renderPass.current2DCamera = camera2D;
    renderPass.cameraMatrix = camera2D.matrix;
    BindShader(renderPass);
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/BindBlendMode.js
  function BindBlendMode(renderPass, entry) {
    if (!entry) {
      entry = renderPass.currentBlendMode;
    }
    if (entry.enable) {
      gl.enable(gl.BLEND);
      gl.blendFunc(entry.sfactor, entry.dfactor);
    } else {
      gl.disable(gl.BLEND);
    }
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/BindTexture.js
  function BindTexture(texture, index = 0) {
    const binding = texture.binding;
    binding.setIndex(index);
    gl.activeTexture(gl.TEXTURE0 + index);
    gl.bindTexture(gl.TEXTURE_2D, binding.texture);
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/BindVertexBuffer.js
  function BindVertexBuffer(renderPass, buffer) {
    if (!buffer) {
      buffer = renderPass.currentVertexBuffer;
    }
    const indexBuffer = buffer.indexed ? buffer.indexBuffer : null;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer.vertexBuffer);
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/PopVertexBuffer.js
  function PopVertexBuffer(renderPass) {
    const stack = renderPass.vertexBufferStack;
    if (stack.length > 1) {
      stack.pop();
    }
    renderPass.currentVertexBuffer = stack[stack.length - 1];
    BindVertexBuffer(renderPass);
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/SetVertexBuffer.js
  function SetVertexBuffer(renderPass, buffer) {
    const entry = AddVertexBuffer(renderPass, buffer);
    BindVertexBuffer(renderPass, entry);
    renderPass.currentVertexBuffer = entry;
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/GetVertexBufferEntry.js
  function GetVertexBufferEntry(renderPass, addToCount = 0) {
    const buffer = renderPass.currentVertexBuffer;
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

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/PopShader.js
  function PopShader(renderPass) {
    const stack = renderPass.shaderStack;
    if (stack.length > 1) {
      stack.pop();
    }
    renderPass.currentShader = stack[stack.length - 1];
    BindShader(renderPass);
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/SetShader.js
  function SetShader(renderPass, shader, textureID) {
    const entry = AddShader(renderPass, shader, textureID);
    BindShader(renderPass, entry);
    renderPass.currentShader = entry;
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/SetTexture.js
  function SetTexture(renderPass, texture) {
    const binding = texture.binding;
    const currentActiveTexture = renderPass.currentActiveTexture;
    if (binding.indexCounter < renderPass.startActiveTexture) {
      binding.indexCounter = renderPass.startActiveTexture;
      if (currentActiveTexture < renderPass.maxTextures) {
        binding.setIndex(currentActiveTexture);
        gl.activeTexture(gl.TEXTURE0 + currentActiveTexture);
        gl.bindTexture(gl.TEXTURE_2D, binding.texture);
        renderPass.currentActiveTexture++;
      } else {
        Flush(renderPass);
        renderPass.startActiveTexture++;
        binding.indexCounter = renderPass.startActiveTexture;
        binding.setIndex(1);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, binding.texture);
        renderPass.currentActiveTexture = 2;
      }
    }
    return binding.index;
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/Start.js
  function Start(renderPass) {
    renderPass.current2DCamera = renderPass.quadCamera;
    renderPass.cameraMatrix = renderPass.quadCamera.matrix;
    renderPass.count = 0;
    renderPass.flushTotal = 0;
    BindFramebuffer(renderPass, false, renderPass.defaultFramebuffer);
    BindBlendMode(renderPass, renderPass.defaultBlendMode);
    BindViewport(renderPass, renderPass.defaultViewport);
    BindVertexBuffer(renderPass, renderPass.defaultVertexBuffer);
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/renderpass/UnbindTexture.js
  function UnbindTexture(renderPass, index = 0) {
    gl.activeTexture(gl.TEXTURE0 + index);
    gl.bindTexture(gl.TEXTURE_2D, renderPass.tempTextures[index]);
    if (index > 0) {
      renderPass.startActiveTexture++;
    }
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/WebGLRendererInstance.js
  var instance2;
  var WebGLRendererInstance = {
    get: () => {
      return instance2;
    },
    set: (renderer) => {
      instance2 = renderer;
    }
  };

  // node_modules/@phaserjs/phaser/renderer/webgl1/WebGLRenderer.js
  var WebGLRenderer = class {
    constructor() {
      this.clearColor = [0, 0, 0, 1];
      this.clearBeforeRender = true;
      this.optimizeRedraw = false;
      this.autoResize = true;
      this.contextLost = false;
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
    render(renderData) {
      if (this.contextLost) {
        return;
      }
      const gl2 = this.gl;
      const renderPass = this.renderPass;
      ProcessBindingQueue();
      if (this.optimizeRedraw && renderData.numDirtyFrames === 0 && renderData.numDirtyCameras === 0) {
        return;
      }
      if (this.clearBeforeRender) {
        const cls = this.clearColor;
        gl2.clearColor(cls[0], cls[1], cls[2], cls[3]);
        gl2.clear(gl2.COLOR_BUFFER_BIT);
      }
      const worlds = renderData.worldData;
      Start(renderPass);
      for (let i = 0; i < worlds.length; i++) {
        const {world} = worlds[i];
        world.renderGL(renderPass);
        world.postRenderGL(renderPass);
      }
      End(renderPass);
    }
    destroy() {
      WebGLRendererInstance.set(void 0);
    }
  };

  // node_modules/@phaserjs/phaser/config/webgl/WebGL.js
  function WebGL() {
    return () => {
      SetRenderer(WebGLRenderer);
    };
  }

  // node_modules/@phaserjs/phaser/gameobjects/DIRTY_CONST.js
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

  // node_modules/@phaserjs/phaser/gameobjects/components/transform/GetVertices.js
  function GetVertices(transform) {
    const {a, b, c, d, tx, ty} = transform.world;
    const {x, y, right, bottom} = transform.extent;
    const x0 = x * a + y * c + tx;
    const y0 = x * b + y * d + ty;
    const x1 = x * a + bottom * c + tx;
    const y1 = x * b + bottom * d + ty;
    const x2 = right * a + bottom * c + tx;
    const y2 = right * b + bottom * d + ty;
    const x3 = right * a + y * c + tx;
    const y3 = right * b + y * d + ty;
    return {x0, y0, x1, y1, x2, y2, x3, y3};
  }

  // node_modules/@phaserjs/phaser/gameobjects/components/bounds/BoundsComponent.js
  var BoundsComponent = class {
    constructor(entity) {
      this.fixed = false;
      this.includeChildren = true;
      this.visibleOnly = true;
      this.entity = entity;
      this.area = new Rectangle();
    }
    set(x, y, width, height) {
      this.area.set(x, y, width, height);
    }
    get() {
      if (this.entity.isDirty(DIRTY_CONST.BOUNDS) && !this.fixed) {
        this.update();
      }
      return this.area;
    }
    updateLocal() {
      const {x0, y0, x1, y1, x2, y2, x3, y3} = GetVertices(this.entity.transform);
      const x = Math.min(x0, x1, x2, x3);
      const y = Math.min(y0, y1, y2, y3);
      const right = Math.max(x0, x1, x2, x3);
      const bottom = Math.max(y0, y1, y2, y3);
      return this.area.set(x, y, right - x, bottom - y);
    }
    update() {
      const bounds = this.updateLocal();
      this.entity.clearDirty(DIRTY_CONST.BOUNDS);
      if (!this.includeChildren || !this.entity.numChildren) {
        return bounds;
      }
      const visibleOnly = this.visibleOnly;
      const children = this.entity.children;
      let x = bounds.x;
      let y = bounds.y;
      let right = bounds.right;
      let bottom = bounds.bottom;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (!child || visibleOnly && !child.visible) {
          continue;
        }
        const childBounds = child.bounds.get();
        if (childBounds.x < x) {
          x = childBounds.x;
        }
        if (childBounds.y < y) {
          y = childBounds.y;
        }
        if (childBounds.right > right) {
          right = childBounds.right;
        }
        if (childBounds.bottom > bottom) {
          bottom = childBounds.bottom;
        }
      }
      return bounds.set(x, y, right - x, bottom - y);
    }
    destroy() {
      this.entity = null;
      this.area = null;
    }
  };

  // node_modules/@phaserjs/phaser/gameobjects/components/input/InputComponent.js
  var InputComponent = class {
    constructor(entity) {
      this.enabled = false;
      this.enabledChildren = true;
      this.entity = entity;
    }
    destroy() {
      this.entity = null;
      this.hitArea = null;
    }
  };

  // node_modules/@phaserjs/phaser/config/defaultorigin/GetDefaultOriginX.js
  function GetDefaultOriginX() {
    return ConfigStore.get(CONFIG_DEFAULTS.DEFAULT_ORIGIN).x;
  }

  // node_modules/@phaserjs/phaser/config/defaultorigin/GetDefaultOriginY.js
  function GetDefaultOriginY() {
    return ConfigStore.get(CONFIG_DEFAULTS.DEFAULT_ORIGIN).y;
  }

  // node_modules/@phaserjs/phaser/math/vec2/Vec2.js
  var Vec2 = class {
    constructor(x = 0, y = 0) {
      this.set(x, y);
    }
    set(x = 0, y = 0) {
      this.x = x;
      this.y = y;
      return this;
    }
    toArray(dst = [], index = 0) {
      const {x, y} = this;
      dst[index] = x;
      dst[index + 1] = y;
      return dst;
    }
    fromArray(src, index = 0) {
      return this.set(src[index], src[index + 1]);
    }
    toString() {
      const {x, y} = this;
      return `{ x=${x}, y=${y} }`;
    }
  };

  // node_modules/@phaserjs/phaser/gameobjects/components/transform/UpdateLocalTransform.js
  function UpdateLocalTransform(transform) {
    const local = transform.local;
    const x = transform.position.x;
    const y = transform.position.y;
    const rotation = transform.rotation;
    const scaleX = transform.scale.x;
    const scaleY = transform.scale.y;
    const skewX = transform.skew.x;
    const skewY = transform.skew.y;
    local.set(Math.cos(rotation + skewY) * scaleX, Math.sin(rotation + skewY) * scaleX, -Math.sin(rotation - skewX) * scaleY, Math.cos(rotation - skewX) * scaleY, x, y);
  }

  // node_modules/@phaserjs/phaser/math/mat2d/Mat2dCopyFrom.js
  function Mat2dCopyFrom(src, target) {
    const {a, b, c, d, tx, ty} = src;
    return target.set(a, b, c, d, tx, ty);
  }

  // node_modules/@phaserjs/phaser/gameobjects/components/transform/UpdateWorldTransform.js
  function UpdateWorldTransform(gameObject) {
    const parent = gameObject.parent;
    const transform = gameObject.transform;
    const lt = transform.local;
    const wt = transform.world;
    if (!parent) {
      Mat2dCopyFrom(lt, wt);
    } else if (transform.passthru) {
      Mat2dCopyFrom(parent.transform.world, wt);
    } else {
      const {a, b, c, d, tx, ty} = lt;
      const {a: pa, b: pb, c: pc, d: pd, tx: ptx, ty: pty} = parent.transform.world;
      wt.set(a * pa + b * pc, a * pb + b * pd, c * pa + d * pc, c * pb + d * pd, tx * pa + ty * pc + ptx, tx * pb + ty * pd + pty);
    }
  }

  // node_modules/@phaserjs/phaser/gameobjects/components/transform/TransformComponent.js
  var TransformComponent = class {
    constructor(entity, x = 0, y = 0) {
      this.passthru = false;
      this._rotation = 0;
      this.entity = entity;
      this.local = new Matrix2D();
      this.world = new Matrix2D();
      const update = () => this.update();
      const updateExtent = () => this.updateExtent();
      this.position = new Vec2Callback(update, x, y);
      this.scale = new Vec2Callback(update, 1, 1);
      this.skew = new Vec2Callback(update);
      this.origin = new Vec2Callback(updateExtent, GetDefaultOriginX(), GetDefaultOriginY());
      this.extent = new Rectangle();
    }
    update() {
      this.updateLocal();
      this.updateWorld();
    }
    updateLocal() {
      this.entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
      UpdateLocalTransform(this);
    }
    updateWorld() {
      const entity = this.entity;
      entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
      UpdateWorldTransform(entity);
      if (entity.numChildren) {
        this.updateChildren();
      }
    }
    updateChildren() {
      const children = this.entity.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        child.transform.updateWorld();
      }
    }
    globalToLocal(x, y, out = new Vec2()) {
      const {a, b, c, d, tx, ty} = this.world;
      const id = 1 / (a * d + c * -b);
      out.x = d * id * x + -c * id * y + (ty * c - tx * d) * id;
      out.y = a * id * y + -b * id * x + (-ty * a + tx * b) * id;
      return out;
    }
    localToGlobal(x, y, out = new Vec2()) {
      const {a, b, c, d, tx, ty} = this.world;
      out.x = a * x + c * y + tx;
      out.y = b * x + d * y + ty;
      return out;
    }
    setExtent(x, y, width, height) {
      this.extent.set(x, y, width, height);
      this.entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
    }
    updateExtent(width, height) {
      const extent = this.extent;
      const entity = this.entity;
      if (width !== void 0) {
        extent.width = width;
      }
      if (height !== void 0) {
        extent.height = height;
      }
      extent.x = -this.origin.x * extent.width;
      extent.y = -this.origin.y * extent.height;
      entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
    }
    set rotation(value) {
      if (value !== this._rotation) {
        this._rotation = value;
        this.update();
      }
    }
    get rotation() {
      return this._rotation;
    }
    destroy() {
      this.position.destroy();
      this.scale.destroy();
      this.skew.destroy();
      this.origin.destroy();
      this.entity = null;
      this.local = null;
      this.world = null;
      this.position = null;
      this.scale = null;
      this.skew = null;
      this.origin = null;
      this.extent = null;
    }
  };

  // node_modules/@phaserjs/phaser/renderer/webgl1/colors/PackColor.js
  function PackColor(rgb, alpha) {
    const ua = (alpha * 255 | 0) & 255;
    return (ua << 24 | rgb) >>> 0;
  }

  // node_modules/@phaserjs/phaser/gameobjects/components/Vertex.js
  var Vertex = class {
    constructor(x = 0, y = 0, z = 0) {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.u = 0;
      this.v = 0;
      this.texture = 0;
      this.tint = 16777215;
      this.alpha = 1;
      this.color = 4294967295;
      this.x = x;
      this.y = y;
      this.z = z;
    }
    setPosition(x, y, z = 0) {
      this.x = x;
      this.y = y;
      this.z = z;
      return this;
    }
    setUV(u, v) {
      this.u = u;
      this.v = v;
      return this;
    }
    setColor(color, alpha = 1) {
      this.tint = color;
      this.alpha = alpha;
      this.packColor();
      return this;
    }
    setAlpha(value) {
      this.alpha = value;
      return this;
    }
    setTint(value) {
      this.tint = value;
      return this;
    }
    packColor() {
      this.color = PackColor(this.tint, this.alpha);
    }
  };

  // node_modules/@phaserjs/phaser/renderer/webgl1/draw/BatchTexturedQuad.js
  function BatchTexturedQuad(sprite, renderPass) {
    const {F32, U32, offset} = GetVertexBufferEntry(renderPass, 1);
    const textureIndex = SetTexture(renderPass, sprite.texture);
    let vertOffset = offset;
    sprite.vertices.forEach((vertex) => {
      F32[vertOffset + 0] = vertex.x;
      F32[vertOffset + 1] = vertex.y;
      F32[vertOffset + 2] = vertex.u;
      F32[vertOffset + 3] = vertex.v;
      F32[vertOffset + 4] = textureIndex;
      U32[vertOffset + 5] = vertex.color;
      vertOffset += 6;
    });
  }

  // node_modules/@phaserjs/phaser/display/RemoveChildrenBetween.js
  function RemoveChildrenBetween(parent, beginIndex = 0, endIndex) {
    const children = parent.children;
    if (endIndex === void 0) {
      endIndex = children.length;
    }
    const range = endIndex - beginIndex;
    if (range > 0 && range <= endIndex) {
      const removed = children.splice(beginIndex, range);
      removed.forEach((child) => {
        child.parent = null;
      });
      return removed;
    } else {
      return [];
    }
  }

  // node_modules/@phaserjs/phaser/display/DestroyChildren.js
  function DestroyChildren(parent, beginIndex = 0, endIndex) {
    const removed = RemoveChildrenBetween(parent, beginIndex, endIndex);
    removed.forEach((child) => {
      child.destroy();
    });
  }

  // node_modules/@phaserjs/phaser/gameobjects/events/DestroyEvent.js
  var DestroyEvent = "destroy";

  // node_modules/@phaserjs/phaser/events/Emit.js
  function Emit(emitter, event, ...args) {
    if (emitter.events.size === 0 || !emitter.events.has(event)) {
      return false;
    }
    const listeners = emitter.events.get(event);
    for (const ee of listeners) {
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

  // node_modules/@phaserjs/phaser/events/EventEmitter.js
  var EventEmitter = class {
    constructor() {
      this.events = new Map();
    }
  };

  // node_modules/@phaserjs/phaser/events/EventInstance.js
  var EventInstance = class {
    constructor(callback, context, once = false) {
      this.callback = callback;
      this.context = context;
      this.once = once;
    }
  };

  // node_modules/@phaserjs/phaser/events/Off.js
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

  // node_modules/@phaserjs/phaser/events/On.js
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

  // node_modules/@phaserjs/phaser/events/Once.js
  function Once(emitter, event, callback, context = emitter) {
    return On(emitter, event, callback, context, true);
  }

  // node_modules/@phaserjs/phaser/display/DepthFirstSearch.js
  function DepthFirstSearch(parent) {
    const stack = [parent];
    const output = [];
    while (stack.length > 0) {
      const node = stack.shift();
      output.push(node);
      const numChildren = node.numChildren;
      if (numChildren > 0) {
        for (let i = numChildren - 1; i >= 0; i--) {
          stack.unshift(node.children[i]);
        }
      }
    }
    output.shift();
    return output;
  }

  // node_modules/@phaserjs/phaser/display/GetChildIndex.js
  function GetChildIndex(parent, child) {
    return parent.children.indexOf(child);
  }

  // node_modules/@phaserjs/phaser/display/RemoveChildAt.js
  function RemoveChildAt(parent, index) {
    const children = parent.children;
    let child;
    if (index >= 0 && index < children.length) {
      const removed = children.splice(index, 1);
      if (removed[0]) {
        child = removed[0];
        child.parent = null;
      }
    }
    return child;
  }

  // node_modules/@phaserjs/phaser/display/RemoveChild.js
  function RemoveChild(parent, child) {
    const currentIndex = GetChildIndex(parent, child);
    if (currentIndex > -1) {
      RemoveChildAt(parent, currentIndex);
    }
    return child;
  }

  // node_modules/@phaserjs/phaser/gameobjects/events/AddedToWorldEvent.js
  var AddedToWorldEvent = "addedtoworld";

  // node_modules/@phaserjs/phaser/gameobjects/events/PostUpdateEvent.js
  var PostUpdateEvent = "postupdate";

  // node_modules/@phaserjs/phaser/gameobjects/events/RemovedFromWorldEvent.js
  var RemovedFromWorldEvent = "removedfromworld";

  // node_modules/@phaserjs/phaser/gameobjects/events/UpdateEvent.js
  var UpdateEvent = "update";

  // node_modules/@phaserjs/phaser/display/SetWorld.js
  function SetWorld(world, ...children) {
    children.forEach((child) => {
      if (child.world) {
        Emit(child.world, RemovedFromWorldEvent, child, child.world);
        Emit(child, RemovedFromWorldEvent, child, child.world);
      }
      child.world = world;
      Emit(world, AddedToWorldEvent, child, world);
      Emit(child, AddedToWorldEvent, child, world);
    });
    return children;
  }

  // node_modules/@phaserjs/phaser/display/SetParent.js
  function SetParent2(parent, ...children) {
    children.forEach((child) => {
      if (child.parent) {
        RemoveChild(child.parent, child);
      }
      child.parent = parent;
    });
    const parentWorld = parent.world;
    if (parentWorld) {
      SetWorld(parentWorld, ...DepthFirstSearch(parent));
    }
    return children;
  }

  // node_modules/@phaserjs/phaser/display/ReparentChildren.js
  function ReparentChildren(parent, newParent, beginIndex = 0, endIndex) {
    const moved = RemoveChildrenBetween(parent, beginIndex, endIndex);
    SetParent2(newParent, ...moved);
    moved.forEach((child) => {
      child.transform.updateWorld();
    });
    return moved;
  }

  // node_modules/@phaserjs/phaser/gameobjects/GameObject.js
  var GameObject = class {
    constructor(x = 0, y = 0) {
      this.type = "GameObject";
      this.name = "";
      this.willUpdate = true;
      this.willUpdateChildren = true;
      this.willRender = true;
      this.willRenderChildren = true;
      this.willCacheChildren = false;
      this.dirty = 0;
      this.dirtyFrame = 0;
      this.visible = true;
      this.children = [];
      this.events = new Map();
      this.transform = new TransformComponent(this, x, y);
      this.bounds = new BoundsComponent(this);
      this.input = new InputComponent(this);
      this.dirty = DIRTY_CONST.DEFAULT;
      this.transform.update();
    }
    isRenderable() {
      return this.visible && this.willRender;
    }
    isDirty(flag) {
      return (this.dirty & flag) !== 0;
    }
    clearDirty(flag) {
      if (this.isDirty(flag)) {
        this.dirty ^= flag;
      }
      return this;
    }
    setDirty(flag, flag2) {
      if (!this.isDirty(flag)) {
        this.dirty ^= flag;
        this.dirtyFrame = GameInstance.getFrame();
      }
      if (!this.isDirty(flag2)) {
        this.dirty ^= flag2;
      }
      return this;
    }
    update(delta, time) {
      if (this.willUpdateChildren) {
        const children = this.children;
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (child && child.willUpdate) {
            child.update(delta, time);
          }
        }
      }
      this.postUpdate(delta, time);
    }
    postUpdate(delta, time) {
    }
    renderGL(renderPass) {
    }
    renderCanvas(renderer) {
    }
    postRenderGL(renderPass) {
    }
    postRenderCanvas(renderer) {
    }
    get numChildren() {
      return this.children.length;
    }
    destroy(reparentChildren) {
      if (reparentChildren) {
        ReparentChildren(this, reparentChildren);
      } else {
        DestroyChildren(this);
      }
      Emit(this, DestroyEvent, this);
      this.transform.destroy();
      this.bounds.destroy();
      this.input.destroy();
      this.events.clear();
      this.world = null;
      this.parent = null;
      this.children = null;
    }
  };

  // node_modules/@phaserjs/phaser/gameobjects/container/Container.js
  var Container = class extends GameObject {
    constructor(x = 0, y = 0) {
      super(x, y);
      this._alpha = 1;
      this.type = "Container";
    }
    setSize(width, height = width) {
      this.transform.updateExtent(width, height);
      return this;
    }
    setPosition(x, y) {
      this.transform.position.set(x, y);
      return this;
    }
    setOrigin(x, y = x) {
      this.transform.origin.set(x, y);
      return this;
    }
    setSkew(x, y = x) {
      this.transform.skew.set(x, y);
      return this;
    }
    setScale(x, y = x) {
      this.transform.scale.set(x, y);
      return this;
    }
    setRotation(value) {
      this.transform.rotation = value;
      return this;
    }
    set width(value) {
      this.transform.updateExtent(value);
    }
    get width() {
      return this.transform.extent.width;
    }
    set height(value) {
      this.transform.updateExtent(void 0, value);
    }
    get height() {
      return this.transform.extent.height;
    }
    set x(value) {
      this.transform.position.x = value;
    }
    get x() {
      return this.transform.position.x;
    }
    set y(value) {
      this.transform.position.y = value;
    }
    get y() {
      return this.transform.position.y;
    }
    set originX(value) {
      this.transform.origin.x = value;
    }
    get originX() {
      return this.transform.origin.x;
    }
    set originY(value) {
      this.transform.origin.y = value;
    }
    get originY() {
      return this.transform.origin.y;
    }
    set skewX(value) {
      this.transform.skew.x = value;
    }
    get skewX() {
      return this.transform.skew.x;
    }
    set skewY(value) {
      this.transform.skew.y = value;
    }
    get skewY() {
      return this.transform.skew.y;
    }
    set scaleX(value) {
      this.transform.scale.x = value;
    }
    get scaleX() {
      return this.transform.scale.x;
    }
    set scaleY(value) {
      this.transform.scale.y = value;
    }
    get scaleY() {
      return this.transform.scale.y;
    }
    set rotation(value) {
      this.transform.rotation = value;
    }
    get rotation() {
      return this.transform.rotation;
    }
    get alpha() {
      return this._alpha;
    }
    set alpha(value) {
      if (value !== this._alpha) {
        this._alpha = value;
        this.setDirty(DIRTY_CONST.TRANSFORM);
      }
    }
  };

  // node_modules/@phaserjs/phaser/renderer/canvas/draw/DrawTexturedQuad.js
  function DrawTexturedQuad(sprite, renderer) {
    const frame2 = sprite.frame;
    if (!frame2) {
      return;
    }
    const ctx = renderer.ctx;
    const transform = sprite.transform;
    const {a, b, c, d, tx, ty} = transform.world;
    const {x, y} = transform.extent;
    ctx.save();
    ctx.setTransform(a, b, c, d, tx, ty);
    ctx.globalAlpha = sprite.alpha;
    ctx.drawImage(frame2.texture.image, frame2.x, frame2.y, frame2.width, frame2.height, x, y, frame2.width, frame2.height);
    ctx.restore();
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/colors/PackColors.js
  function PackColors(sprite) {
    sprite.vertices.forEach((vertex) => {
      vertex.packColor();
    });
    return sprite;
  }

  // node_modules/@phaserjs/phaser/gameobjects/sprite/SetFrame.js
  function SetFrame(texture, key, ...children) {
    const frame2 = texture.getFrame(key);
    const {u0, u1, v0, v1, pivot} = frame2;
    children.forEach((child) => {
      if (!child || frame2 === child.frame) {
        return;
      }
      child.frame = frame2;
      if (pivot) {
        child.setOrigin(pivot.x, pivot.y);
      }
      child.frame.setExtent(child);
      child.hasTexture = true;
      const vertices = child.vertices;
      vertices[0].setUV(u0, v0);
      vertices[1].setUV(u0, v1);
      vertices[2].setUV(u1, v1);
      vertices[3].setUV(u1, v0);
    });
    return children;
  }

  // node_modules/@phaserjs/phaser/textures/TextureManagerInstance.js
  var instance3;
  var TextureManagerInstance = {
    get: () => {
      return instance3;
    },
    set: (manager) => {
      instance3 = manager;
    }
  };

  // node_modules/@phaserjs/phaser/gameobjects/sprite/SetTexture.js
  function SetTexture2(key, frame2, ...children) {
    if (!key) {
      children.forEach((child) => {
        child.texture = null;
        child.frame = null;
        child.hasTexture = false;
      });
    } else {
      let texture;
      if (key instanceof Texture) {
        texture = key;
      } else {
        texture = TextureManagerInstance.get().get(key);
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

  // node_modules/@phaserjs/phaser/gameobjects/sprite/UpdateVertices.js
  function UpdateVertices(sprite) {
    const vertices = sprite.vertices;
    const {x0, y0, x1, y1, x2, y2, x3, y3} = GetVertices(sprite.transform);
    vertices[0].setPosition(x0, y0);
    vertices[1].setPosition(x1, y1);
    vertices[2].setPosition(x2, y2);
    vertices[3].setPosition(x3, y3);
    return sprite;
  }

  // node_modules/@phaserjs/phaser/gameobjects/sprite/Sprite.js
  var Sprite = class extends Container {
    constructor(x, y, texture, frame2) {
      super(x, y);
      this.hasTexture = false;
      this._tint = 16777215;
      this.type = "Sprite";
      this.vertices = [new Vertex(), new Vertex(), new Vertex(), new Vertex()];
      this.setTexture(texture, frame2);
    }
    setTexture(key, frame2) {
      SetTexture2(key, frame2, this);
      return this;
    }
    setFrame(key) {
      SetFrame(this.texture, key, this);
      return this;
    }
    isRenderable() {
      return this.visible && this.willRender && this.hasTexture && this.alpha > 0;
    }
    preRender() {
      if (this.isDirty(DIRTY_CONST.COLORS)) {
        PackColors(this);
        this.clearDirty(DIRTY_CONST.COLORS);
      }
      if (this.isDirty(DIRTY_CONST.TRANSFORM)) {
        UpdateVertices(this);
        this.clearDirty(DIRTY_CONST.TRANSFORM);
      }
    }
    renderGL(renderPass) {
      this.preRender();
      BatchTexturedQuad(this, renderPass);
    }
    renderCanvas(renderer) {
      this.preRender();
      DrawTexturedQuad(this, renderer);
    }
    get alpha() {
      return this._alpha;
    }
    set alpha(value) {
      if (value !== this._alpha) {
        this._alpha = value;
        this.vertices.forEach((vertex) => {
          vertex.setAlpha(value);
        });
        this.setDirty(DIRTY_CONST.COLORS);
      }
    }
    get tint() {
      return this._tint;
    }
    set tint(value) {
      if (value !== this._tint) {
        this._tint = value;
        this.vertices.forEach((vertex) => {
          vertex.setTint(value);
        });
        this.setDirty(DIRTY_CONST.COLORS);
      }
    }
    destroy(reparentChildren) {
      super.destroy(reparentChildren);
      this.texture = null;
      this.frame = null;
      this.hasTexture = false;
      this.vertices = [];
    }
  };

  // node_modules/@phaserjs/phaser/renderer/webgl1/draw/BatchSingleQuad.js
  function BatchSingleQuad(renderPass, x, y, width, height, u0, v0, u1, v1, textureIndex = 0, packedColor = 4294967295) {
    const {F32, U32, offset} = GetVertexBufferEntry(renderPass, 1);
    F32[offset + 0] = x;
    F32[offset + 1] = y;
    F32[offset + 2] = u0;
    F32[offset + 3] = v1;
    F32[offset + 4] = textureIndex;
    U32[offset + 5] = packedColor;
    F32[offset + 6] = x;
    F32[offset + 7] = y + height;
    F32[offset + 8] = u0;
    F32[offset + 9] = v0;
    F32[offset + 10] = textureIndex;
    U32[offset + 11] = packedColor;
    F32[offset + 12] = x + width;
    F32[offset + 13] = y + height;
    F32[offset + 14] = u1;
    F32[offset + 15] = v0;
    F32[offset + 16] = textureIndex;
    U32[offset + 17] = packedColor;
    F32[offset + 18] = x + width;
    F32[offset + 19] = y;
    F32[offset + 20] = u1;
    F32[offset + 21] = v1;
    F32[offset + 22] = textureIndex;
    U32[offset + 23] = packedColor;
  }

  // node_modules/@phaserjs/phaser/renderer/webgl1/draw/DrawTexturedQuad.js
  function DrawTexturedQuad2(renderPass, texture, shader) {
    if (!shader) {
      shader = renderPass.quadShader;
    }
    const {u0, v0, u1, v1} = texture.firstFrame;
    BindTexture(texture, 0);
    SetVertexBuffer(renderPass, renderPass.quadBuffer);
    SetShader(renderPass, shader, 0);
    BatchSingleQuad(renderPass, 0, 0, texture.width, texture.height, u0, v0, u1, v1, 0);
    Flush(renderPass);
    PopVertexBuffer(renderPass);
    PopShader(renderPass);
    UnbindTexture(renderPass);
  }

  // node_modules/@phaserjs/phaser/gameobjects/layer/Layer.js
  var Layer = class extends GameObject {
    constructor() {
      super();
      this.type = "Layer";
      this.transform.passthru = true;
      this.willRender = false;
    }
  };

  // node_modules/@phaserjs/phaser/gameobjects/renderlayer/RenderLayer.js
  var RenderLayer = class extends Layer {
    constructor() {
      super();
      this.type = "RenderLayer";
      this.willRender = true;
      this.willRenderChildren = true;
      this.willCacheChildren = true;
      this.setDirty(DIRTY_CONST.CHILD_CACHE);
      const width = GetWidth();
      const height = GetHeight();
      const resolution = GetResolution();
      const texture = new Texture(null, width * resolution, height * resolution);
      const binding = new GLTextureBinding(texture);
      texture.binding = binding;
      binding.framebuffer = CreateFramebuffer(binding.texture);
      this.texture = texture;
      this.framebuffer = binding.framebuffer;
    }
    renderGL(renderPass) {
      if (this.numChildren > 0) {
        Flush(renderPass);
        if (!this.willCacheChildren || this.isDirty(DIRTY_CONST.CHILD_CACHE)) {
          SetFramebuffer(renderPass, this.framebuffer, true);
          this.clearDirty(DIRTY_CONST.CHILD_CACHE);
        } else {
          SetFramebuffer(renderPass, this.framebuffer, false);
          this.postRenderGL(renderPass);
        }
      }
    }
    postRenderGL(renderPass) {
      Flush(renderPass);
      PopFramebuffer(renderPass);
      DrawTexturedQuad2(renderPass, this.texture);
      this.clearDirty(DIRTY_CONST.TRANSFORM);
    }
  };

  // node_modules/@phaserjs/phaser/gameobjects/effectlayer/EffectLayer.js
  var EffectLayer = class extends RenderLayer {
    constructor(...shaders) {
      super();
      this.shaders = [];
      this.type = "EffectLayer";
      if (Array.isArray(shaders)) {
        this.shaders = shaders;
      }
    }
    postRenderGL(renderPass) {
      const shaders = this.shaders;
      const texture = this.texture;
      Flush(renderPass);
      PopFramebuffer(renderPass);
      if (shaders.length === 0) {
        DrawTexturedQuad2(renderPass, texture);
      } else {
        let prevTexture = texture;
        for (let i = 0; i < shaders.length; i++) {
          const shader = shaders[i];
          DrawTexturedQuad2(renderPass, prevTexture, shader);
          prevTexture = shader.texture;
        }
        DrawTexturedQuad2(renderPass, prevTexture);
      }
      this.clearDirty(DIRTY_CONST.TRANSFORM);
    }
  };

  // node_modules/@phaserjs/phaser/textures/CreateCanvas.js
  function CreateCanvas(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext("2d");
  }

  // node_modules/@phaserjs/phaser/display/AddChild.js
  function AddChild(parent, child) {
    parent.children.push(child);
    SetParent2(parent, child);
    child.transform.updateWorld();
    return child;
  }

  // node_modules/@phaserjs/phaser/display/AddChildren.js
  function AddChildren(parent, ...children) {
    children.forEach((child) => {
      AddChild(parent, child);
    });
    return children;
  }

  // node_modules/@phaserjs/phaser/display/RemoveChildren.js
  function RemoveChildren(parent, ...children) {
    children.forEach((child) => {
      RemoveChild(parent, child);
    });
    return children;
  }

  // node_modules/@phaserjs/phaser/dom/AddToDOM.js
  function AddToDOM(element, parent) {
    const target = GetElement(parent);
    target.appendChild(element);
    return element;
  }

  // node_modules/@phaserjs/phaser/dom/DOMContentLoaded.js
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

  // node_modules/@phaserjs/phaser/config/banner/GetBanner.js
  function GetBanner() {
    const {title, version, url, color, background} = ConfigStore.get(CONFIG_DEFAULTS.BANNER);
    if (title !== "") {
      const str = version !== "" ? title + " " + version : title;
      console.log(`%c${str}%c ${url}`, `padding: 4px 16px; color: ${color}; background: ${background}`, "");
    }
  }

  // node_modules/@phaserjs/phaser/config/parent/GetParent.js
  function GetParent() {
    return ConfigStore.get(CONFIG_DEFAULTS.PARENT);
  }

  // node_modules/@phaserjs/phaser/config/renderer/GetRenderer.js
  function GetRenderer() {
    return ConfigStore.get(CONFIG_DEFAULTS.RENDERER);
  }

  // node_modules/@phaserjs/phaser/scenes/CreateSceneRenderData.js
  function CreateSceneRenderData() {
    return {
      gameFrame: 0,
      numTotalFrames: 0,
      numDirtyFrames: 0,
      numDirtyCameras: 0,
      worldData: []
    };
  }

  // node_modules/@phaserjs/phaser/config/scenes/GetScenes.js
  function GetScenes() {
    return ConfigStore.get(CONFIG_DEFAULTS.SCENES);
  }

  // node_modules/@phaserjs/phaser/scenes/ResetSceneRenderData.js
  function ResetSceneRenderData(renderData, gameFrame = 0) {
    renderData.gameFrame = gameFrame;
    renderData.numTotalFrames = 0;
    renderData.numDirtyFrames = 0;
    renderData.numDirtyCameras = 0;
    renderData.worldData.length = 0;
  }

  // node_modules/@phaserjs/phaser/scenes/SceneManagerInstance.js
  var instance4;
  var SceneManagerInstance = {
    get: () => {
      return instance4;
    },
    set: (manager) => {
      instance4 = manager;
    }
  };

  // node_modules/@phaserjs/phaser/scenes/SceneManager.js
  var SceneManager = class {
    constructor() {
      this.scenes = new Map();
      this.sceneIndex = 0;
      this.flush = false;
      this.renderResult = CreateSceneRenderData();
      this.game = GameInstance.get();
      SceneManagerInstance.set(this);
      Once(this.game, "boot", () => this.boot());
    }
    boot() {
      GetScenes().forEach((scene) => new scene());
    }
    update(delta, time) {
      for (const scene of this.scenes.values()) {
        Emit(scene, "update", delta, time);
      }
    }
    render(gameFrame) {
      const results = this.renderResult;
      ResetSceneRenderData(results, gameFrame);
      for (const scene of this.scenes.values()) {
        Emit(scene, "render", results);
      }
      if (this.flush) {
        results.numDirtyFrames++;
        this.flush = false;
      }
      return results;
    }
  };

  // node_modules/@phaserjs/phaser/config/SetConfigDefaults.js
  function SetConfigDefaults() {
    SetBackgroundColor(0);
    SetBatchSize(4096);
    SetBanner("Phaser", "4.0.0", "https://phaser4.io");
    SetMaxTextures(0);
    SetDefaultOrigin(0.5, 0.5);
    SetSize(800, 600, 1);
  }

  // node_modules/@phaserjs/phaser/textures/TextureManager.js
  var TextureManager = class {
    constructor() {
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

  // node_modules/@phaserjs/phaser/Game.js
  var Game = class extends EventEmitter {
    constructor(...settings) {
      super();
      this.VERSION = "4.0.0-beta1";
      this.isBooted = false;
      this.isPaused = false;
      this.willUpdate = true;
      this.willRender = true;
      this.lastTick = 0;
      this.elapsed = 0;
      this.frame = 0;
      GameInstance.set(this);
      SetConfigDefaults();
      DOMContentLoaded(() => this.boot(settings));
    }
    boot(settings) {
      settings.forEach((setting) => setting());
      const renderer = GetRenderer();
      this.renderer = new renderer();
      this.textureManager = new TextureManager();
      this.sceneManager = new SceneManager();
      const parent = GetParent();
      if (parent) {
        AddToDOM(this.renderer.canvas, parent);
      }
      this.isBooted = true;
      GetBanner();
      Emit(this, "boot");
      this.lastTick = performance.now();
      this.step(this.lastTick);
    }
    pause() {
      this.isPaused = true;
    }
    resume() {
      this.isPaused = false;
      this.lastTick = performance.now();
    }
    step(time) {
      const delta = time - this.lastTick;
      this.lastTick = time;
      this.elapsed += delta;
      if (!this.isPaused) {
        if (this.willUpdate) {
          this.sceneManager.update(delta, time);
          Emit(this, "update", delta, time);
        }
        if (this.willRender) {
          this.renderer.render(this.sceneManager.render(this.frame));
        }
      }
      this.frame++;
      GameInstance.setFrame(this.frame);
      GameInstance.setElapsed(this.elapsed);
      requestAnimationFrame((now) => this.step(now));
    }
    destroy() {
    }
  };

  // node_modules/@phaserjs/phaser/loader/File.js
  var File = class {
    constructor(key, url, config) {
      this.responseType = "text";
      this.crossOrigin = void 0;
      this.skipCache = false;
      this.hasLoaded = false;
      this.key = key;
      this.url = url;
      this.config = config;
    }
  };

  // node_modules/@phaserjs/phaser/loader/GetURL.js
  function GetURL(key, url, extension, loader) {
    if (!url) {
      url = key + extension;
    }
    if (/^(?:blob:|data:|http:\/\/|https:\/\/|\/\/)/.exec(url)) {
      return url;
    } else if (loader) {
      return loader.baseURL + loader.path + url;
    } else {
      return url;
    }
  }

  // node_modules/@phaserjs/phaser/loader/ImageTagLoader.js
  function ImageTagLoader(file) {
    file.data = new Image();
    if (file.crossOrigin) {
      file.data.crossOrigin = file.crossOrigin;
    }
    return new Promise((resolve, reject) => {
      file.data.onload = () => {
        if (file.data.onload) {
          file.data.onload = null;
          file.data.onerror = null;
          resolve(file);
        }
      };
      file.data.onerror = (event) => {
        if (file.data.onload) {
          file.data.onload = null;
          file.data.onerror = null;
          file.error = event;
          reject(file);
        }
      };
      file.data.src = file.url;
      if (file.data.complete && file.data.width && file.data.height) {
        file.data.onload = null;
        file.data.onerror = null;
        resolve(file);
      }
    });
  }

  // node_modules/@phaserjs/phaser/loader/files/ImageFile.js
  function ImageFile(key, url, glConfig) {
    const file = new File(key, url);
    file.load = () => {
      file.url = GetURL(file.key, file.url, ".png", file.loader);
      if (file.loader) {
        file.crossOrigin = file.loader.crossOrigin;
      }
      return new Promise((resolve, reject) => {
        const textureManager = TextureManagerInstance.get();
        if (textureManager.has(file.key)) {
          resolve(file);
        } else {
          ImageTagLoader(file).then((file2) => {
            textureManager.add(file2.key, file2.data, glConfig);
            resolve(file2);
          }).catch((file2) => {
            reject(file2);
          });
        }
      });
    };
    return file;
  }

  // node_modules/@phaserjs/phaser/loader/Loader.js
  var Loader = class extends EventEmitter {
    constructor() {
      super();
      this.baseURL = "";
      this.path = "";
      this.crossOrigin = "anonymous";
      this.maxParallelDownloads = -1;
      this.isLoading = false;
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
        entity.loader = this;
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
          const file = iterator.next().value;
          this.inflight.add(file);
          this.queue.delete(file);
          file.load().then((file2) => this.fileComplete(file2)).catch((file2) => this.fileError(file2));
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
    updateProgress(file) {
      this.inflight.delete(file);
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
      this.updateProgress(file);
    }
    fileError(file) {
      Emit(this, "fileerror", file);
      this.updateProgress(file);
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

  // node_modules/@phaserjs/phaser/scenes/GetConfigValue.js
  function GetConfigValue(config, property, defaultValue) {
    if (Object.prototype.hasOwnProperty.call(config, property)) {
      return config[property];
    } else {
      return defaultValue;
    }
  }

  // node_modules/@phaserjs/phaser/scenes/Install.js
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
  }

  // node_modules/@phaserjs/phaser/scenes/Scene.js
  var Scene = class {
    constructor(config) {
      this.game = GameInstance.get();
      this.events = new Map();
      Install(this, config);
    }
  };

  // node_modules/@phaserjs/phaser/world/events/WorldRenderEvent.js
  var WorldRenderEvent = "worldrender";

  // node_modules/@phaserjs/phaser/world/events/WorldShutdownEvent.js
  var WorldShutdownEvent = "worldshutdown";

  // node_modules/@phaserjs/phaser/world/CalculateTotalRenderable.js
  function CalculateTotalRenderable(entry, renderData) {
    renderData.numRendered++;
    renderData.numRenderable++;
    if (entry.node.dirtyFrame >= renderData.gameFrame) {
      renderData.dirtyFrame++;
    }
    entry.children.forEach((child) => {
      if (child.children.length > 0) {
        CalculateTotalRenderable(child, renderData);
      }
    });
  }

  // node_modules/@phaserjs/phaser/world/HasDirtyChildren.js
  function HasDirtyChildren(parent) {
    if (parent.node.isDirty(DIRTY_CONST.CHILD_CACHE)) {
      return true;
    }
    const stack = [parent];
    while (stack.length > 0) {
      const entry = stack.pop();
      if (entry.node.isDirty(DIRTY_CONST.TRANSFORM)) {
        return true;
      }
      const numChildren = entry.children.length;
      if (numChildren > 0) {
        for (let i = 0; i < numChildren; i++) {
          stack.push(entry.children[i]);
        }
      }
    }
    stack.length = 0;
    return false;
  }

  // node_modules/@phaserjs/phaser/world/UpdateCachedLayers.js
  function UpdateCachedLayers(cachedLayers, dirtyCamera) {
    cachedLayers.forEach((layer) => {
      if (dirtyCamera || HasDirtyChildren(layer)) {
        layer.node.setDirty(DIRTY_CONST.CHILD_CACHE);
      } else {
        layer.children.length = 0;
      }
    });
  }

  // node_modules/@phaserjs/phaser/world/WorldDepthFirstSearch.js
  function WorldDepthFirstSearch(cachedLayers, parent, output = []) {
    for (let i = 0; i < parent.numChildren; i++) {
      const node = parent.children[i];
      if (node.isRenderable()) {
        const children = [];
        const entry = {node, children};
        output.push(entry);
        if (node.willRenderChildren && node.numChildren > 0) {
          if (node.willCacheChildren) {
            cachedLayers.push(entry);
          }
          WorldDepthFirstSearch(cachedLayers, node, children);
        }
      }
    }
    return output;
  }

  // node_modules/@phaserjs/phaser/world/BuildRenderList.js
  function BuildRenderList(world) {
    const cachedLayers = [];
    const stack = [];
    const entries = WorldDepthFirstSearch(cachedLayers, world, stack);
    const renderData = world.renderData;
    if (cachedLayers.length > 0) {
      UpdateCachedLayers(cachedLayers, world.camera.dirtyRender);
    }
    entries.forEach((entry) => {
      if (entry.children.length > 0) {
        CalculateTotalRenderable(entry, renderData);
      } else {
        renderData.numRendered++;
        renderData.numRenderable++;
        if (entry.node.dirtyFrame >= renderData.gameFrame) {
          renderData.dirtyFrame++;
        }
      }
    });
    world.renderList = entries;
    if (world.forceRefresh) {
      renderData.dirtyFrame++;
      world.forceRefresh = false;
    }
  }

  // node_modules/@phaserjs/phaser/math/mat2d/Mat2dEquals.js
  function Mat2dEquals(a, b) {
    return a.a === b.a && a.b === b.b && a.c === b.c && a.d === b.d && a.tx === b.tx && a.ty === b.ty;
  }

  // node_modules/@phaserjs/phaser/world/MergeRenderData.js
  function MergeRenderData(sceneRenderData, worldRenderData) {
    sceneRenderData.numDirtyFrames += worldRenderData.dirtyFrame;
    sceneRenderData.numTotalFrames += worldRenderData.numRendered;
    if (worldRenderData.camera.dirtyRender) {
      sceneRenderData.numDirtyCameras++;
    }
    sceneRenderData.worldData.push(worldRenderData);
  }

  // node_modules/@phaserjs/phaser/world/ResetWorldRenderData.js
  function ResetWorldRenderData(renderData, gameFrame) {
    renderData.gameFrame = gameFrame;
    renderData.dirtyFrame = 0;
    renderData.numRendered = 0;
    renderData.numRenderable = 0;
  }

  // node_modules/@phaserjs/phaser/world/BaseWorld.js
  var BaseWorld = class extends GameObject {
    constructor(scene) {
      super();
      this.forceRefresh = false;
      this.is3D = false;
      this.type = "BaseWorld";
      this.scene = scene;
      this.world = this;
      this.events = new Map();
      this.renderList = [];
      this._updateListener = On(scene, "update", (delta, time) => this.update(delta, time));
      this._renderListener = On(scene, "render", (renderData) => this.render(renderData));
      this._shutdownListener = On(scene, "shutdown", () => this.shutdown());
      Once(scene, "destroy", () => this.destroy());
    }
    update(delta, time) {
      if (!this.willUpdate) {
        return;
      }
      Emit(this, UpdateEvent, delta, time, this);
      super.update(delta, time);
    }
    postUpdate(delta, time) {
      Emit(this, PostUpdateEvent, delta, time, this);
    }
    render(sceneRenderData) {
      const renderData = this.renderData;
      ResetWorldRenderData(renderData, sceneRenderData.gameFrame);
      if (!this.willRender || !this.visible) {
        return;
      }
      BuildRenderList(this);
      Emit(this, WorldRenderEvent, renderData, this);
      MergeRenderData(sceneRenderData, renderData);
      this.camera.dirtyRender = false;
    }
    renderGL(renderPass) {
      const currentCamera = renderPass.current2DCamera;
      const camera = this.camera;
      if (!currentCamera || !Mat2dEquals(camera.worldTransform, currentCamera.worldTransform)) {
        Flush(renderPass);
      }
      Begin(renderPass, camera);
      this.renderList.forEach((entry) => {
        if (entry.children.length > 0) {
          this.renderNode(entry, renderPass);
        } else {
          entry.node.renderGL(renderPass);
        }
      });
    }
    renderNode(entry, renderPass) {
      entry.node.renderGL(renderPass);
      entry.children.forEach((child) => {
        if (child.children.length > 0) {
          this.renderNode(child, renderPass);
        } else {
          child.node.renderGL(renderPass);
        }
      });
      entry.node.postRenderGL(renderPass);
    }
    postRenderGL(renderPass) {
    }
    shutdown() {
      const scene = this.scene;
      Off(scene, "update", this._updateListener);
      Off(scene, "render", this._renderListener);
      Off(scene, "shutdown", this._shutdownListener);
      RemoveChildren(this);
      Emit(this, WorldShutdownEvent, this);
      ResetWorldRenderData(this.renderData, 0);
      if (this.camera) {
        this.camera.reset();
      }
    }
    destroy(reparentChildren) {
      super.destroy(reparentChildren);
      Emit(this, DestroyEvent, this);
      ResetWorldRenderData(this.renderData, 0);
      if (this.camera) {
        this.camera.destroy();
      }
      this.events.clear();
      this.camera = null;
      this.renderData = null;
      this.events = null;
    }
  };

  // node_modules/@phaserjs/phaser/world/CreateWorldRenderData.js
  function CreateWorldRenderData(world, camera) {
    return {
      world,
      camera,
      gameFrame: 0,
      dirtyFrame: 0,
      numRendered: 0,
      numRenderable: 0
    };
  }

  // node_modules/@phaserjs/phaser/world/StaticWorld.js
  var StaticWorld = class extends BaseWorld {
    constructor(scene) {
      super(scene);
      this.type = "StaticWorld";
      this.camera = new StaticCamera();
      this.renderData = CreateWorldRenderData(this, this.camera);
    }
  };

  // src/layer/effect layer.ts
  var cloudsFragmentShader = `
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
  var verticalBarsFragmentShader = `
#define SHADER_NAME BARS_FRAG

precision mediump float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uResolution;

#define PI 0.01

void main (void)
{
    vec4 color = texture2D(uTexture, vTextureCoord);

    vec2 p = (gl_FragCoord.xy / uResolution.xy) - 0.5;

    float sx = 0.4 * sin(25.0 * p.y - (uTime * 0.001) * 2.0);

    float dy = 2.0 / (5.0 * abs(p.y - sx));

    gl_FragColor = color * vec4((p.x + 0.5) * dy, 0.5 * dy, dy - 1.65, 0.5);
}`;
  var vduNoiseFragmentShader = `
precision mediump float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uResolution;

float noise(vec2 pos) {
    return fract(sin(dot(pos, vec2(12.9898 - (uTime * 0.001) ,78.233 + (uTime * 0.001)))) * 43758.5453);
}

void main (void)
{
    vec2 normalPos = gl_FragCoord.xy / uResolution.xy;
    float pos = (gl_FragCoord.y / uResolution.y);
    //float mouse_dist = length(vec2((mouse.x - normalPos.x) * (uResolution.x / uResolution.y) , mouse.y - normalPos.y));
    float mouse_dist = 1.0;
    float distortion = clamp(1.0 - (mouse_dist + 0.1) * 3.0, 0.0, 1.0);

    pos -= (distortion * distortion) * 0.1;

    float c = sin(pos * 400.0) * 0.4 + 0.4;
    c = pow(c, 0.2);
    c *= 0.2;

    float band_pos = fract(uTime * 0.0001) * 3.0 - 1.0;
    c += clamp( (1.0 - abs(band_pos - pos) * 10.0), 0.0, 1.0) * 0.1;

    c += distortion * 0.08;
    // noise
    c += (noise(gl_FragCoord.xy) - 0.5) * (0.09);

    vec4 color = texture2D(uTexture, vTextureCoord);

    gl_FragColor = color + vec4( 0.0, c, 0.0, 1.0 );

}`;
  var underwaterFragmentShader = `
precision mediump float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uResolution;

#define MAX_ITER 4

void main (void)
{
    vec2 v_texCoord = gl_FragCoord.xy / uResolution;

    vec2 p =  v_texCoord * 8.0 - vec2(20.0);
    vec2 i = p;
    float c = 1.0;
    float inten = .05;

    for (int n = 0; n < MAX_ITER; n++)
    {
        float t = (uTime * 0.0001) * (1.0 - (3.0 / float(n+1)));

        i = p + vec2(cos(t - i.x) + sin(t + i.y),
        sin(t - i.y) + cos(t + i.x));

        c += 1.0/length(vec2(p.x / (sin(i.x+t)/inten),
        p.y / (cos(i.y+t)/inten)));
    }

    c /= float(MAX_ITER);
    c = 1.5 - sqrt(c);

    vec4 texColor = vec4(0.0, 0.01, 0.015, 1.0);

    texColor.rgb *= (1.0 / (1.0 - (c + 0.05)));

    gl_FragColor = texture2D(uTexture, vTextureCoord) * texColor;
}`;
  var sineWaveFragmentShader2 = `
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
    uv.y += (sin((uv.x + (uTime * 0.0005)) * 10.0) * 0.1) + (sin((uv.x + (uTime * 0.0002)) * 32.0) * 0.01);
    gl_FragColor = texture2D(uTexture, uv);
}`;
  var sineWaveFragmentShader = `
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
  var pixelateFragmentShader = `
precision mediump float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uResolution;

void main (void)
{
    vec2 pixelSize = vec2(4.0, 4.0);
    vec2 size = uResolution.xy / pixelSize;
    vec2 color = floor((vTextureCoord * size)) / size + pixelSize / uResolution.xy * 0.5;

    gl_FragColor = texture2D(uTexture, color);
}`;
  var plasmaFragmentShader = `
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
  var lazerBeamFragmentShader = `
precision highp float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uResolution;

void main (void)
{
    vec4 color = texture2D(uTexture, vTextureCoord);

    vec2 p = (gl_FragCoord.yx / uResolution.yx) - 0.5;

    float sx = 0.3 * (p.x + 0.8) * sin(900.0 * p.x - 1.0 * pow(uTime / 1000.0, 0.55) * 5.0);
    float dy = 4.0 / (500.0 * abs(p.y - sx));

    dy += 1.0 / (25.0 * length(p - vec2(p.x, 0.0)));

    gl_FragColor = color * vec4((p.x + 0.1) * dy, 0.3 * dy, dy, 1.1);
}`;
  var redFragmentShader = `
precision highp float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;

void main (void)
{
    vec4 color = texture2D(uTexture, vTextureCoord);

    gl_FragColor = color * vec4(1.0, 0.0, 0.0, 1.0);
}`;
  var blurXFragmentShader = `
precision mediump float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;

void main (void)
{
    vec4 sum = vec4(0.0);
    float blur = 0.001953125;

    sum += texture2D(uTexture, vec2(vTextureCoord.x - 4.0 * blur, vTextureCoord.y)) * 0.05;
    sum += texture2D(uTexture, vec2(vTextureCoord.x - 3.0 * blur, vTextureCoord.y)) * 0.09;
    sum += texture2D(uTexture, vec2(vTextureCoord.x - 2.0 * blur, vTextureCoord.y)) * 0.12;
    sum += texture2D(uTexture, vec2(vTextureCoord.x - blur, vTextureCoord.y)) * 0.15;
    sum += texture2D(uTexture, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;
    sum += texture2D(uTexture, vec2(vTextureCoord.x + blur, vTextureCoord.y)) * 0.15;
    sum += texture2D(uTexture, vec2(vTextureCoord.x + 2.0 * blur, vTextureCoord.y)) * 0.12;
    sum += texture2D(uTexture, vec2(vTextureCoord.x + 3.0 * blur, vTextureCoord.y)) * 0.09;
    sum += texture2D(uTexture, vec2(vTextureCoord.x + 4.0 * blur, vTextureCoord.y)) * 0.05;

    gl_FragColor = sum;
}`;
  var blurYFragmentShader = `
precision mediump float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;

void main (void)
{
    vec4 sum = vec4(0.0);
    float blur = 0.001953125;

    sum += texture2D(uTexture, vec2(vTextureCoord.x, vTextureCoord.y - 4.0 * blur)) * 0.05;
    sum += texture2D(uTexture, vec2(vTextureCoord.x, vTextureCoord.y - 3.0 * blur)) * 0.09;
    sum += texture2D(uTexture, vec2(vTextureCoord.x, vTextureCoord.y - 2.0 * blur)) * 0.12;
    sum += texture2D(uTexture, vec2(vTextureCoord.x, vTextureCoord.y - blur)) * 0.15;
    sum += texture2D(uTexture, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;
    sum += texture2D(uTexture, vec2(vTextureCoord.x, vTextureCoord.y + blur)) * 0.15;
    sum += texture2D(uTexture, vec2(vTextureCoord.x, vTextureCoord.y + 2.0 * blur)) * 0.12;
    sum += texture2D(uTexture, vec2(vTextureCoord.x, vTextureCoord.y + 3.0 * blur)) * 0.09;
    sum += texture2D(uTexture, vec2(vTextureCoord.x, vTextureCoord.y + 4.0 * blur)) * 0.05;

    gl_FragColor = sum;
}`;
  var Demo = class extends Scene {
    constructor() {
      super();
      const loader = new Loader();
      loader.setPath("assets/");
      loader.add(ImageFile("background", "farm-background.png"));
      loader.add(ImageFile("ayu", "ayu.png"));
      loader.add(ImageFile("logo", "logo.png"));
      loader.add(ImageFile("rocket", "rocket.png"));
      loader.add(ImageFile("farm", "farm-logo.png"));
      loader.add(ImageFile("star", "star.png"));
      loader.add(ImageFile("bubble", "bubble256.png"));
      loader.start().then(() => this.create()).catch();
    }
    create() {
      const red = new Shader({fragmentShader: redFragmentShader});
      const blurX = new Shader({fragmentShader: blurXFragmentShader});
      const blurY = new Shader({fragmentShader: blurYFragmentShader});
      const lazer = new Shader({fragmentShader: lazerBeamFragmentShader});
      const plasma = new Shader({fragmentShader: plasmaFragmentShader});
      const pixel = new Shader({fragmentShader: pixelateFragmentShader});
      const sine = new Shader({fragmentShader: sineWaveFragmentShader});
      const sine2 = new Shader({fragmentShader: sineWaveFragmentShader2});
      const underwater = new Shader({fragmentShader: underwaterFragmentShader});
      const vdu = new Shader({fragmentShader: vduNoiseFragmentShader});
      const bars = new Shader({fragmentShader: verticalBarsFragmentShader});
      const clouds = new Shader({fragmentShader: cloudsFragmentShader});
      const world = new StaticWorld(this);
      const layer = new EffectLayer();
      const bg = new Sprite(400, 300, "background");
      const logo = new Sprite(200, 300, "logo");
      const ayu = new Sprite(600, 300, "ayu");
      const farm = new Sprite(200, 150, "farm");
      const rocket = new Sprite(150, 500, "rocket");
      const bubble = new Sprite(400, 450, "bubble");
      const star = new Sprite(650, 500, "star");
      AddChildren(layer, ayu, logo, farm, rocket, bubble);
      AddChildren(world, bg, layer, star);
    }
  };
  new Game(WebGL(), Size(800, 600), Parent("gameParent"), BackgroundColor(2960685), Scenes(Demo));
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
//# sourceMappingURL=effect layer.js.map
