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
    const copy = this.grid.map(row => [...row]);

    if (this.falling) {
      const { shape, x, y } = this.falling;
      for (let dy = 0; dy < shape.matrix.length; dy++) {
        for (let dx = 0; dx < shape.matrix[0].length; dx++) {
          const ch = shape.matrix[dy][dx];
          if (ch !== ".") {
            const drawY = y + dy;
            const drawX = x + dx;
            if (
                drawY >= 0 && drawY < this.height &&
                drawX >= 0 && drawX < this.width
            ) {
              copy[drawY][drawX] = ch;
            }
          }
        }
      }
    }

    return copy.map(row => row.join("")).join("\n")+"\n";
  }



  step() { //stop at the bottom
    if (!this.falling) return;

    // falling piece down
    const { shape, x, y } = this.falling;
    const newY = y + 1;

    // Check if we can move down
    if (this._canMoveTo(x, newY, shape)) {
      this.falling.y = newY;
    } else {
      // Can't movefix the shape to the board
      this._mergeToGrid(shape, x, y);
      this.falling = null;
    }
  }
  canMoveTo(x, y, shape) {
    for (let dy = 0; dy < shape.matrix.length; dy++) {
      for (let dx = 0; dx < shape.matrix[0].length; dx++) {
        const ch = shape.matrix[dy][dx];
        if (ch === ".") continue;

        const nx = x + dx;
        const ny = y + dy;

        if (ny >= this.height || nx < 0 || nx >= this.width || this.grid[ny][nx] !== ".") {
          return false;
        }
      }
    }
    return true;
  }

  mergeToGrid(shape, x, y) {
    for (let dy = 0; dy < shape.matrix.length; dy++) {
      for (let dx = 0; dx < shape.matrix[0].length; dx++) {
        const ch = shape.matrix[dy][dx];
        if (ch !== ".") {
          const ny = y + dy;
          const nx = x + dx;
          if (ny >= 0 && ny < this.height && nx >= 0 && nx < this.width) {
            this.grid[ny][nx] = ch;
          }
        }
      }
    }
  }
  drop(tetromino) {
    this.falling = {
      shape: tetromino,
      x: Math.floor((this.width - tetromino.matrix[0].length) / 2),
      y: 0
    };
  }

  moveLeft() {
    if (!this.falling) return;

    const { shape, x, y } = this.falling;
    const newX = x - 1;

    if (this.canMoveTo(newX, y, shape)) {
      this.falling.x = newX;
    }
  }
  moveRight() {
    if (!this.falling) return;

    const { shape, x, y } = this.falling;
    const newX = x + 1;

    if (this.canMoveTo(newX, y, shape)) {
      this.falling.x = newX;
    }
  }
  rotate() {
    if (!this.falling) return;

    const rotated = this.falling.shape.rotateRight();
    const { x, y } = this.falling;

    const offsets = [0, 1, -1]; // for  current, right kick, left kick
    for (const dx of offsets) {
      const newX = x + dx;
      if (this.canMoveTo(newX, y, rotated)) {
        this.falling.x = newX;
        this.falling.shape = rotated;
        return;
      }
    }
    // If none worked, do nothing
  }







}
