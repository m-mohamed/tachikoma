#[derive(Copy, Clone, Hash, Eq, PartialEq, Debug)]
pub struct Point {
    pub x: i8,
    pub y: i8,
}

pub fn add(a: Point, b: Point) -> Point {
    Point {
        x: a.x + b.x,
        y: a.y + b.y,
    }
}

pub fn get_distance(a: Point, b: Point) -> u8 {
    (a.x - b.x).abs() as u8 + (a.y - b.y).abs() as u8
}
