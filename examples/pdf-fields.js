const { PDF4dev } = require("pdf4dev-node-client");
const pdf4dev = new PDF4dev();
const fs = require("fs");

const example = async () => {
  const file = fs.readFileSync("./files/form.pdf");
  const operation = await pdf4dev.pdfFields(file);

  for (let field of operation.output.fields) {
    console.log(field);
  }
};

example();
