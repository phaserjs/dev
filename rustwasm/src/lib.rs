use wasm_bindgen::prelude::*;
use js_sys::Array;
use std::alloc::{alloc, dealloc, Layout};

#[wasm_bindgen]
pub fn add(x: i32) -> i32 {
    x + 100
}

#[wasm_bindgen]
pub fn bob(x: i32) -> Array {
    let arr = Array::new_with_length(3);
    arr.set(0, JsValue::from(x));
    arr.set(1, JsValue::from(x + 10));
    arr.set(2, JsValue::from(x + 100));

    return arr;
}

/// Allocate memory into the module's linear memory
/// and return the offset to the start of the block.
#[no_mangle]
pub fn memalloc(len: usize) -> *mut u8 {
    // create a new mutable buffer with capacity `len`
    let mut buf = Vec::with_capacity(len);
    // take a mutable pointer to the buffer
    let ptr = buf.as_mut_ptr();
    // take ownership of the memory block and
    // ensure that its destructor is not
    // called when the object goes out of scope
    // at the end of the function
    std::mem::forget(buf);
    // return the pointer so the runtime
    // can write data at this offset
    return ptr;
}

#[no_mangle]
pub unsafe fn my_alloc(len: usize) -> *mut u8 {
    let align = std::mem::align_of::<usize>();
    let layout = Layout::from_size_align_unchecked(len, align);
    alloc(layout)
}

#[no_mangle]
pub unsafe fn my_dealloc(ptr: *mut u8, size: usize) {
    let align = std::mem::align_of::<usize>();
    let layout = Layout::from_size_align_unchecked(size, align);
    dealloc(ptr, layout);
}

/// Given a pointer to the start of a byte array and
/// its length, return the sum of its elements.
#[no_mangle]
pub unsafe fn array_sum(ptr: *mut u8, len: usize) -> u8 {
    // create a Vec<u8> from the pointer to the
    // linear memory and the length
    let data = Vec::from_raw_parts(ptr, len, len);
    // actually compute the sum and return it
    data.iter().sum()
}

#[no_mangle]
pub unsafe fn array_merge(ptr: *mut u8, len: usize) -> u8 {

    // create a Vec<u8> from the pointer to the
    // linear memory and the length
    let data = Vec::from_raw_parts(ptr, len, len);

    // actually compute the sum and return it
    data.iter().sum()
}


/*
#![allow(dead_code)]

use wasm_bindgen::prelude::*;

#[no_mangle]
#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[no_mangle]
#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}
*/

//  entry point?!

/*
#[wasm_bindgen]
pub extern "C" fn add_array(x: i32) -> Vec<i32>
{
    use web_sys::console;



    let mut result: Vec<i32> = Vec::new();

    result.push(x);
    result.push(x * 2);

    return result;
}
*/

/*
pub extern "C" fn addOnce (x: i32) -> i32
{
    //  #1 - Direct
    // x + 1

    //  #2 - Vectors
    // let mut fruit: Vec<i32> = Vec::new();

    // fruit.push(200);

    // return x + fruit[0];

    //  #3 - Arrays

    // let numbers: [ i32; 4 ] = [ 100, 200, 300, 400 ];

    // return x + numbers[2];

    return x + getNumber();
}
*/

/*
fn get_number() -> i32
{
    let numbers: [ i32; 4 ] = [ 100, 200, 300, 400 ];

    return numbers[3];
}
*/

//  #1 = 211 bytes
//  #2 = 19.9 Kb (!)
//  #3 = 210 bytes
