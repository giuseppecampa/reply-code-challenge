// Constants
const FILENAMES = [
  "00-example",
  // "01-the-cloud-abyss",
  // "02-iot-island-of-terror",
  // "03-etheryum",
  // "04-the-desert-of-autonomous-machines",
  // "05-androids-armageddon",
];

// Global variables
let S = 0;
let Smax = 0;
let T = 0;
let D = 0;

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
  S = parseInt(sizes[0]);
  Smax = parseInt(sizes[1]);
  T = parseInt(sizes[2]);
  D = parseInt(sizes[3]);

  const demons = [];
  for (let i = 1; i <= D; i++) {
    const fields = lines[i].trim().split(" ");
    const fragments = fields.slice(4).map((x) => parseInt(x));
    demons.push({
      index: i - 1,
      defeated: false,
      Sc: parseInt(fields[0]),
      Tr: parseInt(fields[1]),
      Sr: parseInt(fields[2]),
      Na: parseInt(fields[3]),
      fragments: fragments,
      pts: fragments.reduce((a, b) => a + b, 0),
    });
  }
  printList(demons);

  for (let i = 0; i < T; i++) {
    console.log(`Turn ${i}`);

    // Solution
    const outputPath = `output/${FILENAME}.output.txt`;
    fs.writeFileSync(outputPath, "TODO");
  }
}
