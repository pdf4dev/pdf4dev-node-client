const { PDF4dev, PDF_CREATE_PAGE_ITEM } = require("pdf4dev-node-client");
const pdf4dev = new PDF4dev();

const example = async () => {
  const operation = await pdf4dev.pdfCreate({
    pages: [
      {
        number: 1,
        items: [
          {
            type: PDF_CREATE_PAGE_ITEM.SVG,
            props: {
              color: "#ff0000",
              borderColor: "#00ff00",
              path: "M 0,20 L 100,160 Q 130,200 150,120 C 190,-40 200,200 300,150 L 400,90",
              y: 600,
              x: 0,
            },
          },
        ],
      },
    ],
  });

  await operation.save("./output/pdf-create.pdf");
};

example();
