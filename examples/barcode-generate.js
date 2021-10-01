const { PDF4dev, BARCODES_TYPES } = require("pdf4dev-node-client");
const pdf4dev = new PDF4dev();

const exampleQR = async () => {
  const operation = await pdf4dev.barcodeGenerate({
    type: BARCODES_TYPES.QRCODE,
    value: "Test",
    backgroundColor: "#ffffff",
    scale: {
      all: 3,
    },
    padding: {
      all: 5,
    },
  });

  await operation.save("./output/barcode-generate-qr.png");
};

const exampleBarcode = async () => {
  const operation = await pdf4dev.barcodeGenerate({
    type: BARCODES_TYPES.CODE128,
    value: "Test",
    backgroundColor: "#ffffff",
    scale: {
      all: 3,
    },
    padding: {
      all: 5,
    },
  });

  await operation.save("./output/barcode-generate-code128.png");
};

exampleQR();
exampleBarcode();
