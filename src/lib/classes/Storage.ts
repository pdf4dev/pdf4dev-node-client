import axios from "axios";
import { v4 as uuidV4 } from "uuid";

import * as FileType from "file-type";
import * as FormData from "form-data";
import * as fs from "fs";

import UploadFile from "./UploadFile";
import PDFException from "./PDFException";

import { PDF4DEV_STORAGE_API_URL } from "../utils";
import InstanceOptions from "./InstanceOptions";

class Storage {
  private options: InstanceOptions;

  constructor(options: InstanceOptions) {
    this.options = options;
  }

  private readFromPath(path): Buffer {
    if (!fs.existsSync(path)) {
      throw new Error(`Input file not exists ${path}.`);
    }

    return fs.readFileSync(path);
  }

  /**
   * Upload a file to the Storage API
   * @param file Buffer
   * @returns Upload file
   */
  async uploadFile(file: Buffer): Promise<UploadFile>;

  /**
   * Upload a file to the Storage API
   * @param path Path to the file
   * @returns Upload file
   */
  async uploadFile(path: String): Promise<UploadFile>;

  /**
   * Upload a file to the Storage API
   * @param file Buffer
   * @returns Upload file
   */
  async uploadFile(input: String | Buffer): Promise<UploadFile> {
    const file: Buffer = Buffer.isBuffer(input)
      ? input
      : this.readFromPath(input);

    const result = await this.uploadFiles([file]);
    return new UploadFile(result[0]);
  }

  /**
   * Upload files to the Storage API
   * @param files Array of buffer
   * @returns Upload file
   */
  async uploadFiles(files: Array<Buffer>): Promise<Array<UploadFile>>;

  /**
   * Upload files to the Storage API
   * @param files Array of paths
   * @returns Upload file
   */
  async uploadFiles(paths: Array<String>): Promise<Array<UploadFile>>;

  async uploadFiles(
    files: Array<Buffer> | Array<String>
  ): Promise<Array<UploadFile>> {
    if (files.length == 0) {
      return [];
    }

    const formData = new FormData();

    for (let file of files) {
      const buffer: Buffer = Buffer.isBuffer(file)
        ? file
        : this.readFromPath(file);

      const type = await FileType.fromBuffer(buffer);
      const filename = `${uuidV4()}.${type.ext}`;
      formData.append("files", buffer, { filename });
    }

    try {
      const response = await axios.post(
        PDF4DEV_STORAGE_API_URL + "files",
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            ...this.options.getHeaders(),
          },
        }
      );

      if (response.data.length == 0) {
        throw new Error("Unable to upload the file");
      }

      return response.data.map((f) => {
        return new UploadFile(f);
      });
    } catch (ex) {
      if (ex.isAxiosError && ex.response.data) {
        throw new PDFException(ex.response.data);
      } else {
        throw ex;
      }
    }
  }
}

export default Storage;
