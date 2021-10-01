const { PDF4dev } = require("pdf4dev-node-client");
const pdf4dev = new PDF4dev();

const example = async () => {
  const url = "https://www.wikipedia.org/";
  const operation = await pdf4dev.webToPdf(url);

  await operation.save("./output/web-to-pdf.pdf");
};

example();
