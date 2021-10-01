import "jest";
import * as fs from "fs";
import Operation from "../../src/lib/classes/Operation";
import File from "../../src/lib/classes/File";
import { PDF_CREATE_PAGE_ITEM, PDF_TO_DOCUMENT_OUTPUT } from "../../src/index";
import { PDF4dev, BARCODES_TYPES } from "../../src/index";

jest.setTimeout(60000);

describe("Operations", () => {
  let pdf4dev;
  let pdfMergedUrl: String;
  let pdfProtectedUrl: String;
  let operations: Array<Operation>;

  beforeEach(() => {
    pdf4dev = new PDF4dev();
  });

  it("HTML to PDF", async () => {
    const operation = await pdf4dev.htmlToPdf("<h1>Hello, {{name}}</h1>", {
      template: {
        name: "World",
      },
    });

    expect(operation).toBeInstanceOf(Operation);
    expect(operation.status).toBe("success");
    expect(operation.output.file).toBeInstanceOf(File);
  });

  it("WEB to PDF", async () => {
    const operation = await pdf4dev.webToPdf("https://www.wikipedia.org/");

    expect(operation).toBeInstanceOf(Operation);
    expect(operation.status).toBe("success");
    expect(operation.output.file).toBeInstanceOf(File);
  });

  it("Document to PDF", async () => {
    const file = fs.readFileSync("./examples/files/document.docx");
    const operation = await pdf4dev.documentToPdf(file);

    expect(operation).toBeInstanceOf(Operation);
    expect(operation.status).toBe("success");
    expect(operation.output.file).toBeInstanceOf(File);
  });

  it("Images to PDF", async () => {
    const file1 = fs.readFileSync("./examples/files/image01.jpg");
    const file2 = fs.readFileSync("./examples/files/image02.jpg");
    const files = [file1, file2];

    const operation = await pdf4dev.imagesToPdf(files);

    expect(operation).toBeInstanceOf(Operation);
    expect(operation.status).toBe("success");
    expect(operation.output.file).toBeInstanceOf(File);
  });

  it("PDF Merge", async () => {
    const file = fs.readFileSync("./examples/files/document.pdf");
    const files = [file, file];

    const operation = await pdf4dev.pdfMerge(files);

    expect(operation).toBeInstanceOf(Operation);
    expect(operation.status).toBe("success");
    expect(operation.output.file).toBeInstanceOf(File);

    pdfMergedUrl = operation.output.file.url;
  });

  it("PDF Reorganize", async () => {
    const operation = await pdf4dev.pdfReorganize(pdfMergedUrl, {
      fixed: 1,
      split: true,
    });

    expect(operation).toBeInstanceOf(Operation);
    expect(operation.status).toBe("success");

    expect(operation.output.files).toBeInstanceOf(Array);
    expect(operation.output.files.length).toBe(2);
  });

  it("PDF Create", async () => {
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

    expect(operation).toBeInstanceOf(Operation);
    expect(operation.status).toBe("success");
    expect(operation.output.file).toBeInstanceOf(File);
  });

  it("WEB to Image", async () => {
    const operation = await pdf4dev.webToImage("https://www.wikipedia.org/");

    expect(operation).toBeInstanceOf(Operation);
    expect(operation.status).toBe("success");
    expect(operation.output.file).toBeInstanceOf(File);
  });

  it("HTML to Image", async () => {
    const operation = await pdf4dev.htmlToImage("<h1>Hello, {{name}}</h1>", {
      template: {
        name: "World",
      },
    });

    expect(operation).toBeInstanceOf(Operation);
    expect(operation.status).toBe("success");
    expect(operation.output.file).toBeInstanceOf(File);
  });

  it("PDF to Image", async () => {
    const operation = await pdf4dev.pdfToImage(pdfMergedUrl);

    expect(operation).toBeInstanceOf(Operation);
    expect(operation.status).toBe("success");
    expect(operation.output.files).toBeInstanceOf(Array);
    expect(operation.output.files.length).toBe(2);
  });

  it("PDF to Document", async () => {
    const operation = await pdf4dev.pdfToDocument(pdfMergedUrl, {
      output: PDF_TO_DOCUMENT_OUTPUT.DOCX,
    });

    expect(operation).toBeInstanceOf(Operation);
    expect(operation.status).toBe("success");
    expect(operation.output.file).toBeInstanceOf(File);
  });

  it("PDF Protect", async () => {
    const operation = await pdf4dev.pdfProtect(pdfMergedUrl, {
      userPassword: "123456",
    });

    expect(operation).toBeInstanceOf(Operation);
    expect(operation.status).toBe("success");
    expect(operation.output.file).toBeInstanceOf(File);

    pdfProtectedUrl = operation.output.file.url;
  });

  it("PDF Unprotect", async () => {
    const operation = await pdf4dev.pdfUnprotect(pdfProtectedUrl, {
      password: "123456",
    });

    expect(operation).toBeInstanceOf(Operation);
    expect(operation.status).toBe("success");
    expect(operation.output.file).toBeInstanceOf(File);
  });

  it("PDF Fields", async () => {
    const file = fs.readFileSync("./examples/files/form.pdf");

    const operation = await pdf4dev.pdfFields(file);

    expect(operation).toBeInstanceOf(Operation);
    expect(operation.status).toBe("success");

    expect(operation.output.fields).toBeInstanceOf(Array);
    expect(operation.output.fields.length).toBeGreaterThanOrEqual(1);
  });

  it("PDF Fill", async () => {
    const file = fs.readFileSync("./examples/files/form.pdf");

    const operation = await pdf4dev.pdfFill(file, {
      fields: [
        {
          name: "Given Name Text Box",
          value: "1",
        },
      ],
    });

    expect(operation).toBeInstanceOf(Operation);
    expect(operation.status).toBe("success");
    expect(operation.output.file).toBeInstanceOf(File);
  });

  it("PDF Info", async () => {
    const document = fs.readFileSync("./examples/files/document.pdf");
    const operation = await pdf4dev.pdfInfo(document);

    expect(operation).toBeInstanceOf(Operation);
    expect(operation.status).toBe("success");
  });

  it("PDF Repair", async () => {
    const document = fs.readFileSync("./examples/files/document.pdf");
    const operation = await pdf4dev.pdfRepair(document);

    expect(operation).toBeInstanceOf(Operation);
    expect(operation.status).toBe("success");
    expect(operation.output.file).toBeInstanceOf(File);
  });

  it("Barcode reader", async () => {
    const document = fs.readFileSync("./examples/files/barcodes.pdf");
    const operation = await pdf4dev.barcodeReader(document);

    expect(operation).toBeInstanceOf(Operation);
    expect(operation.status).toBe("success");
    expect(operation.output.barcodes).toBeInstanceOf(Array);
    expect(operation.output.barcodes.length).toBeGreaterThanOrEqual(1);
  });

  it("Barcode generate", async () => {
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

    expect(operation).toBeInstanceOf(Operation);
    expect(operation.status).toBe("success");
    expect(operation.output.file).toBeInstanceOf(File);
  });

  it("Get operations", async () => {
    operations = await pdf4dev.getOperations();

    expect(operations).toBeInstanceOf(Array);
    expect(operations.length).toBeGreaterThanOrEqual(1);
  });

  it("Get one operation", async () => {
    const operation = await pdf4dev.getOperation(operations[0].id);
    expect(operation).toBeInstanceOf(Operation);
  });
});
