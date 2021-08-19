(() => {
  var __toBinary = /* @__PURE__ */ (() => {
    var table = new Uint8Array(128);
    for (var i = 0; i < 64; i++)
      table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
    return (base64) => {
      var n = base64.length, bytes = new Uint8Array((n - (base64[n - 1] == "=") - (base64[n - 2] == "=")) * 3 / 4 | 0);
      for (var i2 = 0, j = 0; i2 < n; ) {
        var c0 = table[base64.charCodeAt(i2++)], c1 = table[base64.charCodeAt(i2++)];
        var c2 = table[base64.charCodeAt(i2++)], c3 = table[base64.charCodeAt(i2++)];
        bytes[j++] = c0 << 2 | c1 >> 4;
        bytes[j++] = c1 << 4 | c2 >> 2;
        bytes[j++] = c2 << 6 | c3;
      }
      return bytes;
    };
  })();

  // wasm-binary:/Users/rich/Documents/GitHub/dev/rustwasm/pkg/rustwasm_bg.wasm
  var rustwasm_bg_default = __toBinary("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");

  // wasm-stub:/Users/rich/Documents/GitHub/dev/rustwasm/pkg/rustwasm_bg.wasm
  var rustwasm_bg_default2 = () => WebAssembly.instantiate(rustwasm_bg_default).then((result) => result.instance.exports);

  // examples/src/test/wasmmat2dmod.ts
  rustwasm_bg_default2().then((wasm) => {
    console.log("Matrix2D Test v4-esbuild");
    const quadPointer = wasm.get_quad_pointer();
    const boundsPointer = wasm.get_bounds_pointer();
    const quadMem = new Float32Array(wasm.memory.buffer, quadPointer, 8);
    const boundsMem = new Float32Array(wasm.memory.buffer, boundsPointer, 4);
    wasm.load_matrix(400, 300, 0, 1, 1, 0, 0, -4, -4, 4, 4);
    console.log(quadMem);
    console.log(boundsMem);
    wasm.load_matrix(100, 200, 0.67, 1, 1, 0, 0.2, -8, -18, 8, 32);
    console.log(quadMem);
    console.log(boundsMem);
  }).catch(console.error);
})();
//# sourceMappingURL=wasmmat2dmod.js.map