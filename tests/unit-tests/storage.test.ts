import "jest";
import * as fs from "fs";
import Operation from "../../src/lib/classes/Operation";
import File from "../../src/lib/classes/File";
import { PDF4dev } from "../../src/index";

jest.setTimeout(60000);

describe("Storage API", () => {
  let pdf4dev;

  beforeEach(() => {
    pdf4dev = new PDF4dev();
  });

  it("Document to PDF - From Path", async () => {
    const path = fs.realpathSync("./examples/files/document.docx");
    const operation = await pdf4dev.documentToPdf(path);

    expect(operation).toBeInstanceOf(Operation);
    expect(operation.status).toBe("success");
    expect(operation.output.file).toBeInstanceOf(File);
  });

  it("Document to PDF - From Buffer", async () => {
    const file = fs.readFileSync("./examples/files/document.docx");
    const operation = await pdf4dev.documentToPdf(file);

    expect(operation).toBeInstanceOf(Operation);
    expect(operation.status).toBe("success");
    expect(operation.output.file).toBeInstanceOf(File);
  });
});
