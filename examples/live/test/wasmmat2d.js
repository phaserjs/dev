(() => {
  // rustwasm/pkg/rustwasm.js
  var import_meta = {};
  var wasm;
  async function load(module, imports) {
    if (typeof Response === "function" && module instanceof Response) {
      if (typeof WebAssembly.instantiateStreaming === "function") {
        try {
          return await WebAssembly.instantiateStreaming(module, imports);
        } catch (e) {
          if (module.headers.get("Content-Type") != "application/wasm") {
            console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
          } else {
            throw e;
          }
        }
      }
      const bytes = await module.arrayBuffer();
      return await WebAssembly.instantiate(bytes, imports);
    } else {
      const instance = await WebAssembly.instantiate(module, imports);
      if (instance instanceof WebAssembly.Instance) {
        return { instance, module };
      } else {
        return instance;
      }
    }
  }
  async function init(input) {
    if (typeof input === "undefined") {
      input = new URL("rustwasm_bg.wasm", import_meta.url);
    }
    const imports = {};
    if (typeof input === "string" || typeof Request === "function" && input instanceof Request || typeof URL === "function" && input instanceof URL) {
      input = fetch(input);
    }
    const { instance, module } = await load(await input, imports);
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    return wasm;
  }
  var rustwasm_default = init;

  // examples/src/test/wasmmat2d.ts
  rustwasm_default("//wasm.test.local:8890/rustwasm_bg.wasm").then((wasm2) => {
    console.log("Matrix2D Test v3");
    const quadPointer = wasm2.get_quad_pointer();
    const boundsPointer = wasm2.get_bounds_pointer();
    const quadMem = new Float32Array(wasm2.memory.buffer, quadPointer, 8);
    const boundsMem = new Float32Array(wasm2.memory.buffer, boundsPointer, 4);
    wasm2.load_matrix(400, 300, 0, 1, 1, 0, 0, -4, -4, 4, 4);
    console.log(quadMem);
    console.log(boundsMem);
    wasm2.load_matrix(100, 200, 0.67, 1, 1, 0, 0.2, -8, -18, 8, 32);
    console.log(quadMem);
    console.log(boundsMem);
  });
})();
//# sourceMappingURL=wasmmat2d.js.map
