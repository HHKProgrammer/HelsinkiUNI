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
    return [
    return Array(this.height)
        .fill(".".repeat(this.width))
        .join("\n");
  }
}
