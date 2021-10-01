const { PDF4dev } = require("pdf4dev-node-client");
const pdf4dev = new PDF4dev();

const example = async () => {
  const html = "<h1>Hello {{name}}</h1>";

  const operation = await pdf4dev.htmlToPdf(html, {
    template: {
      name: "World",
    },
  });

  await operation.save("./output/html-to-pdf.pdf");
};

example();
