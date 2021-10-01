const { PDF4dev } = require("pdf4dev-node-client");
const pdf4dev = new PDF4dev();
const fs = require("fs");

const example = async () => {
  const file = fs.readFileSync("./files/document.pdf");
  const operation = await pdf4dev.pdfRepair(file);

  await operation.save("./output/pdf-repair.pdf");
};

example();
