use wasm_bindgen::prelude::*;

// Create a static mutable byte buffer.
// We will use for passing memory between js and wasm.
// NOTE: global `static mut` means we will have "unsafe" code
// but for passing memory between js and wasm should be fine.
const WASM_MEMORY_BUFFER_SIZE: usize = 2;
static mut WASM_MEMORY_BUFFER: [u8; WASM_MEMORY_BUFFER_SIZE] = [0; WASM_MEMORY_BUFFER_SIZE];
// static mut WASM_MEMORY_BUFFER_F32: [f32; WASM_MEMORY_BUFFER_SIZE_F32] = [0.0; WASM_MEMORY_BUFFER_SIZE_F32];

static mut INVADER: [ f32; 6 ] = [ 0.0; 6 ];

static mut TRANSFORM: [ f32; 7 ] = [ 0.0; 7 ];
static mut MATRIX2D: [ f32; 6 ] = [ 0.0; 6 ];

// Function to store the passed value at index 0, in our buffer
#[wasm_bindgen]
pub fn store_value_in_wasm_memory_buffer_index_zero(value: u8) {
  unsafe {
    WASM_MEMORY_BUFFER[0] = value;
  }
}

// Function to return a pointer to our buffer in wasm memory
#[wasm_bindgen]
pub fn get_wasm_memory_buffer_pointer() -> *const u8 {
  let pointer: *const u8;
  unsafe {
    pointer = WASM_MEMORY_BUFFER.as_ptr();
  }

  return pointer;
}

// Function to read from index 1 of our buffer and return the value at the index
#[wasm_bindgen]
pub fn read_wasm_memory_buffer_and_return_index_one() -> u8 {
  let value: u8;
  unsafe {
    value = WASM_MEMORY_BUFFER[1];
  }
  return value;
}

#[wasm_bindgen]
pub fn load_matrix(x: f32, y: f32, rotation: f32, scale_x: f32, scale_y: f32, skew_x: f32, skew_y: f32)
{
  unsafe {
    TRANSFORM = [ x, y, rotation, scale_x, scale_y, skew_x, skew_y ];
  }


}

// Function to return a pointer to our buffer in wasm memory
#[wasm_bindgen]
pub fn get_transform_pointer() -> *const f32 {
  let pointer: *const f32;
  unsafe {
    pointer = TRANSFORM.as_ptr();
  }

  return pointer;
}


// Function to return a pointer to our buffer in wasm memory
#[wasm_bindgen]
pub fn get_invader_pointer() -> *const f32 {
  let pointer: *const f32;
  unsafe {
    pointer = INVADER.as_ptr();
  }

  return pointer;
}

// Function to read from index 1 of our buffer and return the value at the index
#[wasm_bindgen]
pub fn get_invader() -> f32 {
  let value: f32;
  unsafe {
    value = INVADER[0];
  }
  return value;
}
