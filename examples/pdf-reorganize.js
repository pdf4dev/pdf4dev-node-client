const { PDF4dev } = require("pdf4dev-node-client");
const pdf4dev = new PDF4dev();

const fs = require("fs");
const file = fs.readFileSync("./files/barcodes.pdf");

// Split - One file per page
const split = async (file) => {
  const output = "./output/pdf-reorganize/split/";
  fs.mkdirSync(output);

  const operation = await pdf4dev.pdfReorganize(file, {
    split: true,
    fixed: 1,
  });

  await operation.saveAll(output);
};

// Remove page 1 and 5.
const removePages = async (file) => {
  const operation = await pdf4dev.pdfReorganize(file, {
    remove: "1,5",
  });

  await operation.save("./output/pdf-reorganize/remove-1-5.pdf");
};

/* 

Only include pages 1, 2 and 4 to the end.

You can use a different range:
  - "2-4,5": Include pages 2 to 4 and page 5.
  - "-3,5": Includes from first page to the third, and page 5.
  - "100-200,300": Include from page 100 to 200, and page 300.

If you want make different files per range, set the split property in true.

*/

const includeRange = async (file) => {
  const operation = await pdf4dev.pdfReorganize(file, {
    ranges: "1,2,4-",
  });

  await operation.save("./output/pdf-reorganize/include-1-2-4-end.pdf");
};

// Create temporal folder
const init = () => {
  const output = "./output/pdf-reorganize";

  if (fs.existsSync(output)) {
    fs.rmdirSync(output, { recursive: true });
  }

  fs.mkdirSync(output, { recursive: true });
};

init();
split(file);
removePages(file);
includeRange(file);
