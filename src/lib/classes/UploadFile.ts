class UploadFile {
  public id: String;
  public size: Number;
  public contentType: String;
  public createdAt: String;
  public url: String;

  constructor(data: Object) {
    Object.assign(this, data);
  }
}

export default UploadFile;