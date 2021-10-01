import Output from "./Output";

class Operation {
  public id: String;
  public name: String;
  public status: String;
  public createdAt: String;
  public output: Output;

  constructor(data: any = {}) {
    Object.assign(this, data);
    this.output = new Output(data.output);
  }

  private checkValid() {
    const isValid = this.output && this.status == "success";

    if (!isValid) {
      throw new Error("Invalid operation");
    }
  }

  /**
   * Download the generated file
   * @returns Buffer data
   */
  async download(): Promise<Buffer> {
    this.checkValid();
    return this.output.download();
  }

  /**
   * Save the generated file in the specified path
   * @param path Path to save download file
   */
  async save(path: String) {
    this.checkValid();
    return this.output.save(path);
  }

  /**
   * Download all generated files
   * @returns Buffer data
   */
  async downloadAll(): Promise<Array<Buffer>> {
    this.checkValid();
    return this.output.downloadAll();
  }

  /**
   * Download all generated files in the specified path
   * @param path Folder to save generated files
   * @returns Buffer data
   */
  async saveAll(path: String) {
    this.checkValid();
    return this.output.saveAll(path);
  }
}

export default Operation;
