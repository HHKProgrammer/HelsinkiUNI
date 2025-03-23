export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = Array.from({ length: height }, () =>
        Array(width).fill(".")
    );
  }


  toString() {
    // Make a deep copy of the board
    const copy = this.grid.map(row => [...row]);

    if (this.falling) {
      const { shape, x, y } = this.falling;
      for (let dy = 0; dy < shape.matrix.length; dy++) {
        for (let dx = 0; dx < shape.matrix[0].length; dx++) {
          const ch = shape.matrix[dy][dx];
          if (ch !== ".") {
            const drawY = y + dy;
            const drawX = x + dx;
            if (drawY >= 0 && drawY < this.height && drawX >= 0 && drawX < this.width) {
              copy[drawY][drawX] = ch;
            }
          }
        }
      }
    }

    return copy.map(row => row.join("")).join("\n");
  }

  drop(tetromino) {
    this.falling = {
      shape: tetromino,
      x: Math.floor((this.width - tetromino.matrix[0].length) / 2),
      y: 0
    };
  }

}
