import {
  PDFMetadata,
  PDFCreationOptions,
  PDFRect,
  Authorization,
  PDFViewport,
} from "./shared";

import {
  PDF_PAGE_SIZE,
  PDF_CREATE_PAGE_ITEM,
  IMAGE_FORMAT,
  PDF_TO_DOCUMENT_OUTPUT,
  PDF_PROTECT_PERMISSIONS,
  BARCODES_TYPES,
  TEXT_ALIGMENT,
  BARCODE_ROTATION,
} from "./enums";

export interface HtmlToPdf {
  /** Your HTML code. If you want you can use placeholders  */
  html?: String;
  /** HTML Code */
  header?: String;
  /** HTML Code */
  footer?: String;
  /** An JSON object that can be use to provide data to your HTML using placeholders. */
  template?: Object;
  metadata?: PDFMetadata;
  options?: PDFCreationOptions;
}

export interface BasicNameValue {
  name: String;
  value: String;
}

export interface WebToPdf {
  url?: String;
  authorization?: Authorization;
  headers?: Array<BasicNameValue>;
  cookies?: Array<BasicNameValue>;
  metadata?: PDFMetadata;
  options?: PDFCreationOptions;
}

export interface DocumentToPdf {
  url?: String;
  authorization?: Authorization;
}

export interface ImagesToPdf {
  urls?: Array<String>;
  authorization?: Authorization;
}

export interface PdfMerge {
  urls?: Array<String>;
  authorization?: Authorization;
  metadata?: PDFMetadata;
}

export interface PdfReorganize {
  url?: String;
  authorization?: Authorization;
  metadata?: PDFMetadata;

  /** Pages ranges to include, example: "1,3-5,10-" (Pages 1, 3 to 5 and 10 to the last page) */
  ranges?: String;

  /** Pages ranges to remove, example: "1,3-5,10-" (Pages 1, 3 to 5 and 10 to the last page) */
  remove?: String;

  /** Generate a document for each specified range */
  split?: Boolean;

  /** Number of pages to include in each document (When split is true) */
  fixed?: Number;
}

interface PdfPageItem {
  type: PDF_CREATE_PAGE_ITEM;
  props: any;
}

interface PDFPage {
  /** Page number to add items. Useful when you're using a template. (Optional) */
  number?: Number;
  size?: PDF_PAGE_SIZE;
  items: Array<PdfPageItem>;
}

export interface PdfCreate {
  /** URL to a PDF template file (Optional) */
  template?: String;
  authorization?: Authorization;
  metadata?: PDFMetadata;
  pages: Array<PDFPage>;
}

export interface GetOperations {
  page?: Number;
  limit?: Number;
}

export interface ImageCreationOptions {
  fullPage?: Boolean;
  rect?: PDFRect;
  printBackground?: Boolean;
  viewPort?: PDFViewport;
}

export interface WebToImage {
  url?: String;
  output?: IMAGE_FORMAT;
  authorization?: Authorization;
  headers?: Array<BasicNameValue>;
  cookies?: Array<BasicNameValue>;
  options?: ImageCreationOptions;
}

export interface HtmlToImage {
  /** Your HTML code. If you want you can use placeholders  */
  html?: String;
  /** An JSON object that can be use to provide data to your HTML using placeholders. */
  template?: Object;
  output?: IMAGE_FORMAT;
  options?: ImageCreationOptions;
}

export interface PdfToImageOptions {
  /** Pages to export, example: "1,3-5,10-" (Pages 1, 3 to 5 and 10 to the last page) */
  pages?: String;
  output?: IMAGE_FORMAT;
  rect?: PDFRect;
}

export interface PdfToImage {
  url?: String;
  authorization?: Authorization;
  options?: PdfToImageOptions;
}

export interface PdfToDocument {
  url?: String;
  authorization?: Authorization;
  output: PDF_TO_DOCUMENT_OUTPUT;
}

export interface PdfProtect {
  url?: String;
  authorization?: Authorization;
  userPassword?: String;
  ownerPassword?: String;
  permissions?: PDF_PROTECT_PERMISSIONS;
}

export interface PdfUnprotect {
  url?: String;
  authorization?: Authorization;
  password: String;
}

export interface PdfFields {
  url?: String;
  authorization?: Authorization;
}

export interface PdfFillField {
  name: String;
  value: String;
  readonly?: Boolean;
  required?: Boolean;
  exporting?: Boolean;
}

export interface PdfFill {
  url?: String;
  authorization?: Authorization;
  metadata?: PDFMetadata;
  fields: Array<PdfFillField>;
}

export interface PdfInfo {
  url?: String;
  authorization?: Authorization;
}

export interface PdfRepair {
  url?: String;
  authorization?: Authorization;
}

export interface BarcodeReader {
  url?: String;
  authorization?: Authorization;
  pages?: String;
}

export interface BarcodeGenerateScale {
  x?: Number;
  y?: Number;
  all?: Number;
}

export interface BarcodeGeneratePadding {
  left?: Number;
  top?: Number;
  right?: Number;
  bottom?: Number;
  horizontal?: Number;
  vertical?: Number;
  all?: Number;
}

export interface BarcodeGenerate {
  type?: BARCODES_TYPES;

  /** Value to include in the code. */
  value: String;

  /** If you set this to true, you'll receive the code in base64. */
  inline?: Boolean;
  width?: Number;
  height?: Number;

  /** Hexadecimal color (Example: #ff0000) */
  color?: String;

  /** Hexadecimal color (Example: #ff0000) */
  textColor?: String;

  /** Hexadecimal color (Example: #ff0000) */
  backgroundColor?: String;

  /** You can set the scale in x and y, or set the all property. */
  scale?: BarcodeGenerateScale;

  /** You can set the padding in each attribute, set the horizontal and vertical values or set the all property. */
  padding?: BarcodeGeneratePadding;

  /** Set to true if you want to include the text (For instance, below a barcode) */
  includeText?: Boolean;
  textAligment?: TEXT_ALIGMENT;
  rotate?: BARCODE_ROTATION;
}
