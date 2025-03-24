
import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("start from the top middle", () => {
    board.drop(Tetromino.T_SHAPE);

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TTT....
       ..........
       ..........
       ..........
       ..........`
    );
  });
  test("a falling tetromino can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();

    expect(board.toString()).to.equalShape(
        `.....T....
     ....TTT...
     ..........
     ..........
     ..........
     ..........`
    );
  });
  test("a falling tetromino can be rotated", () => {
    const board = new Board(6, 6);
    board.drop(Tetromino.T_SHAPE);
    board.rotate();

    expect(board.toString()).to.equalShape(
        `
     ..T...
     ..TT..
     ..T...
     ...... 
     ......
     ......`
    );
  });
  test("a tetromino can not be rotated when there is no room", () => {
    const board = new Board(4, 4);
    board.drop(Tetromino.T_SHAPE);
    board.step(); // move down one row
    //board.grid[1][1] = "X"; // block rotation space
// stoping where rotation would want to go
    board.grid[1][1] = "X";
    board.grid[2][1] = "X";
    board.grid[3][1] = "X";

    const beforeShape = board.falling.shape.toString();
    const beforeX = board.falling.x;
    board.rotate();

    expect(board.falling.shape.toString()).to.equal(beforeShape);
    expect(board.falling.x).to.equal(beforeX); // did not move sideways

  });

  test("a tetromino wall-kicks when rotation is not possible since it is to close to the wall", () => {
    const board = new Board(5, 4);
    board.drop(Tetromino.T_SHAPE);

    board.moveLeft(); // at  wall
    board.moveLeft();
    board.rotate(); // should rotate + shift right

    expect(board.toString()).to.equalShape(
        ` 
   ..T.  
   .TT.  
   ..T.
   ....  
  `
    );

  });

  /*
    test.skip("stop when they hit the bottom", () => {
      board.drop(Tetromino.T_SHAPE);
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ....T.....
         ...TTT....`
      );
    });

    test.skip("stop when they land on another block", () => {
      board.drop(Tetromino.T_SHAPE);
      fallToBottom(board);
      board.drop(Tetromino.T_SHAPE);
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ....T.....
         ...TTT....
         ....T.....
         ...TTT....`
      );
    });*/
});

