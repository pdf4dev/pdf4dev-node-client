import axios from "axios";

import {
  HtmlToPdf,
  WebToPdf,
  DocumentToPdf,
  ImagesToPdf,
  PdfMerge,
  PdfReorganize,
  PdfCreate,
  GetOperations,
  WebToImage,
  HtmlToImage,
  PdfToImage,
  PdfToDocument,
  PdfProtect,
  PdfUnprotect,
  PdfFields,
  PdfFill,
  PdfInfo,
  PdfRepair,
  BarcodeReader,
  BarcodeGenerate,
} from "./operations";

import Storage from "./classes/Storage";
import Operation from "./classes/Operation";
import PDFException from "./classes/PDFException";

import { PDF4DEV_API_URL, isURL } from "./utils";
import InstanceOptions from "./classes/InstanceOptions";

class PDF4dev {
  private options: InstanceOptions;
  private storage: Storage;

  /**
   * Create a PDF4dev instance.
   * @param apiKey API Key. Visit the dashboard to get a new one. You can also use the PDF4DEV_API_KEY environment variable.
   * @returns Operation result
   */
  constructor(options?: InstanceOptions) {
    this.options = new InstanceOptions(options);
    this.storage = new Storage(this.options);
  }

  private async makeRequest(
    endpoint: String,
    options: Object
  ): Promise<Operation> {
    try {
      const result = await axios.post(PDF4DEV_API_URL + endpoint, options, {
        headers: this.options.getHeaders(),
      });

      return new Operation(result.data);
    } catch (ex) {
      if (ex.response.data) {
        throw new PDFException(ex.response.data);
      } else {
        throw new Error("Error processing your request");
      }
    }
  }

  private async getInputUrl(input: any): Promise<String> {
    if (isURL(input)) {
      return input;
    }

    const response = await this.storage.uploadFile(input);
    return response.url;
  }

  private async getInputUrlList(input: Array<any>): Promise<Array<String>> {
    const localFiles: Array<any> = input.filter((i) => !isURL(i));
    const uploads = await this.storage.uploadFiles(localFiles);

    return input.map((i) => {
      const index = localFiles.indexOf(i);
      return index >= 0 ? uploads[index].url : i;
    });
  }

  /**
   * Get the storage instance
   * @returns Storage instance
   */
  getStorage(): Storage {
    return this.storage;
  }

  /**
   * Get a list of operations
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/getOperations
   * @returns Operation result
   */
  getOperations(params?: GetOperations): Promise<Array<Operation>>;
  public async getOperations(
    params?: GetOperations
  ): Promise<Array<Operation>> {
    const response = await axios.get(PDF4DEV_API_URL + "operations", {
      params,
      headers: this.options.getHeaders(),
    });

    const result = response.data.results.map((r) => new Operation(r));

    return result;
  }

  /**
   * Get an operation
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/getOneOperation
   * @returns Operation result
   */
  getOperation(id: String): Promise<Operation>;

  public async getOperation(id: String): Promise<Operation> {
    const response = await axios.get(PDF4DEV_API_URL + "operations/" + id, {
      headers: this.options.getHeaders(),
    });

    return new Operation(response.data);
  }

  /**
   * Convert HTML code to a PDF file
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/htmlToPdf
   * @param html HTML Code to convert
   * @param options Operation options
   * @returns Operation result
   */
  async htmlToPdf(html: String, options?: HtmlToPdf): Promise<Operation> {
    options = { html, ...options };
    return this.makeRequest("html-to-pdf", options);
  }

  /**
   * Convert a website to a PDF file
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/webToPdf
   * @param url URL to convert
   * @param options Operation options
   * @returns Operation result
   */
  async webToPdf(url: String, options?: WebToPdf): Promise<Operation> {
    options = { url, ...options };
    return this.makeRequest("web-to-pdf", options);
  }

  /**
   * Convert a document to a PDF file. You can convert from: doc, docx, ppt, pptx, xml, xmlx and odt, ods, odp.
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/documentToPdf
   * @param url URL to the document
   * @param options Operation options
   * @returns Operation result
   */
  documentToPdf(url: String, options?: DocumentToPdf): Promise<Operation>;

  /**
   * Convert a document to a PDF file. You can convert from: doc, docx, ppt, pptx, xml, xmlx and odt, ods, odp.
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/documentToPdf
   * @param path Path to the document
   * @param options Operation options
   * @returns Operation result
   */
  documentToPdf(path: String, options?: DocumentToPdf): Promise<Operation>;

