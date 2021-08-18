/*
import load from '../../../rustwasm/pkg/rustwasm_bg.wasm';

load().then(lib =>
{
    console.log('wasm alive 20');
    console.log(lib);

    lib.start();

    // const v = lib.add(99);

    // console.log(v);

});
*/

import init, { add, bob } from '../../../rustwasm/pkg/rustwasm';

// Copy `data` into the `instance` exported memory buffer.
function copyMemory (data, instance)
{
    // the `alloc` function returns an offset in
    // the module's memory to the start of the block
    // const ptr = instance.memalloc(data.length);
    // const ptr = instance.memalloc(data.length);
    const ptr = instance.my_alloc(data.length);

    // create a typed `ArrayBuffer` at `ptr` of proper size
    const mem = new Uint8Array(instance.memory.buffer, ptr, data.length);

    // copy the content of `data` into the memory buffer
    mem.set(new Uint8Array(data));

    // return the pointer
    return ptr;
}

// Invoke the `array_sum` exported method and
// log the result to the console
function arraySum (array, instance)
{
    // copy the contents of `array` into the
    // module's memory and get the offset
    const ptr = copyMemory(array, instance);

    // invoke the module's `array_sum` exported function
    // and log the result
    const res = instance.array_sum(ptr, array.length);

    console.log('Result: ' + res);
}

init('/dev/rustwasm/pkg/rustwasm_bg.wasm').then(wasm => {

    console.log(wasm.add(333));
    console.log(wasm.bob(66));

    // const v = add(321);
    // console.log(v);
    // console.log(bob(55));

    arraySum([ 10, 20, 30, 40, 50 ], wasm);

    // const array = new Int32Array(wasm.memory.buffer, 0, 5);
    // array.set([3, 15, 18, 4, 2])
    // const result = sumArrayInt32(array.byteOffset, array.length)

});

/*
import rust from '../../../rustwasm/target/wasm32-unknown-unknown/release/rustwasm.wasm';

rust().then(lib => {

    console.log(lib);

}).catch(console.error);
*/

/*
//  Works with wasm-pack build:
(async () => {
    let response = await fetch('/dev/rustwasm/pkg/rustwasm_bg.wasm');
    let bytes = await response.arrayBuffer();
    let { instance } = await WebAssembly.instantiate(bytes, { });

    console.log('The answer is: ', instance.exports.add(333));
})();
*/

/*
load(imports).then(lib =>
{
    console.log('wasm alive 20');
    console.log(lib);

    // const v = lib.add_array(100);

    const v = lib.add(100, 555);

    console.log(v);

});
*/
