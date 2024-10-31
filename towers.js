// console.log("let's do this!");

const Towers = function (name, pegs, discs) {
  this.name = name;
  this.moveCount = 0;

  let initializeBoard = () => {
    let towers = [];

    for (let i = 0; i < pegs; i++) {
      towers.push([]);
    }

    for (let j = discs; j > 0; j--) {
      towers[0].push(j);
    }

    return towers;
  };

  this.towers = initializeBoard();

  this.printBoard = function () {
    this.towers.map((tower) => console.log("---", ...tower));
  };
};

Towers.prototype.moveDisc = function (from, to) {
  let possible = true;
  let returnStatement = "";

  // let towers = this.towers;
  if (!this.towers[from - 1][this.towers[from - 1].length - 1]) {
    possible = false;
    returnStatement =
      "There are no discs currently on the tower you chose to move from. The board is still:";
  }

  if (
    this.towers[from - 1][this.towers[from - 1].length - 1] >
    this.towers[to - 1][this.towers[to - 1].length - 1]
  ) {
    possible = false;
    returnStatement =
      "You cannont move a larger disc on top of a smaller one, the board is still:";
  }

  if (possible === true) {
    this.towers[to - 1].push(
      this.towers[from - 1][this.towers[from - 1].length - 1]
    );
    this.towers[from - 1].splice(this.towers[from - 1].length - 1, 1);
    returnStatement = `That move was successful, ${this.name} Towers board is now:`;
  }

  if (to !== 1 && this.towers[to - 1].length === 5) {
    returnStatement = `YOU WIN! The ${this.name} Towers board has been reset to it's original position. Play again?`;
    this.towers[0].push(5, 4, 3, 2, 1);
    this.towers[to - 1].splice(0, 5);
    this.printBoard();
  }

  console.log(returnStatement);
  this.printBoard();
};

Towers.prototype.autoPlay = function (numMoves) {
  let moveCount = 0;

  let randomMove = () => {
    let moveFrom = Math.ceil(Math.random() * this.towers.length);
    let moveTo = Math.ceil(Math.random() * this.towers.length); // finish randomizing the move choices to be flexible with how many towers there are

    this.moveDisc(moveFrom, moveTo);

    return moveCount;
  };
  for (let i = 0; i < numMoves; i++) {
    randomMove();
    this.moveCount++;
  }
};

const hanoi = new Towers("Hanoi", 3, 5);
const brooklyn = new Towers("Brooklyn", 8, 6);
const washingtonDC = new Towers("Washington, D.C.");

// console.log(hanoi);
// console.log(brooklyn);

// hanoi.moveDisc(1, 2);
// brooklyn.moveDisc(1, 6);
