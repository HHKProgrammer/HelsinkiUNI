export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = 3;
    this.height = 3;
  }

  toString() {
    return [
    return Array(this.height)
        .fill(".".repeat(this.width))
        .join("\n");
  }
}
