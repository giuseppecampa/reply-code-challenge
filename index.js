// Constants
const FILENAMES = [
  "00-example",
  "01-chilling-cat",
  "02-swarming-ant",
  "03-input-anti-greedy",
  "04-input-low-points",
  "05-input-opposite-points-holes",
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

const moduleRow = (irow) => (irow >= 0 ? irow % R : R - 1);

const moduleCol = (icol) => (icol >= 0 ? icol % C : C - 1);

const nextStep = (i, j) => {
  const allChoices = [
    {
      direction: "L",
      cell: matrix[i][moduleCol(j - 1)],
      i,
      j: moduleCol(j - 1),
    },
    {
      direction: "R",
      cell: matrix[i][moduleCol(j + 1)],
      i,
      j: moduleCol(j + 1),
    },
    {
      direction: "U",
      cell: matrix[moduleRow(i - 1)][j],
      i: moduleRow(i - 1),
      j,
    },
    {
      direction: "D",
      cell: matrix[moduleRow(i + 1)][j],
      i: moduleRow(i + 1),
      j,
    },
  ];

  const choices = allChoices.filter(
    ({ cell }) => cell.snakeId === -1 && cell.value !== "*"
  );

  return choices.sort(({ cell: c1 }, { cell: c2 }) => c2.value - c1.value)[0];
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

  snakes = lines[1]
    .trim()
    .split(" ")
    .map((length, id) => ({
      length: parseInt(length),
      id,
      initial: { i: -1, j: -1 },
      current: { i: -1, j: -1 },
      path: "",
    }));

  matrix = [];

  for (let i = 0; i < R; i++) {
    row = lines[2 + i].trim().split(" ");
    matrix.push([]);
    for (let j = 0; j < C; j++) {
      matrix[i].push({ value: row[j], snakeId: -1 });
    }
  }

  // Ricerca delle prime S celle con valori più alti, ovvero le teste candidate
  let cells = [];

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      cells.push({ i, j, value: matrix[i][j].value });
    }
  }
  topCells = cells
    .filter(({ value }) => value !== "*")
    .sort(({ value: v1 }, { value: v2 }) => v2 - v1)
    .slice(0, S)
    .forEach(({ i, j }, snakeId) => {
      matrix[i][j].snakeId = snakeId;
      snakes[snakeId].initial = { i, j };
      snakes[snakeId].current = { i, j };
    });

  console.log(snakes);
  console.log(matrix);

  // Scelgo i movimenti degli snakes
  for (let s = 0; s < S; s++) {
    for (let k = 0; k < snakes[s].length - 1; k++) {
      const { i, j } = snakes[s].current;
      const choice = nextStep(i, j);
      if (!choice) {
        break;
      }
      matrix[choice.i][choice.j].snakeId = s;
      snakes[s].current = { i: choice.i, j: choice.j };
      snakes[s].path += `${choice.direction} `;
    }
  }

  console.log(snakes);

  // Solution
  const outputPath = `output/${FILENAME}.output.txt`;
  fs.writeFileSync(outputPath, "");
  for (let s = 0; s < S; s++) {
    const snake = snakes[s];
    let sol = `${snake.initial.j} ${snake.initial.i} ${snake.path.trim()}`;
    sol += s === S - 1 ? "" : "\n";

    fs.appendFileSync(
      outputPath,
      snake.path.trim().split(" ").length === snake.length - 1 ? sol : "\n"
    );
  }
}
