import "jest";
import * as fs from "fs";
import Operation from "../../src/lib/classes/Operation";
import File from "../../src/lib/classes/File";
import { PDF4dev } from "../../src/index";
import { v4 as uuidV4 } from "uuid";

jest.setTimeout(60000);

describe("Files download", () => {
  let pdf4dev;
  let validOperation: Operation;

  beforeEach(() => {
    pdf4dev = new PDF4dev();
  });

  it("Creating a basic operation", async () => {
    const operation = await pdf4dev.htmlToPdf("<h1>Hello, {{name}}</h1>", {
      template: {
        name: "World",
      },
    });

    expect(operation).toBeInstanceOf(Operation);
    expect(operation.status).toBe("success");
    expect(operation.output.file).toBeInstanceOf(File);
    validOperation = operation;
  });

  it("Download file", async () => {
    const file = await validOperation.download();
    expect(file).toBeInstanceOf(Buffer);
  });

  it("Download list of files", async () => {
    const files = await validOperation.downloadAll();
    expect(files).toBeInstanceOf(Array);
    expect(files.length).toBe(1);
    expect(files[0]).toBeInstanceOf(Buffer);
  });

  it("Save to disk", async () => {
    const path = `/tmp/${uuidV4()}.pdf`;
    await validOperation.save(path);

    const exists = fs.existsSync(path);
    expect(exists).toBe(true);
    fs.rmSync(path);
  });

  it("Save all to disk", async () => {
    const path = `/tmp/${uuidV4()}/`;
    fs.mkdirSync(path);

    await validOperation.saveAll(path);

    const files = fs.readdirSync(path);
    expect(files.length).toBe(1);

    fs.rmdirSync(path, { recursive: true });
  });
});