  /**
   * Convert a document to a PDF file. You can convert from: doc, docx, ppt, pptx, xml, xmlx and odt, ods, odp.
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/documentToPdf
   * @param file Document buffer
   * @param options Operation options
   * @returns Operation result
   */
  documentToPdf(file: Buffer, options?: DocumentToPdf): Promise<Operation>;

  async documentToPdf(
    input: String | Buffer,
    options?: DocumentToPdf
  ): Promise<Operation> {
    const url: String = await this.getInputUrl(input);
    options = { url, ...options };
    return this.makeRequest("document-to-pdf", options);
  }

  /**
   * Convert images to a PDF file
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/imageToPdf
   * @param files Array of images buffer
   * @param options Operation options
   * @returns Operation result
   */
  imagesToPdf(files: Array<Buffer>, options?: ImagesToPdf): Promise<Operation>;

  /**
   * Convert images to a PDF file
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/imageToPdf
   * @param paths Array of images paths
   * @param options Operation options
   * @returns Operation result
   */
  imagesToPdf(paths: Array<String>, options?: ImagesToPdf): Promise<Operation>;

  /**
   * Convert images to a PDF file
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/imageToPdf
   * @param urls Array of images URL
   * @param options Operation options
   * @returns Operation result
   */
  imagesToPdf(urls: Array<String>, options?: ImagesToPdf): Promise<Operation>;

  async imagesToPdf(
    input: Array<String> | Array<Buffer>,
    options?: ImagesToPdf
  ): Promise<Operation> {
    const urls: Array<String> = await this.getInputUrlList(input);
    options = { urls, ...options };
    return this.makeRequest("image-to-pdf", options);
  }

  /**
   * Merge differents PDF files in one file.
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfMerge
   * @param files Array of PDF buffers
   * @param options Operation options
   * @returns Operation result
   */
  pdfMerge(files: Array<Buffer>, options?: PdfMerge): Promise<Operation>;

  /**
   * Merge differents PDF files in one file.
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfMerge
   * @param paths Array of PDF paths
   * @param options Operation options
   * @returns Operation result
   */
  pdfMerge(paths: Array<String>, options?: PdfMerge): Promise<Operation>;

  /**
   * Merge differents PDF files in one file.
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfMerge
   * @param urls Array of PDF urls
   * @param options Operation options
   * @returns Operation result
   */
  pdfMerge(urls: Array<String>, options?: PdfMerge): Promise<Operation>;

  async pdfMerge(
    input: Array<String> | Array<Buffer>,
    options?: PdfMerge
  ): Promise<Operation> {
    const urls: Array<String> = await this.getInputUrlList(input);
    options = { urls, ...options };
    return this.makeRequest("pdf-merge", options);
  }

  /**
   * Useful for reorganize a document: Change pages order, split a file in multiples files, Remove pages.
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfReorganize
   * @param file PDF Buffer
   * @param options Operation options
   * @returns Operation result
   */
  pdfReorganize(file: Buffer, options?: PdfReorganize): Promise<Operation>;

  /**
   * Useful for reorganize a document: Change pages order, split a file in multiples files, Remove pages.
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfReorganize
   * @param path PDF path
   * @param options Operation options
   * @returns Operation result
   */
  pdfReorganize(path: String, options?: PdfReorganize): Promise<Operation>;
  /**
   * Useful for reorganize a document: Change pages order, split a file in multiples files, Remove pages.
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfReorganize
   * @param url PDF URL
   * @param options Operation options
   * @returns Operation result
   */
  pdfReorganize(url: String, options?: PdfReorganize): Promise<Operation>;

  async pdfReorganize(
    input: String | Buffer,
    options?: PdfReorganize
  ): Promise<Operation> {
    const url: String = await this.getInputUrl(input);
    options = { url, ...options };
    return this.makeRequest("pdf-reorganize", options);
  }
  /**
   * Create a PDF file using a JSON. Also you can edit one specifying an URL in template property.
   * You'll be able to add elements like text, images but not delete them.
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfCreate
   * @param options Operation options
   * @returns Operation result
   */
  async pdfCreate(options?: PdfCreate): Promise<Operation> {
    return this.makeRequest("pdf-create", options);
  }

  /**
   * Convert a website to an image file
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/webToImage
   * @param url URL to convert
   * @param options Operation options
   * @returns Operation result
   */

  async webToImage(url: String, options?: WebToImage): Promise<Operation> {
    options = { url, ...options };
    return this.makeRequest("web-to-image", options);
  }

  /**
   * Convert HTML Code to an image file
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/htmlToImage
   * @param html HTML Code to convert
   * @param options Operation options
   * @returns Operation result
   */
  async htmlToImage(html: String, options?: HtmlToImage): Promise<Operation> {
    options = { html, ...options };
    return this.makeRequest("html-to-image", options);
  }

