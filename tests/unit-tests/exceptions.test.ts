import "jest";
import PDFException from "../../src/lib/classes/PDFException";
import { PDF4dev } from "../../src/index";

jest.setTimeout(60000);

describe("Exceptions", () => {
  let pdf4dev;

  beforeEach(() => {
    pdf4dev = new PDF4dev();
  });

  it("Invalid operation", async () => {
    const test = pdf4dev.pdfToImage(
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy_fake.pdf"
    );

    await expect(test).rejects.toThrow(PDFException);
  });

  it("Try download with no file", async () => {
    const operation = await pdf4dev.pdfInfo(
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    );

    await expect(operation.download()).rejects.toThrow(Error);
  });

  it("Try upload not exists file", async () => {
    await expect(pdf4dev.pdfInfo("./not-exists.pdf")).rejects.toThrow(Error);
  });
});
