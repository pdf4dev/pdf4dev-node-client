const { PDF4dev } = require("pdf4dev-node-client");
const pdf4dev = new PDF4dev();
const fs = require("fs");

const example = async () => {
  const file = fs.readFileSync("./files/protected.pdf");

  const operation = await pdf4dev.pdfUnprotect(file, {
    password: "123456",
  });

  await operation.save("./output/pdf-unprotect.pdf");
};

example();