  /**
   * Convert a PDF file to an image file
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfToImage
   * @param url PDF URL
   * @param options Operation options
   * @returns Operation result
   */
  async pdfToImage(url: String, options?: PdfToImage): Promise<Operation>;

  /**
   * Convert a PDF file to an image file
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfToImage
   * @param path PDF Path
   * @param options Operation options
   * @returns Operation result
   */
  async pdfToImage(path: String, options?: PdfToImage): Promise<Operation>;

  /**
   * Convert a PDF file to an image file
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfToImage
   * @param file PDF Buffer
   * @param options Operation options
   * @returns Operation result
   */
  async pdfToImage(file: Buffer, options?: PdfToImage): Promise<Operation>;

  async pdfToImage(
    input: String | Buffer,
    options?: PdfToImage
  ): Promise<Operation> {
    const url: String = await this.getInputUrl(input);
    options = { url, ...options };
    return this.makeRequest("pdf-to-image", options);
  }

  /**
   * Convert a PDF file to a document
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfToDocument
   * @param url PDF URL
   * @param options Operation options
   * @returns Operation result
   */
  async pdfToDocument(url: String, options: PdfToDocument);

  /**
   * Convert a PDF file to a document
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfToDocument
   * @param url PDF Path
   * @param options Operation options
   * @returns Operation result
   */
  async pdfToDocument(path: String, options: PdfToDocument);

  /**
   * Convert a PDF file to a document
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfToDocument
   * @param file PDF Buffer
   * @param options Operation options
   * @returns Operation result
   */
  async pdfToDocument(file: Buffer, options: PdfToDocument);

  async pdfToDocument(
    input: String | Buffer,
    options: PdfToDocument
  ): Promise<Operation> {
    const url: String = await this.getInputUrl(input);
    options = { url, ...options };
    return this.makeRequest("pdf-to-document", options);
  }

  /**
   * Protect a PDF file
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfProtect
   * @param url PDF URL
   * @param options Operation options
   * @returns Operation result
   */
  async pdfProtect(url: String, options: PdfProtect): Promise<Operation>;

  /**
   * Protect a PDF file
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfProtect
   * @param url PDF Path
   * @param options Operation options
   * @returns Operation result
   */
  async pdfProtect(path: String, options: PdfProtect): Promise<Operation>;

  /**
   * Protect a PDF file
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfProtect
   * @param url PDF Buffer
   * @param options Operation options
   * @returns Operation result
   */
  async pdfProtect(file: Buffer, options: PdfProtect): Promise<Operation>;

  async pdfProtect(
    input: String | Buffer,
    options: PdfProtect
  ): Promise<Operation> {
    const url: String = await this.getInputUrl(input);
    options = { url, ...options };
    return this.makeRequest("pdf-protect", options);
  }

  /**
   * Unprotect a PDF file
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfUnprotect
   * @param url PDF URL
   * @param options Operation options
   * @returns Operation result
   */
  async pdfUnprotect(url: String, options: PdfUnprotect): Promise<Operation>;

  /**
   * Unprotect a PDF file
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfUnprotect
   * @param url PDF Path
   * @param options Operation options
   * @returns Operation result
   */
  async pdfUnprotect(path: String, options: PdfUnprotect): Promise<Operation>;

  /**
   * Unprotect a PDF file
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfUnprotect
   * @param url PDF Buffer
   * @param options Operation options
   * @returns Operation result
   */
  async pdfUnprotect(file: Buffer, options: PdfUnprotect): Promise<Operation>;

  async pdfUnprotect(
    input: String | Buffer,
    options: PdfUnprotect
  ): Promise<Operation> {
    const url: String = await this.getInputUrl(input);
    options = { url, ...options };
    return this.makeRequest("pdf-unprotect", options);
  }

  /**
   * Return a list of fields in the PDF file. You can use PDF Fill to complete it.
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfFields
   * @param url PDF URL
   * @param options Operation options
   * @returns Operation result
   */
  async pdfFields(url: String, options?: PdfFields): Promise<Operation>;

  /**
   * Return a list of fields in the PDF file. You can use PDF Fill to complete it.
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfFields
   * @param path PDF Path
   * @param options Operation options
   * @returns Operation result
   */
  async pdfFields(path: String, options?: PdfFields): Promise<Operation>;

  /**
   * Return a list of fields in the PDF file. You can use PDF Fill to complete it.
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfFields
   * @param file PDF file
   * @param options Operation options
   * @returns Operation result
   */
  async pdfFields(file: Buffer, options?: PdfFields): Promise<Operation>;

