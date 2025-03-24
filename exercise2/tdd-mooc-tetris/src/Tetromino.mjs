import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
    /*constructor(shape) {
        this.shape = shape;
    }*/
    constructor(rotations) {
        this.rotations = rotations;
        this.rotationIndex = 0;
    }
    get matrix() {
        return this.rotations[this.rotationIndex];
    }

    rotateRight() {
        const newTetro = new Tetromino(this.rotations);
        newTetro.rotationIndex = (this.rotationIndex + 1) % this.rotations.length;
        return newTetro;
    }
    rotateClockwise() {
        return new Tetromino(this.shape.rotateClockwise());
    }

    toString() {
        return this.matrix.map(row => row.join("")).join("\n") + "\n";
    }

    static T() {
        return new Tetromino(RotatingShape.fromString(`
      .T.
      TTT
      ...
    `));
    }
    static T_SHAPE = RotatingShape.fromString(
        `.T.
     TTT
     ...`
    );
    static I_SHAPE = RotatingShape.fromString(
        `.....
     .....
     IIII.
     .....
     .....`
    );
    static O_SHAPE = RotatingShape.fromString(
        `.OO
     .OO
     ...`
    );

    export const T_SHAPE = [
        [
            [".", "T", "."],
            ["T", "T", "T"],
            [".", ".", "."]
        ],
        [
            [".", "T", "."],
            [".", "T", "T"],
            [".", "T", "."]
        ],
        [
            [".", ".", "."],
            ["T", "T", "T"],
            [".", "T", "."]
        ],
        [
            [".", "T", "."],
            ["T", "T", "."],
            [".", "T", "."]
        ],
    ];
}

