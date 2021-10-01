import axios from "axios";
import * as fs from "fs";

class File {
  public name: String;
  public url: String;

  constructor(data: Object) {
    Object.assign(this, data);
  }

  async download(): Promise<Buffer> {
    try {
      const response = await axios.get(this.url.toString(), {
        responseType: "arraybuffer",
      });

      return response.data;
    } catch (ex) {
      throw new Error("Unable to download the file: " + this.url);
    }
  }

  async save(path: String) {
    const file = await this.download();
    fs.writeFileSync(path.toString(), file);
  }
}

export default File;
