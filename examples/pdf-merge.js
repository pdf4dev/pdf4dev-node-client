const { PDF4dev } = require("pdf4dev-node-client");
const pdf4dev = new PDF4dev();
const fs = require("fs");

const example = async () => {
  const files = [
    fs.readFileSync("./files/document.pdf"),
    fs.readFileSync("./files/document.pdf"),
  ];

  const operation = await pdf4dev.pdfMerge(files);

  await operation.save("./output/pdf-merge.pdf");
};

example();
