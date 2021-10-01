const { PDF4dev } = require("pdf4dev-node-client");
const pdf4dev = new PDF4dev();
const fs = require("fs");

const example = async () => {
  const file = fs.readFileSync("./files/document.pdf");

  const operation = await pdf4dev.pdfProtect(file, {
    userPassword: "123456",
  });

  await operation.save("./output/pdf-protect.pdf");
};

example();