  async pdfFields(
    input: String | Buffer,
    options?: PdfFields
  ): Promise<Operation> {
    const url: String = await this.getInputUrl(input);
    options = { url, ...options };
    return this.makeRequest("pdf-fields", options);
  }

  /**
   * Fill the PDF fields.
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfFill
   * @param url PDF URL
   * @param options Operation options
   * @returns Operation result
   */
  async pdfFill(url: String, options: PdfFill): Promise<Operation>;

  /**
   * Fill the PDF fields.
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfFill
   * @param path PDF Path
   * @param options Operation options
   * @returns Operation result
   */
  async pdfFill(path: String, options: PdfFill): Promise<Operation>;

  /**
   * Fill the PDF fields.
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfFill
   * @param file PDF Buffer
   * @param options Operation options
   * @returns Operation result
   */
  async pdfFill(file: Buffer, options: PdfFill): Promise<Operation>;

  async pdfFill(input: String | Buffer, options: PdfFill): Promise<Operation> {
    const url: String = await this.getInputUrl(input);
    options = { url, ...options };
    return this.makeRequest("pdf-fill", options);
  }

  /**
   * Get PDF information. If you need the fields, you can use PDF Fields instead.
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfInfo
   * @param url PDF URL
   * @param options Operation options
   * @returns Operation result
   */
  async pdfInfo(url: String, options?: PdfInfo): Promise<Operation>;
  /**
   * Get PDF information. If you need the fields, you can use PDF Fields instead.
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfInfo
   * @param path PDF Path
   * @param options Operation options
   * @returns Operation result
   */
  async pdfInfo(path: String, options?: PdfInfo): Promise<Operation>;

  /**
   * Get PDF information. If you need the fields, you can use PDF Fields instead.
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfInfo
   * @param file PDF Buffer
   * @param options Operation options
   * @returns Operation result
   */
  async pdfInfo(file: Buffer, options?: PdfInfo): Promise<Operation>;

  async pdfInfo(input: String | Buffer, options?: PdfInfo): Promise<Operation> {
    const url: String = await this.getInputUrl(input);
    options = { url, ...options };
    return this.makeRequest("pdf-info", options);
  }

  /**
   * Try to repair an invalid PDF
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfRepair
   * @param url PDF URL
   * @param options Operation options
   * @returns Operation result
   */
  async pdfRepair(url: String, options?: PdfRepair): Promise<Operation>;

  /**
   * Try to repair an invalid PDF
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfRepair
   * @param path PDF Path
   * @param options Operation options
   * @returns Operation result
   */
  async pdfRepair(path: String, options?: PdfRepair): Promise<Operation>;

  /**
   * Try to repair an invalid PDF
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/pdfRepair
   * @param file PDF Buffer
   * @param options Operation options
   * @returns Operation result
   */
  async pdfRepair(file: Buffer, options?: PdfRepair): Promise<Operation>;

  async pdfRepair(
    input: String | Buffer,
    options?: PdfRepair
  ): Promise<Operation> {
    const url: String = await this.getInputUrl(input);
    options = { url, ...options };
    return this.makeRequest("pdf-repair", options);
  }

  /**
   * Read barcodes, QR, or similar formats from a PDF or image file.
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/barcodeReader
   * @param url PDF URL
   * @param options Operation options
   * @returns Operation result
   */
  async barcodeReader(url: String, options?: BarcodeReader): Promise<Operation>;

  /**
   * Read barcodes, QR, or similar formats from a PDF or image file.
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/barcodeReader
   * @param path PDF Path
   * @param options Operation options
   * @returns Operation result
   */
  async barcodeReader(
    path: String,
    options?: BarcodeReader
  ): Promise<Operation>;

  /**
   * Read barcodes, QR, or similar formats from a PDF or image file.
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/barcodeReader
   * @param file PDF Buffer
   * @param options Operation options
   * @returns Operation result
   */
  async barcodeReader(
    file: Buffer,
    options?: BarcodeReader
  ): Promise<Operation>;

  async barcodeReader(
    input: String | Buffer,
    options?: BarcodeReader
  ): Promise<Operation> {
    const url: String = await this.getInputUrl(input);
    options = { url, ...options };
    return this.makeRequest("barcode-reader", options);
  }

  /**
   * Create a barcode (Or other formats, like a QR)
   *
   * For more information: https://api.pdf4.dev/v1/docs/#operation/barcodeGenerate
   * @param options Operation options
   * @returns Operation result
   */
  async barcodeGenerate(options: BarcodeGenerate): Promise<Operation> {
    return this.makeRequest("barcode-generate", options);
  }
}

export default PDF4dev;
