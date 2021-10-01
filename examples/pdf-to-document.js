const { PDF4dev, PDF_TO_DOCUMENT_OUTPUT } = require("pdf4dev-node-client");
const pdf4dev = new PDF4dev();
const fs = require("fs");

const example = async () => {
  const file = fs.readFileSync("./files/barcodes.pdf");

  const operation = await pdf4dev.pdfToDocument(file, {
    output: PDF_TO_DOCUMENT_OUTPUT.DOCX,
  });

  await operation.save("./output/pdf-to-document.docx");
};

example();
