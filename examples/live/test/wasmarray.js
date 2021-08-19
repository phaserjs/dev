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

  // examples/src/test/wasmarray.ts
  rustwasm_default("//wasm.test.local:8890/rustwasm_bg.wasm").then((rustWasm) => {
    console.log("wasm-array-f32-2216");
    console.log("Write in Wasm, Read in JS, Index 0:");
    rustWasm.store_value_in_wasm_memory_buffer_index_zero(24);
    let wasmMemory = new Uint8Array(rustWasm.memory.buffer);
    let bufferPointer = rustWasm.get_wasm_memory_buffer_pointer();
    console.log(wasmMemory[bufferPointer + 0]);
    console.log("Write in JS, Read in Wasm, Index 1:");
    wasmMemory[bufferPointer + 1] = 15;
    console.log(rustWasm.read_wasm_memory_buffer_and_return_index_one());
    console.log("Transform Test");
    const ptr = rustWasm.get_transform_pointer();
    const mem = new Float32Array(rustWasm.memory.buffer, ptr, 6);
    rustWasm.load_matrix(400, 300, 0, 1, 1, 0, 0);
    console.log(mem);
    rustWasm.load_matrix(100, 200, 0.67, 1, 1, 0, 0.2);
    console.log(mem);
  });
})();
//# sourceMappingURL=wasmarray.js.map
