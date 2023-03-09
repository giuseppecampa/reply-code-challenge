// Constants
const FILENAMES = [
  "00-example",
  // "01-chilling-cat",
  // "02-02-swarming-ant",
  // "03-input-anti-greedy",
  // "04-input-low-points",
  // "05-input-opposite-points-holes",
];

// Global variables
let C = 0;
let R = 0;
let S = 0;

// Functions
const printTable = (table) => {
  for (let row of table.slice(0, 100)) {
    console.log(row.join(" "));
  }
  if (table.length > 100) {
    console.log("...");
  }
  console.log();
};

const printList = (list_) => {
  for (let l of list_.slice(0, 100)) {
    console.log(l);
  }
  if (list_.length > 100) {
    console.log("...");
  }
  console.log();
};

// Main
for (let FILENAME of FILENAMES) {
  console.log(FILENAME);
  const fs = require("fs");
  const data = fs.readFileSync(`data/${FILENAME}.txt`, "utf8");
  const lines = data.split("\n");

  const sizes = lines[0].trim().split(" ");
  C = parseInt(sizes[0]);
  R = parseInt(sizes[1]);
  S = parseInt(sizes[2]);

  snakes = lines[1].trim().split(" ");

  matrix = [];

  for (let i = 1; i <= R; i++) {
    row = lines[2 + i].trim().split(" ");
    matrix.push(row);
  }

  printList(snakes);
  printTable(matrix);

  // for (let i = 0; i < T; i++) {
  //   console.log(`Turn ${i}`);

  //   // Solution
  //   const outputPath = `output/${FILENAME}.output.txt`;
  //   fs.writeFileSync(outputPath, "TODO");
  // }
}
