class PDFException extends Error {
  code: Number;

  constructor(data) {
    const message = data.output ? data.output.message : data.message;
    super(message);
    Object.assign(this, data);
  }
}

export default PDFException;
