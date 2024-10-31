// console.log("let's do this!");

let towers = [];

let initializeBoard = (pegs, discs) => {
  pegs = Number(prompt("How many pegs?"));
  discs = Number(prompt("How many discs?"));

  for (let i = 0; i < pegs; i++) {
    towers.push([]);
  }

  for (let j = discs; j > 0; j--) {
    towers[0].push(j);
  }

  console.log(
    `LET THE GAME BEGIN! Your board is set with ${pegs} pegs and ${discs} discs:`
  );
  hanoi.printBoard();
};

const hanoi = {
  board: { 1: towers[0], 2: towers[1], 3: towers[2] },
  printBoard: () => {
    towers.map((tower) => console.log(tower));
  },
};

const moveDisc = (from, to) => {
  let possible = true;

  // Calcule the correct tower to move the disk FROM with: towers[from - 1];
  // Calculate the size of the disk in the FROM tower with: towers[from - 1][towers[from - 1].length - 1];

  // Calcule the correct tower to move the disk TO with: towers[to - 1];
  // Calculate the size of the disk in the TO tower with: towers[to - 1][towers[to - 1].length - 1];

  if (
    towers[from - 1][towers[from - 1].length - 1] >
    towers[to - 1][towers[to - 1].length - 1]
  ) {
    possible = false;
  }

  if (possible === true) {
    towers[to - 1].push(towers[from - 1][towers[from - 1].length - 1]);
    towers[from - 1].splice(towers[from - 1].length - 1, 1);
    console.log("That move was successful, board is now:");
    hanoi.printBoard();
  } else {
    console.log(
      "You cannont move a larger disc on top of a smaller one, the board is still:"
    );
    hanoi.printBoard();

    if (to !== 1 && towers[to - 1].length === 5) {
      console.log(
        "YOU WIN! The board has been reset to it's original position. Play again?"
      );
      towers[0].push(5, 4, 3, 2, 1);
      towers[to - 1].splice(0, 5);
      hanoi.printBoard();
    }
  }
};
