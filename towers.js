// console.log("let's do this!");

const Towers = function (name, pegs, discs) {
  this.name = name;
  this.discs = discs;
  this.pegs = pegs;
  this.moveCount = 0;
  this.initializeBoard = () => {
    let towers = [];

    for (let i = 0; i < this.pegs; i++) {
      towers.push([]);
    }

    for (let j = this.discs; j > 0; j--) {
      towers[0].push(j);
    }

    return towers;
  };
  this.towers = this.initializeBoard();
  this.printBoard = function () {
    this.towers.map((tower) => console.log("---", ...tower));
  };
  this.shouldAutoPlay = true; // we need a condition for the autoPlay method to break the loop if the game has been won. This property's value will change to false if the game is won.
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

  if (possible) {
    this.towers[to - 1].push(
      this.towers[from - 1][this.towers[from - 1].length - 1]
    );
    this.towers[from - 1].splice(this.towers[from - 1].length - 1, 1);
    returnStatement = `That move was successful, ${this.name} Towers board is now:`;
  }

  if (to !== 1 && this.towers[to - 1].length === this.discs) {
    returnStatement = `YOU WIN! The ${this.name} Towers board has been reset to it's original position. Play again?`;
    // for (let j = this.discs; j > 0; j--) {
    //   this.towers[0].push(j);
    // }
    // this.towers[to - 1].splice(0, this.discs);
    this.towers = this.initializeBoard();
    this.printBoard();
    this.shouldAutoPlay = false; // this will update the object's property to be used as a condition in the autoPlay loop
  }

  console.log(returnStatement);
  this.printBoard();
  return true;
};

Towers.prototype.autoPlay = function (numMoves) {
  let moveCount = 0;

  let randomMove = () => {
    let moveFrom = Math.ceil(Math.random() * this.towers.length); //
    let moveTo = Math.ceil(Math.random() * this.towers.length); // finish randomizing the move choices to be flexible with how many towers there are

    play = this.moveDisc(moveFrom, moveTo);

    return moveCount;
  };

  for (let i = 0; i < numMoves; i++) {
    randomMove();
    this.moveCount++;
    if (!this.shouldAutoPlay) {
      break;
    }
    // need to get a condition from .moveDisc
  }
};

const hanoi = new Towers("Hanoi", 3, 5);
const brooklyn = new Towers("Brooklyn", 8, 6);
const washingtonDC = new Towers("Washington, D.C.", 6, 8);

console.log(hanoi);
console.log(brooklyn);
console.log(washingtonDC);
