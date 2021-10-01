const { PDF4dev } = require("pdf4dev-node-client");
const pdf4dev = new PDF4dev();
const fs = require("fs");

const example = async () => {
  const files = [
    fs.readFileSync("./files/image01.jpg"),
    fs.readFileSync("./files/image02.jpg"),
  ];

  const operation = await pdf4dev.imagesToPdf(files);

  await operation.save("./output/images-to-pdf.pdf");
};

example();
