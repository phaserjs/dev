import exampleWasm from '../../../rustwasm/target/wasm32-unknown-unknown/debug/rustwasm.wasm';

async function run ()
{
    let { instance } = await WebAssembly.instantiate(exampleWasm);
}

run();
