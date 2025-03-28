export class Board {
  width;
  height;
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = Array.from({ length: height }, () =>
        Array(width).fill(".")
    );
    this.observers = [];//adding observers

  }
  addObserver(observer) {
    this.observers.push(observer);
  }

  notify(event) {
    for (const observer of this.observers) {
      observer(event);
    }
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
            if (drawY >= 0 && drawY < this.height && drawX >= 0 && drawX < this.width) {
              copy[drawY][drawX] = ch;
            }
          }
        }
      }
    }
    return copy.map(row => row.join("")).join("\n") + "\n";
  }



  step() { //stop at the bottom
    if (!this.falling) return;

    // falling piece down
    const { shape, x, y } = this.falling;
    const newY = y + 1;

    // Check if we can move down
    if (this.canMoveTo(x, newY, shape)) {
      this.falling.y = newY;
    } else {
      // Can't movefix the shape to the board
      this.mergeToGrid(shape, x, y);
      this.falling = null;
      this.clearFullRows();

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
    if (typeof tetromino === "string") {
      tetromino = {
        matrix: [[tetromino]],
        rotateRight: () => tetromino
      };
    }

    if (!tetromino.matrix || !tetromino.matrix[0]) {
      throw new Error("Invalid tetromino");
    }

    this.falling = {
      shape: tetromino,
      x: Math.floor((this.width - tetromino.matrix[0].length) / 2),
      y: 0
    };
  }

    //  drop(X style calls for tests
    /*if (typeof tetromino === "string") {
      tetromino = {
        matrix: [[tetromino]],
        rotateRight: () => tetromino
      };
    }
    this.falling = {
      shape: tetromino,
      x: Math.floor((this.width - tetromino.matrix[0].length) / 2),
      y: 0
    };
  }*/

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


    const { shape, x, y } = this.falling;
    const rotated = shape.rotateRight();

    const offsets = [0]; // only try rotating in-place

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
  clearFullRows() {
    const before = this.grid.length;
    this.grid = this.grid.filter(row => row.includes("."));
    const cleared = before - this.grid.length;
    while (this.grid.length < this.height) {
      this.grid.unshift(Array(this.width).fill("."));
    }
    if (cleared > 0) {
      this.notify({ type: "lineClear", count: cleared });
    }
  }

  tick() {
    this.step();
  }

}
