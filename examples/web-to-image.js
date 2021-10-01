const { PDF4dev, IMAGE_FORMAT } = require("pdf4dev-node-client");
const pdf4dev = new PDF4dev();

const example = async () => {
  const url = "https://en.wikipedia.org/wiki/Madrid";

  const operation = await pdf4dev.webToImage(url, {
    output: IMAGE_FORMAT.PNG,
    options: {
      fullPage: true,
    },
  });

  await operation.save("./output/web-to-image.png");
};

example();
