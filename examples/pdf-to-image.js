const { PDF4dev } = require("pdf4dev-node-client");
const pdf4dev = new PDF4dev();
const fs = require("fs");

const example = async () => {
  const file = fs.readFileSync("./files/barcodes.pdf");
  const operation = await pdf4dev.pdfToImage(file);

  await operation.saveAll("./output/pdf-to-images/");
};

const init = () => {
  const output = "./output/pdf-to-images";

  if (fs.existsSync(output)) {
    fs.rmdirSync(output, { recursive: true });
  }

  fs.mkdirSync(output, { recursive: true });
};

init();
example();
