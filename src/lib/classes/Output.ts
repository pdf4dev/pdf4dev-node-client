import File from "./File";

class Output {
  public files?: Array<File>;
  public file?: File;

  constructor(data: any = {}) {
    Object.assign(this, data);
    this.file = data.file ? new File(data.file) : undefined;
    this.files = data.files ? data.files.map((f) => new File(f)) : undefined;
  }

  private getFiles() {
    let files: Array<File> = this.files || [];

    if (this.file) {
      files = [this.file, ...files];
    }

    return files;
  }

  private getFirstFile() {
    const files = this.getFiles();

    if (files.length > 1) {
      console.warn("There are multiple files. Downloading the first one.");
    }

    if (files.length === 0) {
      throw new Error("The response does not contain any file.");
    }

    return files[0];
  }

  private getPromisePerFile(callbackPerFile): Array<any> {
    const promises: Array<any> = [];
    let files: Array<File> = this.getFiles();

    for (let file of files) {
      const promise = callbackPerFile(file);
      promises.push(promise);
    }

    return promises;
  }

  /**
   * Download the generated file
   * @returns Buffer data
   */
  async download(): Promise<Buffer> {
    const file: File = this.getFirstFile();
    const response = await file.download();

    return response;
  }

  /**
   * Save the generated file in the specified path
   * @param path Path to save download file
   */
  async save(path: String) {
    const file: File = this.getFirstFile();
    await file.save(path);
  }

  /**
   * Download all generated files
   * @returns Buffer data
   */
  async downloadAll(): Promise<Array<Buffer>> {
    const callback = async (file: File): Promise<any> => {
      return file.download();
    };

    const promises = this.getPromisePerFile(callback);
    const responses = await Promise.all(promises);
    return responses;
  }

  /**
   * Download all generated files in the specified path
   * @param path Folder to save generated files
   * @returns Buffer data
   */
  async saveAll(path: String) {
    const callback = async (file: File): Promise<any> => {
      const savePath = path ? `${path}${file.name}` : null;
      const promise = file.save(savePath);
      return promise;
    };

    const promises = this.getPromisePerFile(callback);
    await Promise.all(promises);
  }
}

export default Output;
