const { PDF4dev, IMAGE_FORMAT } = require("pdf4dev-node-client");
const pdf4dev = new PDF4dev();

const example = async () => {
  const html = "<h1>Hello {{name}}</h1>";

  const operation = await pdf4dev.htmlToImage(html, {
    template: {
      name: "World",
    },
    output: IMAGE_FORMAT.PNG,
    options: {
      fullPage: true,
      viewPort: {
        width: 1000,
        height: 1000,
      },
    },
  });

  await operation.save("./output/html-to-image.png");
};

example();
