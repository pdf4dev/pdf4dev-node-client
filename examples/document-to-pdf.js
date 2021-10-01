const { PDF4dev } = require("pdf4dev-node-client");
const pdf4dev = new PDF4dev();
const fs = require("fs");

const example = async () => {
  const file = fs.readFileSync("./files/document.docx");
  const operation = await pdf4dev.documentToPdf(file);

  await operation.save("./output/document-to-pdf.pdf");
};

example();
