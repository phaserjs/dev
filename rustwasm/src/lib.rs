const MAX_QUADS: usize = 100000;
const TRANSFORM_SIZE: usize = 12;
const QUAD_SIZE: usize = 9;

static mut TRANSFORM_BUFFER: [ f32; MAX_QUADS * TRANSFORM_SIZE ] = [ 0.0; MAX_QUADS * TRANSFORM_SIZE ];
static mut QUAD_BUFFER: [ f32; MAX_QUADS * QUAD_SIZE ] = [ 0.0; MAX_QUADS * QUAD_SIZE ];

#[no_mangle]
pub fn calc_matrix()
{
    let mut counter = 0;
    let mut transform_offset = 0;
    let mut quad_offset = 0;

    while counter < MAX_QUADS
    {
        unsafe {

            let id = TRANSFORM_BUFFER[transform_offset + 0];
            let tx = TRANSFORM_BUFFER[transform_offset + 1];
            let ty = TRANSFORM_BUFFER[transform_offset + 2];
            let rotation = TRANSFORM_BUFFER[transform_offset + 3];
            let scale_x = TRANSFORM_BUFFER[transform_offset + 4];
            let scale_y = TRANSFORM_BUFFER[transform_offset + 5];
            let skew_x = TRANSFORM_BUFFER[transform_offset + 6];
            let skew_y = TRANSFORM_BUFFER[transform_offset + 7];
            let x = TRANSFORM_BUFFER[transform_offset + 8];
            let y = TRANSFORM_BUFFER[transform_offset + 9];
            let right = TRANSFORM_BUFFER[transform_offset + 10];
            let bottom = TRANSFORM_BUFFER[transform_offset + 11];

            let a = f32::cos(rotation + skew_y) * scale_x;
            let b = f32::sin(rotation + skew_y) * scale_x;
            let c = -f32::sin(rotation - skew_x) * scale_y;
            let d = f32::cos(rotation - skew_x) * scale_y;
        
            //  top left
            let x0 = (x * a) + (y * c) + tx;
            let y0 = (x * b) + (y * d) + ty;
        
            //  bottom left
            let x1 = (x * a) + (bottom * c) + tx;
            let y1 = (x * b) + (bottom * d) + ty;
        
            //  bottom right
            let x2 = (right * a) + (bottom * c) + tx;
            let y2 = (right * b) + (bottom * d) + ty;
        
            //  top right
            let x3 = (right * a) + (y * c) + tx;
            let y3 = (right * b) + (y * d) + ty;

            QUAD_BUFFER[quad_offset + 0] = id;
            QUAD_BUFFER[quad_offset + 1] = x0;
            QUAD_BUFFER[quad_offset + 2] = y0;
            QUAD_BUFFER[quad_offset + 3] = x1;
            QUAD_BUFFER[quad_offset + 4] = y1;
            QUAD_BUFFER[quad_offset + 5] = x2;
            QUAD_BUFFER[quad_offset + 6] = y2;
            QUAD_BUFFER[quad_offset + 7] = x3;
            QUAD_BUFFER[quad_offset + 8] = y3;
        }

        quad_offset += QUAD_SIZE;
        transform_offset += TRANSFORM_SIZE;
        counter += 1;
    }    
}

#[no_mangle]
pub fn get_transform_pointer() -> *const f32
{
    let pointer: *const f32;

    unsafe {
        pointer = TRANSFORM_BUFFER.as_ptr();
    }

    return pointer;
}

#[no_mangle]
pub fn get_quad_pointer() -> *const f32
{
    let pointer: *const f32;

    unsafe {
        pointer = QUAD_BUFFER.as_ptr();
    }

    return pointer;
}
