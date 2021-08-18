(() => {
  // rustwasm/pkg/rustwasm.js
  var import_meta = {};
  var wasm;
  var heap = new Array(32).fill(void 0);
  heap.push(void 0, null, true, false);
  var heap_next = heap.length;
  function addHeapObject(obj) {
    if (heap_next === heap.length)
      heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];
    heap[idx] = obj;
    return idx;
  }
  var cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
  cachedTextDecoder.decode();
  var cachegetUint8Memory0 = null;
  function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
      cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
  }
  function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
  }
  function getObject(idx) {
    return heap[idx];
  }
  function dropObject(idx) {
    if (idx < 36)
      return;
    heap[idx] = heap_next;
    heap_next = idx;
  }
  function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
  }
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
    imports.wbg = {};
    imports.wbg.__wbindgen_number_new = function(arg0) {
      var ret = arg0;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithlength_b9cd312bebec8dd5 = function(arg0) {
      var ret = new Array(arg0 >>> 0);
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_d87dea4838fe4322 = function(arg0, arg1, arg2) {
      getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    };
    if (typeof input === "string" || typeof Request === "function" && input instanceof Request || typeof URL === "function" && input instanceof URL) {
      input = fetch(input);
    }
    const { instance, module } = await load(await input, imports);
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    return wasm;
  }
  var rustwasm_default = init;

  // examples/src/test/wasm.ts
  function copyMemory(data, instance) {
    const ptr = instance.my_alloc(data.length);
    const mem = new Uint8Array(instance.memory.buffer, ptr, data.length);
    mem.set(new Uint8Array(data));
    return ptr;
  }
  function arraySum(array, instance) {
    const ptr = copyMemory(array, instance);
    const res = instance.array_sum(ptr, array.length);
    console.log("Result: " + res);
  }
  rustwasm_default("/dev/rustwasm/pkg/rustwasm_bg.wasm").then((wasm2) => {
    console.log(wasm2.add(333));
    console.log(wasm2.bob(66));
    arraySum([10, 20, 30, 40, 50], wasm2);
  });
})();
//# sourceMappingURL=wasm.js.map
