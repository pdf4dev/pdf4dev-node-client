const { PDF4dev } = require("pdf4dev-node-client");
const pdf4dev = new PDF4dev();
const fs = require("fs");

const example = async () => {
  const file = fs.readFileSync("./files/barcodes.pdf");
  const operation = await pdf4dev.barcodeReader(file);

  for (let code of operation.output.barcodes) {
    console.log(code.value);
  }
};

example();
