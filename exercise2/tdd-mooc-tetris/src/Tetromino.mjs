import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
    constructor(shape) {
        this.shape = shape;
    }

    rotateClockwise() {
        return new Tetromino(this.shape.rotateClockwise());
    }

    toString() {
        return this.shape.toString();
    }

    static T() {
        return new Tetromino(RotatingShape.fromString(`
      .T.
      TTT
      ...
    `));
    }
}
