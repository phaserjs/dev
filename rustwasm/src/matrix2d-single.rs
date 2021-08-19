static mut QUAD: [ f32; 8 ] = [ 0.0; 8 ];

#[no_mangle]
pub fn load_matrix(tx: f32, ty: f32, rotation: f32, scale_x: f32, scale_y: f32, skew_x: f32, skew_y: f32, x: f32, y: f32, right: f32, bottom: f32)
{
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

    // let x_axis = [ x0, x1, x2, x3 ];
    // let y_axis = [ x0, x1, x2, x3 ];

    unsafe
    {
        QUAD = [ x0, y0, x1, y1, x2, y2, x3, y3 ];

        // BOUNDS[0] = x_axis.iter().fold(f32::INFINITY, |a, &b| a.min(b));
        // BOUNDS[1] = y_axis.iter().fold(f32::INFINITY, |a, &b| a.min(b));
        // BOUNDS[2] = x_axis.iter().fold(0.0, |a, &b| a.max(b));
        // BOUNDS[3] = y_axis.iter().fold(0.0, |a, &b| a.max(b));
    }
}

#[no_mangle]
pub fn get_quad_pointer() -> *const f32
{
    let pointer: *const f32;

    unsafe {
        pointer = QUAD.as_ptr();
    }

    return pointer;
}
