export class RotatingShape { // just for the tests for now
    constructor(shape) {
        this.shape = shape;
    }

    toString() {
        return this.shape;
    }

    rotateRight() {
        return this; // temporary
    }

    rotateLeft() {
        return this; // temporary
    }
}
