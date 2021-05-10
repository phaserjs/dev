(() => {
  // ../phaser-genesis/src/config/const.ts
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
    ConfigStore.set(CONFIG_DEFAULTS.BANNER, {title, version, url, color, background});
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
    ConfigStore.set(CONFIG_DEFAULTS.SIZE, {width, height, resolution});
  }

  // ../phaser-genesis/src/renderer/BindingQueue.ts
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
    ConfigStore.set(CONFIG_DEFAULTS.DEFAULT_ORIGIN, {x, y});
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

  // ../phaser-genesis/src/renderer/webgl1/renderpass/AddViewport.ts
  function AddViewport(renderPass, x = 0, y = 0, width = 0, height = 0) {
    const viewport = new Rectangle(x, y, width, height);
    renderPass.viewportStack.push(viewport);
    return viewport;
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

  // ../phaser-genesis/src/renderer/webgl1/renderpass/BindViewport.ts
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

  // ../phaser-genesis/src/renderer/webgl1/renderpass/SetViewport.ts
  function SetViewport(renderPass, x = 0, y = 0, width = 0, height = 0) {
    const entry = AddViewport(renderPass, x, y, width, height);
    BindViewport(renderPass, entry);
    renderPass.currentViewport = entry;
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/BindFramebuffer.ts
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

  // ../phaser-genesis/src/renderer/webgl1/renderpass/PopViewport.ts
  function PopViewport(renderPass) {
    const stack = renderPass.viewportStack;
    if (stack.length > 1) {
      stack.pop();
    }
    renderPass.currentViewport = stack[stack.length - 1];
    BindViewport(renderPass);
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/PopFramebuffer.ts
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

  // ../phaser-genesis/src/renderer/webgl1/renderpass/AddFramebuffer.ts
  function AddFramebuffer(renderPass, framebuffer, viewport) {
    const entry = {framebuffer, viewport};
    renderPass.framebufferStack.push(entry);
    return entry;
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/SetFramebuffer.ts
  function SetFramebuffer(renderPass, framebuffer, clear = true, viewport) {
    const entry = AddFramebuffer(renderPass, framebuffer, viewport);
    BindFramebuffer(renderPass, clear, entry);
    renderPass.currentFramebuffer = entry;
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/Draw.ts
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
    renderPass.prevCount = count;
    renderPass.count = 0;
    renderPass.flushTotal++;
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

  // ../phaser-genesis/src/renderer/webgl1/textures/CreateGLTexture.ts
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

  // ../phaser-genesis/src/renderer/webgl1/renderpass/ProcessBindingQueue.ts
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

  // ../phaser-genesis/src/config/maxtextures/GetMaxTextures.ts
  function GetMaxTextures() {
    return ConfigStore.get(CONFIG_DEFAULTS.MAX_TEXTURES);
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

  // ../phaser-genesis/src/renderer/webgl1/renderpass/CreateTempTextures.ts
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

  // ../phaser-genesis/src/config/batchsize/GetBatchSize.ts
  function GetBatchSize() {
    return ConfigStore.get(CONFIG_DEFAULTS.BATCH_SIZE);
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

  // ../phaser-genesis/src/renderer/webgl1/buffers/IndexedVertexBuffer.ts
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

  // ../phaser-genesis/src/renderer/webgl1/shaders/CreateAttributes.ts
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
        if (name.substr(-3) === "[0]") {
          name = name.substr(0, name.length - 3);
          isArray = uniform.size > 1;
        }
        uniforms.set(name, CreateUniformSetter(uniform, location, isArray));
      }
    }
    return uniforms;
  }

  // ../phaser-genesis/src/renderer/webgl1/GL_CONST.ts
  var UNSIGNED_BYTE = 5121;
  var FLOAT = 5126;

  // ../phaser-genesis/src/renderer/webgl1/shaders/DefaultQuadAttributes.ts
  var DefaultQuadAttributes = {
    aVertexPosition: {size: 2, type: FLOAT, normalized: false, offset: 0},
    aTextureCoord: {size: 2, type: FLOAT, normalized: false, offset: 8},
    aTextureId: {size: 1, type: FLOAT, normalized: false, offset: 16},
    aTintColor: {size: 4, type: UNSIGNED_BYTE, normalized: true, offset: 20}
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

  // ../phaser-genesis/src/textures/Frame.ts
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
    copyToExtent(child) {
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
      return this;
    }
    copyToVertices(vertices, offset = 0) {
      const {u0, u1, v0, v1} = this;
      vertices[offset + 0].setUV(u0, v0);
      vertices[offset + 1].setUV(u0, v1);
      vertices[offset + 2].setUV(u1, v1);
      vertices[offset + 3].setUV(u1, v0);
      return this;
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

  // ../phaser-genesis/src/textures/Texture.ts
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

  // ../phaser-genesis/src/renderer/webgl1/shaders/Shader.ts
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

  // ../phaser-genesis/src/renderer/webgl1/renderpass/SetDefaultBlendMode.ts
  function SetDefaultBlendMode(renderPass, enable, sfactor, dfactor) {
    const entry = {enable, sfactor, dfactor};
    renderPass.blendModeStack[0] = entry;
    renderPass.currentBlendMode = entry;
    renderPass.defaultBlendMode = entry;
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/SetDefaultFramebuffer.ts
  function SetDefaultFramebuffer(renderPass, framebuffer = null, viewport) {
    const entry = {framebuffer, viewport};
    renderPass.framebufferStack[0] = entry;
    renderPass.currentFramebuffer = entry;
    renderPass.defaultFramebuffer = entry;
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/SetDefaultShader.ts
  function SetDefaultShader(renderPass, shader, textureID) {
    const entry = {shader, textureID};
    renderPass.shaderStack[0] = entry;
    renderPass.currentShader = entry;
    renderPass.defaultShader = entry;
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/SetDefaultVertexBuffer.ts
  function SetDefaultVertexBuffer(renderPass, buffer) {
    renderPass.vertexBufferStack[0] = buffer;
    renderPass.currentVertexBuffer = buffer;
    renderPass.defaultVertexBuffer = buffer;
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/SetDefaultViewport.ts
  function SetDefaultViewport(renderPass, x = 0, y = 0, width = 0, height = 0) {
    const entry = new Rectangle(x, y, width, height);
    renderPass.viewportStack[0] = entry;
    renderPass.currentViewport = entry;
    renderPass.defaultViewport = entry;
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

  // ../phaser-genesis/src/math/mat4/Mat4Identity.ts
  function Mat4Identity(matrix = new Matrix4()) {
    return matrix.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  // ../phaser-genesis/src/math/mat2d/Matrix2D.ts
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

  // ../phaser-genesis/src/math/vec2/Vec2Callback.ts
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

  // ../phaser-genesis/src/renderer/webgl1/renderpass/RenderPass.ts
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

  // ../phaser-genesis/src/renderer/webgl1/renderpass/BindShader.ts
  function BindShader(renderPass, entry) {
    if (!entry) {
      entry = renderPass.currentShader;
    }
    const success = entry.shader.bind(renderPass, entry.textureID);
    if (success) {
      entry.shader.setAttributes(renderPass);
    }
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/Begin.ts
  function Begin(renderPass, camera2D) {
    renderPass.current2DCamera = camera2D;
    renderPass.cameraMatrix = camera2D.matrix;
    BindShader(renderPass);
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/BindBlendMode.ts
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

  // ../phaser-genesis/src/renderer/webgl1/renderpass/BindVertexBuffer.ts
  function BindVertexBuffer(renderPass, buffer) {
    if (!buffer) {
      buffer = renderPass.currentVertexBuffer;
    }
    const indexBuffer = buffer.indexed ? buffer.indexBuffer : null;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer.vertexBuffer);
  }

  // ../phaser-genesis/src/renderer/webgl1/renderpass/GetVertexBufferEntry.ts
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

  // ../phaser-genesis/src/renderer/webgl1/renderpass/SetTexture.ts
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

  // ../phaser-genesis/src/renderer/webgl1/renderpass/Start.ts
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

  // ../phaser-genesis/src/renderer/webgl1/WebGLRendererInstance.ts
  var instance2;
  var WebGLRendererInstance = {
    get: () => {
      return instance2;
    },
    set: (renderer) => {
      instance2 = renderer;
    }
  };

  // ../phaser-genesis/src/renderer/webgl1/WebGLRenderer.ts
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

  // ../phaser-genesis/src/config/webgl/WebGL.ts
  function WebGL() {
    return () => {
      SetRenderer(WebGLRenderer);
    };
  }

  // ../phaser-genesis/src/display/DepthFirstSearch.ts
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

  // ../phaser-genesis/src/display/GetChildIndex.ts
  function GetChildIndex(parent, child) {
    return parent.children.indexOf(child);
  }

  // ../phaser-genesis/src/display/RemoveChildAt.ts
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

  // ../phaser-genesis/src/display/RemoveChild.ts
  function RemoveChild(parent, child) {
    const currentIndex = GetChildIndex(parent, child);
    if (currentIndex > -1) {
      RemoveChildAt(parent, currentIndex);
    }
    return child;
  }

  // ../phaser-genesis/src/gameobjects/events/AddedToWorldEvent.ts
  var AddedToWorldEvent = "addedtoworld";

  // ../phaser-genesis/src/gameobjects/events/DestroyEvent.ts
  var DestroyEvent = "destroy";

  // ../phaser-genesis/src/gameobjects/events/PostUpdateEvent.ts
  var PostUpdateEvent = "postupdate";

  // ../phaser-genesis/src/gameobjects/events/RemovedFromWorldEvent.ts
  var RemovedFromWorldEvent = "removedfromworld";

  // ../phaser-genesis/src/gameobjects/events/UpdateEvent.ts
  var UpdateEvent = "update";

  // ../phaser-genesis/src/events/Emit.ts
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

  // ../phaser-genesis/src/display/SetWorld.ts
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

  // ../phaser-genesis/src/display/SetParent.ts
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

  // ../phaser-genesis/src/display/AddChild.ts
  function AddChild(parent, child) {
    parent.children.push(child);
    SetParent2(parent, child);
    child.transform.updateWorld();
    return child;
  }

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

  // ../phaser-genesis/src/display/RemoveChildrenBetween.ts
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

  // ../phaser-genesis/src/display/DestroyChildren.ts
  function DestroyChildren(parent, beginIndex = 0, endIndex) {
    const removed = RemoveChildrenBetween(parent, beginIndex, endIndex);
    removed.forEach((child) => {
      child.destroy();
    });
  }

  // ../phaser-genesis/src/display/RemoveChildren.ts
  function RemoveChildren(parent, ...children) {
    children.forEach((child) => {
      RemoveChild(parent, child);
    });
    return children;
  }

  // ../phaser-genesis/src/display/ReparentChildren.ts
  function ReparentChildren(parent, newParent, beginIndex = 0, endIndex) {
    const moved = RemoveChildrenBetween(parent, beginIndex, endIndex);
    SetParent2(newParent, ...moved);
    moved.forEach((child) => {
      child.transform.updateWorld();
    });
    return moved;
  }

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

  // ../phaser-genesis/src/events/EventEmitter.ts
  var EventEmitter = class {
    constructor() {
      this.events = new Map();
    }
  };

  // ../phaser-genesis/src/events/EventInstance.ts
  var EventInstance = class {
    constructor(callback, context, once = false) {
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

  // ../phaser-genesis/src/config/banner/GetBanner.ts
  function GetBanner() {
    const {title, version, url, color, background} = ConfigStore.get(CONFIG_DEFAULTS.BANNER);
    if (title !== "") {
      const str = version !== "" ? title + " " + version : title;
      console.log(`%c${str}%c ${url}`, `padding: 4px 16px; color: ${color}; background: ${background}`, "");
    }
  }

  // ../phaser-genesis/src/config/parent/GetParent.ts
  function GetParent() {
    return ConfigStore.get(CONFIG_DEFAULTS.PARENT);
  }

  // ../phaser-genesis/src/config/renderer/GetRenderer.ts
  function GetRenderer() {
    return ConfigStore.get(CONFIG_DEFAULTS.RENDERER);
  }

  // ../phaser-genesis/src/scenes/CreateSceneRenderData.ts
  function CreateSceneRenderData() {
    return {
      gameFrame: 0,
      numTotalFrames: 0,
      numDirtyFrames: 0,
      numDirtyCameras: 0,
      worldData: []
    };
  }

  // ../phaser-genesis/src/config/scenes/GetScenes.ts
  function GetScenes() {
    return ConfigStore.get(CONFIG_DEFAULTS.SCENES);
  }

  // ../phaser-genesis/src/scenes/ResetSceneRenderData.ts
  function ResetSceneRenderData(renderData, gameFrame = 0) {
    renderData.gameFrame = gameFrame;
    renderData.numTotalFrames = 0;
    renderData.numDirtyFrames = 0;
    renderData.numDirtyCameras = 0;
    renderData.worldData.length = 0;
  }

  // ../phaser-genesis/src/scenes/SceneManagerInstance.ts
  var instance3;
  var SceneManagerInstance = {
    get: () => {
      return instance3;
    },
    set: (manager) => {
      instance3 = manager;
    }
  };

  // ../phaser-genesis/src/scenes/SceneManager.ts
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

  // ../phaser-genesis/src/config/SetConfigDefaults.ts
  function SetConfigDefaults() {
    SetBackgroundColor(0);
    SetBatchSize(4096);
    SetBanner("Phaser", "4.0.0", "https://phaser4.io");
    SetMaxTextures(0);
    SetDefaultOrigin(0.5, 0.5);
    SetSize(800, 600, 1);
  }

  // ../phaser-genesis/src/textures/CreateCanvas.ts
  function CreateCanvas(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext("2d");
  }

  // ../phaser-genesis/src/textures/TextureManagerInstance.ts
  var instance4;
  var TextureManagerInstance = {
    get: () => {
      return instance4;
    },
    set: (manager) => {
      instance4 = manager;
    }
  };

  // ../phaser-genesis/src/textures/TextureManager.ts
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

  // ../phaser-genesis/src/Game.ts
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

  // ../phaser-genesis/src/loader/File.ts
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

  // ../phaser-genesis/src/loader/GetURL.ts
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

  // ../phaser-genesis/src/loader/ImageTagLoader.ts
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

  // ../phaser-genesis/src/loader/files/ImageFile.ts
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

  // ../phaser-genesis/src/loader/Loader.ts
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

  // ../phaser-genesis/src/scenes/GetConfigValue.ts
  function GetConfigValue(config, property, defaultValue) {
    if (Object.prototype.hasOwnProperty.call(config, property)) {
      return config[property];
    } else {
      return defaultValue;
    }
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
  }

  // ../phaser-genesis/src/scenes/Scene.ts
  var Scene = class {
    constructor(config) {
      this.game = GameInstance.get();
      this.events = new Map();
      Install(this, config);
    }
  };

  // ../phaser-genesis/src/gameobjects/components/transform/GetVertices.ts
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

  // ../phaser-genesis/src/gameobjects/components/bounds/BoundsComponent.ts
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

  // ../phaser-genesis/src/gameobjects/components/input/InputComponent.ts
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

  // ../phaser-genesis/src/renderer/webgl1/colors/PackColors.ts
  function PackColors(vertices) {
    vertices.forEach((vertex) => {
      vertex.packColor();
    });
  }

  // ../phaser-genesis/src/gameobjects/components/transform/UpdateVertices.ts
  function UpdateVertices(gameObject) {
    const vertices = gameObject.vertices;
    const {x0, y0, x1, y1, x2, y2, x3, y3} = GetVertices(gameObject.transform);
    vertices[0].setPosition(x0, y0);
    vertices[1].setPosition(x1, y1);
    vertices[2].setPosition(x2, y2);
    vertices[3].setPosition(x3, y3);
    return gameObject;
  }

  // ../phaser-genesis/src/gameobjects/components/transform/PreRenderVertices.ts
  function PreRenderVertices(gameObject) {
    if (gameObject.isDirty(DIRTY_CONST.COLORS)) {
      PackColors(gameObject.vertices);
      gameObject.clearDirty(DIRTY_CONST.COLORS);
    }
    if (gameObject.isDirty(DIRTY_CONST.TRANSFORM)) {
      UpdateVertices(gameObject);
      gameObject.clearDirty(DIRTY_CONST.TRANSFORM);
    }
    return gameObject;
  }

  // ../phaser-genesis/src/config/defaultorigin/GetDefaultOriginX.ts
  function GetDefaultOriginX() {
    return ConfigStore.get(CONFIG_DEFAULTS.DEFAULT_ORIGIN).x;
  }

  // ../phaser-genesis/src/config/defaultorigin/GetDefaultOriginY.ts
  function GetDefaultOriginY() {
    return ConfigStore.get(CONFIG_DEFAULTS.DEFAULT_ORIGIN).y;
  }

  // ../phaser-genesis/src/math/vec2/Vec2.ts
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

  // ../phaser-genesis/src/geom/rectangle/GetRectangleSize.ts
  function GetRectangleSize(rect, out = new Vec2()) {
    return out.set(rect.width, rect.height);
  }

  // ../phaser-genesis/src/gameobjects/components/transform/UpdateLocalTransform.ts
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

  // ../phaser-genesis/src/math/mat2d/Mat2dCopyFrom.ts
  function Mat2dCopyFrom(src, target) {
    const {a, b, c, d, tx, ty} = src;
    return target.set(a, b, c, d, tx, ty);
  }

  // ../phaser-genesis/src/gameobjects/components/transform/UpdateWorldTransform.ts
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

  // ../phaser-genesis/src/gameobjects/components/transform/TransformComponent.ts
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

  // ../phaser-genesis/src/renderer/webgl1/colors/PackColor.ts
  function PackColor(rgb, alpha) {
    const ua = (alpha * 255 | 0) & 255;
    return (ua << 24 | rgb) >>> 0;
  }

  // ../phaser-genesis/src/gameobjects/components/Vertex.ts
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

  // ../phaser-genesis/src/renderer/webgl1/draw/BatchTexturedQuad.ts
  function BatchTexturedQuad(texture, vertices, renderPass) {
    const {F32, U32, offset} = GetVertexBufferEntry(renderPass, 1);
    const textureIndex = SetTexture(renderPass, texture);
    let vertOffset = offset;
    vertices.forEach((vertex) => {
      F32[vertOffset + 0] = vertex.x;
      F32[vertOffset + 1] = vertex.y;
      F32[vertOffset + 2] = vertex.u;
      F32[vertOffset + 3] = vertex.v;
      F32[vertOffset + 4] = textureIndex;
      U32[vertOffset + 5] = vertex.color;
      vertOffset += 6;
    });
  }

  // ../phaser-genesis/src/gameobjects/GameObject.ts
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
      this.vertices = [];
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
      this.vertices = [];
    }
  };

  // ../phaser-genesis/src/gameobjects/container/Container.ts
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
    getSize(out = new Vec2()) {
      return GetRectangleSize(this.transform.extent, out);
    }
    setPosition(x, y) {
      this.transform.position.set(x, y);
      return this;
    }
    getPosition(out = new Vec2()) {
      const position = this.transform.position;
      return out.set(position.x, position.y);
    }
    setOrigin(x, y = x) {
      this.transform.origin.set(x, y);
      return this;
    }
    getOrigin(out = new Vec2()) {
      const origin = this.transform.origin;
      return out.set(origin.x, origin.y);
    }
    setSkew(x, y = x) {
      this.transform.skew.set(x, y);
      return this;
    }
    getSkew(out = new Vec2()) {
      const skew = this.transform.skew;
      return out.set(skew.x, skew.y);
    }
    setScale(x, y = x) {
      this.transform.scale.set(x, y);
      return this;
    }
    getScale(out = new Vec2()) {
      const scale = this.transform.scale;
      return out.set(scale.x, scale.y);
    }
    setRotation(value) {
      this.transform.rotation = value;
      return this;
    }
    getRotation() {
      return this.transform.rotation;
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
        this.vertices.forEach((vertex) => {
          vertex.setAlpha(value);
        });
        this.setDirty(DIRTY_CONST.COLORS);
      }
    }
  };

  // ../phaser-genesis/src/renderer/canvas/draw/DrawTexturedQuad.ts
  function DrawTexturedQuad(frame2, alpha, transform, renderer) {
    if (!frame2) {
      return;
    }
    const ctx = renderer.ctx;
    const {a, b, c, d, tx, ty} = transform.world;
    const {x, y} = transform.extent;
    ctx.save();
    ctx.setTransform(a, b, c, d, tx, ty);
    ctx.globalAlpha = alpha;
    ctx.drawImage(frame2.texture.image, frame2.x, frame2.y, frame2.width, frame2.height, x, y, frame2.width, frame2.height);
    ctx.restore();
  }

  // ../phaser-genesis/src/gameobjects/sprite/SetFrame.ts
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
        child.setOrigin(pivot.x, pivot.y);
      }
      frame2.copyToExtent(child);
      frame2.copyToVertices(child.vertices);
    });
    return children;
  }

  // ../phaser-genesis/src/gameobjects/sprite/SetTexture.ts
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

  // ../phaser-genesis/src/gameobjects/sprite/Sprite.ts
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
    renderGL(renderPass) {
      PreRenderVertices(this);
      BatchTexturedQuad(this.texture, this.vertices, renderPass);
    }
    renderCanvas(renderer) {
      PreRenderVertices(this);
      DrawTexturedQuad(this.frame, this.alpha, this.transform, renderer);
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
    }
  };

  // ../phaser-genesis/src/world/events/WorldRenderEvent.ts
  var WorldRenderEvent = "worldrender";

  // ../phaser-genesis/src/world/events/WorldShutdownEvent.ts
  var WorldShutdownEvent = "worldshutdown";

  // ../phaser-genesis/src/world/CalculateTotalRenderable.ts
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

  // ../phaser-genesis/src/world/HasDirtyChildren.ts
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

  // ../phaser-genesis/src/world/UpdateCachedLayers.ts
  function UpdateCachedLayers(cachedLayers, dirtyCamera) {
    cachedLayers.forEach((layer) => {
      if (dirtyCamera || HasDirtyChildren(layer)) {
        layer.node.setDirty(DIRTY_CONST.CHILD_CACHE);
      } else {
        layer.children.length = 0;
      }
    });
  }

  // ../phaser-genesis/src/world/WorldDepthFirstSearch.ts
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

  // ../phaser-genesis/src/world/BuildRenderList.ts
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

  // ../phaser-genesis/src/math/mat2d/Mat2dEquals.ts
  function Mat2dEquals(a, b) {
    return a.a === b.a && a.b === b.b && a.c === b.c && a.d === b.d && a.tx === b.tx && a.ty === b.ty;
  }

  // ../phaser-genesis/src/world/MergeRenderData.ts
  function MergeRenderData(sceneRenderData, worldRenderData) {
    sceneRenderData.numDirtyFrames += worldRenderData.dirtyFrame;
    sceneRenderData.numTotalFrames += worldRenderData.numRendered;
    if (worldRenderData.camera.dirtyRender) {
      sceneRenderData.numDirtyCameras++;
    }
    sceneRenderData.worldData.push(worldRenderData);
  }

  // ../phaser-genesis/src/world/ResetWorldRenderData.ts
  function ResetWorldRenderData(renderData, gameFrame) {
    renderData.gameFrame = gameFrame;
    renderData.dirtyFrame = 0;
    renderData.numRendered = 0;
    renderData.numRenderable = 0;
  }

  // ../phaser-genesis/src/world/BaseWorld.ts
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

  // ../phaser-genesis/src/world/CreateWorldRenderData.ts
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

  // ../phaser-genesis/src/world/StaticWorld.ts
  var StaticWorld = class extends BaseWorld {
    constructor(scene) {
      super(scene);
      this.type = "StaticWorld";
      this.camera = new StaticCamera();
      this.renderData = CreateWorldRenderData(this, this.camera);
    }
  };

  // src/gameobjects/sprite/create sprite.ts
  var Demo = class extends Scene {
    constructor() {
      super();
      const loader = new Loader();
      loader.add(ImageFile("rocket", "assets/rocket.png"));
      loader.start().then(() => {
        const world = new StaticWorld(this);
        const rocket = new Sprite(400, 300, "rocket");
        AddChild(world, rocket);
      });
    }
  };
  new Game(WebGL(), Parent("gameParent"), BackgroundColor(5832972), Scenes(Demo));
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
//# sourceMappingURL=create sprite.js.map
