export class RotatingShape { // just for the tests for now

    //clean working rotation logic for 2D shapes
    constructor(matrix) {
        this.matrix = matrix;
    }
    static fromString(str) {
        const rows = str.trim().split("\n").map(line => line.trim().split(""));
        return new RotatingShape(rows);
    }
    toString() {
        return this.matrix.map(row => row.join("")).join("\n")+ "\n";
    }

    rotateRight() {
        const rotated = this.matrix[0].map((_, i) =>
            this.matrix.map(row => row[i]).reverse()
        );
        return new RotatingShape(rotated);
    }

    rotateLeft() {
        const rotated = this.matrix[0].map((_, i) =>
            this.matrix.map(row => row[this.matrix[0].length - 1 - i])
        );
        return new RotatingShape(rotated);    }
    get matrix() {
        return this._matrix;
    }

}
